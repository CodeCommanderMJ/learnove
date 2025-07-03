import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Learnova cut my study time in half—the AI videos make everything click! The personalized learning paths are incredible.",
      name: "Rahul Sharma",
      role: "College Student",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      quote: "Creating multilingual courses has never been easier! My students love the interactive content and real-time translations.",
      name: "Dr. Elena Rodriguez",
      role: "University Professor",
      rating: 5,
      avatar: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      quote: "Our employee training costs dropped by 40% with Learnova. The analytics dashboard gives us incredible insights into learning progress.",
      name: "Michael Chen",
      role: "TechCorp HR Director",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      quote: "The AI-powered mind maps help me visualize complex concepts. I've never been more engaged with learning!",
      name: "Sarah Johnson",
      role: "Graduate Student",
      rating: 5,
      avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      quote: "Learnova transformed how I teach. The automated grading saves me hours every week, and my students' engagement has skyrocketed.",
      name: "James Wilson",
      role: "High School Teacher",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(rating)].map((_, i) => (
      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/50 dark:to-orange-900/50 rounded-full border border-yellow-200 dark:border-yellow-800">
            <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              What Our Users Say
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join the community of learners, educators, and organizations who've transformed their educational experience with Learnova.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-start mb-6">
              <Quote className="w-12 h-12 text-blue-500 dark:text-blue-400 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-200 dark:border-blue-800"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-500 dark:bg-blue-400 w-8'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Thumbnail previews */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`p-4 rounded-2xl border transition-all duration-300 transform hover:scale-105 ${
                  index === currentIndex
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
                />
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {testimonial.role}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;