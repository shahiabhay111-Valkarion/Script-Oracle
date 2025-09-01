"""
🔱 Payment Gateway - Sacred PayPal Integration
Handles divine transactions for tier upgrades and avatar mutations
"""

import logging
from typing import Dict, Any, Optional
from decimal import Decimal
import paypalrestsdk
from paypalrestsdk import Payment, Sale
from datetime import datetime

from ..config.settings import OracleConfig

class PaymentGateway:
    """
    💳 Sacred payment processor for tier upgrades
    """

    def __init__(self):
        self.config = OracleConfig()
        self.logger = logging.getLogger(__name__)
        self._configure_paypal()

    def _configure_paypal(self):
        """Configure PayPal SDK with sacred credentials"""
        try:
            paypalrestsdk.configure({
                "mode": self.config.PAYPAL_MODE,  # sandbox or live
                "client_id": self.config.PAYPAL_CLIENT_ID,
                "client_secret": self.config.PAYPAL_CLIENT_SECRET
            })

            self.logger.info(f"✨ PayPal configured in {self.config.PAYPAL_MODE} mode")

        except Exception as e:
            self.logger.error(f"💀 PayPal configuration failed: {e}")
            raise

    def create_tier_upgrade_payment(self, user_id: str, tier: str, return_url: str, cancel_url: str) -> Dict[str, Any]:
        """
        🎯 Create sacred payment for tier upgrade
        """
        try:
            # Get tier pricing
            tier_info = self.config.TIER_LIMITS.get(tier)
            if not tier_info:
                return {'success': False, 'error': 'Invalid tier'}

            amount = tier_info['price']
            if amount <= 0:
                return {'success': False, 'error': 'Invalid amount'}

            # Create payment description
            description = f"Script Oracle - {tier} Tier Upgrade"

            # Create PayPal payment object
            payment = Payment({
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": return_url,
                    "cancel_url": cancel_url
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": f"{tier} Tier Upgrade",
                            "sku": f"tier_{tier.lower()}",
                            "price": str(amount),
                            "currency": "USD",  # Use INR for Indian Rupees if needed
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "total": str(amount),
                        "currency": "USD"
                    },
                    "description": description,
                    "custom": f"user_id:{user_id},tier:{tier}"  # Store metadata
                }]
            })

            # Create the payment
            if payment.create():
                # Extract approval URL
                approval_url = None
                for link in payment.links:
                    if link.rel == "approval_url":
                        approval_url = link.href
                        break

                self.logger.info(f"✨ Payment created: {payment.id} for user {user_id}")

                return {
                    'success': True,
                    'payment_id': payment.id,
                    'approval_url': approval_url,
                    'amount': amount,
                    'tier': tier
                }

            else:
                self.logger.error(f"💀 Payment creation failed: {payment.error}")
                return {
                    'success': False,
                    'error': payment.error
                }

        except Exception as e:
            self.logger.error(f"💀 Payment creation error: {e}")
            return {
                'success': False,
                'error': str(e)
            }

    def execute_payment(self, payment_id: str, payer_id: str) -> Dict[str, Any]:
        """
        ⚡ Execute approved PayPal payment
        """
        try:
            # Find the payment
            payment = Payment.find(payment_id)

            if not payment:
                return {'success': False, 'error': 'Payment not found'}

            # Execute the payment
            if payment.execute({"payer_id": payer_id}):

                # Extract transaction details
                transaction = payment.transactions[0]
                sale_id = None

                for related_resource in transaction.related_resources:
                    if hasattr(related_resource, 'sale'):
                        sale_id = related_resource.sale.id
                        break

                # Parse custom data to get user_id and tier
                custom_data = transaction.custom
                user_data = self._parse_custom_data(custom_data)

                self.logger.info(f"✨ Payment executed: {payment_id} for user {user_data.get('user_id')}")

                return {
                    'success': True,
                    'payment_id': payment_id,
                    'transaction_id': sale_id,
                    'amount': transaction.amount.total,
                    'currency': transaction.amount.currency,
                    'user_id': user_data.get('user_id'),
                    'tier': user_data.get('tier'),
                    'status': payment.state,
                    'payer_email': payment.payer.payer_info.email if hasattr(payment.payer, 'payer_info') else None
                }

            else:
                self.logger.error(f"💀 Payment execution failed: {payment.error}")
                return {
                    'success': False,
                    'error': payment.error
                }

        except Exception as e:
            self.logger.error(f"💀 Payment execution error: {e}")
            return {
                'success': False,
                'error': str(e)
            }

    def _parse_custom_data(self, custom_data: str) -> Dict[str, str]:
        """Parse custom data from payment"""
        data = {}
        if custom_data:
            pairs = custom_data.split(',')
            for pair in pairs:
                if ':' in pair:
                    key, value = pair.split(':', 1)
                    data[key] = value
        return data

    def verify_payment(self, payment_id: str) -> Dict[str, Any]:
        """
        🔍 Verify payment status and details
        """
        try:
            payment = Payment.find(payment_id)

            if not payment:
                return {'verified': False, 'error': 'Payment not found'}

            return {
                'verified': True,
                'status': payment.state,
                'payment_id': payment_id,
                'amount': payment.transactions[0].amount.total if payment.transactions else None,
                'currency': payment.transactions[0].amount.currency if payment.transactions else None,
                'created_time': payment.create_time,
                'updated_time': payment.update_time
            }

        except Exception as e:
            self.logger.error(f"💀 Payment verification error: {e}")
            return {
                'verified': False,
                'error': str(e)
            }

    def refund_payment(self, sale_id: str, amount: Optional[Decimal] = None) -> Dict[str, Any]:
        """
        💸 Process refund for a payment
        """
        try:
            sale = Sale.find(sale_id)

            if not sale:
                return {'success': False, 'error': 'Sale not found'}

            refund_data = {}
            if amount:
                refund_data = {
                    "amount": {
                        "total": str(amount),
                        "currency": "USD"
                    }
                }

            refund = sale.refund(refund_data)

            if refund.success():
                self.logger.info(f"✨ Refund processed: {refund.id} for sale {sale_id}")
                return {
                    'success': True,
                    'refund_id': refund.id,
                    'amount': refund.amount.total,
                    'status': refund.state
                }
            else:
                self.logger.error(f"💀 Refund failed: {refund.error}")
                return {
                    'success': False,
                    'error': refund.error
                }

        except Exception as e:
            self.logger.error(f"💀 Refund error: {e}")
            return {
                'success': False,
                'error': str(e)
            }

    def get_payment_history(self, count: int = 20) -> Dict[str, Any]:
        """
        📜 Get sacred payment history
        """
        try:
            payments = Payment.all({
                "count": count,
                "sort_order": "desc"
            })

            if payments.success():
                payment_list = []
                for payment in payments.payments:
                    payment_info = {
                        'id': payment.id,
                        'state': payment.state,
                        'amount': payment.transactions[0].amount.total if payment.transactions else None,
                        'currency': payment.transactions[0].amount.currency if payment.transactions else None,
                        'created_time': payment.create_time,
                        'updated_time': payment.update_time,
                        'payer_email': payment.payer.payer_info.email if hasattr(payment.payer, 'payer_info') else None
                    }
                    payment_list.append(payment_info)

                return {
                    'success': True,
                    'payments': payment_list,
                    'count': len(payment_list)
                }

            else:
                return {
                    'success': False,
                    'error': 'Failed to retrieve payment history'
                }

        except Exception as e:
            self.logger.error(f"💀 Payment history error: {e}")
            return {
                'success': False,
                'error': str(e)
            }

    def create_subscription_plan(self, tier: str) -> Dict[str, Any]:
        """
        🔄 Create subscription plan for recurring payments
        """
        try:
            from paypalrestsdk import BillingPlan, BillingAgreement

            tier_info = self.config.TIER_LIMITS.get(tier)
            if not tier_info:
                return {'success': False, 'error': 'Invalid tier'}

            billing_plan = BillingPlan({
                "name": f"Script Oracle {tier} Subscription",
                "description": f"Monthly subscription for {tier} tier access",
                "type": "INFINITE",  # Recurring subscription
                "payment_definitions": [{
                    "name": f"{tier} Monthly Payment",
                    "type": "REGULAR",
                    "frequency": "MONTH",
                    "frequency_interval": "1",
                    "amount": {
                        "value": str(tier_info['price']),
                        "currency": "USD"
                    },
                    "cycles": "0"  # 0 means infinite
                }],
                "merchant_preferences": {
                    "return_url": "https://your-domain.com/subscription/success",
                    "cancel_url": "https://your-domain.com/subscription/cancel",
                    "auto_bill_amount": "YES",
                    "initial_fail_amount_action": "CONTINUE"
                }
            })

            if billing_plan.create():
                # Activate the plan
                if billing_plan.activate():
                    self.logger.info(f"✨ Subscription plan created: {billing_plan.id}")
                    return {
                        'success': True,
                        'plan_id': billing_plan.id,
                        'tier': tier
                    }

            return {
                'success': False,
                'error': billing_plan.error if hasattr(billing_plan, 'error') else 'Plan creation failed'
            }

        except Exception as e:
            self.logger.error(f"💀 Subscription plan error: {e}")
            return {
                'success': False,
                'error': str(e)
            }

    def generate_payment_form_data(self, user_id: str, tier: str, return_url: str, cancel_url: str) -> Dict[str, Any]:
        """
        📝 Generate data for PayPal payment form (for frontend integration)
        """
        try:
            tier_info = self.config.TIER_LIMITS.get(tier)
            if not tier_info:
                return {'success': False, 'error': 'Invalid tier'}

            form_data = {
                'business': 'your-paypal-business-email@example.com',  # Replace with actual business email
                'item_name': f'Script Oracle {tier} Tier Upgrade',
                'item_number': f'tier_{tier.lower()}',
                'amount': str(tier_info['price']),
                'currency_code': 'USD',
                'return_url': return_url,
                'cancel_url': cancel_url,
                'notify_url': 'https://your-domain.com/paypal/ipn',  # IPN endpoint
                'custom': f'user_id:{user_id},tier:{tier}',
                'cmd': '_xclick'
            }

            return {
                'success': True,
                'form_data': form_data,
                'paypal_url': 'https://www.sandbox.paypal.com/cgi-bin/webscr' if self.config.PAYPAL_MODE == 'sandbox' else 'https://www.paypal.com/cgi-bin/webscr'
            }

        except Exception as e:
            self.logger.error(f"💀 Form data generation error: {e}")
            return {
                'success': False,
                'error': str(e)
            }
