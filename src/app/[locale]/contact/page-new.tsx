'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/i18n/pure-static';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoConfigs, generateOrganizationSchema } from '@/lib/seo/metadata';
import { StructuredData } from '@/components/seo/structured-data';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' }
  ];
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  category: string;
  message: string;
}

const contactCategories = [
  'general',
  'sales',
  'support',
  'partnership',
  'careers',
  'media'
];

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    category: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission for static site
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        category: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Us",
          "description": "Get in touch with Broadway Corporation for STEM education solutions",
          "url": "https://broadway-enterprise.com/contact"
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform education with innovative STEM solutions? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              
              {/* Contact Details */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📍</span>
                  Visit Us
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-blue-600 mr-3 mt-1">🏢</div>
                    <div>
                      <p className="font-semibold text-gray-900">Broadway Corporation</p>
                      <p className="text-gray-700">No 225 Batibo St, Simbock</p>
                      <p className="text-gray-700">Yaoundé, Cameroon</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-green-600 mr-3">📞</div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <a
                        href="tel:+237677181487"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        +237 677 181 487
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Contacts */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">✉️</span>
                  Email Us
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="text-blue-600 mr-3">💼</div>
                    <div>
                      <p className="font-semibold text-gray-900">General Inquiries</p>
                      <a
                        href="mailto:enquiries@broadway-corp.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        enquiries@broadway-corp.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-green-600 mr-3">🚀</div>
                    <div>
                      <p className="font-semibold text-gray-900">Career Opportunities</p>
                      <a
                        href="mailto:careers@broadway-corp.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        careers@broadway-corp.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-purple-600 mr-3">🛠️</div>
                    <div>
                      <p className="font-semibold text-gray-900">Technical Support</p>
                      <a
                        href="mailto:support@broadway-corp.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        support@broadway-corp.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">🗺️</span>
                  Find Us
                </h2>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://maps.app.goo.gl/XpHutDENAEoZzqf76?g_st=com.google.maps.preview.copy"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Broadway Corporation Location - Simbock, Yaoundé, Cameroon"
                  ></iframe>
                </div>
                <div className="mt-4 text-center">
                  <a
                    href="https://maps.app.goo.gl/XpHutDENAEoZzqf76?g_st=com.google.maps.preview.copy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span className="mr-2">🗺️</span>
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                  <p className="text-gray-600">
                    Have a question or want to discuss a project? We'd love to hear from you.
                  </p>
                </div>

                {submitStatus === 'success' ? (
                  <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 text-center border border-green-200">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-green-700 mb-4">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="c-name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="c-name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="c-email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="c-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-msg" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="c-msg"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        rows={6}
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
