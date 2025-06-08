from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import time
from datetime import datetime, timezone
import pytz
from dateutil import parser
import secrets
import string

app = Flask(__name__)
CORS(app)

# In-memory storage for demo (use database in production)
api_keys = {}
usage_stats = {}

def generate_api_key():
    """Generate a secure API key"""
    alphabet = string.ascii_letters + string.digits + '-_'
    return ''.join(secrets.choice(alphabet) for _ in range(43))

def verify_api_key(api_key):
    """Verify API key and return user info"""
    return api_keys.get(api_key)

def track_usage(api_key):
    """Track API usage for rate limiting"""
    if api_key not in usage_stats:
        usage_stats[api_key] = {
            'calls_today': 0,
            'calls_this_month': 0,
            'last_call': None
        }
    
    usage_stats[api_key]['calls_today'] += 1
    usage_stats[api_key]['calls_this_month'] += 1
    usage_stats[api_key]['last_call'] = datetime.now(timezone.utc).isoformat()

def check_rate_limit(api_key, user_info):
    """Check if user has exceeded rate limits"""
    if api_key not in usage_stats:
        return True
    
    plan_limits = {
        'starter': 1000,
        'professional': 10000,
        'enterprise': 100000
    }
    
    limit = plan_limits.get(user_info.get('plan', 'starter'), 1000)
    current_usage = usage_stats[api_key]['calls_this_month']
    
    return current_usage < limit

def require_api_key(f):
    """Decorator to require API key authentication"""
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        
        if not api_key:
            return jsonify({
                'error': 'API key required',
                'message': 'Include X-API-Key header with your request'
            }), 401
        
        user_info = verify_api_key(api_key)
        if not user_info:
            return jsonify({
                'error': 'Invalid API key',
                'message': 'API key not found or expired'
            }), 401
        
        if not check_rate_limit(api_key, user_info):
            return jsonify({
                'error': 'Rate limit exceeded',
                'message': f'Monthly limit of {user_info.get("rate_limit", 1000)} calls exceeded'
            }), 429
        
        track_usage(api_key)
        request.user_info = user_info
        request.api_key = api_key
        
        return f(*args, **kwargs)
    
    decorated_function.__name__ = f.__name__
    return decorated_function

@app.route('/')
def index():
    """API status endpoint"""
    return jsonify({
        'name': 'Epoch Converter API',
        'version': '1.0.0',
        'status': 'operational',
        'documentation': 'https://docs.epochtimeconverter.org',
        'dashboard': 'https://dashboard.epochtimeconverter.org'
    })

@app.route('/api/auth/create-key', methods=['POST'])
def create_api_key():
    """Create a new API key"""
    try:
        data = request.get_json()
        email = data.get('email')
        plan = data.get('plan', 'starter')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        if plan not in ['starter', 'professional', 'enterprise']:
            return jsonify({'error': 'Invalid plan'}), 400
        
        api_key = generate_api_key()
        
        plan_limits = {
            'starter': 1000,
            'professional': 10000,
            'enterprise': 100000
        }
        
        api_keys[api_key] = {
            'email': email,
            'plan': plan,
            'rate_limit': plan_limits[plan],
            'created_at': datetime.now(timezone.utc).isoformat()
        }
        
        return jsonify({
            'api_key': api_key,
            'plan': plan,
            'rate_limit': plan_limits[plan],
            'created_at': api_keys[api_key]['created_at']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/verify')
@require_api_key
def verify_key():
    """Verify API key and get account info"""
    user_info = request.user_info
    api_key = request.api_key
    
    current_usage = usage_stats.get(api_key, {})
    
    return jsonify({
        'valid': True,
        'plan': user_info['plan'],
        'rate_limit': user_info['rate_limit'],
        'usage_this_month': current_usage.get('calls_this_month', 0),
        'email': user_info['email']
    })

@app.route('/api/convert/epoch-to-date')
@require_api_key
def epoch_to_date():
    """Convert epoch timestamp to human-readable date"""
    try:
        timestamp = request.args.get('timestamp')
        format_type = request.args.get('format', 'iso')
        timezone_str = request.args.get('timezone', 'UTC')
        
        if not timestamp:
            return jsonify({'error': 'timestamp parameter is required'}), 400
        
        try:
            timestamp = int(timestamp)
        except ValueError:
            return jsonify({'error': 'timestamp must be a valid integer'}), 400
        
        # Convert timestamp to datetime
        dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
        
        # Apply timezone if specified
        if timezone_str != 'UTC':
            try:
                tz = pytz.timezone(timezone_str)
                dt = dt.astimezone(tz)
            except pytz.exceptions.UnknownTimeZoneError:
                return jsonify({'error': f'Unknown timezone: {timezone_str}'}), 400
        
        # Calculate ISO week
        iso_week = dt.isocalendar()[1]
        day_of_year = dt.timetuple().tm_yday
        
        # Format based on requested format
        if format_type == 'iso':
            formatted = dt.isoformat()
        elif format_type == 'rfc':
            formatted = dt.strftime('%a, %d %b %Y %H:%M:%S %z')
        else:
            formatted = dt.strftime('%Y-%m-%d %H:%M:%S %Z')
        
        return jsonify({
            'timestamp': timestamp,
            'date': dt.isoformat(),
            'iso_week': iso_week,
            'day_of_year': day_of_year,
            'timezone': timezone_str,
            'formatted': formatted
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/convert/date-to-epoch')
@require_api_key
def date_to_epoch():
    """Convert date to Unix timestamp"""
    try:
        date_str = request.args.get('date')
        timezone_str = request.args.get('timezone', 'UTC')
        
        if not date_str:
            return jsonify({'error': 'date parameter is required'}), 400
        
        try:
            # Parse the date string
            dt = parser.parse(date_str)
            
            # If no timezone info, assume the specified timezone
            if dt.tzinfo is None:
                tz = pytz.timezone(timezone_str)
                dt = tz.localize(dt)
            
        except (ValueError, pytz.exceptions.UnknownTimeZoneError) as e:
            return jsonify({'error': f'Invalid date or timezone: {str(e)}'}), 400
        
        # Convert to timestamp
        timestamp = int(dt.timestamp())
        
        # Calculate ISO week and day of year
        iso_week = dt.isocalendar()[1]
        day_of_year = dt.timetuple().tm_yday
        
        return jsonify({
            'date': dt.isoformat(),
            'timestamp': timestamp,
            'iso_week': iso_week,
            'day_of_year': day_of_year,
            'timezone': timezone_str
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/convert/batch', methods=['POST'])
@require_api_key
def batch_convert():
    """Convert multiple timestamps or dates in one request"""
    try:
        data = request.get_json()
        items = data.get('items', [])
        input_type = data.get('input_type')  # 'epoch' or 'date'
        output_format = data.get('output_format', 'iso')
        
        if not items:
            return jsonify({'error': 'items array is required'}), 400
        
        if input_type not in ['epoch', 'date']:
            return jsonify({'error': 'input_type must be "epoch" or "date"'}), 400
        
        if len(items) > 1000:
            return jsonify({'error': 'Maximum 1000 items per batch'}), 400
        
        results = []
        
        for item in items:
            try:
                if input_type == 'epoch':
                    timestamp = int(item)
                    dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
                    iso_week = dt.isocalendar()[1]
                    
                    if output_format == 'iso':
                        output = dt.isoformat()
                    else:
                        output = dt.strftime('%Y-%m-%d %H:%M:%S %Z')
                    
                    results.append({
                        'input': item,
                        'output': output,
                        'iso_week': iso_week
                    })
                    
                else:  # date
                    dt = parser.parse(str(item))
                    if dt.tzinfo is None:
                        dt = pytz.UTC.localize(dt)
                    
                    timestamp = int(dt.timestamp())
                    iso_week = dt.isocalendar()[1]
                    
                    results.append({
                        'input': item,
                        'output': timestamp,
                        'iso_week': iso_week
                    })
                    
            except Exception as e:
                results.append({
                    'input': item,
                    'error': str(e)
                })
        
        return jsonify({
            'results': results,
            'total_processed': len(results)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/current-timestamp')
@require_api_key
def current_timestamp():
    """Get current Unix timestamp"""
    try:
        now = datetime.now(timezone.utc)
        timestamp = int(now.timestamp())
        iso_week = now.isocalendar()[1]
        day_of_year = now.timetuple().tm_yday
        
        return jsonify({
            'timestamp': timestamp,
            'iso_date': now.isoformat(),
            'iso_week': iso_week,
            'day_of_year': day_of_year
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/week-number')
@require_api_key
def week_number():
    """Get ISO week number for a specific date"""
    try:
        date_str = request.args.get('date')
        
        if not date_str:
            return jsonify({'error': 'date parameter is required'}), 400
        
        try:
            dt = parser.parse(date_str)
        except ValueError:
            return jsonify({'error': 'Invalid date format'}), 400
        
        iso_calendar = dt.isocalendar()
        iso_week = iso_calendar[1]
        week_year = iso_calendar[0]
        day_of_week = iso_calendar[2]
        day_of_year = dt.timetuple().tm_yday
        
        return jsonify({
            'date': date_str,
            'iso_week': iso_week,
            'week_year': week_year,
            'day_of_week': day_of_week,
            'day_of_year': day_of_year
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/formats')
@require_api_key
def available_formats():
    """List all available date formats"""
    formats = [
        {
            'name': 'iso',
            'description': 'ISO 8601 format',
            'example': '2025-06-08T08:37:43+00:00'
        },
        {
            'name': 'rfc',
            'description': 'RFC 2822 format',
            'example': 'Sun, 08 Jun 2025 08:37:43 +0000'
        },
        {
            'name': 'unix',
            'description': 'Unix timestamp',
            'example': '1749364663'
        }
    ]
    
    return jsonify({'formats': formats})

@app.route('/api/account/usage')
@require_api_key
def account_usage():
    """Get current usage statistics"""
    user_info = request.user_info
    api_key = request.api_key
    
    current_usage = usage_stats.get(api_key, {
        'calls_today': 0,
        'calls_this_month': 0,
        'last_call': None
    })
    
    remaining_calls = user_info['rate_limit'] - current_usage['calls_this_month']
    
    return jsonify({
        'plan': user_info['plan'],
        'rate_limit': user_info['rate_limit'],
        'usage_this_month': current_usage['calls_this_month'],
        'usage_today': current_usage['calls_today'],
        'remaining_calls': max(0, remaining_calls),
        'reset_date': '2025-07-01T00:00:00Z'  # Next month
    })

# Vercel serverless function handler
def handler(request):
    return app(request.environ, lambda status, headers: None)

if __name__ == '__main__':
    app.run(debug=True)

