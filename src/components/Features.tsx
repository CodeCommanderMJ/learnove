import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Building, 
  Target, 
  Video, 
  Brain, 
  Globe, 
  Zap,
  FileText,
  BarChart3,
  Languages,
  TrendingUp
} from 'lucide-react';

const Features: React.FC = () => {
  const studentFeatures = [
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description: "AI adjusts difficulty & content based on your progress and learning style."
    },
    {
      icon: Video,
      title: "Visual Explainer Videos",
      description: "AI-generated animations and videos for tough concepts made simple."
    },
    {
      icon: Brain,
      title: "Smart Mind Maps",
      description: "Break down complex topics visually with intelligent mind mapping."
    },
    {
      icon: Globe,
      title: "Real-Time Language Switch",
      description: "Learn in 10+ languages instantly with seamless translation."
    },
    {
      icon: Zap,
      title: "AI-Powered Study Assistant",
      description: "Get instant help and find relevant resources in seconds."
    }
  ];

  const educatorFeatures = [
    {
      icon: FileText,
      title: "1-Click Lesson Generator",
      description: "Turn your notes into videos, quizzes & slides automatically."
    },
    {
      icon: BarChart3,
      title: "Automated Grading & Feedback",
      description: "Save hours on assessments with intelligent grading system."
    },
    {
      icon: TrendingUp,
      title: "Class Performance Dashboard",
      description: "Track student engagement and identify knowledge gaps."
    },
    {
      icon: Languages,
      title: "Multilingual Teaching Mode",
      description: "Teach in your students' native languages effortlessly."
    }
  ];

  const organizationFeatures = [
    {
      icon: Building,
      title: "AI-Driven Corporate Training",
      description: "Scalable training courses in multiple languages for all teams."
    },
    {
      icon: TrendingUp,
      title: "Cost & Time Savings",
      description: "Automate content creation & translations to reduce overhead."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track completion rates, engagement & skill development."
    }
  ];

  const FeatureCard: React.FC<{ feature: any; delay: number }> = ({ feature, delay }) => (
    <div 
      className={`group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <feature.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );

  const SectionHeader: React.FC<{ icon: any; title: string; subtitle: string }> = ({ icon: Icon, title, subtitle }) => (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full border border-blue-200 dark:border-blue-800">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Everything You Need to Learn & Teach
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how Learnova transforms education with AI-powered tools designed for students, educators, and organizations.
          </p>
        </div>

        {/* For Students */}
        <div className="mb-20">
          <SectionHeader 
            icon={Users} 
            title="For Students" 
            subtitle="Personalized learning experiences that adapt to your unique style and pace"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} delay={index * 100} />
            ))}
          </div>
        </div>

        {/* For Educators */}
        <div className="mb-20">
          <SectionHeader 
            icon={GraduationCap} 
            title="For Educators" 
            subtitle="Streamline your teaching workflow with intelligent automation and insights"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {educatorFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} delay={index * 100} />
            ))}
          </div>
        </div>

        {/* For Organizations */}
        <div>
          <SectionHeader 
            icon={Building} 
            title="For Organizations" 
            subtitle="Scale your training programs with AI-driven solutions and comprehensive analytics"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {organizationFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} delay={index * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;