from http.server import BaseHTTPRequestHandler
import json
import os
from datetime import datetime

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests to the API endpoint"""
        # Set response headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        # API Response
        response_data = {
            "status": "online",
            "message": "🔱 Script Oracle - Divine Debugger API is active",
            "service": "Divine Code Analysis Engine",
            "version": "1.0.0",
            "timestamp": datetime.now().isoformat(),
            "endpoints": {
                "health": "/api/hello",
                "status": "/api/status", 
                "models": "/api/models",
                "tiers": "/api/tiers",
                "analytics": "/api/analytics",
                "docs": "/api/docs"
            },
            "features": [
                "🤖 Hybrid ML Engine (XGBoost + PyTorch + DeepSeek-R1)",
                "🔐 End-to-end encryption",
                "🎭 Sacred avatar system", 
                "🎟️ Promo code management",
                "💳 PayPal integration",
                "📊 Usage analytics"
            ],
            "sacred_message": "May your code be forever optimized! ⚡✨",
            "deployment_info": {
                "platform": "Vercel Serverless",
                "runtime": "Python 3.9",
                "region": os.getenv('VERCEL_REGION', 'auto'),
                "environment": os.getenv('VERCEL_ENV', 'development')
            }
        }
        
        # Write JSON response
        self.wfile.write(json.dumps(response_data, indent=2).encode('utf-8'))
        return

    def do_POST(self):
        """Handle POST requests (placeholder for future API endpoints)"""
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            "status": "received",
            "message": "POST endpoint ready for divine invocations",
            "note": "Full API implementation coming soon"
        }
        
        self.wfile.write(json.dumps(response).encode('utf-8'))
        return

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        return
