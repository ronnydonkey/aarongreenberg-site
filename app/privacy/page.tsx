export default function PrivacyPage() {
  return (
    <div className="container-narrow py-20">
      <h1 className="h1 mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted mb-8">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="h3 mb-4">1. Introduction</h2>
          <p className="text-secondary mb-4">
            Aaron Greenberg ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our tools and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">2. Information We Collect</h2>
          
          <h3 className="h4 mb-2 mt-4">Information you provide:</h3>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Email address (for account creation and communications)</li>
            <li>Payment information (processed securely by Paddle.com)</li>
            <li>Financial data you upload (for Subscription Tracker)</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="h4 mb-2 mt-4">Information collected automatically:</h3>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Usage data and analytics</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">3. How We Use Your Information</h2>
          <p className="text-secondary mb-4">We use your information to:</p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Provide and maintain our Services</li>
            <li>Process payments and send receipts</li>
            <li>Send important service updates</li>
            <li>Respond to support requests</li>
            <li>Improve our Services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">4. Financial Data Security</h2>
          <p className="text-secondary mb-4">
            For tools that process financial information (like Subscription Tracker):
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>All data is encrypted using industry-standard AES-256 encryption</li>
            <li>We use TLS/SSL for all data transmission</li>
            <li>Access is restricted to your account only</li>
            <li>We never store raw bank credentials</li>
            <li>Financial data is never sold or shared with third parties</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">5. Data Sharing and Third Parties</h2>
          <p className="text-secondary mb-4">
            We do not sell, trade, or rent your personal information. We may share data with:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li><strong>Paddle.com:</strong> For payment processing (they have their own privacy policy)</li>
            <li><strong>Vercel:</strong> For hosting services</li>
            <li><strong>Supabase:</strong> For database services</li>
            <li><strong>Legal requirements:</strong> If required by law or to protect our rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">6. Your Rights</h2>
          <p className="text-secondary mb-4">You have the right to:</p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data in a portable format</li>
            <li>Opt-out of marketing communications</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">7. Data Retention</h2>
          <p className="text-secondary mb-4">
            We retain your data only as long as necessary to provide our Services:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Account data: Until you delete your account</li>
            <li>Financial data: Until you delete it or close your account</li>
            <li>Payment records: As required by law (typically 7 years)</li>
            <li>Analytics data: Maximum 2 years</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">8. Cookies</h2>
          <p className="text-secondary mb-4">
            We use essential cookies to:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Keep you logged in</li>
            <li>Remember your preferences</li>
            <li>Ensure security</li>
            <li>Analyze usage (anonymized)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">9. Children's Privacy</h2>
          <p className="text-secondary mb-4">
            Our Services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">10. International Data Transfers</h2>
          <p className="text-secondary mb-4">
            Your data may be processed in the United States. By using our Services, you consent to the transfer of your data to the United States.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">11. Changes to This Policy</h2>
          <p className="text-secondary mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">12. Contact Us</h2>
          <p className="text-secondary mb-4">
            For privacy-related questions or to exercise your rights:
          </p>
          <p className="text-secondary">
            Aaron Greenberg<br />
            Email: privacy@aarongreenberg.net<br />
            Or: aaron@aarongreenberg.net
          </p>
        </section>
      </div>
    </div>
  )
}