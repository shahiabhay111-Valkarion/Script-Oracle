-- 🔱 Script Oracle - Divine Debugger Database Schema
-- Sacred tables with Row Level Security and encryption support

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table with encrypted fields
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    email_encrypted TEXT, -- Encrypted version for sensitive operations
    full_name TEXT,
    full_name_encrypted TEXT, -- Encrypted version
    tier TEXT DEFAULT 'Bronze' CHECK (tier IN ('Bronze', 'Trial', 'Silver', 'Gold')),
    avatar TEXT DEFAULT 'Valkarion',
    usage_count INTEGER DEFAULT 0,
    daily_usage_count INTEGER DEFAULT 0,
    monthly_usage_count INTEGER DEFAULT 0,
    trial_expiry TIMESTAMPTZ,
    last_used TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    avatar_updated TIMESTAMPTZ,
    encrypted_data JSONB, -- For additional encrypted user data
    session_token_hash TEXT, -- Hashed session tokens for security
    password_hash TEXT, -- For local authentication if needed
    password_salt TEXT
);

-- Tiers table for tier management
CREATE TABLE tiers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    uses_per_day INTEGER,
    uses_per_month INTEGER,
    upload_limit_kb INTEGER,
    ads BOOLEAN DEFAULT FALSE,
    features JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default tiers
INSERT INTO tiers (name, price, uses_per_day, upload_limit_kb, ads, features) VALUES
('Bronze', 0, 5, 30, TRUE, '{"basic": true}'),
('Trial', 11, NULL, 100, FALSE, '{"trial": true, "expiry_days": 9}'),
('Silver', 51, NULL, 500, FALSE, '{"advanced": true, "uses_per_month": 30}'),
('Gold', 111, NULL, NULL, FALSE, '{"unlimited": true}');

-- Scrolls table for code files and analysis
CREATE TABLE scrolls (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    file_extension TEXT,
    content_encrypted TEXT NOT NULL, -- Encrypted file content
    content_hash TEXT, -- Hash for integrity checking
    file_size_kb INTEGER,
    language TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_analyzed TIMESTAMPTZ
);

-- Avatars table
CREATE TABLE avatars (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    tier_requirement TEXT,
    power TEXT,
    description TEXT,
    image_url TEXT,
    unlock_condition JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default avatars
INSERT INTO avatars (name, tier_requirement, power, description) VALUES
('Valkarion', 'Bronze', 'Script Cleansing', 'The Bronze Guardian of Code Purity'),
('Ethereal_Sage', 'Silver', 'Deep Analysis', 'The Silver Sage of Code Understanding'),
('Cosmic_Oracle', 'Gold', 'Divine Optimization', 'The Gold Oracle of Ultimate Efficiency'),
('Trial_Spirit', 'Trial', 'Guided Learning', 'The Trial Guide for New Initiates');

-- Invocations table for logging all sacred actions
CREATE TABLE invocations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    scroll_id UUID REFERENCES scrolls(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL,
    model_used TEXT,
    result_encrypted TEXT, -- Encrypted results
    confidence DECIMAL(5,4),
    execution_time DECIMAL(10,6),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    metadata_encrypted JSONB, -- Encrypted metadata
    success BOOLEAN DEFAULT TRUE,
    error_message_encrypted TEXT
);

-- Promo codes table with encrypted sensitive data
CREATE TABLE promo_codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL, -- 'tier_upgrade', 'usage_boost', 'avatar_unlock', etc.
    tier_upgrade TEXT,
    bonus_uses INTEGER,
    avatar_unlock TEXT,
    discount_percent INTEGER,
    description TEXT,
    expiry_date TIMESTAMPTZ,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    offer_name TEXT,
    is_limited_offer BOOLEAN DEFAULT FALSE,
    encrypted_metadata JSONB -- For additional encrypted promo data
);

-- Promo usage tracking
CREATE TABLE promo_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    promo_code TEXT NOT NULL,
    used_at TIMESTAMPTZ DEFAULT NOW(),
    ip_address_hash TEXT, -- Hashed IP for fraud prevention
    user_agent_hash TEXT -- Hashed user agent
);

-- Payments table with full encryption
CREATE TABLE payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tier TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    transaction_id_encrypted TEXT NOT NULL, -- Encrypted PayPal transaction ID
    payment_method TEXT DEFAULT 'paypal',
    payment_date TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'completed',
    payer_email_encrypted TEXT, -- Encrypted payer email
    refund_id_encrypted TEXT, -- Encrypted refund ID if applicable
    refunded BOOLEAN DEFAULT FALSE,
    refund_date TIMESTAMPTZ,
    encrypted_payment_data JSONB, -- Additional encrypted payment metadata
    payment_hash TEXT -- Hash for integrity verification
);

-- API Keys table for encrypted storage
CREATE TABLE api_keys (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_name TEXT NOT NULL,
    key_encrypted TEXT NOT NULL, -- Encrypted API key
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_used TIMESTAMPTZ,
    active BOOLEAN DEFAULT TRUE,
    key_hash TEXT, -- Hash for quick lookup without decryption
    rotation_date TIMESTAMPTZ -- For key rotation scheduling
);

-- Usage analytics table
CREATE TABLE usage_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    action_type TEXT,
    count INTEGER DEFAULT 1,
    tier TEXT,
    success_rate DECIMAL(5,4),
    avg_execution_time DECIMAL(10,6),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date, action_type)
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tier ON users(tier);
CREATE INDEX idx_invocations_user_id ON invocations(user_id);
CREATE INDEX idx_invocations_timestamp ON invocations(timestamp);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_transaction_id_encrypted ON payments(transaction_id_encrypted);
CREATE INDEX idx_promo_codes_code ON promo_codes(code);
CREATE INDEX idx_promo_codes_active ON promo_codes(active);
CREATE INDEX idx_scrolls_user_id ON scrolls(user_id);
CREATE INDEX idx_usage_analytics_user_date ON usage_analytics(user_id, date);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE invocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for scrolls table
CREATE POLICY "Users can view own scrolls" ON scrolls
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scrolls" ON scrolls
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scrolls" ON scrolls
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scrolls" ON scrolls
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for invocations table
CREATE POLICY "Users can view own invocations" ON invocations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own invocations" ON invocations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for payments table
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for promo usage table
CREATE POLICY "Users can view own promo usage" ON promo_usage
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own promo usage" ON promo_usage
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for usage analytics table
CREATE POLICY "Users can view own analytics" ON usage_analytics
    FOR SELECT USING (auth.uid() = user_id);

-- Functions for encrypted operations
CREATE OR REPLACE FUNCTION encrypt_user_email()
RETURNS TRIGGER AS $$
BEGIN
    -- This would call an encryption service in production
    -- For now, we'll use basic PostgreSQL encryption
    NEW.email_encrypted = pgp_sym_encrypt(NEW.email, current_setting('app.encryption_key', true));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically encrypt email
CREATE TRIGGER encrypt_user_email_trigger
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION encrypt_user_email();

-- Function to update usage counts safely
CREATE OR REPLACE FUNCTION increment_usage_count(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    current_date_val DATE := CURRENT_DATE;
BEGIN
    -- Update daily usage count
    UPDATE users 
    SET usage_count = usage_count + 1,
        daily_usage_count = daily_usage_count + 1,
        last_used = NOW()
    WHERE id = user_uuid;

    -- Update or insert usage analytics
    INSERT INTO usage_analytics (user_id, date, action_type, count)
    VALUES (user_uuid, current_date_val, 'general', 1)
    ON CONFLICT (user_id, date, action_type)
    DO UPDATE SET count = usage_analytics.count + 1;

    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset daily usage counts (to be called daily via cron)
CREATE OR REPLACE FUNCTION reset_daily_usage()
RETURNS INTEGER AS $$
DECLARE
    reset_count INTEGER;
BEGIN
    UPDATE users 
    SET daily_usage_count = 0
    WHERE daily_usage_count > 0;

    GET DIAGNOSTICS reset_count = ROW_COUNT;

    INSERT INTO usage_analytics (user_id, date, action_type, count)
    SELECT id, CURRENT_DATE, 'daily_reset', daily_usage_count
    FROM users WHERE daily_usage_count > 0;

    RETURN reset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check tier limits with encryption support
CREATE OR REPLACE FUNCTION check_tier_limits(user_uuid UUID)
RETURNS JSONB AS $$
DECLARE
    user_record RECORD;
    tier_limits JSONB;
    result JSONB;
BEGIN
    -- Get user with tier info
    SELECT u.tier, u.usage_count, u.daily_usage_count, u.monthly_usage_count,
           u.trial_expiry, t.features, t.uses_per_day, t.uses_per_month
    INTO user_record
    FROM users u
    JOIN tiers t ON u.tier = t.name
    WHERE u.id = user_uuid;

    IF NOT FOUND THEN
        RETURN '{"allowed": false, "reason": "User not found"}'::JSONB;
    END IF;

    -- Check trial expiry
    IF user_record.tier = 'Trial' AND user_record.trial_expiry < NOW() THEN
        RETURN '{"allowed": false, "reason": "Trial expired"}'::JSONB;
    END IF;

    -- Check daily limits
    IF user_record.uses_per_day IS NOT NULL AND 
       user_record.daily_usage_count >= user_record.uses_per_day THEN
        RETURN '{"allowed": false, "reason": "Daily limit exceeded"}'::JSONB;
    END IF;

    -- Check monthly limits
    IF user_record.uses_per_month IS NOT NULL AND 
       user_record.monthly_usage_count >= user_record.uses_per_month THEN
        RETURN '{"allowed": false, "reason": "Monthly limit exceeded"}'::JSONB;
    END IF;

    RETURN '{"allowed": true}'::JSONB;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Notification function for tier upgrades
CREATE OR REPLACE FUNCTION notify_tier_upgrade()
RETURNS TRIGGER AS $$
BEGIN
    -- This could send notifications or trigger webhooks
    PERFORM pg_notify('tier_upgrade', 
        json_build_object('user_id', NEW.id, 'new_tier', NEW.tier, 'old_tier', OLD.tier)::text
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for tier upgrade notifications
CREATE TRIGGER tier_upgrade_notification
    AFTER UPDATE OF tier ON users
    FOR EACH ROW EXECUTE FUNCTION notify_tier_upgrade();

-- Create a view for user statistics (encrypted fields excluded)
CREATE VIEW user_stats AS
SELECT 
    u.id,
    u.tier,
    u.avatar,
    u.usage_count,
    u.daily_usage_count,
    u.created_at,
    u.last_used,
    COUNT(i.id) as total_invocations,
    COUNT(p.id) as total_payments,
    COALESCE(SUM(p.amount), 0) as total_spent
FROM users u
LEFT JOIN invocations i ON u.id = i.user_id
LEFT JOIN payments p ON u.id = p.user_id
GROUP BY u.id, u.tier, u.avatar, u.usage_count, u.daily_usage_count, u.created_at, u.last_used;

-- Grant permissions for application access
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON tiers, avatars TO anon; -- Public reference tables

-- Comments for documentation
COMMENT ON TABLE users IS 'Sacred user profiles with encrypted sensitive data';
COMMENT ON TABLE scrolls IS 'Code files uploaded by users with encrypted content';
COMMENT ON TABLE invocations IS 'Log of all sacred model invocations with encrypted results';
COMMENT ON TABLE payments IS 'Payment transactions with full encryption';
COMMENT ON TABLE promo_codes IS 'Sacred promotional codes for tier upgrades';
COMMENT ON COLUMN users.email_encrypted IS 'Encrypted version of user email';
COMMENT ON COLUMN scrolls.content_encrypted IS 'Encrypted file content';
COMMENT ON COLUMN invocations.result_encrypted IS 'Encrypted model results';
COMMENT ON COLUMN payments.transaction_id_encrypted IS 'Encrypted PayPal transaction ID';
