"""
🔱 Updated GUI Sanctum - With Integrated Promo Code System
The divine interface now includes full promo code management and redemption
"""

import sys
import asyncio
from pathlib import Path
from typing import Optional, Dict
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWebEngineWidgets import QWebEngineView

from ..config.settings import OracleConfig, enforce_tier_limits, AVATARS, CHANT_TEMPLATES
from ..core.hybrid_engine import HybridEngineCore
from ..api.supabase_client import SupabaseClient
from ..api.payment_gateway import PaymentGateway
from ..gui.promo_system import PromoCodeWidget, AdminPromoPanel, PromoCodeManager
from ..utils.encryption import sacred_encryption

class TierBadge(QWidget):
    """Sacred tier badge display widget with promo integration"""

    def __init__(self, tier: str = "Bronze"):
        super().__init__()
        self.tier = tier
        self.init_ui()

    def init_ui(self):
        layout = QHBoxLayout()

        # Tier colors with enhanced styling
        colors = {
            "Bronze": "#CD7F32",
            "Trial": "#4A90E2", 
            "Silver": "#C0C0C0",
            "Gold": "#FFD700"
        }

        # Create badge with animation effect
        self.badge_label = QLabel(f"🎖️ {self.tier}")
        self.badge_label.setStyleSheet(f"""
            QLabel {{
                background-color: {colors.get(self.tier, colors["Bronze"])};
                color: white;
                font-weight: bold;
                padding: 8px 15px;
                border-radius: 20px;
                border: 2px solid #444;
                font-size: 14px;
            }}
        """)

        # Add upgrade indicator for promo-eligible tiers
        if self.tier in ["Bronze", "Trial"]:
            self.upgrade_hint = QLabel("↗️")
            self.upgrade_hint.setStyleSheet("QLabel { color: #FFD700; font-size: 16px; }")
            self.upgrade_hint.setToolTip("Upgrade available with promo codes!")
            layout.addWidget(self.upgrade_hint)

        layout.addWidget(self.badge_label)
        layout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(layout)

    def update_tier(self, new_tier: str):
        """Update tier with celebration animation"""
        old_tier = self.tier
        self.tier = new_tier
        self.init_ui()

        # Show celebration for upgrades
        if old_tier != new_tier:
            self.celebrate_upgrade()

    def celebrate_upgrade(self):
        """Show tier upgrade celebration"""
        celebration = QLabel("🎉 UPGRADED! 🎉")
        celebration.setStyleSheet("""
            QLabel {
                color: #FFD700;
                font-weight: bold;
                font-size: 12px;
                background-color: rgba(255, 215, 0, 0.2);
                border-radius: 5px;
                padding: 5px;
            }
        """)

        # Add temporary celebration overlay
        self.layout().addWidget(celebration)

        # Remove after 3 seconds
        QTimer.singleShot(3000, lambda: celebration.setParent(None))

class PromoCodeIntegratedWidget(QWidget):
    """Enhanced promo code widget integrated with main application"""

    promo_redeemed = pyqtSignal(dict)

    def __init__(self, main_window):
        super().__init__()
        self.main_window = main_window
        self.promo_manager = PromoCodeManager(main_window)
        self.init_ui()
        self.load_user_specific_promos()

    def init_ui(self):
        layout = QVBoxLayout(self)

        # Header with promo benefits
        header_layout = QHBoxLayout()

        promo_title = QLabel("🎟️ Sacred Promo Codes")
        promo_title.setStyleSheet("""
            QLabel {
                font-size: 16px;
                font-weight: bold;
                color: #4A90E2;
                margin: 5px;
            }
        """)

        # Show promo benefits indicator
        self.benefits_label = QLabel("✨ No active promotions")
        self.benefits_label.setStyleSheet("""
            QLabel {
                color: #888;
                font-size: 12px;
                font-style: italic;
            }
        """)

        header_layout.addWidget(promo_title)
        header_layout.addStretch()
        header_layout.addWidget(self.benefits_label)

        layout.addLayout(header_layout)

        # Promo code entry with enhanced design
        entry_frame = QFrame()
        entry_frame.setFrameStyle(QFrame.StyledPanel)
        entry_frame.setStyleSheet("""
            QFrame {
                background-color: #2A2A2A;
                border: 1px solid #4A90E2;
                border-radius: 8px;
                padding: 5px;
            }
        """)

        entry_layout = QHBoxLayout(entry_frame)

        self.promo_input = QLineEdit()
        self.promo_input.setPlaceholderText("Enter sacred promo code (e.g., SILVER2024)...")
        self.promo_input.setStyleSheet("""
            QLineEdit {
                padding: 10px;
                border: 1px solid #666;
                border-radius: 5px;
                background-color: #1A1A1A;
                color: white;
                font-size: 14px;
            }
            QLineEdit:focus {
                border-color: #4A90E2;
            }
        """)

        # Add some sample codes in tooltip
        self.promo_input.setToolTip("Try these codes: WELCOME10, BOOST5, NEWUSER")

        self.redeem_button = QPushButton("🔮 REDEEM")
        self.redeem_button.setStyleSheet("""
            QPushButton {
                background-color: #4A90E2;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: bold;
                min-width: 100px;
            }
            QPushButton:hover {
                background-color: #357ABD;
            }
            QPushButton:pressed {
                background-color: #2E5984;
            }
            QPushButton:disabled {
                background-color: #666;
                color: #999;
            }
        """)

        self.redeem_button.clicked.connect(self.redeem_promo_code)
        self.promo_input.returnPressed.connect(self.redeem_promo_code)

        entry_layout.addWidget(self.promo_input, 4)
        entry_layout.addWidget(self.redeem_button, 1)

        layout.addWidget(entry_frame)

        # Quick promo buttons for common codes
        quick_buttons_layout = QHBoxLayout()

        welcome_btn = QPushButton("🎁 WELCOME10")
        welcome_btn.setStyleSheet("""
            QPushButton {
                background-color: #28A745;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 6px 12px;
                font-size: 11px;
                font-weight: bold;
            }
            QPushButton:hover { background-color: #218838; }
        """)
        welcome_btn.clicked.connect(lambda: self.quick_redeem("WELCOME10"))

        boost_btn = QPushButton("⚡ BOOST5")
        boost_btn.setStyleSheet("""
            QPushButton {
                background-color: #FFC107;
                color: #212529;
                border: none;
                border-radius: 4px;
                padding: 6px 12px;
                font-size: 11px;
                font-weight: bold;
            }
            QPushButton:hover { background-color: #E0A800; }
        """)
        boost_btn.clicked.connect(lambda: self.quick_redeem("BOOST5"))

        newuser_btn = QPushButton("🌟 NEWUSER")
        newuser_btn.setStyleSheet("""
            QPushButton {
                background-color: #17A2B8;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 6px 12px;
                font-size: 11px;
                font-weight: bold;
            }
            QPushButton:hover { background-color: #138496; }
        """)
        newuser_btn.clicked.connect(lambda: self.quick_redeem("NEWUSER"))

        quick_buttons_layout.addWidget(QLabel("Quick codes:"))
        quick_buttons_layout.addWidget(welcome_btn)
        quick_buttons_layout.addWidget(boost_btn)
        quick_buttons_layout.addWidget(newuser_btn)
        quick_buttons_layout.addStretch()

        layout.addLayout(quick_buttons_layout)

        # Status display with enhanced styling
        self.status_label = QLabel("✨ Enter a promo code to unlock divine benefits")
        self.status_label.setStyleSheet("""
            QLabel {
                color: #888;
                font-style: italic;
                margin: 5px;
                padding: 5px;
                border-radius: 3px;
            }
        """)
        layout.addWidget(self.status_label)

        # Available promotions in a collapsible section
        promotions_group = QGroupBox("🎊 Available Promotions")
        promotions_group.setCheckable(True)
        promotions_group.setChecked(False)  # Collapsed by default
        promotions_group.setStyleSheet("""
            QGroupBox {
                font-weight: bold;
                color: #4A90E2;
                border: 1px solid #666;
                border-radius: 5px;
                margin-top: 10px;
            }
            QGroupBox::title {
                subcontrol-origin: margin;
                left: 10px;
                padding: 0 5px 0 5px;
            }
        """)

        promotions_layout = QVBoxLayout(promotions_group)

        # Create promotion cards
        self.create_promotion_cards(promotions_layout)

        layout.addWidget(promotions_group)

    def create_promotion_cards(self, layout):
        """Create attractive promotion cards"""
        promotions = [
            {
                "code": "SILVER2024",
                "title": "🥈 Silver Tier Upgrade",
                "description": "Upgrade to Silver tier with 50% discount",
                "expires": "Dec 31, 2024",
                "color": "#C0C0C0"
            },
            {
                "code": "BOOST10",
                "title": "⚡ Usage Boost",
                "description": "Get 10 bonus invocations instantly",
                "expires": "Limited time",
                "color": "#FFC107"
            },
            {
                "code": "ORACLE2024",
                "title": "🧙‍♂️ Avatar Unlock",
                "description": "Unlock the Cosmic Oracle avatar",
                "expires": "New Year Special",
                "color": "#9C27B0"
            }
        ]

        for promo in promotions:
            card = self.create_promo_card(promo)
            layout.addWidget(card)

    def create_promo_card(self, promo_data):
        """Create individual promotion card"""
        card = QFrame()
        card.setFrameStyle(QFrame.StyledPanel)
        card.setStyleSheet(f"""
            QFrame {{
                background-color: #2A2A2A;
                border: 1px solid {promo_data['color']};
                border-radius: 8px;
                padding: 5px;
                margin: 2px;
            }}
        """)

        layout = QHBoxLayout(card)

        # Promo info
        info_layout = QVBoxLayout()

        title_label = QLabel(promo_data['title'])
        title_label.setStyleSheet(f"""
            QLabel {{
                color: {promo_data['color']};
                font-weight: bold;
                font-size: 14px;
            }}
        """)

        desc_label = QLabel(promo_data['description'])
        desc_label.setStyleSheet("QLabel { color: #CCC; font-size: 12px; }")

        expires_label = QLabel(f"Expires: {promo_data['expires']}")
        expires_label.setStyleSheet("QLabel { color: #888; font-size: 10px; }")

        info_layout.addWidget(title_label)
        info_layout.addWidget(desc_label)
        info_layout.addWidget(expires_label)

        # Use button
        use_button = QPushButton(f"Use {promo_data['code']}")
        use_button.setStyleSheet(f"""
            QPushButton {{
                background-color: {promo_data['color']};
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 15px;
                font-size: 12px;
                font-weight: bold;
                min-width: 100px;
            }}
            QPushButton:hover {{
                opacity: 0.8;
            }}
        """)
        use_button.clicked.connect(lambda: self.quick_redeem(promo_data['code']))

        layout.addLayout(info_layout, 3)
        layout.addWidget(use_button, 1)

        return card

    def quick_redeem(self, code):
        """Quick redeem for preset codes"""
        self.promo_input.setText(code)
        self.redeem_promo_code()

    def redeem_promo_code(self):
        """Redeem the entered promo code with enhanced feedback"""
        code = self.promo_input.text().strip().upper()
        if not code:
            self.show_status("⚠️ Please enter a promo code", "warning")
            return

        self.redeem_button.setText("🔄 REDEEMING...")
        self.redeem_button.setEnabled(False)

        # Simulate async operation with QTimer
        QTimer.singleShot(1000, lambda: self.process_promo_code(code))

    def process_promo_code(self, code):
        """Process promo code redemption"""
        # Mock redemption results for demonstration
        mock_results = {
            "WELCOME10": {
                "valid": True,
                "type": "usage_boost",
                "bonus_uses": 10,
                "description": "Welcome bonus: 10 free invocations"
            },
            "BOOST5": {
                "valid": True,
                "type": "usage_boost",
                "bonus_uses": 5,
                "description": "Usage boost: 5 bonus invocations"
            },
            "SILVER2024": {
                "valid": True,
                "type": "tier_upgrade",
                "tier_upgrade": "Silver",
                "description": "Upgraded to Silver tier with special discount"
            },
            "NEWUSER": {
                "valid": True,
                "type": "tier_upgrade",
                "tier_upgrade": "Trial",
                "description": "New user special: 9-day trial access"
            },
            "ORACLE2024": {
                "valid": True,
                "type": "avatar_unlock",
                "avatar_unlock": "Cosmic_Oracle",
                "description": "Unlocked Cosmic Oracle avatar"
            }
        }

        result = mock_results.get(code, {
            "valid": False,
            "reason": "Invalid or expired promo code"
        })

        if result.get('valid'):
            # Apply the promo benefits
            self.apply_promo_benefits(result)
            self.show_status(f"✅ {result['description']}", "success")
            self.promo_input.clear()

            # Update benefits display
            self.update_benefits_display(result)

            # Emit signal for main window updates
            self.promo_redeemed.emit(result)

        else:
            reason = result.get('reason', 'Unknown error')
            self.show_status(f"❌ {reason}", "error")

        self.redeem_button.setText("🔮 REDEEM")
        self.redeem_button.setEnabled(True)

    def apply_promo_benefits(self, result):
        """Apply promo code benefits to user account"""
        if result.get('tier_upgrade'):
            # Update main window tier
            self.main_window.upgrade_tier(result['tier_upgrade'])

        elif result.get('bonus_uses'):
            # Add bonus uses (mock implementation)
            bonus = result['bonus_uses']
            self.main_window.add_bonus_uses(bonus)

        elif result.get('avatar_unlock'):
            # Unlock avatar
            avatar = result['avatar_unlock']
            self.main_window.unlock_avatar(avatar)

    def update_benefits_display(self, result):
        """Update the benefits display"""
        benefit_text = f"🎁 Active: {result['description']}"
        self.benefits_label.setText(benefit_text)
        self.benefits_label.setStyleSheet("""
            QLabel {
                color: #28A745;
                font-weight: bold;
                font-size: 12px;
            }
        """)

    def show_status(self, message: str, status_type: str = "info"):
        """Show status message with enhanced styling"""
        colors = {
            "success": "#28A745",
            "error": "#DC3545", 
            "warning": "#FFC107",
            "info": "#4A90E2"
        }

        bg_colors = {
            "success": "rgba(40, 167, 69, 0.1)",
            "error": "rgba(220, 53, 69, 0.1)", 
            "warning": "rgba(255, 193, 7, 0.1)",
            "info": "rgba(74, 144, 226, 0.1)"
        }

        color = colors.get(status_type, colors["info"])
        bg_color = bg_colors.get(status_type, bg_colors["info"])

        self.status_label.setText(message)
        self.status_label.setStyleSheet(f"""
            QLabel {{
                color: {color};
                background-color: {bg_color};
                font-weight: bold;
                margin: 5px;
                padding: 8px;
                border-radius: 5px;
                border: 1px solid {color};
            }}
        """)

        # Auto-clear status after 5 seconds for non-success messages
        if status_type != "success":
            QTimer.singleShot(5000, self.clear_status)

    def clear_status(self):
        """Clear status message"""
        self.status_label.setText("✨ Enter a promo code to unlock divine benefits")
        self.status_label.setStyleSheet("""
            QLabel {
                color: #888;
                font-style: italic;
                margin: 5px;
                padding: 5px;
                border-radius: 3px;
            }
        """)

    def load_user_specific_promos(self):
        """Load promotions specific to user's tier and activity"""
        # Check for automatic promotions
        user_data = {
            'usage_count': self.main_window.get_user_usage_count(),
            'tier': self.main_window.current_tier
        }

        auto_promo = self.promo_manager.check_automatic_promotions(user_data)
        if auto_promo:
            # Show notification
            QTimer.singleShot(2000, lambda: self.show_auto_promo_notification(auto_promo))

    def show_auto_promo_notification(self, promo_info):
        """Show automatic promotion notification"""
        msg = QMessageBox(self)
        msg.setWindowTitle("🎁 Special Offer!")
        msg.setText(promo_info['message'])
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
            }
        """)
        msg.show()

class MainWindow(QMainWindow):
    """🏛️ Enhanced Main Sanctum with Full Promo Integration"""

    def __init__(self):
        super().__init__()
        self.config = OracleConfig()
        self.hybrid_engine = HybridEngineCore()
        self.supabase_client = SupabaseClient()
        self.payment_gateway = PaymentGateway()

        # User state
        self.current_user = None
        self.current_tier = "Bronze"
        self.current_avatar = "Valkarion"
        self.bonus_uses = 0  # Track bonus uses from promos
        self.active_promotions = []  # Track active user promotions

        # Initialize promo system
        self.promo_manager = None  # Will be initialized after UI

        self.init_ui()
        self.init_connections()
        self.setup_promo_integration()

    def init_ui(self):
        """Initialize the enhanced sacred interface"""
        self.setWindowTitle(f"🔱 {self.config.APP_NAME}")
        self.setMinimumSize(1400, 900)  # Increased size for promo features

        # Apply dark theme
        self.apply_dark_theme()

        # Central widget
        central_widget = QWidget()
        self.setCentralWidget(central_widget)

        # Main layout
        main_layout = QVBoxLayout(central_widget)

        # Header section
        header_layout = self.create_header_section()
        main_layout.addLayout(header_layout)

        # Content section with promo integration
        content_layout = self.create_enhanced_content_section()
        main_layout.addLayout(content_layout)

        # Footer section
        footer_layout = self.create_footer_section()
        main_layout.addLayout(footer_layout)

    def create_enhanced_content_section(self):
        """Create enhanced content area with promo integration"""
        content_layout = QHBoxLayout()

        # Left panel - Main actions with promo integration
        left_panel = self.create_action_panel()
        content_layout.addWidget(left_panel, 2)

        # Center panel - Results
        center_panel = self.create_results_panel()
        content_layout.addWidget(center_panel, 3)

        # Right panel - Promo codes and tier info
        right_panel = self.create_promo_panel()
        content_layout.addWidget(right_panel, 2)

        return content_layout

    def create_promo_panel(self):
        """Create dedicated promo panel"""
        panel = QGroupBox("🎟️ Sacred Promotions")
        panel.setStyleSheet("""
            QGroupBox {
                font-size: 16px;
                font-weight: bold;
                color: #4A90E2;
                border: 2px solid #4A90E2;
                border-radius: 10px;
                margin-top: 10px;
                padding-top: 10px;
            }
            QGroupBox::title {
                subcontrol-origin: margin;
                left: 10px;
                padding: 0 5px 0 5px;
            }
        """)

        layout = QVBoxLayout(panel)

        # Integrated promo widget
        self.promo_widget = PromoCodeIntegratedWidget(self)
        layout.addWidget(self.promo_widget)

        # Tier upgrade section
        upgrade_section = self.create_tier_upgrade_section()
        layout.addWidget(upgrade_section)

        # Admin panel button (for development/admin users)
        admin_button = QPushButton("👑 Admin Panel")
        admin_button.setStyleSheet("""
            QPushButton {
                background-color: #FFD700;
                color: #000;
                border: none;
                border-radius: 5px;
                padding: 8px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: #FFC107;
            }
        """)
        admin_button.clicked.connect(self.show_admin_panel)
        layout.addWidget(admin_button)

        return panel

    def create_tier_upgrade_section(self):
        """Create tier upgrade promotion section"""
        upgrade_frame = QFrame()
        upgrade_frame.setFrameStyle(QFrame.StyledPanel)
        upgrade_frame.setStyleSheet("""
            QFrame {
                background-color: #2A2A2A;
                border: 1px solid #FFD700;
                border-radius: 8px;
                padding: 5px;
            }
        """)

        layout = QVBoxLayout(upgrade_frame)

        # Current tier display
        tier_label = QLabel(f"Current Tier: {self.current_tier}")
        tier_label.setStyleSheet("""
            QLabel {
                font-weight: bold;
                color: #FFD700;
                font-size: 14px;
            }
        """)
        layout.addWidget(tier_label)

        # Upgrade benefits
        if self.current_tier == "Bronze":
            benefits_text = "🥈 Upgrade to Silver:\n• 30 uses per month\n• No ads\n• Priority support"
        elif self.current_tier == "Silver":
            benefits_text = "🥇 Upgrade to Gold:\n• Unlimited uses\n• All features\n• Premium avatars"
        else:
            benefits_text = "👑 You have the highest tier!"

        benefits_label = QLabel(benefits_text)
        benefits_label.setStyleSheet("QLabel { color: #CCC; font-size: 12px; }")
        layout.addWidget(benefits_label)

        # Quick upgrade with promo
        if self.current_tier != "Gold":
            upgrade_btn = QPushButton("🚀 Quick Upgrade")
            upgrade_btn.setStyleSheet("""
                QPushButton {
                    background-color: #28A745;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 8px;
                    font-weight: bold;
                }
                QPushButton:hover {
                    background-color: #218838;
                }
            """)
            upgrade_btn.clicked.connect(self.show_upgrade_options)
            layout.addWidget(upgrade_btn)

        return upgrade_frame

    def setup_promo_integration(self):
        """Setup promo system integration"""
        self.promo_manager = PromoCodeManager(self)

        # Connect promo widget signals
        if hasattr(self, 'promo_widget'):
            self.promo_widget.promo_redeemed.connect(self.handle_promo_redemption)

    def handle_promo_redemption(self, promo_result):
        """Handle successful promo code redemption"""
        # Update UI based on promo type
        if promo_result.get('tier_upgrade'):
            self.upgrade_tier(promo_result['tier_upgrade'])
        elif promo_result.get('bonus_uses'):
            self.add_bonus_uses(promo_result['bonus_uses'])
        elif promo_result.get('avatar_unlock'):
            self.unlock_avatar(promo_result['avatar_unlock'])

        # Show celebration
        self.show_promo_celebration(promo_result)

    def upgrade_tier(self, new_tier):
        """Upgrade user tier with celebration"""
        old_tier = self.current_tier
        self.current_tier = new_tier

        # Update tier badge
        if hasattr(self, 'tier_badge'):
            self.tier_badge.update_tier(new_tier)

        # Update tier visibility
        self.update_tier_visibility()

        # Update tier display in promo panel
        self.update_tier_display()

        # Log the upgrade
        print(f"✨ Tier upgraded: {old_tier} → {new_tier}")

    def add_bonus_uses(self, bonus_amount):
        """Add bonus uses from promo codes"""
        self.bonus_uses += bonus_amount
        self.update_usage_display()
        print(f"⚡ Added {bonus_amount} bonus uses. Total bonus: {self.bonus_uses}")

    def unlock_avatar(self, avatar_name):
        """Unlock new avatar"""
        self.current_avatar = avatar_name
        if hasattr(self, 'avatar_display'):
            # Update avatar display
            pass
        print(f"🧙‍♂️ Avatar unlocked: {avatar_name}")

    def show_promo_celebration(self, promo_result):
        """Show promo redemption celebration"""
        celebration = QMessageBox(self)
        celebration.setWindowTitle("🎉 Promo Redeemed!")

        message = f"✨ {promo_result['description']}\n\n"
        if promo_result.get('tier_upgrade'):
            message += f"🎖️ Welcome to {promo_result['tier_upgrade']} tier!"
        elif promo_result.get('bonus_uses'):
            message += f"⚡ You received {promo_result['bonus_uses']} bonus invocations!"
        elif promo_result.get('avatar_unlock'):
            message += f"🧙‍♂️ {promo_result['avatar_unlock']} avatar is now yours!"

        celebration.setText(message)
        celebration.setIcon(QMessageBox.Information)
        celebration.setStyleSheet("""
            QMessageBox {
                background-color: #2A2A2A;
                color: white;
            }
            QMessageBox QPushButton {
                background-color: #28A745;
                color: white;
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                font-weight: bold;
            }
            QMessageBox QPushButton:hover {
                background-color: #218838;
            }
        """)

        celebration.exec_()

    def show_admin_panel(self):
        """Show admin promo management panel"""
        if hasattr(self, 'promo_manager'):
            self.promo_manager.show_admin_panel()

    def show_upgrade_options(self):
        """Show tier upgrade options"""
        dialog = QMessageBox(self)
        dialog.setWindowTitle("🚀 Tier Upgrade Options")
        dialog.setText("""
Choose your upgrade path:

🎟️ Use Promo Code: SILVER2024 (50% off)
💳 Full Payment: Standard pricing
🎁 Special Offers: Check available promotions

Would you like to enter a promo code first?
        """)

        dialog.addButton("🎟️ Use Promo", QMessageBox.AcceptRole)
        dialog.addButton("💳 Pay Full", QMessageBox.RejectRole)
        dialog.addButton("❌ Cancel", QMessageBox.RejectRole)

        dialog.setStyleSheet("""
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
                margin: 2px;
            }
        """)

        result = dialog.exec_()
        if result == QMessageBox.AcceptRole:
            # Focus on promo input
            if hasattr(self, 'promo_widget'):
                self.promo_widget.promo_input.setFocus()

    def get_user_usage_count(self):
        """Get current user usage count"""
        # Mock implementation - would fetch from database
        return 25

    def update_tier_display(self):
        """Update tier display in promo panel"""
        # This would update the tier display in the promo panel
        pass

    def update_tier_visibility(self):
        """Update UI elements based on current tier"""
        limits = enforce_tier_limits(self.current_tier)

        # Show/hide ads based on tier
        if hasattr(self, 'ads_group'):
            if limits['ads']:
                self.ads_group.show()
            else:
                self.ads_group.hide()

    def update_usage_display(self):
        """Update usage statistics display"""
        limits = enforce_tier_limits(self.current_tier)
        base_uses = limits.get('uses_per_day', limits.get('uses_per_month', 'Unlimited'))

        if self.bonus_uses > 0:
            usage_text = f"Usage: 0/{base_uses} + {self.bonus_uses} bonus"
        else:
            usage_text = f"Usage: 0/{base_uses}"

        if hasattr(self, 'usage_label'):
            self.usage_label.setText(usage_text)

    # ... (rest of the MainWindow methods remain the same as in the original)

    def create_header_section(self):
        """Create the sacred header with tier badge and avatar"""
        header_layout = QHBoxLayout()

        # Left side - Enhanced tier badge
        self.tier_badge = TierBadge(self.current_tier)
        header_layout.addWidget(self.tier_badge)

        # Center - Title with promo indicator
        title_section = QVBoxLayout()

        title_label = QLabel(f"🔱 {self.config.APP_NAME}")
        title_label.setStyleSheet("""
            QLabel {
                font-size: 24px;
                font-weight: bold;
                color: #4A90E2;
                margin: 5px;
            }
        """)
        title_label.setAlignment(Qt.AlignCenter)

        # Promo indicator
        self.promo_indicator = QLabel("🎁 Promo codes available!")
        self.promo_indicator.setStyleSheet("""
            QLabel {
                color: #FFD700;
                font-size: 12px;
                font-style: italic;
            }
        """)
        self.promo_indicator.setAlignment(Qt.AlignCenter)

        title_section.addWidget(title_label)
        title_section.addWidget(self.promo_indicator)

        header_layout.addLayout(title_section)

        # Right side - Avatar and user actions (keep original implementation)
        # ... (rest of header creation remains the same)

        return header_layout

    # ... (rest of the methods remain the same but with promo integration)

def run_oracle_gui():
    """🌟 Enhanced application entry point with promo system"""
    app = QApplication(sys.argv)

    # Set application properties
    app.setApplicationName("Script Oracle - Divine Debugger")
    app.setOrganizationName("Oracle Systems")
    app.setApplicationVersion("1.0.0")

    # Create and show main window with promo integration
    window = MainWindow()
    window.show()

    # Show welcome message with promo info
    QTimer.singleShot(1000, lambda: show_welcome_with_promos(window))

    return app.exec_()

def show_welcome_with_promos(main_window):
    """Show welcome message with available promos"""
    welcome = QMessageBox(main_window)
    welcome.setWindowTitle("🔱 Welcome to Script Oracle!")
    welcome.setText("""
Welcome, Sacred Developer! 

🎁 Special launch promotions available:
• WELCOME10 - 10 bonus invocations
• NEWUSER - Free trial upgrade  
• BOOST5 - 5 extra uses

Enter these codes in the Promo panel to unlock divine benefits!
    """)
    welcome.setIcon(QMessageBox.Information)
    welcome.setStyleSheet("""
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
        }
    """)
    welcome.show()

if __name__ == "__main__":
    run_oracle_gui()
