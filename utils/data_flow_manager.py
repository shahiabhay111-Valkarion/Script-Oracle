"""
🔱 Unified Integration System - Sacred Data Flow Manager
Efficient data transfer loop connecting all Script Oracle modules
"""

import asyncio
import json
import logging
from typing import Dict, Any, Optional, List, Union
from datetime import datetime
from dataclasses import dataclass, asdict
from enum import Enum
import queue
import threading
from PyQt5.QtCore import QObject, pyqtSignal, QThread, QTimer

from ..config.settings import OracleConfig
from ..utils.encryption import sacred_encryption
from ..core.hybrid_engine import HybridEngineCore, InvocationResult
from ..api.supabase_client import SupabaseClient
from ..api.payment_gateway import PaymentGateway
from ..rituals.promo_generator import PromoGenerator

class DataFlowType(Enum):
    """Types of data flowing through the system"""
    USER_ACTION = "user_action"
    ML_RESULT = "ml_result"
    PAYMENT_EVENT = "payment_event"
    PROMO_EVENT = "promo_event"
    TIER_UPDATE = "tier_update"
    USAGE_UPDATE = "usage_update"
    SYSTEM_EVENT = "system_event"
    ERROR_EVENT = "error_event"

@dataclass
class DataPacket:
    """Universal data packet for inter-module communication"""
    packet_id: str
    flow_type: DataFlowType
    source_module: str
    target_module: Optional[str]
    data: Dict[str, Any]
    timestamp: str
    encrypted: bool = False
    priority: int = 0  # 0=normal, 1=high, 2=critical

    def encrypt_data(self):
        """Encrypt sensitive data in packet"""
        if not self.encrypted and self.contains_sensitive_data():
            self.data = {"encrypted_payload": sacred_encryption.encrypt_data(self.data)}
            self.encrypted = True

    def decrypt_data(self):
        """Decrypt data if encrypted"""
        if self.encrypted and "encrypted_payload" in self.data:
            self.data = sacred_encryption.decrypt_data(self.data["encrypted_payload"])
            self.encrypted = False

    def contains_sensitive_data(self) -> bool:
        """Check if packet contains sensitive information"""
        sensitive_keys = [
            'payment', 'transaction', 'email', 'password', 'api_key',
            'personal_info', 'financial_data', 'user_data'
        ]
        return any(key in str(self.data).lower() for key in sensitive_keys)

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for serialization"""
        return asdict(self)

class DataFlowManager(QObject):
    """🌟 Central data flow orchestrator for all modules"""

    # Signals for real-time communication
    data_received = pyqtSignal(object)  # DataPacket
    error_occurred = pyqtSignal(str, str)  # error_message, source_module
    status_updated = pyqtSignal(str)  # status_message

    def __init__(self):
        super().__init__()
        self.config = OracleConfig()
        self.logger = logging.getLogger(__name__)

        # Module instances
        self.hybrid_engine = HybridEngineCore()
        self.supabase_client = SupabaseClient()
        self.payment_gateway = PaymentGateway()
        self.promo_generator = PromoGenerator()

        # Data queues for different priority levels
        self.critical_queue = queue.PriorityQueue()
        self.high_queue = queue.PriorityQueue()
        self.normal_queue = queue.PriorityQueue()

        # Event handlers registry
        self.event_handlers: Dict[DataFlowType, List[callable]] = {}

        # Active data flows tracking
        self.active_flows: Dict[str, DataPacket] = {}

        # Performance metrics
        self.metrics = {
            'packets_processed': 0,
            'errors_handled': 0,
            'avg_processing_time': 0.0,
            'last_processed': None
        }

        self.setup_event_handlers()
        self.start_processing_workers()

    def setup_event_handlers(self):
        """Setup event handlers for different data flow types"""
        self.register_handler(DataFlowType.USER_ACTION, self.handle_user_action)
        self.register_handler(DataFlowType.ML_RESULT, self.handle_ml_result)
        self.register_handler(DataFlowType.PAYMENT_EVENT, self.handle_payment_event)
        self.register_handler(DataFlowType.PROMO_EVENT, self.handle_promo_event)
        self.register_handler(DataFlowType.TIER_UPDATE, self.handle_tier_update)
        self.register_handler(DataFlowType.USAGE_UPDATE, self.handle_usage_update)
        self.register_handler(DataFlowType.SYSTEM_EVENT, self.handle_system_event)
        self.register_handler(DataFlowType.ERROR_EVENT, self.handle_error_event)

    def register_handler(self, flow_type: DataFlowType, handler: callable):
        """Register event handler for specific flow type"""
        if flow_type not in self.event_handlers:
            self.event_handlers[flow_type] = []
        self.event_handlers[flow_type].append(handler)

    def create_packet(self, 
                     flow_type: DataFlowType, 
                     source_module: str,
                     data: Dict[str, Any],
                     target_module: Optional[str] = None,
                     priority: int = 0) -> DataPacket:
        """Create new data packet with unique ID"""
        import uuid

        packet = DataPacket(
            packet_id=str(uuid.uuid4()),
            flow_type=flow_type,
            source_module=source_module,
            target_module=target_module,
            data=data,
            timestamp=datetime.utcnow().isoformat(),
            priority=priority
        )

        # Auto-encrypt sensitive data
        packet.encrypt_data()

        return packet

    def send_data(self, packet: DataPacket):
        """Send data packet through the flow system"""
        try:
            # Add to active flows tracking
            self.active_flows[packet.packet_id] = packet

            # Route to appropriate queue based on priority
            if packet.priority == 2:  # Critical
                self.critical_queue.put((0, packet))
            elif packet.priority == 1:  # High
                self.high_queue.put((1, packet))
            else:  # Normal
                self.normal_queue.put((2, packet))

            self.logger.debug(f"📤 Packet sent: {packet.packet_id} from {packet.source_module}")

        except Exception as e:
            self.logger.error(f"💀 Failed to send packet: {e}")
            self.error_occurred.emit(str(e), packet.source_module)

    def start_processing_workers(self):
        """Start background workers for processing data packets"""
        # Critical queue processor
        self.critical_worker = threading.Thread(
            target=self._process_queue_worker, 
            args=(self.critical_queue, "critical"),
            daemon=True
        )
        self.critical_worker.start()

        # High priority queue processor  
        self.high_worker = threading.Thread(
            target=self._process_queue_worker,
            args=(self.high_queue, "high"),
            daemon=True
        )
        self.high_worker.start()

        # Normal queue processor
        self.normal_worker = threading.Thread(
            target=self._process_queue_worker,
            args=(self.normal_queue, "normal"),
            daemon=True
        )
        self.normal_worker.start()

    def _process_queue_worker(self, data_queue: queue.PriorityQueue, queue_name: str):
        """Worker thread for processing data packets"""
        while True:
            try:
                # Get packet from queue (blocking)
                priority, packet = data_queue.get(timeout=1)

                # Process the packet
                asyncio.run(self._process_packet(packet))

                # Mark task as done
                data_queue.task_done()

            except queue.Empty:
                continue
            except Exception as e:
                self.logger.error(f"💀 Queue worker error ({queue_name}): {e}")

    async def _process_packet(self, packet: DataPacket):
        """Process individual data packet"""
        start_time = datetime.utcnow()

        try:
            # Decrypt if needed
            if packet.encrypted:
                packet.decrypt_data()

            # Get handlers for this flow type
            handlers = self.event_handlers.get(packet.flow_type, [])

            # Execute all handlers
            for handler in handlers:
                await handler(packet)

            # Update metrics
            processing_time = (datetime.utcnow() - start_time).total_seconds()
            self.update_metrics(processing_time)

            # Remove from active flows
            if packet.packet_id in self.active_flows:
                del self.active_flows[packet.packet_id]

            self.logger.debug(f"✅ Packet processed: {packet.packet_id}")

        except Exception as e:
            self.logger.error(f"💀 Packet processing failed: {e}")
            await self.handle_processing_error(packet, e)

    def update_metrics(self, processing_time: float):
        """Update performance metrics"""
        self.metrics['packets_processed'] += 1

        # Update average processing time
        current_avg = self.metrics['avg_processing_time']
        count = self.metrics['packets_processed']
        self.metrics['avg_processing_time'] = (current_avg * (count - 1) + processing_time) / count

        self.metrics['last_processed'] = datetime.utcnow().isoformat()

    async def handle_processing_error(self, packet: DataPacket, error: Exception):
        """Handle packet processing errors"""
        self.metrics['errors_handled'] += 1

        # Create error packet
        error_packet = self.create_packet(
            flow_type=DataFlowType.ERROR_EVENT,
            source_module="data_flow_manager",
            data={
                'original_packet_id': packet.packet_id,
                'error_message': str(error),
                'error_type': type(error).__name__,
                'failed_packet': packet.to_dict()
            },
            priority=1
        )

        # Log to database
        await self.supabase_client.log_invocation(
            user_id="system",
            action_type="error_handling",
            result={
                'error': str(error),
                'packet_id': packet.packet_id,
                'source_module': packet.source_module
            }
        )

        self.error_occurred.emit(str(error), packet.source_module)

    # Event Handlers for Different Flow Types

    async def handle_user_action(self, packet: DataPacket):
        """Handle user action events"""
        action_data = packet.data
        action_type = action_data.get('action_type')
        user_id = action_data.get('user_id')

        if action_type == 'code_analysis':
            # Route to hybrid engine
            code_content = action_data.get('code_content')
            task_type = action_data.get('task_type', 'optimize')
            file_extension = action_data.get('file_extension', '.py')

            # Process through ML engine
            result = await self.hybrid_engine.process_code_scroll(
                code_content, task_type, file_extension
            )

            # Send result back
            result_packet = self.create_packet(
                flow_type=DataFlowType.ML_RESULT,
                source_module="hybrid_engine",
                target_module=packet.source_module,
                data={
                    'user_id': user_id,
                    'original_packet_id': packet.packet_id,
                    'analysis_result': {
                        'model_type': result.model_type.value,
                        'result': result.result,
                        'confidence': result.confidence,
                        'execution_time': result.execution_time,
                        'metadata': result.metadata
                    }
                }
            )
            self.send_data(result_packet)

            # Log usage
            usage_packet = self.create_packet(
                flow_type=DataFlowType.USAGE_UPDATE,
                source_module="data_flow_manager",
                data={
                    'user_id': user_id,
                    'action_type': task_type,
                    'timestamp': datetime.utcnow().isoformat()
                }
            )
            self.send_data(usage_packet)

    async def handle_ml_result(self, packet: DataPacket):
        """Handle ML processing results"""
        result_data = packet.data
        user_id = result_data.get('user_id')

        # Store result in database
        await self.supabase_client.log_invocation(
            user_id=user_id,
            action_type="ml_analysis",
            result=result_data['analysis_result']
        )

        # Emit signal for GUI update
        self.data_received.emit(packet)

    async def handle_payment_event(self, packet: DataPacket):
        """Handle payment processing events"""
        payment_data = packet.data
        user_id = payment_data.get('user_id')
        event_type = payment_data.get('event_type')  # 'payment_success', 'payment_failed', etc.

        if event_type == 'payment_success':
            # Update user tier
            new_tier = payment_data.get('tier')
            transaction_id = payment_data.get('transaction_id')

            # Update in database
            await self.supabase_client.update_user_tier(
                user_id, new_tier, transaction_id
            )

            # Send tier update event
            tier_packet = self.create_packet(
                flow_type=DataFlowType.TIER_UPDATE,
                source_module="payment_gateway",
                data={
                    'user_id': user_id,
                    'old_tier': payment_data.get('old_tier'),
                    'new_tier': new_tier,
                    'payment_triggered': True
                },
                priority=1
            )
            self.send_data(tier_packet)

        # Emit signal for GUI update
        self.data_received.emit(packet)

    async def handle_promo_event(self, packet: DataPacket):
        """Handle promo code events"""
        promo_data = packet.data
        user_id = promo_data.get('user_id')
        event_type = promo_data.get('event_type')  # 'promo_redeemed', 'promo_generated'

        if event_type == 'promo_redeemed':
            promo_code = promo_data.get('promo_code')

            # Validate and apply promo
            result = await self.supabase_client.validate_promo_code(promo_code, user_id)

            if result.get('valid'):
                # Send appropriate update based on promo type
                if result.get('tier_upgrade'):
                    tier_packet = self.create_packet(
                        flow_type=DataFlowType.TIER_UPDATE,
                        source_module="promo_system",
                        data={
                            'user_id': user_id,
                            'new_tier': result['tier_upgrade'],
                            'promo_triggered': True,
                            'promo_code': promo_code
                        },
                        priority=1
                    )
                    self.send_data(tier_packet)

                elif result.get('bonus_uses'):
                    usage_packet = self.create_packet(
                        flow_type=DataFlowType.USAGE_UPDATE,
                        source_module="promo_system",
                        data={
                            'user_id': user_id,
                            'bonus_uses': result['bonus_uses'],
                            'promo_code': promo_code
                        }
                    )
                    self.send_data(usage_packet)

        # Emit signal for GUI update
        self.data_received.emit(packet)

    async def handle_tier_update(self, packet: DataPacket):
        """Handle tier update events"""
        tier_data = packet.data
        user_id = tier_data.get('user_id')
        new_tier = tier_data.get('new_tier')

        # Update user profile if not already done
        if not tier_data.get('already_updated'):
            await self.supabase_client.update_user_tier(user_id, new_tier)

        # Trigger avatar mutation if applicable
        if new_tier in ['Silver', 'Gold']:
            avatar_packet = self.create_packet(
                flow_type=DataFlowType.SYSTEM_EVENT,
                source_module="tier_system",
                data={
                    'user_id': user_id,
                    'event_type': 'avatar_unlock_eligible',
                    'tier': new_tier
                }
            )
            self.send_data(avatar_packet)

        # Emit signal for GUI update
        self.data_received.emit(packet)

    async def handle_usage_update(self, packet: DataPacket):
        """Handle usage tracking updates"""
        usage_data = packet.data
        user_id = usage_data.get('user_id')

        # Update usage counters
        if 'bonus_uses' in usage_data:
            # Add bonus uses (from promos)
            # This would update user's bonus usage counter
            pass
        else:
            # Regular usage increment
            await self.supabase_client.increment_usage_count(user_id)

        # Check usage limits
        limits_check = await self.supabase_client.check_usage_limits(user_id)

        if not limits_check.get('allowed'):
            # Send limit exceeded event
            limit_packet = self.create_packet(
                flow_type=DataFlowType.SYSTEM_EVENT,
                source_module="usage_tracker",
                data={
                    'user_id': user_id,
                    'event_type': 'usage_limit_exceeded',
                    'reason': limits_check.get('reason')
                },
                priority=1
            )
            self.send_data(limit_packet)

        # Emit signal for GUI update
        self.data_received.emit(packet)

    async def handle_system_event(self, packet: DataPacket):
        """Handle system-level events"""
        event_data = packet.data
        event_type = event_data.get('event_type')

        if event_type == 'avatar_unlock_eligible':
            # Check if user should get avatar unlocks
            user_id = event_data.get('user_id')
            tier = event_data.get('tier')

            # Auto-unlock avatars based on tier
            if tier == 'Silver':
                await self.supabase_client.mutate_avatar(user_id, 'Ethereal_Sage')
            elif tier == 'Gold':
                await self.supabase_client.mutate_avatar(user_id, 'Cosmic_Oracle')

        # Emit signal for system updates
        self.status_updated.emit(f"System event: {event_type}")

    async def handle_error_event(self, packet: DataPacket):
        """Handle error events"""
        error_data = packet.data

        # Log error for monitoring
        self.logger.error(f"🚨 System error: {error_data.get('error_message')}")

        # Store in database for analysis
        await self.supabase_client.log_invocation(
            user_id="system",
            action_type="error",
            result=error_data
        )

        # Emit error signal
        self.error_occurred.emit(
            error_data.get('error_message', 'Unknown error'),
            error_data.get('source_module', 'unknown')
        )

    # Utility methods for external access

    def send_user_action(self, user_id: str, action_type: str, action_data: Dict[str, Any]):
        """Convenient method to send user actions"""
        packet = self.create_packet(
            flow_type=DataFlowType.USER_ACTION,
            source_module="gui",
            data={
                'user_id': user_id,
                'action_type': action_type,
                **action_data
            }
        )
        self.send_data(packet)

    def send_payment_event(self, user_id: str, payment_data: Dict[str, Any]):
        """Convenient method to send payment events"""
        packet = self.create_packet(
            flow_type=DataFlowType.PAYMENT_EVENT,
            source_module="payment_gateway",
            data={
                'user_id': user_id,
                **payment_data
            },
            priority=1  # High priority for payments
        )
        self.send_data(packet)

    def send_promo_event(self, user_id: str, promo_data: Dict[str, Any]):
        """Convenient method to send promo events"""
        packet = self.create_packet(
            flow_type=DataFlowType.PROMO_EVENT,
            source_module="promo_system",
            data={
                'user_id': user_id,
                **promo_data
            }
        )
        self.send_data(packet)

    def get_metrics(self) -> Dict[str, Any]:
        """Get current performance metrics"""
        return {
            **self.metrics,
            'active_flows': len(self.active_flows),
            'queue_sizes': {
                'critical': self.critical_queue.qsize(),
                'high': self.high_queue.qsize(),
                'normal': self.normal_queue.qsize()
            }
        }

# Global instance for system-wide access
data_flow_manager = DataFlowManager()

# Convenience functions for common operations
def send_code_analysis(user_id: str, code_content: str, task_type: str, file_extension: str = '.py'):
    """Send code for analysis through the data flow system"""
    data_flow_manager.send_user_action(
        user_id=user_id,
        action_type='code_analysis',
        action_data={
            'code_content': code_content,
            'task_type': task_type,
            'file_extension': file_extension
        }
    )

def send_promo_redemption(user_id: str, promo_code: str):
    """Send promo code redemption through the data flow system"""
    data_flow_manager.send_promo_event(
        user_id=user_id,
        promo_data={
            'event_type': 'promo_redeemed',
            'promo_code': promo_code
        }
    )

def send_payment_success(user_id: str, transaction_data: Dict[str, Any]):
    """Send successful payment through the data flow system"""
    data_flow_manager.send_payment_event(
        user_id=user_id,
        payment_data={
            'event_type': 'payment_success',
            **transaction_data
        }
    )

def get_system_metrics() -> Dict[str, Any]:
    """Get current system performance metrics"""
    return data_flow_manager.get_metrics()
