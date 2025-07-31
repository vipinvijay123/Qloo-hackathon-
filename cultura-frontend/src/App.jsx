import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Send, Sparkles, Music, Film, Coffee, Book } from 'lucide-react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Cultura, your AI cultural discovery assistant. Tell me about your interests, mood, or what you're looking for, and I'll help you discover amazing entertainment, dining, and cultural experiences tailored just for you!",
      recommendations: null
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setIsLoading(true)

    // Add user message to chat
    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: newMessages.slice(-5) // Send last 5 messages for context
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      // Add assistant response with recommendations
      setMessages([...newMessages, {
        role: 'assistant',
        content: data.response,
        recommendations: data.recommendations
      }])

    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        recommendations: null
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'movie':
      case 'movies':
        return <Film className="w-4 h-4" />
      case 'music':
        return <Music className="w-4 h-4" />
      case 'book':
        return <Book className="w-4 h-4" />
      case 'cafe':
      case 'restaurant':
      case 'bar':
        return <Coffee className="w-4 h-4" />
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  const RecommendationCard = ({ rec }) => (
    <Card className="mb-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-700">
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <div className="text-purple-600 dark:text-purple-400 mt-1">
            {getRecommendationIcon(rec.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm">{rec.name}</h4>
              <Badge variant="secondary" className="text-xs">
                {rec.type}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{rec.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-purple-200 dark:border-purple-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Cultura
              </h1>
              <p className="text-sm text-muted-foreground">AI Cultural Discovery Assistant</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                
                {/* Recommendations */}
                {message.recommendations && (
                  <div className="mt-3 space-y-2">
                    {message.recommendations.entertainment && message.recommendations.entertainment.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                          <Film className="w-4 h-4" />
                          Entertainment
                        </h3>
                        {message.recommendations.entertainment.map((rec, recIndex) => (
                          <RecommendationCard key={recIndex} rec={rec} />
                        ))}
                      </div>
                    )}
                    
                    {message.recommendations.dining && message.recommendations.dining.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                          <Coffee className="w-4 h-4" />
                          Dining & Lifestyle
                        </h3>
                        {message.recommendations.dining.map((rec, recIndex) => (
                          <RecommendationCard key={recIndex} rec={rec} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Cultura is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-purple-200 dark:border-purple-700 p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me about your interests, mood, or what you're looking for..."
              className="flex-1 border-purple-200 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400"
              disabled={isLoading}
            />
            <Button 
              onClick={sendMessage} 
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Try: "I love cozy coffee shops and indie music" or "Recommend something for a rainy evening"
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

