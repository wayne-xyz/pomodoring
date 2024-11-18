'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from '../header'

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Pomodoring, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Pomodoring is a productivity tracking application that provides Pomodoro timer functionality,
              productivity analytics, and AI-powered insights.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials
              and for all activities that occur under your account.
            </p>

            <h2>4. Subscription and Payments</h2>
            <ul>
              <li>Subscription fees are billed in advance</li>
              <li>All purchases are final and non-refundable, except as required by law</li>
              <li>You may cancel your subscription at any time</li>
            </ul>

            <h2>5. Data Usage</h2>
            <p>
              We collect and process your data as described in our Privacy Policy. By using Pomodoring,
              you consent to such processing and warrant that all data provided by you is accurate.
            </p>

            <h2>6. AI Features</h2>
            <p>
              Our AI-powered features are provided "as is." While we strive for accuracy, we do not
              guarantee the accuracy or reliability of AI-generated content and suggestions.
            </p>

            <h2>7. Prohibited Activities</h2>
            <ul>
              <li>Violating any applicable laws or regulations</li>
              <li>Interfering with the proper functioning of the service</li>
              <li>Attempting to access areas or features you are not authorized to access</li>
              <li>Using the service for any illegal or unauthorized purpose</li>
            </ul>

            <h2>8. Modifications to Service</h2>
            <p>
              We reserve the right to modify or discontinue any portion of our service with or
              without notice. We will not be liable to you or any third party for any modification,
              suspension, or discontinuance.
            </p>

            <h2>9. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account and access to the service
              at our sole discretion, without notice, for conduct that we believe violates these
              Terms of Service or is harmful to other users, us, or third parties.
            </p>

            <h2>10. Contact Information</h2>
            <p>
              For any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:support@pomodoring.com">support@pomodoring.com</a>
            </p>

            <div className="mt-8 text-sm text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
