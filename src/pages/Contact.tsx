import React, { useState } from 'react'
import { Phone, Mail, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the contact form data to your backend
    console.log('Contact form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      title: 'Location',
      details: ['Nchiru, Meru County', 'Near Meru University', 'Serving Maua, Meru Town & surrounding areas'],
      color: 'pink'
    },
    {
      title: 'Phone',
      details: ['Available during working hours', 'Thursday - Sunday', '8:30 AM - 7:00 PM'],
      color: 'purple'
    },
    {
      title: 'Email',
      details: ['info@jaylocs.com', 'bookings@jaylocs.com', 'Quick response guaranteed'],
      color: 'pink'
    },
    {
      title: 'Working Hours',
      details: ['Thu-Sun: 8:30 AM - 7:00 PM', 'Mon-Wed: CLOSED', 'Appointments preferred'],
      color: 'purple'
    }
  ]

  const serviceAreas = [
    'Nchiru (Main Location)',
    'Meru Town',
    'Maua',
    'Meru University',
    'Katheri',
    'Kianjai',
    'Mitunguu',
    'Timau',
    'Nanyuki (special arrangements)'
  ]

  const faqs = [
    {
      question: 'Do I need to bring my own hair products?',
      answer: 'Yes, please bring your own braids, hair extensions, and any specific products you prefer. This ensures you get exactly what you want and helps us provide the best service.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept M-Pesa, Cash, PayPal, Payless (Kenya), and KCB Paybill. We also offer student discounts with valid university ID.'
    },
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 1-2 days in advance, especially for weekend appointments. Popular services like Sisterlocks may require longer advance booking.'
    },
    {
      question: 'Do you offer group discounts for events?',
      answer: 'Yes! We offer special rates for group bookings, weddings, and university events. Contact us for custom pricing for groups of 3 or more.'
    },
    {
      question: 'Can you travel to nearby areas?',
      answer: 'We primarily operate from our Meru Town location, but we can arrange special services for events in Maua, Nchiru, and other nearby areas with advance notice.'
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting JAYLOCS! We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Get in touch with our friendly team - we're here to help with all your beauty needs
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((info, index) => {
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-br ${
                      info.color === 'pink' 
                        ? 'from-pink-500 to-pink-600' 
                        : 'from-purple-500 to-purple-600'
                    } rounded-lg flex items-center justify-center mb-4`}>
                      {info.title === 'Location' && (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      )}
                      {info.title === 'Phone' && (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      )}
                      {info.title === 'Email' && (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      )}
                      {info.title === 'Working Hours' && (
                        <Clock className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Service Areas */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Areas We Serve</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-3 text-center">
                    <span className="text-sm font-medium text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.234567890123!2d37.6500000!3d0.0500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNchiru%2C%20Meru%2C%20Kenya!5e0!3m2!1sen!2ske!4v1234567890123!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="JAYLOCS Salon Location"
                ></iframe>
                
                {/* Business info overlay */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">J</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">JAYLOCS Salon</h4>
                      <p className="text-xs text-gray-600">Nchiru, Meru County</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      placeholder="0712345678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a subject...</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="services">Services Information</option>
                    <option value="pricing">Pricing Questions</option>
                    <option value="group">Group Booking</option>
                    <option value="complaint">Complaint/Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Payment Info */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Methods We Accept</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">M-Pesa</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Cash</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h8.418c2.508 0 4.514.893 5.535 2.459 1.008 1.566 1.008 3.618 0 5.184-1.021 1.566-3.027 2.459-5.535 2.459h-4.94l-1.018 4.865h2.629c.484 0 .875.381.875.852 0 .471-.391.852-.875.852H7.076c-.484 0-.875-.381-.875-.852 0-.471.391-.852.875-.852zm1.646-7.896h3.735c1.756 0 3.045-.635 3.598-1.777.553-1.142.553-2.651 0-3.793-.553-1.142-1.842-1.777-3.598-1.777H9.34L8.722 13.441z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">PayPal</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Payless</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-6.222 6.222a.749.749 0 01-1.06 0L6.432 10.54a.75.75 0 111.061-1.061l3.323 3.323L16.507 7.1a.75.75 0 111.061 1.06z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">KCB Paybill</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact