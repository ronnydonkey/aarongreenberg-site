export default function RefundPage() {
  return (
    <div className="container-narrow py-20">
      <h1 className="h1 mb-8">Refund Policy</h1>
      <p className="text-sm text-muted mb-8">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="h3 mb-4">Our Commitment</h2>
          <p className="text-secondary mb-4">
            We want you to be completely satisfied with our tools. If you're not happy, we're not happy. 
            That's why we offer a straightforward refund policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">7-Day Money-Back Guarantee</h2>
          <p className="text-secondary mb-4">
            All paid subscriptions come with a 7-day money-back guarantee. If you're not satisfied within 
            the first 7 days of your subscription, we'll refund your payment in full - no questions asked.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">How to Request a Refund</h2>
          <p className="text-secondary mb-4">
            To request a refund within your 7-day trial period:
          </p>
          <ol className="list-decimal list-inside text-secondary mb-4 space-y-2">
            <li>Email us at refunds@aarongreenberg.net</li>
            <li>Include your account email and order number</li>
            <li>Let us know why you're canceling (optional but helpful)</li>
          </ol>
          <p className="text-secondary mb-4">
            We'll process your refund within 5-10 business days.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">After 7 Days</h2>
          <p className="text-secondary mb-4">
            After the 7-day guarantee period:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Monthly subscriptions: No refunds for partial months</li>
            <li>Annual subscriptions: Pro-rated refund may be available at our discretion</li>
            <li>You can always cancel to prevent future charges</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">Special Circumstances</h2>
          <p className="text-secondary mb-4">
            We may issue refunds outside the 7-day window for:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Extended service outages (more than 24 hours)</li>
            <li>Billing errors or duplicate charges</li>
            <li>Documented technical issues preventing use of the service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">What's Not Refundable</h2>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Custom development or consulting work</li>
            <li>Services already rendered</li>
            <li>Accounts terminated for Terms of Service violations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">Payment Processing</h2>
          <p className="text-secondary mb-4">
            Refunds are processed through Paddle.com, our payment processor. The refund will be 
            credited to the original payment method used for the purchase.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">Cancellation</h2>
          <p className="text-secondary mb-4">
            You can cancel your subscription at any time:
          </p>
          <ul className="list-disc list-inside text-secondary mb-4 space-y-2">
            <li>Through your account dashboard</li>
            <li>By emailing support@aarongreenberg.net</li>
            <li>Cancellation takes effect at the end of your current billing period</li>
            <li>You'll retain access until the end of your paid period</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="h3 mb-4">Questions?</h2>
          <p className="text-secondary mb-4">
            If you have any questions about our refund policy, please contact:
          </p>
          <p className="text-secondary">
            Email: support@aarongreenberg.net<br />
            Response time: Within 24 hours
          </p>
        </section>
      </div>
    </div>
  )
}