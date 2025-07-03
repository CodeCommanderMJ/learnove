import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Building2 } from 'lucide-react';

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      icon: Star,
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for students getting started",
      features: [
        "Basic AI learning tools",
        "Limited course access",
        "Community support",
        "Basic progress tracking",
        "Mobile app access"
      ],
      buttonText: "Get Started Free",
      buttonStyle: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600",
      popular: false
    },
    {
      name: "Pro Learner",
      icon: Zap,
      price: { monthly: 9.99, yearly: 99.99 },
      description: "Ideal for serious learners",
      features: [
        "Full AI-powered course access",
        "Multilingual support (10+ languages)",
        "Advanced mind mapping",
        "Personalized learning paths",
        "AI study assistant",
        "Priority support",
        "Offline content access"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
      popular: true
    },
    {
      name: "Educator",
      icon: Crown,
      price: { monthly: 15, yearly: 150 },
      description: "Built for teachers and instructors",
      features: [
        "Everything in Pro Learner",
        "Automated lesson generation",
        "Smart grading system",
        "Class performance dashboard",
        "Student progress analytics",
        "Multilingual teaching tools",
        "Custom curriculum builder"
      ],
      buttonText: "Start Teaching",
      buttonStyle: "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700",
      popular: false
    },
    {
      name: "Enterprise",
      icon: Building2,
      price: { monthly: "Custom", yearly: "Custom" },
      description: "For schools and organizations",
      features: [
        "Everything in Educator",
        "Advanced analytics & reporting",
        "API integration",
        "Custom branding",
        "Dedicated account manager",
        "SSO integration",
        "Custom training programs",
        "24/7 premium support"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-green-600 hover:to-teal-700",
      popular: false
    }
  ];

  const calculateSavings = (monthly: number, yearly: number) => {
    if (typeof monthly !== 'number' || typeof yearly !== 'number') return 0;
    return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100);
  };

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 rounded-full border border-green-200 dark:border-green-800">
            <Crown className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Choose Your Plan
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Start free, then choose the plan that fits your learning or teaching needs. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg font-medium ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                isYearly ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                Save up to 20%
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular
                  ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      {typeof plan.price[isYearly ? 'yearly' : 'monthly'] === 'number' 
                        ? `$${plan.price[isYearly ? 'yearly' : 'monthly']}`
                        : plan.price[isYearly ? 'yearly' : 'monthly']
                      }
                    </span>
                    {typeof plan.price[isYearly ? 'yearly' : 'monthly'] === 'number' && (
                      <span className="text-lg text-gray-500 dark:text-gray-400 ml-2">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {isYearly && typeof plan.price.monthly === 'number' && typeof plan.price.yearly === 'number' && (
                    <div className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Save {calculateSavings(plan.price.monthly, plan.price.yearly)}% annually
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            7-Day Free Trial • No Credit Card Needed
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Try any paid plan risk-free for 7 days. Cancel anytime with no questions asked.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;