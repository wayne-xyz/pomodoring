'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, Loader2 } from 'lucide-react'
import Header from '../header'
import { useState } from 'react'

export default function ChatAIPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      setEmail('')
    }, 1500)
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">AI Chat Coming Soon</CardTitle>
            <CardDescription className="text-lg mt-2">
              We're fine-tuning our AI to provide you with the best productivity insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center">
                Our AI-powered chat feature will help you analyze your productivity data,
                provide personalized tips, and answer your questions about time management.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Currently in development</span>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Features to look forward to:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Personalized productivity analysis</li>
                  <li>AI-generated improvement suggestions</li>
                  <li>Real-time answers to your time management questions</li>
                  <li>Integration with your Pomodoro data</li>
                </ul>
              </div>
              <div className="text-center">
                <p className="mb-2">Want to be notified when it's ready?</p>
                <form onSubmit={handleSubmit} className="flex space-x-2 justify-center">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-xs"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      'Notify Me'
                    )}
                  </Button>
                </form>
                {submitStatus === 'success' && (
                  <p className="mt-2 text-sm text-green-600">
                    Thanks! We'll notify you when the AI Chat is ready.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
