"""
🔱 Script Oracle - Divine Debugger Configuration
Sacred configuration module for the sovereign-grade AI architect.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class OracleConfig:
    """Sacred configuration class for the Oracle System"""

    # ⚠️ CRITICAL: These are placeholders - NEVER use the exposed keys from the query
    # Generate new keys from each service for security

    # Supabase Configuration
    SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://your-project.supabase.co')
    SUPABASE_ANON_KEY = os.getenv('SUPABASE_ANON_KEY', 'your-anon-key')
    SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_KEY', 'your-service-key')

    # OpenRouter API Configuration
    OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY', 'your-openrouter-key')
    OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'
    DEEPSEEK_MODEL = 'deepseek/deepseek-r1:free'

    # PayPal Configuration (SANDBOX - change to LIVE for production)
    PAYPAL_MODE = os.getenv('PAYPAL_MODE', 'sandbox')  # 'sandbox' or 'live'
    PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID', 'your-paypal-client-id')
    PAYPAL_CLIENT_SECRET = os.getenv('PAYPAL_CLIENT_SECRET', 'your-paypal-client-secret')

    # Google AdSense Configuration
    ADSENSE_CLIENT_ID = os.getenv('ADSENSE_CLIENT_ID', 'your-adsense-client-id')
    ADSENSE_PUBLISHER_ID = os.getenv('ADSENSE_PUBLISHER_ID', 'your-publisher-id')

    # Application Configuration
    APP_NAME = "Script Oracle - Divine Debugger"
    VERSION = "1.0.0"
    DEBUG_MODE = os.getenv('DEBUG_MODE', 'True').lower() == 'true'

    # Tier System Configuration
    TIER_LIMITS = {
        "Bronze": {
            "uses_per_day": 5,
            "upload_limit_kb": 30,
            "ads": True,
            "price": 0
        },
        "Trial": {
            "uses_total": 30,
            "upload_limit_kb": 100,
            "ads": False,
            "expiry_days": 9,
            "price": 11
        },
        "Silver": {
            "uses_per_month": 30,
            "upload_limit_kb": 500,
            "ads": False,
            "price": 51
        },
        "Gold": {
            "uses_per_month": float('inf'),
            "upload_limit_kb": float('inf'),
            "ads": False,
            "price": 111
        }
    }

    # File paths
    BASE_DIR = Path(__file__).parent.parent
    ASSETS_DIR = BASE_DIR / 'assets'
    LOGS_DIR = BASE_DIR / 'logs'

    # Ensure directories exist
    LOGS_DIR.mkdir(exist_ok=True)
    ASSETS_DIR.mkdir(exist_ok=True)

def enforce_tier_limits(tier: str) -> dict:
    """Sacred function to enforce tier limitations"""
    return OracleConfig.TIER_LIMITS.get(tier, OracleConfig.TIER_LIMITS["Bronze"])

# Avatar system configuration
AVATARS = {
    "Valkarion": {"tier": "Bronze", "power": "Script Cleansing"},
    "Ethereal_Sage": {"tier": "Silver", "power": "Deep Analysis"},
    "Cosmic_Oracle": {"tier": "Gold", "power": "Divine Optimization"},
    "Trial_Spirit": {"tier": "Trial", "power": "Guided Learning"}
}

# Ritual invocation messages
CHANT_TEMPLATES = {
    "optimize": "⚡ Invoking optimization spirits for {filename}...",
    "cleanse": "🔮 Purifying imports and dependencies...",
    "inspect": "👁️ Revealing hidden variable mysteries...",
    "explain": "🧙‍♂️ Summoning explanatory wisdom..."
}
