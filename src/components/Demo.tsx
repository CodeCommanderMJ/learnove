import React, { useState } from 'react';
import { Play, Download, FileText, Video, Users, BarChart3 } from 'lucide-react';

const Demo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState('student');

  const demoFeatures = {
    student: {
      title: "Student Experience",
      description: "See how AI adapts to your learning style",
      features: [
        "Personalized learning paths",
        "AI-generated explanations",
        "Interactive mind maps",
        "Real-time language switching"
      ],
      videoThumbnail: "https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop"
    },
    educator: {
      title: "Educator Tools",
      description: "Transform your teaching with AI assistance",
      features: [
        "One-click lesson generation",
        "Automated grading system",
        "Student progress analytics",
        "Multilingual content creation"
      ],
      videoThumbnail: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop"
    },
    enterprise: {
      title: "Enterprise Solutions",
      description: "Scale your training programs efficiently",
      features: [
        "Advanced analytics dashboard",
        "Custom branding options",
        "API integration capabilities",
        "Dedicated account management"
      ],
      videoThumbnail: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop"
    }
  };

  const tabs = [
    { id: 'student', label: 'Student', icon: Users },
    { id: 'educator', label: 'Educator', icon: Video },
    { id: 'enterprise', label: 'Enterprise', icon: BarChart3 }
  ];

  const currentDemo = demoFeatures[activeDemo as keyof typeof demoFeatures];

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full border border-blue-200 dark:border-blue-800">
            <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              See It In Action
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            See Learnova in Action!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Watch how our AI-powered platform transforms learning and teaching experiences across different user types.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDemo(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 mx-2 mb-4 ${
                  activeDemo === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Demo Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Player */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src={currentDemo.videoThumbnail}
                  alt={`${currentDemo.title} demo`}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                  <button className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {currentDemo.title} Demo
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                      2:30 minutes • HD Quality
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {currentDemo.title}
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {currentDemo.description}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Key Features Demonstrated:
                </h4>
                <ul className="space-y-3">
                  {currentDemo.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <Play className="w-5 h-5" />
                  <span>Watch Full Demo</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                  <Download className="w-5 h-5" />
                  <span>Download Guide</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Feature Guide
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Comprehensive guide covering all Learnova features and capabilities.
              </p>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                Download PDF →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Video Tutorials
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Step-by-step video tutorials for getting started with Learnova.
              </p>
              <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                Watch Now →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Live Demo
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Schedule a personalized demo with our team to see Learnova in action.
              </p>
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
                Book Demo →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;