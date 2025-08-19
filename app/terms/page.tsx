// Force rebuild
export default function TermsPage() {
  return (
    <div className="container-narrow py-20">
      <h1 className="h1 mb-8">Terms of Service</h1>
      <p className="text-sm text-muted mb-8">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="h3 mb-4">1. Agreement to Terms</h2>
          <p className="text-secondary mb-4">
            By accessing or using any of Aaron Greenberg's tools and services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you do not have permission to access the Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">2. Description of Services</h2>
          <p className="text-secondary mb-4">
            Aaron Greenberg provides various software tools including but not limited to:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Subscription Tracker - Financial subscription management tool</li>
            <li>CRE Investment Tool - Commercial real estate analysis tool</li>
            <li>Auto Broker Assistant - Vehicle inventory tracking tool</li>
            <li>Other tools and services as made available</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">3. User Accounts and Security</h2>
          <p className="text-secondary mb-4">
            When you create an account, you must provide accurate and complete information. You are responsible for:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Maintaining the security of your account and password</li>
            <li>All activities that occur under your account</li>
            <li>Immediately notifying us of any unauthorized use</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">4. Privacy and Data Security</h2>
          <p className="text-secondary mb-4">
            Your use of our Services is also governed by our Privacy Policy. For tools handling financial data:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Data is encrypted in transit and at rest</li>
            <li>We never sell or share your personal information</li>
            <li>You maintain ownership of all your data</li>
            <li>You can request data deletion at any time</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">5. Acceptable Use</h2>
          <p className="text-secondary mb-4">
            You agree not to use the Services to:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit malicious code or interfere with the Services</li>
            <li>Attempt to gain unauthorized access to any systems</li>
            <li>Use the Services for any illegal or harmful purpose</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">6. Payment Terms</h2>
          <p className="text-secondary mb-4">
            Payment processing is handled by Paddle.com. By subscribing to paid Services:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>You authorize recurring charges based on your selected plan</li>
            <li>Prices may change with 30 days notice</li>
            <li>Refunds are governed by our Refund Policy</li>
            <li>You can cancel anytime from your account dashboard</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">7. Intellectual Property</h2>
          <p className="text-secondary mb-4">
            The Services and all associated content, features, and functionality are owned by Aaron Greenberg and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">8. Disclaimer of Warranties</h2>
          <p className="text-secondary mb-4">
            THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">9. Limitation of Liability</h2>
          <p className="text-secondary mb-4">
            IN NO EVENT SHALL AARON GREENBERG BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">10. Termination</h2>
          <p className="text-secondary mb-4">
            We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Services will cease immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">11. Changes to Terms</h2>
          <p className="text-secondary mb-4">
            We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">12. Contact Information</h2>
          <p className="text-secondary mb-4">
            For questions about these Terms, please contact:
          </p>
          <p className="text-secondary">
            Aaron Greenberg<br />
            Email: aaron@aarongreenberg.net
          </p>
        </section>
      </div>
    </div>
  )
}