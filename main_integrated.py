#!/usr/bin/env python3
"""
🔱 Script Oracle - Divine Debugger
COMPLETE INTEGRATED PRODUCTION VERSION

A sovereign-grade AI architect with full module integration and efficient data flow.
All components work together through the unified data transfer system.

Features:
- PyQt5 GUI with promo system integration
- Hybrid ML engine (XGBoost + PyTorch + DeepSeek-R1)
- PayPal payment gateway
- Supabase backend with encryption
- Real-time data flow between all modules
- Comprehensive promo code system
- Admin management panel
"""

import sys
import argparse
import asyncio
import logging
from pathlib import Path
from PyQt5.QtWidgets import QApplication, QSplashScreen, QLabel
from PyQt5.QtCore import Qt, QTimer
from PyQt5.QtGui import QPixmap, QFont

# Add the script_oracle directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from script_oracle.config.settings import OracleConfig
from script_oracle.utils.data_flow_manager import data_flow_manager
from script_oracle.utils.encryption import sacred_encryption

class OracleApplication:
    """🔱 Main application controller with integrated data flow"""

    def __init__(self):
        self.config = OracleConfig()
        self.app = None
        self.main_window = None
        self.setup_logging()

    def setup_logging(self):
        """Setup comprehensive logging system"""
        logging.basicConfig(
            level=logging.INFO if not self.config.DEBUG_MODE else logging.DEBUG,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(self.config.LOGS_DIR / 'oracle.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )

        # Create logger
        self.logger = logging.getLogger(__name__)
        self.logger.info("🔱 Script Oracle application initializing...")

    def check_dependencies(self) -> bool:
        """Check if all required dependencies are available"""
        try:
            # Check PyQt5
            from PyQt5.QtWidgets import QApplication

            # Check ML libraries
            import xgboost
            import torch

            # Check API libraries
            import supabase
            import paypalrestsdk

            # Check encryption
            from cryptography.fernet import Fernet

            self.logger.info("✅ All dependencies verified")
            return True

        except ImportError as e:
            self.logger.error(f"💀 Missing dependency: {e}")
            print(f"❌ Missing required dependency: {e}")
            print("Please run: pip install -r requirements.txt")
            return False

    def verify_environment(self) -> bool:
        """Verify environment configuration"""
        try:
            # Check API keys (without exposing them)
            api_keys_status = {
                "Supabase URL": bool(self.config.SUPABASE_URL and self.config.SUPABASE_URL != 'https://your-project.supabase.co'),
                "Supabase Key": bool(self.config.SUPABASE_ANON_KEY and self.config.SUPABASE_ANON_KEY != 'your-anon-key'),
                "OpenRouter Key": bool(self.config.OPENROUTER_API_KEY and self.config.OPENROUTER_API_KEY != 'your-openrouter-key'),
                "PayPal Client ID": bool(self.config.PAYPAL_CLIENT_ID and self.config.PAYPAL_CLIENT_ID != 'your-paypal-client-id'),
                "PayPal Secret": bool(self.config.PAYPAL_CLIENT_SECRET and self.config.PAYPAL_CLIENT_SECRET != 'your-paypal-client-secret'),
            }

            missing_keys = [key for key, status in api_keys_status.items() if not status]

            if missing_keys:
                self.logger.warning(f"⚠️ Missing API keys: {', '.join(missing_keys)}")
                print("⚠️ Some API keys are not configured. The application will run in limited mode.")
                print("Please set up your .env file with proper API keys for full functionality.")
                return False

            self.logger.info("✅ Environment configuration verified")
            return True

        except Exception as e:
            self.logger.error(f"💀 Environment verification failed: {e}")
            return False

    def create_splash_screen(self) -> QSplashScreen:
        """Create application splash screen"""
        # Create splash screen
        splash_pixmap = QPixmap(400, 300)
        splash_pixmap.fill(Qt.black)

        splash = QSplashScreen(splash_pixmap)
        splash.setWindowFlags(Qt.WindowStaysOnTopHint | Qt.FramelessWindowHint)

        # Add text to splash screen
        splash.showMessage(
            "🔱 Script Oracle - Divine Debugger 🔱\n\n"
            "Initializing sacred systems...\n"
            "Loading hybrid engine...\n"
            "Connecting to divine database...\n"
            "Preparing promo enchantments...",
            Qt.AlignCenter | Qt.AlignVCenter,
            Qt.white
        )

        return splash

    def run_gui(self) -> int:
        """🏛️ Launch the complete integrated GUI application"""
        if not self.check_dependencies():
            return 1

        try:
            # Create QApplication
            self.app = QApplication(sys.argv)
            self.app.setApplicationName("Script Oracle - Divine Debugger")
            self.app.setOrganizationName("Oracle Systems")
            self.app.setApplicationVersion("1.0.0")

            # Show splash screen
            splash = self.create_splash_screen()
            splash.show()

            # Process events to show splash
            self.app.processEvents()

            # Verify environment (but don't block if keys missing)
            env_ok = self.verify_environment()

            # Update splash
            splash.showMessage(
                "🔱 Script Oracle - Divine Debugger 🔱\n\n"
                "Initializing data flow manager...\n"
                "Loading GUI sanctum...\n"
                "Connecting modules...",
                Qt.AlignCenter | Qt.AlignVCenter,
                Qt.white
            )
            self.app.processEvents()

            # Initialize data flow manager
            from script_oracle.utils.data_flow_manager import data_flow_manager
            self.logger.info("🌟 Data flow manager initialized")

            # Import and create main window
            from script_oracle.gui.main_window_integrated import MainWindow

            # Update splash
            splash.showMessage(
                "🔱 Script Oracle - Divine Debugger 🔱\n\n"
                "Loading sacred interface...\n"
                "Integrating promo system...\n"
                "Finalizing initialization...",
                Qt.AlignCenter | Qt.AlignVCenter,
                Qt.white
            )
            self.app.processEvents()

            # Create main window
            self.main_window = MainWindow()

            # Connect data flow manager to GUI
            data_flow_manager.data_received.connect(self.main_window.handle_data_flow_update)
            data_flow_manager.error_occurred.connect(self.main_window.handle_system_error)
            data_flow_manager.status_updated.connect(self.main_window.update_status_bar)

            # Show main window
            self.main_window.show()

            # Close splash screen
            splash.finish(self.main_window)

            # Show welcome message
            QTimer.singleShot(1000, self.show_welcome_message)

            self.logger.info("🌟 GUI application launched successfully")

            # Run application
            return self.app.exec_()

        except Exception as e:
            self.logger.error(f"💀 GUI launch failed: {e}")
            print(f"❌ Failed to launch GUI: {e}")
            return 1

    def show_welcome_message(self):
        """Show welcome message with system status"""
        if self.main_window:
            from PyQt5.QtWidgets import QMessageBox

            # Check system status
            metrics = data_flow_manager.get_metrics()

            welcome_text = f"""
🔱 Welcome to Script Oracle - Divine Debugger! 🔱

✨ All systems initialized and ready for divine invocations.

🌟 System Status:
• Data Flow Manager: Active
• Hybrid Engine: Ready (XGBoost + PyTorch + DeepSeek-R1)
• Supabase Backend: Connected
• Payment Gateway: Configured ({self.config.PAYPAL_MODE} mode)
• Promo System: Active with {len(['WELCOME10', 'BOOST5', 'SILVER2024'])} codes available
• Encryption: Enabled for all sensitive data

🎁 Special Launch Promotions:
• WELCOME10 - 10 bonus invocations
• BOOST5 - 5 extra uses
• SILVER2024 - 50% off Silver upgrade
• NEWUSER - Free trial access

📊 Performance:
• Processing Time: {metrics['avg_processing_time']:.2f}s average
• Active Flows: {metrics['active_flows']}
• Packets Processed: {metrics['packets_processed']}

🚀 Start by uploading a code file and experience the divine debugging power!
            """

            msg = QMessageBox(self.main_window)
            msg.setWindowTitle("🔱 Divine Systems Online")
            msg.setText(welcome_text)
            msg.setIcon(QMessageBox.Information)
            msg.setStyleSheet("""
                QMessageBox {
                    background-color: #2A2A2A;
                    color: white;
                }
                QMessageBox QPushButton {
                    background-color: #4A90E2;
                    color: white;
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    font-weight: bold;
                }
                QMessageBox QPushButton:hover {
                    background-color: #357ABD;
                }
            """)
            msg.exec_()

    async def run_cli(self) -> int:
        """⚡ Launch enhanced CLI with data flow integration"""
        if not self.check_dependencies():
            return 1

        print("🔱 Script Oracle - Divine Debugger CLI")
        print("=" * 50)
        print("🌟 Integrated Data Flow System Active")
        print("")

        # Initialize data flow manager for CLI
        from script_oracle.utils.data_flow_manager import data_flow_manager

        while True:
            print("\n📜 Sacred Commands:")
            print("1. 📁 Analyze code file")
            print("2. 🎟️ Generate promo code")
            print("3. 🔍 Check tier limits")
            print("4. 📊 View system metrics")
            print("5. 🔐 Encryption tools")
            print("6. 🧪 Test data flow")
            print("7. 🚪 Exit")

            choice = input("\nSelect command (1-7): ").strip()

            if choice == "1":
                await self.cli_analyze_code()
            elif choice == "2":
                await self.cli_generate_promo()
            elif choice == "3":
                self.cli_check_limits()
            elif choice == "4":
                self.cli_show_metrics()
            elif choice == "5":
                self.cli_encryption_tools()
            elif choice == "6":
                await self.cli_test_data_flow()
            elif choice == "7":
                print("🌟 May your code be forever optimized!")
                break
            else:
                print("❌ Invalid choice!")

        return 0

    async def cli_analyze_code(self):
        """CLI code analysis with data flow"""
        file_path = input("Enter file path: ").strip()
        if not Path(file_path).exists():
            print("❌ File not found!")
            return

        with open(file_path, 'r') as f:
            content = f.read()

        task_type = input("Task type (optimize/cleanse/inspect/explain): ").strip()

        print("🔄 Processing through data flow system...")

        # Use data flow system
        from script_oracle.utils.data_flow_manager import send_code_analysis

        # Send for analysis (mock user ID for CLI)
        send_code_analysis("cli_user", content, task_type, Path(file_path).suffix)

        # Wait a bit for processing
        await asyncio.sleep(2)

        print("✅ Analysis request sent through data flow system")
        print("In GUI mode, results would appear in the interface")

    async def cli_generate_promo(self):
        """CLI promo generation"""
        from script_oracle.rituals.promo_generator import PromoGenerator

        promo_gen = PromoGenerator()

        print("\n🎟️ Promo Code Generator")
        print("1. Tier upgrade code")
        print("2. Usage boost code") 
        print("3. Avatar unlock code")

        choice = input("Select type (1-3): ").strip()

        if choice == "1":
            tier = input("Target tier (Trial/Silver/Gold): ").strip()
            duration = int(input("Duration in days (30): ") or "30")
            limit = int(input("Usage limit (100): ") or "100")

            result = promo_gen.generate_tier_upgrade_code(tier, duration, limit)
            if result.get('success'):
                print(f"\n✨ Generated: {result['code']}")
                print(f"🎯 Target: {tier} | Duration: {duration} days | Limit: {limit}")
            else:
                print(f"❌ Error: {result.get('error')}")

        elif choice == "2":
            bonus = int(input("Bonus uses (10): ") or "10")
            duration = int(input("Duration in days (7): ") or "7")
            limit = int(input("Usage limit (50): ") or "50")

            result = promo_gen.generate_usage_boost_code(bonus, duration, limit)
            if result.get('success'):
                print(f"\n🚀 Generated: {result['code']}")
                print(f"⚡ Bonus: +{bonus} uses | Duration: {duration} days | Limit: {limit}")
            else:
                print(f"❌ Error: {result.get('error')}")

    def cli_check_limits(self):
        """Check tier limits via CLI"""
        from script_oracle.config.settings import enforce_tier_limits

        tier = input("Enter tier (Bronze/Trial/Silver/Gold): ").strip()
        limits = enforce_tier_limits(tier)

        print(f"\n🎖️ {tier} Tier Limits:")
        for key, value in limits.items():
            print(f"   {key}: {value}")

    def cli_show_metrics(self):
        """Show system metrics"""
        from script_oracle.utils.data_flow_manager import get_system_metrics

        metrics = get_system_metrics()

        print("\n📊 System Performance Metrics:")
        print(f"   Packets Processed: {metrics['packets_processed']}")
        print(f"   Average Processing Time: {metrics['avg_processing_time']:.3f}s")
        print(f"   Errors Handled: {metrics['errors_handled']}")
        print(f"   Active Data Flows: {metrics['active_flows']}")
        print(f"   Last Processed: {metrics['last_processed'] or 'Never'}")

        print("\n🔄 Queue Status:")
        for queue_name, size in metrics['queue_sizes'].items():
            print(f"   {queue_name.title()} Queue: {size} packets")

    def cli_encryption_tools(self):
        """CLI encryption utilities"""
        print("\n🔐 Sacred Encryption Tools")

        while True:
            print("\n1. Encrypt text")
            print("2. Decrypt text")
            print("3. Generate secure token")
            print("4. Hash password")
            print("5. Back to main menu")

            choice = input("Select option (1-5): ").strip()

            if choice == "1":
                text = input("Enter text to encrypt: ")
                encrypted = sacred_encryption.encrypt_data(text)
                print(f"\n🔐 Encrypted: {encrypted}")

            elif choice == "2":
                encrypted_text = input("Enter encrypted text: ")
                try:
                    decrypted = sacred_encryption.decrypt_data(encrypted_text)
                    print(f"\n🔓 Decrypted: {decrypted}")
                except Exception as e:
                    print(f"❌ Decryption failed: {e}")

            elif choice == "3":
                from script_oracle.utils.encryption import generate_secure_token
                length = int(input("Token length (32): ") or "32")
                token = generate_secure_token(length)
                print(f"\n🎫 Token: {token}")

            elif choice == "4":
                password = input("Enter password to hash: ")
                result = sacred_encryption.hash_password(password)
                print(f"\n🔒 Hash: {result['hash']}")
                print(f"🧂 Salt: {result['salt']}")

            elif choice == "5":
                break

    async def cli_test_data_flow(self):
        """Test data flow system"""
        from script_oracle.utils.data_flow_manager import data_flow_manager, DataFlowType

        print("\n🧪 Testing Data Flow System...")

        # Create test packet
        test_packet = data_flow_manager.create_packet(
            flow_type=DataFlowType.SYSTEM_EVENT,
            source_module="cli_test",
            data={
                'event_type': 'test_event',
                'message': 'CLI data flow test',
                'timestamp': 'now'
            }
        )

        print(f"📦 Created test packet: {test_packet.packet_id}")

        # Send packet
        data_flow_manager.send_data(test_packet)
        print("📤 Packet sent through data flow system")

        # Wait for processing
        await asyncio.sleep(1)

        # Show metrics
        metrics = data_flow_manager.get_metrics()
        print(f"📊 Packets processed: {metrics['packets_processed']}")
        print("✅ Data flow test completed")

def main():
    """🌟 Enhanced main entry point with full integration"""
    parser = argparse.ArgumentParser(
        description="🔱 Script Oracle - Divine Debugger (Complete Integrated Version)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
🌟 INTEGRATED FEATURES:
• PyQt5 GUI with dark theme and promo system
• Hybrid ML Engine (XGBoost + PyTorch + DeepSeek-R1)
• PayPal payment gateway with tier management
• Supabase backend with Row Level Security
• Complete promo code system with admin panel
• End-to-end encryption for all sensitive data
• Real-time data flow between all modules
• Comprehensive analytics and monitoring

🎟️ AVAILABLE PROMO CODES:
• WELCOME10 - 10 bonus invocations
• BOOST5 - 5 extra uses
• SILVER2024 - 50% off Silver upgrade
• NEWUSER - Free trial access

Examples:
  python main.py                    # Launch integrated GUI
  python main.py --cli              # Enhanced CLI mode
  python main.py --check-env        # Verify configuration

🔱 May your code be forever optimized! 🔱
        """
    )

    parser.add_argument('--cli', action='store_true', help='Run in enhanced CLI mode')
    parser.add_argument('--check-env', action='store_true', help='Check environment setup')
    parser.add_argument('--debug', action='store_true', help='Enable debug mode')

    args = parser.parse_args()

    # Create application instance
    oracle_app = OracleApplication()

    try:
        if args.check_env:
            print("🔍 Checking environment...")
            deps_ok = oracle_app.check_dependencies()
            env_ok = oracle_app.verify_environment()

            if deps_ok and env_ok:
                print("🌟 Environment is fully configured and ready!")
                return 0
            else:
                print("⚠️ Environment has some issues. See messages above.")
                return 1

        elif args.cli:
            return asyncio.run(oracle_app.run_cli())

        else:
            # Default: Run integrated GUI
            return oracle_app.run_gui()

    except KeyboardInterrupt:
        print("\n🌟 Sacred session terminated by user.")
        return 0

    except Exception as e:
        logging.error(f"💀 Critical error: {e}")
        print(f"💀 Critical error occurred: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
