'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Brain, Timer } from 'lucide-react'
import Header from '../header';
import Link from 'next/link';

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/about.json')
      .then((response) => response.json())
      .then((data) => {
        setAboutData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading about data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center text-destructive">
        Failed to load about information.
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">{aboutData.title}</h1>
        <p className="text-xl text-center text-muted-foreground mb-8">{aboutData.slogan}</p>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{aboutData.mission}</p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What is Pomodoring?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{aboutData.description}</p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {aboutData.features.map((feature, index) => {
            const icons = [
              <Timer className="w-8 h-8 mb-2 text-primary" key="timer" />,
              <Brain className="w-8 h-8 mb-2 text-primary" key="brain" />,
              <BarChart3 className="w-8 h-8 mb-2 text-primary" key="chart" />
            ];

            return (
              <Card key={index}>
                <CardHeader>
                  {icons[index]}
                  <CardTitle>{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {feature.description}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Created by{' '}
            <a 
              href={aboutData.author.website}
              className="text-primary hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {aboutData.author.name}
            </a>
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <Link href="/terms" className="text-muted-foreground hover:text-primary underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
