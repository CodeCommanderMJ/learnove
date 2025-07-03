import React from 'react';
import { Play, Sparkles, Globe, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              AI-Powered Learning Revolution
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            Smart Learning,
            <br />
            Simplified
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            AI-Powered Education for Everyone! Learnova adapts to your learning style, 
            breaks down complex topics, and supports multiple languages—making education 
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> engaging & efficient</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-xl hover:shadow-2xl">
              <span className="flex items-center space-x-2">
                <span>Get Started for Free</span>
                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              </span>
            </button>
            <button className="group px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl">
              <span className="flex items-center space-x-2">
                <Play className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <span>Watch Demo Video</span>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">50K+</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Active Learners</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">10+</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Languages Supported</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mr-2" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">95%</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;