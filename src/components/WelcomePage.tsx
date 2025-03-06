import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Info, 
  Globe, 
  Zap, 
  Server, 
  Sparkles, 
  Star, 
  ArrowRight,
  Award
} from 'lucide-react';

const WelcomePage: React.FC = () => {
  const [isIntersecting, setIsIntersecting] = React.useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Setup intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id) {
            setIsIntersecting(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Observe all section refs
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Register a section ref
  const registerSectionRef = (id: string, ref: HTMLDivElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0e0b14] text-white">
      {/* Hero Section */}
      <section 
        ref={(ref) => registerSectionRef('hero', ref)}
        id="hero"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-[#0e0b14] z-0"></div>
        
        {/* Background with subtle animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0b14]/0 via-[#0e0b14]/70 to-[#0e0b14]"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isIntersecting['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 disney-plus-font">
              Ben Farr
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Where technology meets storytelling to create <span className="text-blue-400">magical</span> digital experiences
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link 
                to="/about" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-medium transition-colors flex items-center group"
              >
                <span>About Me</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/" 
                className="bg-[#252a3a] hover:bg-[#2d3343] text-white px-8 py-4 rounded-md font-medium transition-colors flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                <span>View CDN Project</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section 
        ref={(ref) => registerSectionRef('projects', ref)}
        id="projects"
        className="py-20 bg-[#0e0b14]"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isIntersecting['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white disney-plus-font">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mb-12">
              Explore my showcase projects demonstrating expertise in content delivery networks, streaming technology, and data visualization.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* CDN Project Card */}
              <div className="group relative overflow-hidden rounded-xl bg-[#1a1d29] hover:bg-[#252a3a] transition-all duration-500 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="p-8 relative z-10">
                  <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">CDN Project</h3>
                  <p className="text-gray-400 mb-6">
                    Experience a professional HLS video streaming implementation with adaptive bitrate technology and real-time performance metrics.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full">HLS Streaming</span>
                    <span className="bg-purple-900/50 text-purple-300 text-xs px-3 py-1 rounded-full">Adaptive Bitrate</span>
                    <span className="bg-green-900/50 text-green-300 text-xs px-3 py-1 rounded-full">Performance Metrics</span>
                  </div>
                  
                  <Link 
                    to="/" 
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                  >
                    <span>View Demo</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* About Card */}
              <div className="group relative overflow-hidden rounded-xl bg-[#1a1d29] hover:bg-[#252a3a] transition-all duration-500 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="p-8 relative z-10">
                  <div className="bg-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                    <Info className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">About Me</h3>
                  <p className="text-gray-400 mb-6">
                    Learn about my professional background, skills, and experience in product management and technology leadership.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-purple-900/50 text-purple-300 text-xs px-3 py-1 rounded-full">Product Management</span>
                    <span className="bg-pink-900/50 text-pink-300 text-xs px-3 py-1 rounded-full">Leadership</span>
                    <span className="bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full">Technology</span>
                  </div>
                  
                  <Link 
                    to="/about" 
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors group"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* Data Analysis Card - Full Width */}
              <div className="group relative overflow-hidden rounded-xl bg-[#1a1d29] hover:bg-[#252a3a] transition-all duration-500 shadow-xl md:col-span-2">
                <div className="absolute inset-0 bg-gradient-to-b from-green-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="p-8 relative z-10 flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <div className="bg-green-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                      <Server className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">Data Analysis</h3>
                    <p className="text-gray-400 mb-6">
                      Explore comprehensive data analysis of Disney+ content with interactive visualizations and insights.
                    </p>
                    
                    <Link 
                      to="/analysis" 
                      className="inline-flex items-center text-green-400 hover:text-green-300 font-medium transition-colors group"
                    >
                      <span>View Analysis</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-8 md:border-l border-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#252a3a] p-4 rounded-lg">
                        <h4 className="font-medium text-green-400 mb-1">Content Analysis</h4>
                        <p className="text-sm text-gray-400">Breakdown of Disney+ content by type, genre, and release year</p>
                      </div>
                      <div className="bg-[#252a3a] p-4 rounded-lg">
                        <h4 className="font-medium text-blue-400 mb-1">Viewing Trends</h4>
                        <p className="text-sm text-gray-400">Analysis of viewing patterns and content popularity</p>
                      </div>
                      <div className="bg-[#252a3a] p-4 rounded-lg">
                        <h4 className="font-medium text-purple-400 mb-1">Interactive Charts</h4>
                        <p className="text-sm text-gray-400">Dynamic visualizations of streaming data</p>
                      </div>
                      <div className="bg-[#252a3a] p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-400 mb-1">Performance Insights</h4>
                        <p className="text-sm text-gray-400">CDN performance metrics and optimization opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technologies Section */}
      <section 
        ref={(ref) => registerSectionRef('technologies', ref)}
        id="technologies"
        className="py-20 bg-[#0e0b14]"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isIntersecting['technologies'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white disney-plus-font">Featured Technologies</h2>
            <p className="text-gray-400 max-w-2xl mb-12">
              Leveraging cutting-edge technologies to deliver exceptional digital experiences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#1a1d29] to-[#252a3a] rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
                <div className="bg-blue-600/20 p-4 rounded-lg inline-block mb-4">
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Content Delivery Networks</h3>
                <p className="text-gray-400">
                  Leveraging global CDN infrastructure to deliver content with low latency and high availability across the world.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#1a1d29] to-[#252a3a] rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
                <div className="bg-yellow-600/20 p-4 rounded-lg inline-block mb-4">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Adaptive Bitrate Streaming</h3>
                <p className="text-gray-400">
                  Dynamic quality adjustment based on network conditions for optimal viewing experience on any device or connection.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#1a1d29] to-[#252a3a] rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
                <div className="bg-green-600/20 p-4 rounded-lg inline-block mb-4">
                  <Server className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Performance Analytics</h3>
                <p className="text-gray-400">
                  Real-time metrics and insights to monitor and optimize content delivery performance for maximum efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section 
        ref={(ref) => registerSectionRef('cta', ref)}
        id="cta"
        className="py-20 bg-[#0e0b14]"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isIntersecting['cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative overflow-hidden rounded-2xl">
              {/* Background with gradient overlay */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
              
              <div className="relative z-10 p-12 text-center">
                <div className="flex justify-center mb-6">
                  <Star className="w-12 h-12 text-yellow-300" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white disney-plus-font">Ready to create some magic?</h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Let's bring stories to life through innovative technology and creative excellence
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link 
                    to="/" 
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-md font-medium transition-colors"
                  >
                    View CDN Demo
                  </Link>
                  <Link 
                    to="/about" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-md font-medium transition-colors"
                  >
                    Learn About Ben
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;