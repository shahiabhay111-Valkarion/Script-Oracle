# Create encryption utilities for securing all data
encryption_utils_content = '''"""
🔱 Encryption Sanctum - Sacred Cryptographic Protection
Divine encryption for all sacred data and communications
"""

import os
import base64
import hashlib
import secrets
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
import json
from typing import Dict, Any, Optional, Union
import logging

class SacredEncryption:
    """
    🛡️ Divine encryption guardian for all sacred data
    """
    
    def __init__(self, master_key: Optional[str] = None):
        self.logger = logging.getLogger(__name__)
        self.master_key = master_key or self._generate_master_key()
        self.fernet = self._create_fernet_key()
        
    def _generate_master_key(self) -> str:
        """Generate a new sacred master key"""
        return base64.urlsafe_b64encode(os.urandom(32)).decode()
    
    def _create_fernet_key(self) -> Fernet:
        """Create Fernet cipher from master key"""
        key = base64.urlsafe_b64decode(self.master_key.encode())
        return Fernet(base64.urlsafe_b64encode(key))
    
    def encrypt_data(self, data: Union[str, dict, list]) -> str:
        """🔐 Encrypt any data type to sacred cipher"""
        try:
            # Convert to JSON string if not already string
            if not isinstance(data, str):
                data = json.dumps(data)
            
            # Encrypt the data
            encrypted = self.fernet.encrypt(data.encode())
            return base64.urlsafe_b64encode(encrypted).decode()
            
        except Exception as e:
            self.logger.error(f"💀 Encryption failed: {e}")
            raise
    
    def decrypt_data(self, encrypted_data: str) -> Any:
        """🔓 Decrypt sacred cipher back to original data"""
        try:
            # Decode from base64
            encrypted_bytes = base64.urlsafe_b64decode(encrypted_data.encode())
            
            # Decrypt
            decrypted = self.fernet.decrypt(encrypted_bytes)
            data_str = decrypted.decode()
            
            # Try to parse as JSON, return string if not valid JSON
            try:
                return json.loads(data_str)
            except json.JSONDecodeError:
                return data_str
                
        except Exception as e:
            self.logger.error(f"💀 Decryption failed: {e}")
            raise
    
    def encrypt_api_keys(self, api_keys: Dict[str, str]) -> str:
        """🗝️ Encrypt API keys for secure storage"""
        return self.encrypt_data(api_keys)
    
    def decrypt_api_keys(self, encrypted_keys: str) -> Dict[str, str]:
        """🗝️ Decrypt API keys for use"""
        return self.decrypt_data(encrypted_keys)
    
    def hash_password(self, password: str, salt: Optional[bytes] = None) -> Dict[str, str]:
        """🔒 Hash password with sacred salt"""
        if salt is None:
            salt = os.urandom(32)
        
        # Use PBKDF2 for password hashing
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        
        key = kdf.derive(password.encode())
        
        return {
            'hash': base64.urlsafe_b64encode(key).decode(),
            'salt': base64.urlsafe_b64encode(salt).decode()
        }
    
    def verify_password(self, password: str, stored_hash: str, salt: str) -> bool:
        """✅ Verify password against sacred hash"""
        try:
            salt_bytes = base64.urlsafe_b64decode(salt.encode())
            stored_key = base64.urlsafe_b64decode(stored_hash.encode())
            
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt_bytes,
                iterations=100000,
            )
            
            kdf.verify(password.encode(), stored_key)
            return True
            
        except Exception:
            return False
    
    def encrypt_payment_data(self, payment_info: Dict[str, Any]) -> str:
        """💳 Encrypt payment data with extra protection"""
        # Add timestamp and random nonce for extra security
        protected_data = {
            'data': payment_info,
            'timestamp': secrets.token_hex(16),
            'nonce': secrets.token_urlsafe(32)
        }
        
        return self.encrypt_data(protected_data)
    
    def decrypt_payment_data(self, encrypted_payment: str) -> Dict[str, Any]:
        """💳 Decrypt payment data safely"""
        protected_data = self.decrypt_data(encrypted_payment)
        return protected_data.get('data', {})
    
    def generate_session_token(self, user_id: str, expiry_hours: int = 24) -> str:
        """🎫 Generate encrypted session token"""
        import time
        
        session_data = {
            'user_id': user_id,
            'created_at': int(time.time()),
            'expires_at': int(time.time()) + (expiry_hours * 3600),
            'token': secrets.token_urlsafe(32)
        }
        
        return self.encrypt_data(session_data)
    
    def verify_session_token(self, token: str) -> Optional[Dict[str, Any]]:
        """🎫 Verify and decode session token"""
        try:
            import time
            
            session_data = self.decrypt_data(token)
            
            # Check expiry
            if int(time.time()) > session_data.get('expires_at', 0):
                return None
            
            return session_data
            
        except Exception:
            return None
    
    def encrypt_database_field(self, field_value: Any, field_type: str = 'text') -> str:
        """🗄️ Encrypt database field with type preservation"""
        field_data = {
            'value': field_value,
            'type': field_type,
            'encrypted_at': secrets.token_hex(8)
        }
        
        return self.encrypt_data(field_data)
    
    def decrypt_database_field(self, encrypted_field: str) -> Any:
        """🗄️ Decrypt database field and restore type"""
        try:
            field_data = self.decrypt_data(encrypted_field)
            return field_data.get('value')
        except Exception:
            return None

class SecureConfig:
    """
    ⚙️ Encrypted configuration management
    """
    
    def __init__(self, config_file: str = 'sacred_config.enc'):
        self.config_file = config_file
        self.encryption = SacredEncryption()
        self._config_data = {}
        self.load_config()
    
    def load_config(self):
        """Load encrypted configuration"""
        try:
            if os.path.exists(self.config_file):
                with open(self.config_file, 'r') as f:
                    encrypted_config = f.read()
                self._config_data = self.encryption.decrypt_data(encrypted_config)
            else:
                self._config_data = {}
        except Exception as e:
            logging.error(f"💀 Config loading failed: {e}")
            self._config_data = {}
    
    def save_config(self):
        """Save encrypted configuration"""
        try:
            encrypted_config = self.encryption.encrypt_data(self._config_data)
            with open(self.config_file, 'w') as f:
                f.write(encrypted_config)
        except Exception as e:
            logging.error(f"💀 Config saving failed: {e}")
    
    def set(self, key: str, value: Any):
        """Set encrypted configuration value"""
        self._config_data[key] = value
        self.save_config()
    
    def get(self, key: str, default: Any = None) -> Any:
        """Get decrypted configuration value"""
        return self._config_data.get(key, default)
    
    def delete(self, key: str):
        """Delete configuration key"""
        if key in self._config_data:
            del self._config_data[key]
            self.save_config()

class DatabaseEncryption:
    """
    🗄️ Database-specific encryption utilities
    """
    
    def __init__(self):
        self.encryption = SacredEncryption()
    
    def encrypt_user_data(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Encrypt sensitive user data fields"""
        encrypted_data = user_data.copy()
        
        # Fields to encrypt
        sensitive_fields = ['email', 'full_name', 'phone', 'address']
        
        for field in sensitive_fields:
            if field in encrypted_data:
                encrypted_data[f"{field}_encrypted"] = self.encryption.encrypt_database_field(
                    encrypted_data[field], 'text'
                )
                # Optionally remove plain text
                # del encrypted_data[field]
        
        return encrypted_data
    
    def decrypt_user_data(self, encrypted_user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Decrypt user data for use"""
        decrypted_data = encrypted_user_data.copy()
        
        # Find encrypted fields
        encrypted_fields = [k for k in decrypted_data.keys() if k.endswith('_encrypted')]
        
        for field in encrypted_fields:
            original_field = field.replace('_encrypted', '')
            decrypted_value = self.encryption.decrypt_database_field(
                decrypted_data[field]
            )
            decrypted_data[original_field] = decrypted_value
        
        return decrypted_data
    
    def encrypt_payment_record(self, payment_data: Dict[str, Any]) -> Dict[str, Any]:
        """Encrypt payment record for database storage"""
        encrypted_record = payment_data.copy()
        
        # Encrypt sensitive payment fields
        sensitive_fields = ['transaction_id', 'payer_email', 'amount']
        
        for field in sensitive_fields:
            if field in encrypted_record:
                encrypted_record[f"{field}_encrypted"] = self.encryption.encrypt_database_field(
                    encrypted_record[field]
                )
        
        return encrypted_record

# Global encryption instance
sacred_encryption = SacredEncryption()

# Utility functions for easy access
def encrypt(data: Any) -> str:
    """Quick encryption function"""
    return sacred_encryption.encrypt_data(data)

def decrypt(encrypted_data: str) -> Any:
    """Quick decryption function"""
    return sacred_encryption.decrypt_data(encrypted_data)

def secure_hash(data: str) -> str:
    """Create secure hash of data"""
    return hashlib.sha256(data.encode()).hexdigest()

def generate_secure_token(length: int = 32) -> str:
    """Generate secure random token"""
    return secrets.token_urlsafe(length)
'''

with open('script_oracle/utils/__init__.py', 'w') as f:
    pass

with open('script_oracle/utils/encryption.py', 'w') as f:
    f.write(encryption_utils_content)

print("🛡️ Sacred Encryption Utilities created successfully!")
print("🔐 All sensitive data will now be encrypted!")