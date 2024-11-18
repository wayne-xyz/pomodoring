'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'
import Header from '../header'
import { useEffect, useState } from 'react'

export default function PricingPage() {
  const [pricingData, setPricingData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/content/priceplan.json')
      .then(response => response.json())
      .then(data => {
        setPricingData(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading pricing data:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] flex items-center justify-center">
          Loading pricing plans...
        </div>
      </>
    )
  }

  if (!pricingData) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] flex items-center justify-center text-red-500">
          Error loading pricing plans. Please try again later.
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center mb-2">{pricingData.title}</h1>
        <p className="text-xl text-center text-muted-foreground mb-8">
          {pricingData.subtitle}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingData.plans.map((plan) => (
            <Card 
              key={plan.name} 
              className="flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.name}
                  {plan.isPopular && (
                    <span className={pricingData.popularBadge.className}>
                      {pricingData.popularBadge.text}
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
          <p>{pricingData.footer.currency}</p>
          <p className="mt-1">{pricingData.footer.guarantee}</p>
        </div>
      </div>
    </>
  )
}
