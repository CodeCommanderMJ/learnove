import React from 'react';
import { UserPlus, Settings, Rocket, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Sign Up in 30s",
      description: "Choose your role (Student/Teacher/Organization) and create your account instantly.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      icon: Settings,
      title: "Set Preferences",
      description: "Select your preferred language, subjects, and difficulty level for personalized experience.",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      icon: Rocket,
      title: "Start Learning/Teaching",
      description: "Jump right in! AI tailors content instantly based on your preferences and progress.",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/50 dark:to-teal-900/50 rounded-full border border-green-200 dark:border-green-800">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get started with Learnova in just three simple steps. Our AI-powered platform makes learning and teaching effortless.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-800 dark:via-purple-800 dark:to-green-800 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 z-10 relative">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-8">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.color}`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Animated Arrow for larger screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-20">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to get started?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join thousands of learners and educators already using Learnova
              </p>
            </div>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg whitespace-nowrap">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;