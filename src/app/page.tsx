import Link from 'next/link';



// tests

export default function HomePage() {
  return (
    <main className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to WhisperrClouds</h1>
        <p className="text-xl mb-8">Secure, decentralized storage for the privacy-conscious world</p>
        <div className="flex justify-center gap-4">
          <Link href="/signup" className="btn-primary">Get Started</Link>
          <Link href="/about" className="btn-secondary">Learn More</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose WhisperrClouds?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card">
            <h3 className="text-xl font-bold mb-2">Decentralized Storage</h3>
            <p>Your files are encrypted and distributed across the network, not in centralized servers.</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-bold mb-2">AI Integration</h3>
            <p>Powerful AI tools to organize, search, and extract insights from your data.</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
            <p>End-to-end encryption ensures only you can access your files.</p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="pricing-card">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-3xl font-bold mb-4">$0<span className="text-lg font-normal">/month</span></p>
            <ul className="mb-6">
              <li>5GB Storage</li>
              <li>Basic Encryption</li>
              <li>Limited AI Features</li>
            </ul>
            <Link href="/signup?plan=free" className="btn-outline block text-center">Sign Up</Link>
          </div>
          <div className="pricing-card highlight">
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-4">$9.99<span className="text-lg font-normal">/month</span></p>
            <ul className="mb-6">
              <li>500GB Storage</li>
              <li>Advanced Encryption</li>
              <li>Full AI Integration</li>
              <li>Priority Support</li>
            </ul>
            <Link href="/signup?plan=pro" className="btn-primary block text-center">Get Pro</Link>
          </div>
          <div className="pricing-card">
            <h3 className="text-2xl font-bold mb-2">Organization</h3>
            <p className="text-3xl font-bold mb-4">$29.99<span className="text-lg font-normal">/user/month</span></p>
            <ul className="mb-6">
              <li>2TB Storage</li>
              <li>Enterprise-grade Security</li>
              <li>Admin Dashboard</li>
              <li>User Management</li>
              <li>Custom Integrations</li>
            </ul>
            <Link href="/signup?plan=org" className="btn-outline block text-center">Contact Sales</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
