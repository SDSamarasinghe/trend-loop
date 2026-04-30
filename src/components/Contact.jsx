import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_CUSTOMER_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_CUSTOMER_TEMPLATE_ID;
const EMAILJS_ADMIN_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID;
const EMAILJS_CONTACT_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID;

// Initialize EmailJS from environment variables.
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

const subscriptionPackages = [
  {
    name: 'In Studio',
    price: '$549',
    description: 'Starter / Clean Content. Best for simple, controlled brand presence.',
    features: ['10 reels', 'Standard scripting & engagement', 'Standard edits', 'Studio-only shoot', 'Perfect if you just want to stay consistent.'],
    badge: 'Starter',
  },
  {
    name: 'In & Outdoor Sessions',
    price: '$899',
    description: 'Balanced Growth Package. Best for brands that want a lifestyle plus studio mix.',
    features: ['10 reels', 'Standard scripting & engagement', 'Standard edits', 'Studio + nearby locations', 'This is where your content starts to feel alive.'],
    badge: 'Balanced growth',
    featured: true,
  },
  {
    name: 'Fully Outdoor Sessions',
    price: '$1,499',
    description: 'Storytelling & Authority. Best for building a strong personal brand and trust.',
    features: ['12 reels', 'Background research & content strategy', 'Viral-focused scripting', 'Moderate edits', 'Multiple outdoor locations'],
    badge: 'Authority builder',
  },
  {
    name: 'Elite Brand Domination',
    price: '$4,999',
    description: 'High-Ticket Premium. This is the one that makes everything else feel small.',
    features: [
      '30 days of content system',
      'Deep brand strategy + competitor breakdown',
      'Custom viral content system (hooks, scripts, positioning)',
      '2 full-day cinematic production (multi-location)',
      'Teleprompter setup for smooth delivery',
      '20 high-performing reels',
      'High-end cinematic edits + color grading',
      'Content designed for Meta Ads performance',
      'Posting guidance + content calendar',
      'Priority delivery + revisions',
      'Direct creative direction on shoot day',
    ],
    badge: 'High-ticket premium',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planRequestData, setPlanRequestData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
  });
  const [planSubmitting, setPlanSubmitting] = useState(false);
  const [planStatus, setPlanStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlanRequestChange = (e) => {
    setPlanRequestData({
      ...planRequestData,
      [e.target.name]: e.target.value,
    });
  };

  const openPlanModal = (pkg) => {
    setSelectedPlan(pkg);
    setPlanRequestData({
      name: '',
      email: '',
      contactNumber: '',
      address: '',
    });
    setPlanStatus('');
    setPlanModalOpen(true);
  };

  const handlePlanRequestSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlan) {
      return;
    }

    setPlanSubmitting(true);
    setPlanStatus('');

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_CUSTOMER_TEMPLATE_ID || !EMAILJS_ADMIN_TEMPLATE_ID) {
        throw new Error('Missing EmailJS environment variables');
      }

      // Send confirmation email to customer
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CUSTOMER_TEMPLATE_ID,
        {
          to_email: planRequestData.email,
          name: planRequestData.name,
          email: planRequestData.email,
          contact_number: planRequestData.contactNumber,
          address: planRequestData.address,
          plan_name: selectedPlan.name,
          plan_price: selectedPlan.price,
          plan_description: selectedPlan.description,
        }
      );

      // Send admin alert email with lead details
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          to_email: 'trendloopinfo.ca@gmail.com',
          name: planRequestData.name,
          email: planRequestData.email,
          customer_name: planRequestData.name,
          customer_email: planRequestData.email,
          contact_number: planRequestData.contactNumber,
          address: planRequestData.address,
          plan_name: selectedPlan.name,
          plan_price: selectedPlan.price,
          plan_description: selectedPlan.description,
        }
      );

      setPlanStatus('success');
      setPlanRequestData({
        name: '',
        email: '',
        contactNumber: '',
        address: '',
      });
      setTimeout(() => {
        setPlanModalOpen(false);
        setPlanStatus('');
      }, 2000);
    } catch (error) {
      console.error('Plan request send failed:', error);
      setPlanStatus('error');
    } finally {
      setPlanSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_CONTACT_TEMPLATE_ID || !EMAILJS_CUSTOMER_TEMPLATE_ID) {
        throw new Error('Missing EmailJS environment variables');
      }

      // Send email to your inbox
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE_ID,
        {
          to_email: 'trendloopinfo.ca@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          message: formData.message,
          reply_to: formData.email
        }
      );

      // Send confirmation email to customer
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CUSTOMER_TEMPLATE_ID,
        {
          to_email: formData.email,
          from_name: formData.name,
          message: formData.message
        }
      );

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-white to-[#FFFBF0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-bold leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="text-black">Let's Start Your </span>
            <span className="bg-gradient-to-r from-[#FF9933] to-[#FF9933] bg-clip-text text-transparent">Next Project</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to elevate your brand? Get in touch with our team and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#FF9933]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#FF9933]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Email Us</h4>
                    <a href="mailto:trendloopinfo.ca@gmail.com" className="text-gray-600 hover:text-[#FF9933] transition-colors">
                      trendloopinfo.ca@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#FF9933]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#FF9933]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Call Us</h4>
                    <a href="tel:+14374232991" className="text-gray-600 hover:text-[#FF9933] transition-colors">
                      +1 (437) 423-2991
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#FF9933]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#FF9933]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Location</h4>
                    <p className="text-gray-600">
                      Ajax, Ontario<br />
                      Canada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none transition-all"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF9933] hover:bg-[#E68A2E] disabled:bg-gray-400 text-white font-semibold px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-5 h-5" />
              </button>

              {status === 'success' && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                  ✗ Failed to send message. Please try again or call us directly.
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#FF9933]/10">
          <div className="text-center mb-10">
           
            <h3 className="text-3xl md:text-4xl font-bold text-black">Choose your plan</h3>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Select the reel package that best fits your content goals and production style.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {subscriptionPackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`overflow-hidden rounded-[28px] border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  'border-[#FF9933]/25 shadow-lg'
                }`}
              >
                <div className="bg-slate-900 px-7 py-8 text-white">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-lg font-semibold">{pkg.name}</p>
                      <div className="mt-2 flex items-end gap-2">
                        <span className="text-5xl font-semibold leading-none">{pkg.price}</span>
                        <span className="mb-1 text-sm text-white/80">/ package</span>
                      </div>
                    </div>
                   
                  </div>
                  <p className="text-sm leading-6 text-white/80">{pkg.description}</p>
                </div>

                <div className="px-7 py-8">
                  <ul className="space-y-4">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#FF9933]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => openPlanModal(pkg)}
                    className={`mt-8 w-full rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
                      pkg.featured
                        ? 'bg-[#F1F4FF] text-[#5A67D8] hover:bg-[#E8ECFF]'
                        : 'bg-[#F1F4FF] text-[#5A67D8] hover:bg-[#E8ECFF]'
                    }`}
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={planModalOpen} onOpenChange={setPlanModalOpen}>
          <DialogContent className="max-w-xl border-0 bg-white p-0 shadow-2xl">
            <div className="rounded-2xl border border-[#FF9933]/10 bg-gradient-to-br from-white to-[#FFFBF0] p-6 md:p-8">
              <DialogHeader className="text-left">
                <DialogTitle className="text-2xl font-bold text-black">
                  Choose Your Plan
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Share your details and we’ll follow up about {selectedPlan?.name} ({selectedPlan?.price}).
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handlePlanRequestSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="plan-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="plan-name"
                    name="name"
                    value={planRequestData.name}
                    onChange={handlePlanRequestChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#FF9933]"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="plan-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="plan-email"
                    name="email"
                    value={planRequestData.email}
                    onChange={handlePlanRequestChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#FF9933]"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="plan-contact-number" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="plan-contact-number"
                    name="contactNumber"
                    value={planRequestData.contactNumber}
                    onChange={handlePlanRequestChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#FF9933]"
                    placeholder="+1 (437) 423-2991"
                  />
                </div>

                <div>
                  <label htmlFor="plan-address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    id="plan-address"
                    name="address"
                    value={planRequestData.address}
                    onChange={handlePlanRequestChange}
                    required
                    rows="4"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#FF9933] resize-none"
                    placeholder="Street, city, province"
                  />
                </div>

                <div className="rounded-xl border border-[#FF9933]/15 bg-white px-4 py-3 text-sm text-gray-700">
                  Selected plan: <span className="font-semibold text-black">{selectedPlan?.name}</span>
                </div>

                {planStatus === 'success' && (
                  <div className="rounded-lg bg-green-100 p-3 text-sm text-green-700">
                    Your plan request was sent successfully.
                  </div>
                )}

                {planStatus === 'error' && (
                  <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
                    Failed to send your request. Please try again.
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setPlanModalOpen(false)}
                    className="w-full rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={planSubmitting}
                    className="w-full rounded-full bg-[#FF9933] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#E68A2E] disabled:bg-gray-400"
                  >
                    {planSubmitting ? 'Submitting...' : 'Submit Details'}
                  </button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Contact;
