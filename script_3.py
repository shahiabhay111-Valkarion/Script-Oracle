# Create the GUI Sanctum (PyQt5 Interface)
gui_sanctum_content = '''"""
🔱 GUI Sanctum - Sacred PyQt5 Interface
The divine interface that binds user intentions with cosmic power
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

class TierBadge(QWidget):
    """Sacred tier badge display widget"""
    
    def __init__(self, tier: str = "Bronze"):
        super().__init__()
        self.tier = tier
        self.init_ui()
    
    def init_ui(self):
        layout = QHBoxLayout()
        
        # Tier colors
        colors = {
            "Bronze": "#CD7F32",
            "Trial": "#4A90E2", 
            "Silver": "#C0C0C0",
            "Gold": "#FFD700"
        }
        
        # Create badge
        self.badge_label = QLabel(f"🎖️ {self.tier}")
        self.badge_label.setStyleSheet(f"""
            QLabel {{
                background-color: {colors.get(self.tier, colors["Bronze"])};
                color: white;
                font-weight: bold;
                padding: 8px 15px;
                border-radius: 20px;
                border: 2px solid #444;
            }}
        """)
        
        layout.addWidget(self.badge_label)
        layout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(layout)
    
    def update_tier(self, new_tier: str):
        self.tier = new_tier
        self.init_ui()

class AvatarDisplay(QWidget):
    """Sacred avatar display widget"""
    
    def __init__(self, avatar_name: str = "Valkarion"):
        super().__init__()
        self.avatar_name = avatar_name
        self.init_ui()
    
    def init_ui(self):
        layout = QVBoxLayout()
        
        # Avatar image placeholder
        self.avatar_label = QLabel()
        self.avatar_label.setFixedSize(80, 80)
        self.avatar_label.setStyleSheet("""
            QLabel {
                border: 3px solid #4A90E2;
                border-radius: 40px;
                background-color: #2A2A2A;
                color: white;
                font-size: 24px;
            }
        """)
        self.avatar_label.setAlignment(Qt.AlignCenter)
        self.avatar_label.setText("🧙‍♂️")
        
        # Avatar name
        self.name_label = QLabel(self.avatar_name)
        self.name_label.setStyleSheet("""
            QLabel {
                color: #4A90E2;
                font-weight: bold;
                font-size: 12px;
            }
        """)
        self.name_label.setAlignment(Qt.AlignCenter)
        
        layout.addWidget(self.avatar_label)
        layout.addWidget(self.name_label)
        layout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(layout)

class ActionButton(QPushButton):
    """Sacred action button with ritual styling"""
    
    def __init__(self, text: str, icon: str = "⚡"):
        super().__init__(f"{icon} {text}")
        self.init_style()
    
    def init_style(self):
        self.setStyleSheet("""
            QPushButton {
                background-color: #4A90E2;
                color: white;
                border: 2px solid #357ABD;
                border-radius: 8px;
                padding: 12px 20px;
                font-size: 14px;
                font-weight: bold;
                min-width: 180px;
            }
            QPushButton:hover {
                background-color: #357ABD;
                border: 2px solid #4A90E2;
            }
            QPushButton:pressed {
                background-color: #2E5984;
            }
            QPushButton:disabled {
                background-color: #666;
                border: 2px solid #444;
                color: #999;
            }
        """)

class AdSenseWidget(QWebEngineView):
    """Sacred AdSense container for Bronze tier"""
    
    def __init__(self):
        super().__init__()
        self.init_adsense()
    
    def init_adsense(self):
        # Placeholder AdSense implementation
        html_content = """
        <div style="
            width: 320px; 
            height: 250px; 
            background: linear-gradient(45deg, #4A90E2, #357ABD);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: Arial;
            border-radius: 8px;
        ">
            <div style="text-align: center;">
                <h3>🎯 AdSense Space</h3>
                <p>Upgrade to remove ads</p>
            </div>
        </div>
        """
        self.setHtml(html_content)
        self.setFixedSize(320, 250)

class MainWindow(QMainWindow):
    """🏛️ The Sacred Main Sanctum - Primary GUI Container"""
    
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
        
        self.init_ui()
        self.init_connections()
    
    def init_ui(self):
        """Initialize the sacred interface"""
        self.setWindowTitle(f"🔱 {self.config.APP_NAME}")
        self.setMinimumSize(1200, 800)
        
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
        
        # Content section
        content_layout = self.create_content_section()
        main_layout.addLayout(content_layout)
        
        # Footer section
        footer_layout = self.create_footer_section()
        main_layout.addLayout(footer_layout)
    
    def create_header_section(self):
        """Create the sacred header with tier badge and avatar"""
        header_layout = QHBoxLayout()
        
        # Left side - Tier badge
        self.tier_badge = TierBadge(self.current_tier)
        header_layout.addWidget(self.tier_badge)
        
        # Center - Title
        title_label = QLabel(f"🔱 {self.config.APP_NAME}")
        title_label.setStyleSheet("""
            QLabel {
                font-size: 24px;
                font-weight: bold;
                color: #4A90E2;
                margin: 10px;
            }
        """)
        title_label.setAlignment(Qt.AlignCenter)
        header_layout.addWidget(title_label)
        
        # Right side - Avatar and user actions
        user_section = QHBoxLayout()
        
        self.avatar_display = AvatarDisplay(self.current_avatar)
        user_section.addWidget(self.avatar_display)
        
        # Login/Logout button
        self.auth_button = ActionButton("LOGIN", "🔐")
        self.auth_button.clicked.connect(self.toggle_auth)
        user_section.addWidget(self.auth_button)
        
        header_layout.addLayout(user_section)
        
        return header_layout
    
    def create_content_section(self):
        """Create the main content area"""
        content_layout = QHBoxLayout()
        
        # Left panel - Main actions
        left_panel = self.create_action_panel()
        content_layout.addWidget(left_panel, 2)
        
        # Right panel - Results and ads
        right_panel = self.create_results_panel()
        content_layout.addWidget(right_panel, 3)
        
        return content_layout
    
    def create_action_panel(self):
        """Create the sacred action panel"""
        panel = QGroupBox("🎯 Sacred Actions")
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
        
        # File upload section
        upload_section = QHBoxLayout()
        self.file_path_label = QLabel("No file selected")
        self.file_path_label.setStyleSheet("QLabel { color: #888; }")
        
        self.upload_button = ActionButton("UPLOAD FILE", "📁")
        self.upload_button.clicked.connect(self.upload_file)
        
        upload_section.addWidget(self.file_path_label, 2)
        upload_section.addWidget(self.upload_button, 1)
        layout.addLayout(upload_section)
        
        # Format selector
        format_layout = QHBoxLayout()
        format_layout.addWidget(QLabel("Format:"))
        
        self.format_combo = QComboBox()
        self.format_combo.addItems(["Python", "JavaScript"])
        self.format_combo.setStyleSheet("""
            QComboBox {
                padding: 8px;
                border: 2px solid #4A90E2;
                border-radius: 5px;
                background-color: #2A2A2A;
                color: white;
            }
        """)
        format_layout.addWidget(self.format_combo)
        layout.addLayout(format_layout)
        
        # Main action buttons
        self.optimize_button = ActionButton("OPTIMIZE SCRIPT+", "⚡")
        self.optimize_button.clicked.connect(self.optimize_script)
        layout.addWidget(self.optimize_button)
        
        self.cleanse_button = ActionButton("CLEANSE IMPORTS", "🔮")
        self.cleanse_button.clicked.connect(self.cleanse_imports)
        layout.addWidget(self.cleanse_button)
        
        self.inspect_button = ActionButton("INSPECT VARIABLES", "👁️")
        self.inspect_button.clicked.connect(self.inspect_variables)
        layout.addWidget(self.inspect_button)
        
        self.explain_button = ActionButton("EXPLAIN FIX", "🧙‍♂️")
        self.explain_button.clicked.connect(self.explain_fix)
        layout.addWidget(self.explain_button)
        
        # Promo code section
        promo_layout = QHBoxLayout()
        self.promo_input = QLineEdit()
        self.promo_input.setPlaceholderText("Enter promo code...")
        self.promo_input.setStyleSheet("""
            QLineEdit {
                padding: 8px;
                border: 2px solid #4A90E2;
                border-radius: 5px;
                background-color: #2A2A2A;
                color: white;
            }
        """)
        
        self.promo_button = ActionButton("REDEEM", "🎟️")
        self.promo_button.clicked.connect(self.redeem_promo)
        
        promo_layout.addWidget(self.promo_input)
        promo_layout.addWidget(self.promo_button)
        layout.addLayout(promo_layout)
        
        # Tier upgrade section
        upgrade_button = ActionButton("UPGRADE TIER", "💎")
        upgrade_button.clicked.connect(self.show_upgrade_panel)
        layout.addWidget(upgrade_button)
        
        return panel
    
    def create_results_panel(self):
        """Create the results and ads panel"""
        panel = QWidget()
        layout = QVBoxLayout(panel)
        
        # Results area
        results_group = QGroupBox("📜 Sacred Results")
        results_group.setStyleSheet("""
            QGroupBox {
                font-size: 16px;
                font-weight: bold;
                color: #4A90E2;
                border: 2px solid #4A90E2;
                border-radius: 10px;
                margin-top: 10px;
                padding-top: 10px;
            }
        """)
        
        results_layout = QVBoxLayout(results_group)
        
        self.results_text = QTextEdit()
        self.results_text.setStyleSheet("""
            QTextEdit {
                background-color: #1E1E1E;
                color: #E0E0E0;
                border: 1px solid #4A90E2;
                border-radius: 5px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                padding: 10px;
            }
        """)
        self.results_text.setText("✨ Awaiting your sacred invocation...")
        results_layout.addWidget(self.results_text)
        
        layout.addWidget(results_group, 3)
        
        # AdSense section (shown only for Bronze tier)
        self.ads_group = QGroupBox("🎯 Sponsored Content")
        self.ads_group.setStyleSheet("""
            QGroupBox {
                font-size: 14px;
                color: #888;
                border: 1px solid #666;
                border-radius: 5px;
                margin-top: 5px;
            }
        """)
        
        ads_layout = QVBoxLayout(self.ads_group)
        self.adsense_widget = AdSenseWidget()
        ads_layout.addWidget(self.adsense_widget)
        
        layout.addWidget(self.ads_group, 1)
        
        return panel
    
    def create_footer_section(self):
        """Create the footer status bar"""
        footer_layout = QHBoxLayout()
        
        self.status_label = QLabel("🔮 Ready for divine invocation")
        self.status_label.setStyleSheet("QLabel { color: #4A90E2; }")
        
        self.usage_label = QLabel("Usage: 0/5 daily")
        self.usage_label.setStyleSheet("QLabel { color: #888; }")
        
        footer_layout.addWidget(self.status_label)
        footer_layout.addStretch()
        footer_layout.addWidget(self.usage_label)
        
        return footer_layout
    
    def apply_dark_theme(self):
        """Apply the sacred dark theme"""
        self.setStyleSheet("""
            QMainWindow {
                background-color: #1A1A1A;
                color: #E0E0E0;
            }
            QWidget {
                background-color: #1A1A1A;
                color: #E0E0E0;
            }
            QMenuBar {
                background-color: #2A2A2A;
                color: #E0E0E0;
                border: 1px solid #4A90E2;
            }
            QMenuBar::item {
                background-color: transparent;
                padding: 4px 8px;
            }
            QMenuBar::item:selected {
                background-color: #4A90E2;
            }
        """)
    
    def init_connections(self):
        """Initialize signal connections"""
        # Timer for updating usage stats
        self.usage_timer = QTimer()
        self.usage_timer.timeout.connect(self.update_usage_display)
        self.usage_timer.start(60000)  # Update every minute
    
    # Action Methods
    def upload_file(self):
        """Handle file upload"""
        file_path, _ = QFileDialog.getOpenFileName(
            self,
            "Select Script File",
            "",
            "Python Files (*.py);;JavaScript Files (*.js);;All Files (*)"
        )
        
        if file_path:
            self.file_path_label.setText(Path(file_path).name)
            self.current_file_path = file_path
            self.results_text.append(f"📁 File loaded: {Path(file_path).name}")
    
    def optimize_script(self):
        """Sacred script optimization invocation"""
        self.perform_action("optimize", "⚡ OPTIMIZING SCRIPT...")
    
    def cleanse_imports(self):
        """Sacred import cleansing invocation"""
        self.perform_action("cleanse", "🔮 CLEANSING IMPORTS...")
    
    def inspect_variables(self):
        """Sacred variable inspection invocation"""
        self.perform_action("inspect", "👁️ INSPECTING VARIABLES...")
    
    def explain_fix(self):
        """Sacred explanation invocation"""
        self.perform_action("explain", "🧙‍♂️ SUMMONING WISDOM...")
    
    def perform_action(self, action_type: str, status_message: str):
        """Perform sacred action with the hybrid engine"""
        if not hasattr(self, 'current_file_path'):
            QMessageBox.warning(self, "No File", "Please upload a file first!")
            return
        
        # Check tier limits
        limits = enforce_tier_limits(self.current_tier)
        # TODO: Implement usage tracking
        
        self.status_label.setText(status_message)
        self.results_text.append(f"\\n{status_message}")
        
        # TODO: Implement async call to hybrid engine
        # For now, simulate processing
        QTimer.singleShot(2000, lambda: self.show_mock_result(action_type))
    
    def show_mock_result(self, action_type: str):
        """Show mock result (replace with real hybrid engine call)"""
        mock_results = {
            "optimize": "✨ Sacred optimization complete! Found 3 performance improvements.",
            "cleanse": "🔮 Import purification successful! Removed 2 unused imports.",
            "inspect": "👁️ Variable mysteries revealed! Found 1 scope optimization.",
            "explain": "🧙‍♂️ Divine wisdom dispensed! Code patterns explained."
        }
        
        result = mock_results.get(action_type, "Sacred invocation complete!")
        self.results_text.append(f"\\n{result}")
        self.status_label.setText("🔮 Ready for divine invocation")
    
    def redeem_promo(self):
        """Redeem promo code"""
        promo_code = self.promo_input.text().strip()
        if promo_code:
            # TODO: Implement promo validation
            QMessageBox.information(self, "Promo Code", f"Attempting to redeem: {promo_code}")
            self.promo_input.clear()
    
    def show_upgrade_panel(self):
        """Show tier upgrade panel"""
        # TODO: Implement upgrade dialog with PayPal integration
        QMessageBox.information(self, "Upgrade", "Tier upgrade panel coming soon!")
    
    def toggle_auth(self):
        """Handle login/logout"""
        if self.current_user:
            self.logout()
        else:
            self.show_login_dialog()
    
    def show_login_dialog(self):
        """Show login dialog"""
        # TODO: Implement login dialog
        QMessageBox.information(self, "Login", "Login dialog coming soon!")
    
    def logout(self):
        """Handle logout"""
        self.current_user = None
        self.current_tier = "Bronze"
        self.auth_button.setText("🔐 LOGIN")
        self.tier_badge.update_tier(self.current_tier)
    
    def update_usage_display(self):
        """Update usage statistics display"""
        # TODO: Fetch real usage from database
        self.usage_label.setText(f"Usage: 0/{enforce_tier_limits(self.current_tier)['uses_per_day']} daily")
    
    def update_tier_visibility(self):
        """Update UI elements based on current tier"""
        limits = enforce_tier_limits(self.current_tier)
        
        # Show/hide ads based on tier
        if limits['ads']:
            self.ads_group.show()
        else:
            self.ads_group.hide()

def run_oracle_gui():
    """🌟 Sacred application entry point"""
    app = QApplication(sys.argv)
    
    # Set application properties
    app.setApplicationName("Script Oracle - Divine Debugger")
    app.setOrganizationName("Oracle Systems")
    app.setApplicationVersion("1.0.0")
    
    # Create and show main window
    window = MainWindow()
    window.show()
    
    return app.exec_()

if __name__ == "__main__":
    run_oracle_gui()
'''

with open('script_oracle/gui/__init__.py', 'w') as f:
    pass

with open('script_oracle/gui/main_window.py', 'w') as f:
    f.write(gui_sanctum_content)

print("GUI Sanctum (PyQt5 Interface) created successfully!")