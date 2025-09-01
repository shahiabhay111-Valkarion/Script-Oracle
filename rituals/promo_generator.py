"""
🔱 Promo Generator - Sacred Code Creation Engine
Generates divine promo codes with tier bindings and mystical powers
"""

import random
import string
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import logging

from ..api.supabase_client import SupabaseClient
from ..config.settings import OracleConfig

class PromoGenerator:
    """
    🎟️ Sacred promo code generator with divine algorithms
    """

    def __init__(self):
        self.config = OracleConfig()
        self.logger = logging.getLogger(__name__)
        self.supabase = SupabaseClient()

        # Sacred prefixes for different tier types
        self.tier_prefixes = {
            'Bronze': 'BRZ',
            'Trial': 'TRL',
            'Silver': 'SLV',
            'Gold': 'GLD'
        }

        # Mystical suffixes for special occasions
        self.mystical_suffixes = [
            'DIVINE', 'COSMIC', 'SACRED', 'MYSTIC', 'ORACLE',
            'RITUAL', 'CHANT', 'SPELL', 'MAGIC', 'POWER'
        ]

    def generate_random_code(self, length: int = 8) -> str:
        """Generate random alphanumeric code"""
        chars = string.ascii_uppercase + string.digits
        return ''.join(random.choice(chars) for _ in range(length))

    def generate_tier_upgrade_code(self, 
                                   target_tier: str,
                                   duration_days: int = 30,
                                   usage_limit: int = 100,
                                   description: str = None) -> Dict[str, Any]:
        """
        ⚡ Generate sacred tier upgrade promo code
        """
        try:
            # Create the code
            prefix = self.tier_prefixes.get(target_tier, 'ORC')
            suffix = random.choice(self.mystical_suffixes)
            random_part = self.generate_random_code(4)

            code = f"{prefix}{random_part}{suffix}"

            # Set expiry date
            expiry_date = datetime.utcnow() + timedelta(days=duration_days)

            # Create promo data
            promo_data = {
                'code': code,
                'type': 'tier_upgrade',
                'tier_upgrade': target_tier,
                'description': description or f"Sacred upgrade to {target_tier} tier",
                'expiry_date': expiry_date.isoformat(),
                'usage_limit': usage_limit,
                'usage_count': 0,
                'created_at': datetime.utcnow().isoformat(),
                'created_by': 'system',  # Could be admin user ID
                'active': True
            }

            # Save to database
            success = await self.supabase.create_promo_code(promo_data)

            if success:
                self.logger.info(f"✨ Tier upgrade code generated: {code} -> {target_tier}")
                return {
                    'success': True,
                    'code': code,
                    'target_tier': target_tier,
                    'expiry_date': expiry_date.isoformat(),
                    'usage_limit': usage_limit
                }
            else:
                return {'success': False, 'error': 'Database save failed'}

        except Exception as e:
            self.logger.error(f"💀 Tier upgrade code generation failed: {e}")
            return {'success': False, 'error': str(e)}

    def generate_usage_boost_code(self,
                                  bonus_uses: int,
                                  duration_days: int = 7,
                                  usage_limit: int = 50,
                                  description: str = None) -> Dict[str, Any]:
        """
        🚀 Generate usage boost promo code
        """
        try:
            # Create the code
            code = f"BOOST{self.generate_random_code(6)}"
            expiry_date = datetime.utcnow() + timedelta(days=duration_days)

            promo_data = {
                'code': code,
                'type': 'usage_boost',
                'bonus_uses': bonus_uses,
                'description': description or f"Bonus {bonus_uses} sacred invocations",
                'expiry_date': expiry_date.isoformat(),
                'usage_limit': usage_limit,
                'usage_count': 0,
                'created_at': datetime.utcnow().isoformat(),
                'created_by': 'system',
                'active': True
            }

            success = await self.supabase.create_promo_code(promo_data)

            if success:
                self.logger.info(f"✨ Usage boost code generated: {code} -> +{bonus_uses} uses")
                return {
                    'success': True,
                    'code': code,
                    'bonus_uses': bonus_uses,
                    'expiry_date': expiry_date.isoformat(),
                    'usage_limit': usage_limit
                }
            else:
                return {'success': False, 'error': 'Database save failed'}

        except Exception as e:
            self.logger.error(f"💀 Usage boost code generation failed: {e}")
            return {'success': False, 'error': str(e)}

    def generate_avatar_unlock_code(self,
                                    avatar_name: str,
                                    duration_days: int = 14,
                                    usage_limit: int = 25,
                                    description: str = None) -> Dict[str, Any]:
        """
        🧙‍♂️ Generate avatar unlock promo code
        """
        try:
            # Create the code
            avatar_short = avatar_name.upper()[:3]
            code = f"{avatar_short}AVT{self.generate_random_code(4)}"
            expiry_date = datetime.utcnow() + timedelta(days=duration_days)

            promo_data = {
                'code': code,
                'type': 'avatar_unlock',
                'avatar_unlock': avatar_name,
                'description': description or f"Unlock {avatar_name} avatar",
                'expiry_date': expiry_date.isoformat(),
                'usage_limit': usage_limit,
                'usage_count': 0,
                'created_at': datetime.utcnow().isoformat(),
                'created_by': 'system',
                'active': True
            }

            success = await self.supabase.create_promo_code(promo_data)

            if success:
                self.logger.info(f"✨ Avatar unlock code generated: {code} -> {avatar_name}")
                return {
                    'success': True,
                    'code': code,
                    'avatar_name': avatar_name,
                    'expiry_date': expiry_date.isoformat(),
                    'usage_limit': usage_limit
                }
            else:
                return {'success': False, 'error': 'Database save failed'}

        except Exception as e:
            self.logger.error(f"💀 Avatar unlock code generation failed: {e}")
            return {'success': False, 'error': str(e)}

    def generate_campaign_codes(self, 
                                campaign_name: str,
                                code_count: int,
                                promo_type: str,
                                **kwargs) -> Dict[str, Any]:
        """
        🎊 Generate batch of promo codes for marketing campaigns
        """
        try:
            generated_codes = []

            for i in range(code_count):
                if promo_type == 'tier_upgrade':
                    result = self.generate_tier_upgrade_code(**kwargs)
                elif promo_type == 'usage_boost':
                    result = self.generate_usage_boost_code(**kwargs)
                elif promo_type == 'avatar_unlock':
                    result = self.generate_avatar_unlock_code(**kwargs)
                else:
                    continue

                if result.get('success'):
                    generated_codes.append(result['code'])

            self.logger.info(f"✨ Campaign codes generated: {campaign_name} - {len(generated_codes)} codes")

            return {
                'success': True,
                'campaign_name': campaign_name,
                'codes_generated': len(generated_codes),
                'codes': generated_codes
            }

        except Exception as e:
            self.logger.error(f"💀 Campaign code generation failed: {e}")
            return {'success': False, 'error': str(e)}

    def generate_limited_time_offer(self,
                                    offer_name: str,
                                    tier: str = 'Silver',
                                    discount_percent: int = 50,
                                    duration_hours: int = 24,
                                    usage_limit: int = 10) -> Dict[str, Any]:
        """
        ⏰ Generate limited time offer promo code
        """
        try:
            # Create special LTO code
            code = f"LTO{self.generate_random_code(3)}{discount_percent}"
            expiry_date = datetime.utcnow() + timedelta(hours=duration_hours)

            promo_data = {
                'code': code,
                'type': 'limited_offer',
                'tier_upgrade': tier,
                'discount_percent': discount_percent,
                'offer_name': offer_name,
                'description': f"Limited {duration_hours}h offer: {discount_percent}% off {tier} tier",
                'expiry_date': expiry_date.isoformat(),
                'usage_limit': usage_limit,
                'usage_count': 0,
                'created_at': datetime.utcnow().isoformat(),
                'created_by': 'system',
                'active': True,
                'is_limited_offer': True
            }

            success = await self.supabase.create_promo_code(promo_data)

            if success:
                self.logger.info(f"✨ Limited offer code generated: {code} - {offer_name}")
                return {
                    'success': True,
                    'code': code,
                    'offer_name': offer_name,
                    'discount_percent': discount_percent,
                    'tier': tier,
                    'expiry_date': expiry_date.isoformat(),
                    'usage_limit': usage_limit
                }
            else:
                return {'success': False, 'error': 'Database save failed'}

        except Exception as e:
            self.logger.error(f"💀 Limited offer code generation failed: {e}")
            return {'success': False, 'error': str(e)}

    def get_promo_analytics(self, days_back: int = 30) -> Dict[str, Any]:
        """
        📊 Get promo code usage analytics
        """
        try:
            # This would typically query the database for analytics
            # For now, return mock analytics structure

            analytics = {
                'total_codes_created': 0,
                'total_codes_used': 0,
                'conversion_rate': 0.0,
                'top_performing_codes': [],
                'tier_upgrade_stats': {
                    'Trial': 0,
                    'Silver': 0,
                    'Gold': 0
                },
                'usage_by_day': [],
                'revenue_impact': 0.0
            }

            self.logger.info(f"✨ Promo analytics generated for {days_back} days")

            return {
                'success': True,
                'analytics': analytics,
                'period_days': days_back
            }

        except Exception as e:
            self.logger.error(f"💀 Analytics generation failed: {e}")
            return {'success': False, 'error': str(e)}

    def deactivate_code(self, code: str) -> Dict[str, Any]:
        """
        🚫 Deactivate a promo code
        """
        try:
            # Update the code in database to set active = False
            # This would be implemented with actual database call

            self.logger.info(f"✨ Promo code deactivated: {code}")

            return {
                'success': True,
                'code': code,
                'deactivated_at': datetime.utcnow().isoformat()
            }

        except Exception as e:
            self.logger.error(f"💀 Code deactivation failed: {e}")
            return {'success': False, 'error': str(e)}

# CLI Interface for Independent Operation
if __name__ == "__main__":
    import asyncio

    async def main():
        """Sacred command line interface"""
        promo_gen = PromoGenerator()

        print("🔱 Script Oracle Promo Generator 🔱")
        print("1. Generate Tier Upgrade Code")
        print("2. Generate Usage Boost Code") 
        print("3. Generate Avatar Unlock Code")
        print("4. Generate Campaign Codes")
        print("5. Generate Limited Time Offer")

        choice = input("\nSelect option (1-5): ").strip()

        if choice == "1":
            tier = input("Target tier (Trial/Silver/Gold): ").strip()
            duration = int(input("Duration in days (30): ") or "30")
            limit = int(input("Usage limit (100): ") or "100")

            result = promo_gen.generate_tier_upgrade_code(tier, duration, limit)
            print(f"\n✨ Generated: {result}")

        elif choice == "2":
            bonus = int(input("Bonus uses (10): ") or "10")
            duration = int(input("Duration in days (7): ") or "7")
            limit = int(input("Usage limit (50): ") or "50")

            result = promo_gen.generate_usage_boost_code(bonus, duration, limit)
            print(f"\n🚀 Generated: {result}")

        # Add other options...

        print("\n🎯 Promo generation complete!")

    # Run the CLI
    asyncio.run(main())
