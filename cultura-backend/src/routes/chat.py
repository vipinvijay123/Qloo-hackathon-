from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import os
import json
import requests

chat_bp = Blueprint('chat', __name__)

# Mock Qloo API integration (replace with actual API when available)
def get_qloo_recommendations(preferences, category="entertainment"):
    """
    Mock function for Qloo API integration
    In production, this would make actual API calls to Qloo Taste AI
    """
    # Mock recommendations based on preferences
    mock_recommendations = {
        "entertainment": {
            "indie": [
                {"name": "Moonlight", "type": "movie", "description": "Coming-of-age drama with artistic cinematography"},
                {"name": "The National", "type": "music", "description": "Indie rock band with melancholic themes"},
                {"name": "Norwegian Wood", "type": "book", "description": "Haruki Murakami's contemplative novel"}
            ],
            "cozy": [
                {"name": "Studio Ghibli Collection", "type": "movies", "description": "Whimsical animated films perfect for cozy evenings"},
                {"name": "Bon Iver", "type": "music", "description": "Atmospheric folk music for quiet moments"},
                {"name": "The Little Prince", "type": "book", "description": "Timeless tale perfect for reflection"}
            ]
        },
        "dining": {
            "indie": [
                {"name": "Local Coffee Roasters", "type": "cafe", "description": "Independent coffee shops with unique blends"},
                {"name": "Farm-to-table Bistros", "type": "restaurant", "description": "Small restaurants focusing on local ingredients"}
            ],
            "cozy": [
                {"name": "Bookstore Cafes", "type": "cafe", "description": "Quiet spaces combining books and coffee"},
                {"name": "Wine Bars", "type": "bar", "description": "Intimate settings with curated wine selections"}
            ]
        }
    }
    
    # Simple keyword matching for demo
    for key in mock_recommendations.get(category, {}):
        if key.lower() in preferences.lower():
            return mock_recommendations[category][key]
    
    # Default recommendations
    return mock_recommendations.get(category, {}).get("indie", [])

def process_with_claude(user_message, conversation_history=[]):
    """
    Process user message with Claude API to extract preferences and generate response
    """
    try:
        # Use OpenAI API (which is pre-configured) as a substitute for Claude
        import openai
        
        # Build the conversation context
        messages = [
            {
                "role": "system",
                "content": """You are Cultura, an AI cultural discovery assistant. Your job is to:
1. Understand user preferences from their messages
2. Extract key taste indicators (genres, moods, styles, etc.)
3. Provide personalized cultural recommendations across entertainment and dining
4. Be conversational and friendly
5. Ask follow-up questions to better understand preferences

When a user describes their interests, extract keywords and themes, then provide specific recommendations with brief explanations of why they might enjoy them."""
            }
        ]
        
        # Add conversation history
        for msg in conversation_history[-5:]:  # Keep last 5 messages for context
            messages.append(msg)
        
        # Add current user message
        messages.append({"role": "user", "content": user_message})
        
        client = openai.OpenAI()
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        print(f"Error with Claude API: {e}")
        return "I'm having trouble processing your request right now. Could you try rephrasing your interests?"

@chat_bp.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        conversation_history = data.get('history', [])
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Process with Claude/OpenAI
        ai_response = process_with_claude(user_message, conversation_history)
        
        # Extract preferences for Qloo (simple keyword extraction for demo)
        preferences = user_message.lower()
        
        # Get recommendations from Qloo (mock for now)
        entertainment_recs = get_qloo_recommendations(preferences, "entertainment")
        dining_recs = get_qloo_recommendations(preferences, "dining")
        
        return jsonify({
            'response': ai_response,
            'recommendations': {
                'entertainment': entertainment_recs,
                'dining': dining_recs
            },
            'preferences_detected': preferences
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@chat_bp.route('/health', methods=['GET'])
@cross_origin()
def health():
    return jsonify({'status': 'healthy', 'service': 'Cultura Chat API'})

