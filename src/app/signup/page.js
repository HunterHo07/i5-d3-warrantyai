"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  CheckCircle,
  Shield,
  Zap,
  Clock,
  ArrowRight,
  Building
} from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

// Signup Form Component
const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    plan: "free",
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Basic validation
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate signup process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to dashboard (simulated)
    alert("Account created successfully! Redirecting to dashboard...");
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  return (
    <Card variant="glass" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Create Your Account
          </h2>
          <p className="text-neutral-400">
            Start protecting your warranties today with a free account
          </p>
        </div>

        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Choose your plan
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "free", label: "Free", price: "$0" },
              { value: "pro", label: "Pro", price: "$9.99" },
              { value: "family", label: "Family", price: "$19.99" },
            ].map((plan) => (
              <label
                key={plan.value}
                className={`flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                  formData.plan === plan.value
                    ? "border-primary-cyan bg-primary-cyan/10"
                    : "border-neutral-700 hover:border-neutral-600"
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  value={plan.value}
                  checked={formData.plan === plan.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-sm font-medium text-white">{plan.label}</span>
                <span className="text-xs text-neutral-400">{plan.price}/month</span>
              </label>
            ))}
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-neutral-800/50 border rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300 ${
                  errors.firstName ? "border-accent-red" : "border-neutral-700"
                }`}
                placeholder="John"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-accent-red">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-neutral-800/50 border rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300 ${
                  errors.lastName ? "border-accent-red" : "border-neutral-700"
                }`}
                placeholder="Doe"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-accent-red">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-neutral-800/50 border rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300 ${
                errors.email ? "border-accent-red" : "border-neutral-700"
              }`}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-accent-red">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 bg-neutral-800/50 border rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300 ${
                errors.password ? "border-accent-red" : "border-neutral-700"
              }`}
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-accent-red">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 bg-neutral-800/50 border rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300 ${
                errors.confirmPassword ? "border-accent-red" : "border-neutral-700"
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-accent-red">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-primary-cyan bg-neutral-800 border-neutral-600 rounded focus:ring-primary-cyan focus:ring-2"
            />
            <span className="text-sm text-neutral-300">
              I agree to the{" "}
              <Link href="/terms" className="text-primary-cyan hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary-cyan hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-sm text-accent-red">{errors.agreeToTerms}</p>
          )}

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="subscribeNewsletter"
              checked={formData.subscribeNewsletter}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-primary-cyan bg-neutral-800 border-neutral-600 rounded focus:ring-primary-cyan focus:ring-2"
            />
            <span className="text-sm text-neutral-300">
              Send me product updates and warranty management tips
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
          loading={isSubmitting}
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-neutral-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-cyan hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Card>
  );
};

// Benefits Component
const SignupBenefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-grade security"
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get started in under 2 minutes with our guided onboarding"
    },
    {
      icon: Clock,
      title: "14-Day Free Trial",
      description: "Try all premium features risk-free for 14 days"
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Why Choose WarrantyAI?
        </h3>
        <p className="text-neutral-400">
          Join thousands of users who never miss a warranty again.
        </p>
      </div>

      <div className="space-y-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="p-3 rounded-lg bg-primary-blue/20 border border-primary-blue/30">
              <benefit.icon className="w-6 h-6 text-primary-cyan" />
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-1">
                {benefit.title}
              </h4>
              <p className="text-neutral-400 text-sm">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <Card variant="glass" className="p-4">
        <div className="text-center space-y-3">
          <div className="flex justify-center space-x-4">
            {[
              { label: "50K+", sublabel: "Users" },
              { label: "99.2%", sublabel: "AI Accuracy" },
              { label: "$2.5M+", sublabel: "Saved" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold gradient-text">
                  {stat.label}
                </div>
                <div className="text-xs text-neutral-400">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-neutral-500">
            Trusted by thousands of users worldwide
          </p>
        </div>
      </Card>
    </div>
  );
};

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Navigation */}
      <Navigation />
      
      {/* Signup Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SignupForm />
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SignupBenefits />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-16 bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Building className="w-12 h-12 text-primary-cyan mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Need an Enterprise Solution?
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Get custom pricing, dedicated support, and advanced features for your organization.
            </p>
            
            <Button
              variant="outline"
              size="lg"
              href="/contact"
            >
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
