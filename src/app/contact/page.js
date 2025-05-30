"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Headphones,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    type: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <Card variant="gradient" size="lg">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-accent-green/20 border border-accent-green/30 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-accent-green" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-neutral-300">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                company: "",
                subject: "",
                message: "",
                type: "general"
              });
            }}
          >
            Send Another Message
          </Button>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card variant="glass" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Send us a message
          </h3>
          <p className="text-neutral-400">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Type */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            What can we help you with?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "general", label: "General Inquiry" },
              { value: "support", label: "Technical Support" },
              { value: "sales", label: "Sales Question" },
              { value: "partnership", label: "Partnership" },
            ].map((type) => (
              <label
                key={type.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                  formData.type === type.value
                    ? "border-primary-cyan bg-primary-cyan/10"
                    : "border-neutral-700 hover:border-neutral-600"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={type.value}
                  checked={formData.type === type.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-sm text-white">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Name and Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Company and Subject */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300"
              placeholder="Your company name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300"
              placeholder="Brief subject line"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300 resize-none"
            placeholder="Tell us more about your inquiry..."
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
          loading={isSubmitting}
          icon={<Send className="w-5 h-5" />}
          iconPosition="right"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
};

// Contact Info Component
const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "hello@warrantyai.com",
      action: "mailto:hello@warrantyai.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm PST",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      value: "Start a conversation",
      action: "#"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "San Francisco, CA",
      action: "#"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Get in touch
        </h3>
        <p className="text-neutral-400">
          We're here to help and answer any question you might have. 
          We look forward to hearing from you.
        </p>
      </div>

      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <motion.a
            key={index}
            href={method.action}
            className="block p-4 rounded-lg border border-neutral-700 hover:border-primary-cyan hover:bg-primary-cyan/5 transition-all duration-300 group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-neutral-800 group-hover:bg-primary-cyan/20 transition-colors duration-300">
                <method.icon className="w-5 h-5 text-primary-cyan" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">
                  {method.title}
                </h4>
                <p className="text-sm text-neutral-400 mb-1">
                  {method.description}
                </p>
                <p className="text-sm text-primary-cyan font-medium">
                  {method.value}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Office Hours */}
      <Card variant="glass" className="p-4">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-primary-cyan mt-1" />
          <div>
            <h4 className="font-semibold text-white mb-2">Office Hours</h4>
            <div className="space-y-1 text-sm text-neutral-400">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 6:00 PM PST</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM PST</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-blue/20 border border-primary-blue/30 rounded-full text-primary-cyan text-sm font-medium mb-6">
              <Headphones className="w-4 h-4" />
              <span>We're Here to Help</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6">
              <span className="text-white">Get in</span>
              <br />
              <span className="gradient-text">Touch</span>
            </h1>

            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Have questions about WarrantyAI? Need help getting started? 
              Our team is here to help you protect your warranties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ContactForm />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ContactInfo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
              <span className="text-white">Frequently Asked</span>
              <br />
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-neutral-300">
              Quick answers to common questions about WarrantyAI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How quickly will I get a response?",
                answer: "We typically respond to all inquiries within 24 hours during business days."
              },
              {
                question: "Do you offer phone support?",
                answer: "Yes, phone support is available for Pro and Business plan customers during business hours."
              },
              {
                question: "Can I schedule a demo?",
                answer: "Absolutely! Contact our sales team to schedule a personalized demo of WarrantyAI."
              },
              {
                question: "Do you offer enterprise solutions?",
                answer: "Yes, we offer custom enterprise solutions. Contact us to discuss your specific needs."
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" className="h-full">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-white">
                      {faq.question}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
