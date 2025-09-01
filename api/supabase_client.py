"""
🔱 Supabase Client - Sacred Database Binding
Connects to the divine Supabase realm with Row Level Security
"""

import asyncio
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
from supabase import create_client, Client
from postgrest.exceptions import APIError

from ..config.settings import OracleConfig

class SupabaseClient:
    """
    🌟 Sacred database client with divine protection
    """

    def __init__(self):
        self.config = OracleConfig()
        self.logger = logging.getLogger(__name__)
        self._client: Optional[Client] = None
        self._initialize_client()

    def _initialize_client(self):
        """Initialize the sacred Supabase connection"""
        try:
            self._client = create_client(
                self.config.SUPABASE_URL,
                self.config.SUPABASE_ANON_KEY
            )
            self.logger.info("✨ Supabase client initialized successfully")
        except Exception as e:
            self.logger.error(f"💀 Supabase initialization failed: {e}")
            raise

    @property
    def client(self) -> Client:
        """Get the sacred client"""
        if self._client is None:
            self._initialize_client()
        return self._client

    # User Management Sacred Functions
    async def create_user_profile(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new user profile in the sacred realm"""
        try:
            result = self.client.table('users').insert({
                'id': user_data['id'],
                'email': user_data['email'],
                'full_name': user_data.get('full_name'),
                'tier': 'Bronze',
                'avatar': 'Valkarion',
                'created_at': datetime.utcnow().isoformat(),
                'usage_count': 0,
                'trial_expiry': None
            }).execute()

            self.logger.info(f"✨ User profile created: {user_data['email']}")
            return result.data[0] if result.data else {}

        except APIError as e:
            self.logger.error(f"💀 User creation failed: {e}")
            raise

    async def get_user_profile(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve user profile from the sacred database"""
        try:
            result = self.client.table('users').select('*').eq('id', user_id).execute()

            if result.data:
                return result.data[0]
            return None

        except APIError as e:
            self.logger.error(f"💀 User retrieval failed: {e}")
            return None

    async def update_user_tier(self, user_id: str, new_tier: str, transaction_id: Optional[str] = None) -> bool:
        """Upgrade user tier through sacred invocation"""
        try:
            update_data = {
                'tier': new_tier,
                'updated_at': datetime.utcnow().isoformat()
            }

            # Set trial expiry for Trial tier
            if new_tier == 'Trial':
                expiry_date = datetime.utcnow() + timedelta(days=9)
                update_data['trial_expiry'] = expiry_date.isoformat()

            result = self.client.table('users').update(update_data).eq('id', user_id).execute()

            # Log payment if transaction provided
            if transaction_id:
                await self.log_payment(user_id, new_tier, transaction_id)

            self.logger.info(f"✨ User tier updated: {user_id} -> {new_tier}")
            return True

        except APIError as e:
            self.logger.error(f"💀 Tier update failed: {e}")
            return False

    async def log_invocation(self, user_id: str, action_type: str, result: Dict[str, Any]) -> bool:
        """Log sacred invocation to the scrolls"""
        try:
            invocation_data = {
                'user_id': user_id,
                'action_type': action_type,
                'result': result,
                'timestamp': datetime.utcnow().isoformat(),
                'model_used': result.get('model_type'),
                'confidence': result.get('confidence'),
                'execution_time': result.get('execution_time')
            }

            result = self.client.table('invocations').insert(invocation_data).execute()

            # Update user usage count
            await self.increment_usage_count(user_id)

            return True

        except APIError as e:
            self.logger.error(f"💀 Invocation logging failed: {e}")
            return False

    async def increment_usage_count(self, user_id: str) -> bool:
        """Increment user's sacred usage counter"""
        try:
            # Get current usage
            user = await self.get_user_profile(user_id)
            if not user:
                return False

            current_count = user.get('usage_count', 0)

            # Update count
            result = self.client.table('users').update({
                'usage_count': current_count + 1,
                'last_used': datetime.utcnow().isoformat()
            }).eq('id', user_id).execute()

            return True

        except APIError as e:
            self.logger.error(f"💀 Usage count update failed: {e}")
            return False

    async def check_usage_limits(self, user_id: str) -> Dict[str, Any]:
        """Check if user has exceeded sacred limits"""
        try:
            user = await self.get_user_profile(user_id)
            if not user:
                return {'allowed': False, 'reason': 'User not found'}

            tier = user.get('tier', 'Bronze')
            limits = self.config.TIER_LIMITS[tier]

            # Check trial expiry
            if tier == 'Trial' and user.get('trial_expiry'):
                expiry = datetime.fromisoformat(user['trial_expiry'].replace('Z', '+00:00'))
                if datetime.utcnow() > expiry:
                    return {'allowed': False, 'reason': 'Trial expired'}

            # Check usage limits
            usage_count = user.get('usage_count', 0)

            if 'uses_per_day' in limits:
                # TODO: Implement daily usage tracking
                daily_usage = usage_count  # Simplified for now
                if daily_usage >= limits['uses_per_day']:
                    return {'allowed': False, 'reason': 'Daily limit exceeded'}

            if 'uses_per_month' in limits:
                # TODO: Implement monthly usage tracking
                monthly_usage = usage_count  # Simplified for now
                if monthly_usage >= limits['uses_per_month']:
                    return {'allowed': False, 'reason': 'Monthly limit exceeded'}

            return {'allowed': True, 'remaining': limits.get('uses_per_day', float('inf')) - usage_count}

        except Exception as e:
            self.logger.error(f"💀 Usage limit check failed: {e}")
            return {'allowed': False, 'reason': str(e)}

    # Payment Management
    async def log_payment(self, user_id: str, tier: str, transaction_id: str) -> bool:
        """Log sacred payment transaction"""
        try:
            payment_data = {
                'user_id': user_id,
                'tier': tier,
                'transaction_id': transaction_id,
                'amount': self.config.TIER_LIMITS[tier]['price'],
                'payment_date': datetime.utcnow().isoformat(),
                'status': 'completed'
            }

            result = self.client.table('payments').insert(payment_data).execute()

            self.logger.info(f"✨ Payment logged: {transaction_id}")
            return True

        except APIError as e:
            self.logger.error(f"💀 Payment logging failed: {e}")
            return False

    # Promo Code Management
    async def validate_promo_code(self, code: str, user_id: str) -> Dict[str, Any]:
        """Validate and apply sacred promo code"""
        try:
            # Check if promo code exists and is valid
            result = self.client.table('promo_codes').select('*').eq('code', code).execute()

            if not result.data:
                return {'valid': False, 'reason': 'Invalid code'}

            promo = result.data[0]

            # Check expiry
            if promo.get('expiry_date'):
                expiry = datetime.fromisoformat(promo['expiry_date'].replace('Z', '+00:00'))
                if datetime.utcnow() > expiry:
                    return {'valid': False, 'reason': 'Code expired'}

            # Check usage limits
            if promo.get('usage_limit') and promo.get('usage_count', 0) >= promo['usage_limit']:
                return {'valid': False, 'reason': 'Usage limit exceeded'}

            # Check if user already used this code
            existing_use = self.client.table('promo_usage').select('*').eq('user_id', user_id).eq('promo_code', code).execute()
            if existing_use.data:
                return {'valid': False, 'reason': 'Already used'}

            # Apply the promo code
            tier_upgrade = promo.get('tier_upgrade')
            if tier_upgrade:
                await self.update_user_tier(user_id, tier_upgrade)

            # Log usage
            self.client.table('promo_usage').insert({
                'user_id': user_id,
                'promo_code': code,
                'used_at': datetime.utcnow().isoformat()
            }).execute()

            # Update promo usage count
            self.client.table('promo_codes').update({
                'usage_count': promo.get('usage_count', 0) + 1
            }).eq('code', code).execute()

            return {
                'valid': True,
                'tier_upgrade': tier_upgrade,
                'description': promo.get('description')
            }

        except Exception as e:
            self.logger.error(f"💀 Promo validation failed: {e}")
            return {'valid': False, 'reason': str(e)}

    async def create_promo_code(self, code_data: Dict[str, Any]) -> bool:
        """Create new sacred promo code"""
        try:
            result = self.client.table('promo_codes').insert(code_data).execute()

            self.logger.info(f"✨ Promo code created: {code_data['code']}")
            return True

        except APIError as e:
            self.logger.error(f"💀 Promo creation failed: {e}")
            return False

    # Avatar Management
    async def mutate_avatar(self, user_id: str, new_avatar: str) -> bool:
        """Sacred avatar mutation ritual"""
        try:
            result = self.client.table('users').update({
                'avatar': new_avatar,
                'avatar_updated': datetime.utcnow().isoformat()
            }).eq('id', user_id).execute()

            self.logger.info(f"✨ Avatar mutated: {user_id} -> {new_avatar}")
            return True

        except APIError as e:
            self.logger.error(f"💀 Avatar mutation failed: {e}")
            return False

    # Authentication Helpers
    def authenticate_with_email(self, email: str, password: str) -> Dict[str, Any]:
        """Sacred email authentication"""
        try:
            result = self.client.auth.sign_in_with_password({
                "email": email,
                "password": password
            })

            if result.user:
                self.logger.info(f"✨ User authenticated: {email}")
                return {
                    'success': True,
                    'user': result.user,
                    'session': result.session
                }

            return {'success': False, 'error': 'Authentication failed'}

        except Exception as e:
            self.logger.error(f"💀 Authentication failed: {e}")
            return {'success': False, 'error': str(e)}

    def sign_up_user(self, email: str, password: str, metadata: Dict[str, Any] = None) -> Dict[str, Any]:
        """Sacred user registration"""
        try:
            result = self.client.auth.sign_up({
                "email": email,
                "password": password,
                "options": {
                    "data": metadata or {}
                }
            })

            if result.user:
                self.logger.info(f"✨ User registered: {email}")
                return {
                    'success': True,
                    'user': result.user,
                    'session': result.session
                }

            return {'success': False, 'error': 'Registration failed'}

        except Exception as e:
            self.logger.error(f"💀 Registration failed: {e}")
            return {'success': False, 'error': str(e)}
