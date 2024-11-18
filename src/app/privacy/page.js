'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from '../header'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>1. Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>Email address (when you subscribe or create an account)</li>
              <li>Name (optional, for personalization)</li>
              <li>Payment information (processed securely through our payment provider)</li>
            </ul>

            <h3>Usage Data</h3>
            <ul>
              <li>Pomodoro session data</li>
              <li>Productivity metrics</li>
              <li>App preferences and settings</li>
              <li>AI chat interactions</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>

            <h2>3. Data Storage and Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the Internet or electronic storage is
              100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>4. AI Data Processing</h2>
            <p>
              Our AI features process your productivity data to provide personalized insights.
              This data is processed securely and is not shared with third parties. AI models
              are trained on anonymized data only.
            </p>

            <h2>5. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share anonymized, aggregated
              data for analytical purposes. Your personal information may be shared with:
            </p>
            <ul>
              <li>Service providers (e.g., hosting, payment processing)</li>
              <li>Law enforcement (when legally required)</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service
              and hold certain information. You can instruct your browser to refuse all cookies
              or to indicate when a cookie is being sent.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
              Our service is not intended for use by children under the age of 13. We do not
              knowingly collect personal information from children under 13.
            </p>

            <h2>9. Changes to Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the
              "Last updated" date.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@pomodoring.com">privacy@pomodoring.com</a>
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
