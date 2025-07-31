<<<<<<< HEAD
# Qloo-hackathon-
=======
# Cultura - AI Cultural Discovery Assistant

Cultura is a streamlined cultural recommendation chatbot that combines conversational AI with intelligent taste recommendations to deliver personalized cultural suggestions. Users can describe their interests through natural conversation and receive instant, contextually relevant recommendations across entertainment and dining domains.

## Features

- **Conversational Interface**: Natural chat-based interaction for describing preferences
- **Cross-Domain Recommendations**: Get suggestions for entertainment (movies, music, books) and dining
- **Beautiful UI**: Modern, responsive design with gradient backgrounds and card-based recommendations
- **Real-time Chat**: Instant responses with loading states and smooth animations
- **Contextual Understanding**: AI processes user preferences to provide relevant suggestions

## Tech Stack

### Backend
- **Flask**: Python web framework
- **OpenAI API**: For conversational AI processing (configured to use existing API keys)
- **Flask-CORS**: Cross-origin resource sharing support
- **SQLite**: Database for potential user data storage

### Frontend
- **React**: Modern JavaScript framework
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Lucide Icons**: Beautiful icon library

## Project Structure

```
cultura-backend/
├── src/
│   ├── routes/
│   │   ├── chat.py          # Chat API endpoints
│   │   └── user.py          # User management endpoints
│   ├── models/
│   │   └── user.py          # Database models
│   ├── static/              # Built React frontend files
│   └── main.py              # Flask application entry point
├── venv/                    # Python virtual environment
└── requirements.txt         # Python dependencies

cultura-frontend/
├── src/
│   ├── components/ui/       # shadcn/ui components
│   ├── App.jsx             # Main React application
│   └── main.jsx            # React entry point
├── dist/                   # Built frontend files
└── package.json            # Node.js dependencies
```

## API Endpoints

### Chat API
- `POST /api/chat` - Send a message and receive AI response with recommendations
- `GET /api/health` - Health check endpoint

### Request Format
```json
{
  "message": "I love cozy coffee shops and indie music. What should I do this weekend?",
  "history": [
    {"role": "user", "content": "previous message"},
    {"role": "assistant", "content": "previous response"}
  ]
}
```

### Response Format
```json
{
  "response": "AI generated response text",
  "recommendations": {
    "entertainment": [
      {
        "name": "Moonlight",
        "type": "movie",
        "description": "Coming-of-age drama with artistic cinematography"
      }
    ],
    "dining": [
      {
        "name": "Local Coffee Roasters",
        "type": "cafe",
        "description": "Independent coffee shops with unique blends"
      }
    ]
  }
}
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd cultura-backend
   ```

2. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```

3. Install dependencies (already installed):
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python src/main.py
   ```

### Frontend Development (Optional)
1. Navigate to the frontend directory:
   ```bash
   cd cultura-frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start development server:
   ```bash
   pnpm run dev
   ```

4. Build for production:
   ```bash
   pnpm run build
   ```

## Usage

1. Start the Flask backend server (it serves both API and frontend)
2. Open http://localhost:5000 in your browser
3. Start chatting with Cultura about your interests
4. Receive personalized recommendations across entertainment and dining

## Example Interactions

- "I love cozy coffee shops and indie music. What should I do this weekend?"
- "Recommend something for someone who enjoyed 'The Queen's Gambit'"
- "I'm into minimalist design and Japanese culture. Suggest a restaurant."
- "I need something relaxing for a rainy evening"

## Deployment

The application is ready for deployment as a full-stack Flask application:

1. The React frontend is built and served from Flask's static directory
2. All dependencies are listed in requirements.txt
3. The application listens on 0.0.0.0:5000 for external access
4. CORS is configured for cross-origin requests

## Future Enhancements

- Integration with actual Qloo Taste AI™ API
- User authentication and preference storage
- More sophisticated recommendation algorithms
- Additional cultural domains (events, travel, art)
- Social features and recommendation sharing

## Demo Scenarios

The application demonstrates several key capabilities:

1. **Entertainment Discovery**: Movie, music, and book recommendations
2. **Dining Suggestions**: Cafes, restaurants, and lifestyle venues
3. **Cross-Domain Intelligence**: Connecting preferences across different cultural domains
4. **Conversational Flow**: Natural dialogue with context awareness

---

Built for the Qloo LLM Hackathon - demonstrating the power of combining conversational AI with cultural taste intelligence.

>>>>>>> 385ec35 (Initial commit)
