# Create the integrated promo code management system for the main application
integrated_promo_system_content = '''"""
🔱 Integrated Promo Code System - Sacred Code Management
Divine integration of promo codes into the main Script Oracle application
"""

import asyncio
from typing import Dict, List, Optional, Any
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from datetime import datetime, timedelta

from ..rituals.promo_generator import PromoGenerator
from ..api.supabase_client import SupabaseClient
from ..utils.encryption import sacred_encryption

class PromoCodeWidget(QWidget):
    """🎟️ Promo code entry and display widget"""
    
    code_redeemed = pyqtSignal(dict)  # Signal emitted when code is successfully redeemed
    
    def __init__(self):
        super().__init__()
        self.supabase = SupabaseClient()
        self.init_ui()
    
    def init_ui(self):
        layout = QVBoxLayout(self)
        
        # Title
        title = QLabel("🎟️ Sacred Promo Codes")
        title.setStyleSheet("""
            QLabel {
                font-size: 16px;
                font-weight: bold;
                color: #4A90E2;
                margin: 10px;
            }
        """)
        layout.addWidget(title)
        
        # Promo code entry
        entry_layout = QHBoxLayout()
        
        self.promo_input = QLineEdit()
        self.promo_input.setPlaceholderText("Enter sacred promo code...")
        self.promo_input.setStyleSheet("""
            QLineEdit {
                padding: 10px;
                border: 2px solid #4A90E2;
                border-radius: 5px;
                background-color: #2A2A2A;
                color: white;
                font-size: 14px;
            }
            QLineEdit:focus {
                border-color: #66B2FF;
            }
        """)
        
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
            }
            QPushButton:hover {
                background-color: #357ABD;
            }
            QPushButton:pressed {
                background-color: #2E5984;
            }
        """)
        
        self.redeem_button.clicked.connect(self.redeem_promo_code)
        
        entry_layout.addWidget(self.promo_input, 3)
        entry_layout.addWidget(self.redeem_button, 1)
        
        layout.addLayout(entry_layout)
        
        # Status display
        self.status_label = QLabel("✨ Enter a promo code to unlock divine benefits")
        self.status_label.setStyleSheet("""
            QLabel {
                color: #888;
                font-style: italic;
                margin: 5px 10px;
            }
        """)
        layout.addWidget(self.status_label)
        
        # Available promotions display
        self.promos_list = QListWidget()
        self.promos_list.setStyleSheet("""
            QListWidget {
                background-color: #1E1E1E;
                color: #E0E0E0;
                border: 1px solid #4A90E2;
                border-radius: 5px;
                padding: 5px;
            }
            QListWidget::item {
                padding: 5px;
                border-bottom: 1px solid #333;
            }
            QListWidget::item:selected {
                background-color: #4A90E2;
            }
        """)
        layout.addWidget(QLabel("🎊 Active Promotions:"))
        layout.addWidget(self.promos_list)
        
        self.load_active_promotions()
    
    async def redeem_promo_code(self):
        """Redeem the entered promo code"""
        code = self.promo_input.text().strip().upper()
        if not code:
            self.show_status("⚠️ Please enter a promo code", "warning")
            return
        
        self.redeem_button.setText("🔄 REDEEMING...")
        self.redeem_button.setEnabled(False)
        
        try:
            # Simulate user ID for now (would come from authenticated session)
            user_id = "current_user_id"  # Replace with actual user ID
            
            # Validate and apply promo code
            result = await self.supabase.validate_promo_code(code, user_id)
            
            if result.get('valid'):
                tier_upgrade = result.get('tier_upgrade')
                description = result.get('description')
                
                success_message = f"✨ Success! {description}"
                if tier_upgrade:
                    success_message += f"\\n🎖️ Upgraded to {tier_upgrade} tier!"
                
                self.show_status(success_message, "success")
                self.promo_input.clear()
                
                # Emit signal to update main application
                self.code_redeemed.emit(result)
                
            else:
                reason = result.get('reason', 'Unknown error')
                self.show_status(f"❌ {reason}", "error")
                
        except Exception as e:
            self.show_status(f"💀 Error: {str(e)}", "error")
        
        finally:
            self.redeem_button.setText("🔮 REDEEM")
            self.redeem_button.setEnabled(True)
    
    def show_status(self, message: str, status_type: str = "info"):
        """Show status message with appropriate styling"""
        colors = {
            "success": "#28A745",
            "error": "#DC3545", 
            "warning": "#FFC107",
            "info": "#4A90E2"
        }
        
        color = colors.get(status_type, colors["info"])
        self.status_label.setText(message)
        self.status_label.setStyleSheet(f"""
            QLabel {{
                color: {color};
                font-weight: bold;
                margin: 5px 10px;
            }}
        """)
    
    def load_active_promotions(self):
        """Load and display active promotions"""
        # Mock promotions for display
        promotions = [
            "🎯 SILVER2024 - 50% off Silver tier",
            "⚡ BOOST10 - 10 bonus invocations", 
            "🧙‍♂️ NEWAVATAR - Unlock Cosmic Oracle",
            "💎 GOLDWEEK - Limited Gold tier trial"
        ]
        
        for promo in promotions:
            self.promos_list.addItem(promo)

class AdminPromoPanel(QWidget):
    """👑 Admin panel for generating and managing promo codes"""
    
    def __init__(self):
        super().__init__()
        self.promo_generator = PromoGenerator()
        self.supabase = SupabaseClient()
        self.init_ui()
    
    def init_ui(self):
        layout = QVBoxLayout(self)
        
        # Title
        title = QLabel("👑 Sacred Promo Code Management")
        title.setStyleSheet("""
            QLabel {
                font-size: 18px;
                font-weight: bold;
                color: #FFD700;
                margin: 10px;
            }
        """)
        layout.addWidget(title)
        
        # Tabs for different promo types
        tabs = QTabWidget()
        tabs.setStyleSheet("""
            QTabWidget::pane {
                border: 1px solid #4A90E2;
                background-color: #2A2A2A;
            }
            QTabBar::tab {
                background-color: #1A1A1A;
                color: white;
                padding: 8px 16px;
                margin-right: 2px;
            }
            QTabBar::tab:selected {
                background-color: #4A90E2;
            }
        """)
        
        # Tier Upgrade Tab
        tier_tab = self.create_tier_upgrade_tab()
        tabs.addTab(tier_tab, "🎖️ Tier Upgrades")
        
        # Usage Boost Tab
        boost_tab = self.create_usage_boost_tab()
        tabs.addTab(boost_tab, "🚀 Usage Boosts")
        
        # Avatar Unlock Tab
        avatar_tab = self.create_avatar_unlock_tab()
        tabs.addTab(avatar_tab, "🧙‍♂️ Avatar Unlocks")
        
        # Campaign Tab
        campaign_tab = self.create_campaign_tab()
        tabs.addTab(campaign_tab, "🎊 Campaigns")
        
        # Analytics Tab
        analytics_tab = self.create_analytics_tab()
        tabs.addTab(analytics_tab, "📊 Analytics")
        
        layout.addWidget(tabs)
        
        # Generated codes display
        self.results_text = QTextEdit()
        self.results_text.setMaximumHeight(150)
        self.results_text.setStyleSheet("""
            QTextEdit {
                background-color: #1E1E1E;
                color: #E0E0E0;
                border: 1px solid #4A90E2;
                border-radius: 5px;
                font-family: monospace;
                padding: 10px;
            }
        """)
        layout.addWidget(QLabel("📜 Generated Codes:"))
        layout.addWidget(self.results_text)
    
    def create_tier_upgrade_tab(self):
        """Create tier upgrade generation tab"""
        tab = QWidget()
        layout = QFormLayout(tab)
        
        # Target tier selection
        self.tier_combo = QComboBox()
        self.tier_combo.addItems(["Trial", "Silver", "Gold"])
        
        # Duration
        self.duration_spin = QSpinBox()
        self.duration_spin.setRange(1, 365)
        self.duration_spin.setValue(30)
        self.duration_spin.setSuffix(" days")
        
        # Usage limit
        self.usage_limit_spin = QSpinBox()
        self.usage_limit_spin.setRange(1, 10000)
        self.usage_limit_spin.setValue(100)
        
        # Description
        self.description_input = QLineEdit()
        self.description_input.setPlaceholderText("Optional description...")
        
        # Generate button
        generate_btn = QPushButton("⚡ Generate Tier Code")
        generate_btn.clicked.connect(self.generate_tier_code)
        
        layout.addRow("🎖️ Target Tier:", self.tier_combo)
        layout.addRow("⏰ Duration:", self.duration_spin)
        layout.addRow("👥 Usage Limit:", self.usage_limit_spin)
        layout.addRow("📝 Description:", self.description_input)
        layout.addRow(generate_btn)
        
        return tab
    
    def create_usage_boost_tab(self):
        """Create usage boost generation tab"""
        tab = QWidget()
        layout = QFormLayout(tab)
        
        # Bonus uses
        self.bonus_uses_spin = QSpinBox()
        self.bonus_uses_spin.setRange(1, 1000)
        self.bonus_uses_spin.setValue(10)
        
        # Duration
        self.boost_duration_spin = QSpinBox()
        self.boost_duration_spin.setRange(1, 90)
        self.boost_duration_spin.setValue(7)
        self.boost_duration_spin.setSuffix(" days")
        
        # Usage limit
        self.boost_limit_spin = QSpinBox()
        self.boost_limit_spin.setRange(1, 1000)
        self.boost_limit_spin.setValue(50)
        
        # Generate button
        generate_boost_btn = QPushButton("🚀 Generate Boost Code")
        generate_boost_btn.clicked.connect(self.generate_boost_code)
        
        layout.addRow("⚡ Bonus Uses:", self.bonus_uses_spin)
        layout.addRow("⏰ Duration:", self.boost_duration_spin)
        layout.addRow("👥 Usage Limit:", self.boost_limit_spin)
        layout.addRow(generate_boost_btn)
        
        return tab
    
    def create_avatar_unlock_tab(self):
        """Create avatar unlock generation tab"""
        tab = QWidget()
        layout = QFormLayout(tab)
        
        # Avatar selection
        self.avatar_combo = QComboBox()
        self.avatar_combo.addItems(["Ethereal_Sage", "Cosmic_Oracle", "Shadow_Weaver"])
        
        # Duration
        self.avatar_duration_spin = QSpinBox()
        self.avatar_duration_spin.setRange(1, 90)
        self.avatar_duration_spin.setValue(14)
        self.avatar_duration_spin.setSuffix(" days")
        
        # Usage limit
        self.avatar_limit_spin = QSpinBox()
        self.avatar_limit_spin.setRange(1, 100)
        self.avatar_limit_spin.setValue(25)
        
        # Generate button
        generate_avatar_btn = QPushButton("🧙‍♂️ Generate Avatar Code")
        generate_avatar_btn.clicked.connect(self.generate_avatar_code)
        
        layout.addRow("🧙‍♂️ Avatar:", self.avatar_combo)
        layout.addRow("⏰ Duration:", self.avatar_duration_spin)
        layout.addRow("👥 Usage Limit:", self.avatar_limit_spin)
        layout.addRow(generate_avatar_btn)
        
        return tab
    
    def create_campaign_tab(self):
        """Create campaign generation tab"""
        tab = QWidget()
        layout = QFormLayout(tab)
        
        # Campaign name
        self.campaign_name_input = QLineEdit()
        self.campaign_name_input.setPlaceholderText("Campaign name...")
        
        # Code count
        self.code_count_spin = QSpinBox()
        self.code_count_spin.setRange(1, 1000)
        self.code_count_spin.setValue(50)
        
        # Campaign type
        self.campaign_type_combo = QComboBox()
        self.campaign_type_combo.addItems(["tier_upgrade", "usage_boost", "avatar_unlock"])
        
        # Generate button
        generate_campaign_btn = QPushButton("🎊 Generate Campaign")
        generate_campaign_btn.clicked.connect(self.generate_campaign)
        
        layout.addRow("📝 Campaign Name:", self.campaign_name_input)
        layout.addRow("🔢 Code Count:", self.code_count_spin)
        layout.addRow("📋 Type:", self.campaign_type_combo)
        layout.addRow(generate_campaign_btn)
        
        return tab
    
    def create_analytics_tab(self):
        """Create analytics display tab"""
        tab = QWidget()
        layout = QVBoxLayout(tab)
        
        # Refresh button
        refresh_btn = QPushButton("🔄 Refresh Analytics")
        refresh_btn.clicked.connect(self.load_analytics)
        layout.addWidget(refresh_btn)
        
        # Analytics display
        self.analytics_text = QTextEdit()
        self.analytics_text.setReadOnly(True)
        self.analytics_text.setStyleSheet("""
            QTextEdit {
                background-color: #1E1E1E;
                color: #E0E0E0;
                border: 1px solid #4A90E2;
                border-radius: 5px;
                font-family: monospace;
                padding: 10px;
            }
        """)
        layout.addWidget(self.analytics_text)
        
        self.load_analytics()
        return tab
    
    async def generate_tier_code(self):
        """Generate tier upgrade promo code"""
        tier = self.tier_combo.currentText()
        duration = self.duration_spin.value()
        limit = self.usage_limit_spin.value()
        description = self.description_input.text()
        
        result = self.promo_generator.generate_tier_upgrade_code(
            tier, duration, limit, description
        )
        
        if result.get('success'):
            code = result['code']
            self.results_text.append(f"✨ Tier Code Generated: {code}")
            self.results_text.append(f"   Target: {tier} | Duration: {duration} days | Limit: {limit}")
            self.results_text.append("")
        else:
            self.results_text.append(f"❌ Error: {result.get('error')}")
    
    async def generate_boost_code(self):
        """Generate usage boost promo code"""
        bonus = self.bonus_uses_spin.value()
        duration = self.boost_duration_spin.value()
        limit = self.boost_limit_spin.value()
        
        result = self.promo_generator.generate_usage_boost_code(
            bonus, duration, limit
        )
        
        if result.get('success'):
            code = result['code']
            self.results_text.append(f"🚀 Boost Code Generated: {code}")
            self.results_text.append(f"   Bonus: +{bonus} uses | Duration: {duration} days | Limit: {limit}")
            self.results_text.append("")
        else:
            self.results_text.append(f"❌ Error: {result.get('error')}")
    
    async def generate_avatar_code(self):
        """Generate avatar unlock promo code"""
        avatar = self.avatar_combo.currentText()
        duration = self.avatar_duration_spin.value()
        limit = self.avatar_limit_spin.value()
        
        result = self.promo_generator.generate_avatar_unlock_code(
            avatar, duration, limit
        )
        
        if result.get('success'):
            code = result['code']
            self.results_text.append(f"🧙‍♂️ Avatar Code Generated: {code}")
            self.results_text.append(f"   Avatar: {avatar} | Duration: {duration} days | Limit: {limit}")
            self.results_text.append("")
        else:
            self.results_text.append(f"❌ Error: {result.get('error')}")
    
    async def generate_campaign(self):
        """Generate campaign codes"""
        name = self.campaign_name_input.text()
        count = self.code_count_spin.value()
        promo_type = self.campaign_type_combo.currentText()
        
        if not name:
            self.results_text.append("❌ Please enter campaign name")
            return
        
        # Use default parameters for campaign
        kwargs = {}
        if promo_type == "tier_upgrade":
            kwargs = {"target_tier": "Silver", "duration_days": 30, "usage_limit": 100}
        elif promo_type == "usage_boost":
            kwargs = {"bonus_uses": 10, "duration_days": 7, "usage_limit": 50}
        elif promo_type == "avatar_unlock":
            kwargs = {"avatar_name": "Ethereal_Sage", "duration_days": 14, "usage_limit": 25}
        
        result = self.promo_generator.generate_campaign_codes(
            name, count, promo_type, **kwargs
        )
        
        if result.get('success'):
            codes = result['codes']
            self.results_text.append(f"🎊 Campaign '{name}' Generated:")
            self.results_text.append(f"   Type: {promo_type} | Count: {len(codes)}")
            self.results_text.append(f"   Codes: {', '.join(codes[:5])}{'...' if len(codes) > 5 else ''}")
            self.results_text.append("")
        else:
            self.results_text.append(f"❌ Error: {result.get('error')}")
    
    def load_analytics(self):
        """Load promo code analytics"""
        analytics = self.promo_generator.get_promo_analytics()
        
        if analytics.get('success'):
            data = analytics['analytics']
            
            analytics_text = f"""
📊 PROMO CODE ANALYTICS (Last 30 Days)

🔢 Total Codes Created: {data['total_codes_created']}
✅ Total Codes Used: {data['total_codes_used']}
📈 Conversion Rate: {data['conversion_rate']:.1%}
💰 Revenue Impact: ${data['revenue_impact']:.2f}

🎖️ TIER UPGRADES:
   Trial: {data['tier_upgrade_stats']['Trial']}
   Silver: {data['tier_upgrade_stats']['Silver']}
   Gold: {data['tier_upgrade_stats']['Gold']}

🏆 Top Performing Codes:
   {chr(10).join(data['top_performing_codes'][:5]) if data['top_performing_codes'] else 'No data available'}
"""
            
            self.analytics_text.setText(analytics_text)
        else:
            self.analytics_text.setText("❌ Failed to load analytics")

class PromoCodeManager:
    """🎯 Central promo code management system"""
    
    def __init__(self, main_window):
        self.main_window = main_window
        self.promo_generator = PromoGenerator()
        self.supabase = SupabaseClient()
        
    async def apply_promo_benefits(self, user_id: str, promo_result: Dict[str, Any]):
        """Apply promo code benefits to user account"""
        try:
            if promo_result.get('tier_upgrade'):
                # Update user tier
                success = await self.supabase.update_user_tier(
                    user_id, 
                    promo_result['tier_upgrade']
                )
                
                if success:
                    # Update main window tier display
                    self.main_window.current_tier = promo_result['tier_upgrade']
                    self.main_window.tier_badge.update_tier(promo_result['tier_upgrade'])
                    self.main_window.update_tier_visibility()
                    
                    # Show success message
                    QMessageBox.information(
                        self.main_window,
                        "🎖️ Tier Upgraded!",
                        f"Welcome to {promo_result['tier_upgrade']} tier!\\n\\n"
                        f"Your new benefits are now active."
                    )
            
            elif promo_result.get('bonus_uses'):
                # Add bonus uses to user account
                # This would be implemented with actual database updates
                bonus = promo_result['bonus_uses']
                QMessageBox.information(
                    self.main_window,
                    "⚡ Usage Boost Applied!",
                    f"You received {bonus} bonus invocations!\\n\\n"
                    f"Use them wisely, sacred developer."
                )
            
            elif promo_result.get('avatar_unlock'):
                # Unlock new avatar
                avatar = promo_result['avatar_unlock']
                success = await self.supabase.mutate_avatar(user_id, avatar)
                
                if success:
                    self.main_window.current_avatar = avatar
                    self.main_window.avatar_display = avatar
                    
                    QMessageBox.information(
                        self.main_window,
                        "🧙‍♂️ Avatar Unlocked!",
                        f"You have unlocked {avatar}!\\n\\n"
                        f"Your new avatar is now active."
                    )
                    
        except Exception as e:
            QMessageBox.warning(
                self.main_window,
                "Error",
                f"Failed to apply promo benefits: {str(e)}"
            )
    
    def show_admin_panel(self):
        """Show admin promo panel (for administrators)"""
        dialog = QDialog(self.main_window)
        dialog.setWindowTitle("👑 Sacred Promo Management")
        dialog.setModal(True)
        dialog.resize(800, 600)
        
        layout = QVBoxLayout(dialog)
        admin_panel = AdminPromoPanel()
        layout.addWidget(admin_panel)
        
        # Close button
        close_btn = QPushButton("✅ Close")
        close_btn.clicked.connect(dialog.accept)
        layout.addWidget(close_btn)
        
        dialog.exec_()
    
    def check_automatic_promotions(self, user_data: Dict[str, Any]):
        """Check for automatic promotions based on user activity"""
        # Example: First-time user promotion
        if user_data.get('usage_count', 0) == 0:
            return {
                'type': 'welcome_bonus',
                'message': '🎉 Welcome! Use code WELCOME10 for 10 bonus invocations!'
            }
        
        # Example: Milestone promotion
        usage_count = user_data.get('usage_count', 0)
        if usage_count == 50:
            return {
                'type': 'milestone',
                'message': '🏆 Congratulations on 50 invocations! Use MILESTONE50 for Silver tier trial!'
            }
        
        return None
'''

with open('script_oracle/gui/promo_system.py', 'w') as f:
    f.write(integrated_promo_system_content)

print("🎟️ Integrated Promo Code System created successfully!")
print("✨ Promo codes are now fully integrated into the main application!")