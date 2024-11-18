'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'
import Header from '../header'

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      description: "Get started with basic Pomodoro tracking",
      price: "$0",
      originalPrice: "$0",
      discount: null,
      interval: "forever",
      features: ["Pomodoro Timer"],
      buttonText: "Start for Free",
      buttonVariant: "outline",
    },
    {
      name: "Annual",
      description: "Unlock advanced features for a year",
      price: "$5",
      originalPrice: "$10",
      discount: "50% off",
      interval: "per year",
      features: [
        "Pomodoro Timer",
        "AI-powered Analysis",
        "Dynamic AI-generated Visual Data",
        "Advanced Features",
      ],
      buttonText: "Subscribe Annually",
      buttonVariant: "default",
    },
    {
      name: "Lifetime",
      description: "Get unlimited access forever",
      price: "$10",
      originalPrice: "$20",
      discount: "50% off",
      interval: "one-time",
      features: [
        "Pomodoro Timer",
        "AI-powered Analysis",
        "Dynamic AI-generated Visual Data",
        "Advanced Features",
        "Lifetime Updates",
      ],
      buttonText: "Get Lifetime Access",
      buttonVariant: "default",
      isPopular: true,
    },
  ]

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">Pricing Plans</h1>
        <p className="text-xl text-center text-muted-foreground mb-8">
          Choose the perfect plan for your productivity journey
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col hover:shadow-lg transition-shadow duration-300 ${
                plan.isPopular ? 'border-primary ring-1 ring-primary' : ''
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.name}
                  {plan.isPopular && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Best Value
                    </span>
                  )}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.discount && (
                      <span className="text-sm font-medium text-green-500 bg-green-100 dark:bg-green-900/20 px-2 py-0.5 rounded">
                        {plan.discount}
                      </span>
                    )}
                  </div>
                  {plan.originalPrice !== plan.price && (
                    <div className="text-sm text-muted-foreground line-through mt-1">
                      Original price: {plan.originalPrice}
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground mt-1">
                    {plan.interval}
                  </div>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Prices shown are in USD. Limited time offer.</p>
          <p className="mt-1">All plans include a 30-day money-back guarantee.</p>
        </div>
      </div>
    </>
  )
}
