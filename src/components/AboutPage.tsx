import React from 'react';
import { Briefcase, GraduationCap, Award, Mail, Linkedin, MapPin, Calendar, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0e0b14] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#1a1d29] rounded-lg p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-full md:w-1/3">
                <div className="sticky top-8">
                  <h1 className="text-3xl font-bold mb-2">Ben Farr</h1>
                  <h2 className="text-xl text-blue-400 mb-6">Senior Product Leader</h2>
                  
                  {/* Summary Section */}
                  <div className="mb-8 p-4 bg-[#252a3a] rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-blue-400">Summary</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Product leader with 14+ years of experience blending technology and storytelling to craft innovative digital experiences that drive business growth and delight customers. Skilled in leading cross-functional teams to elevate ecommerce and mobile platforms, I'm excited to bring my strategic vision and collaborative leadership to Disney, where creativity and technology create unforgettable moments.
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <a href="mailto:benjifarr@gmail.com" className="hover:text-blue-400 transition-colors">
                        benjifarr@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-5 h-5 text-blue-400" />
                      <a href="https://linkedin.com/in/benjamenfarr" className="hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                        linkedin.com/in/benjamenfarr
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-blue-400">Education</h3>
                      <div className="space-y-4">
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <GraduationCap className="w-4 h-4 text-blue-400" />
                            <span className="font-medium">M.B.A.</span>
                          </div>
                          <p className="text-gray-300">Imperial Business School, London</p>
                          <p className="text-sm text-gray-400">2020</p>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <GraduationCap className="w-4 h-4 text-blue-400" />
                            <span className="font-medium">Bachelor of Science in Business</span>
                          </div>
                          <p className="text-gray-300">Biola University, La Mirada, California</p>
                          <p className="text-sm text-gray-400">2013</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Award className="w-4 h-4 text-blue-400" />
                            <span className="font-medium">Scrum Master Certification</span>
                          </div>
                          <p className="text-gray-300">Scrum Alliance</p>
                          <p className="text-sm text-gray-400">2015</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-blue-400">Skills</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Product Strategy & Vision</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Cloud & CDN Technologies</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Performance Monitoring</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Cloud Infrastructure</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>API & System Architecture</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Edge Computing</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Monetization & Pricing Strategy</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Data Analytics & SQL</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Stakeholder Management</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Design Thinking & Product Discovery</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Agile, Scrum, Kanban</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Product Lifecycle Management</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Cross-Functional Leadership</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Hiring & Mentorship</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Executive Communication & Storytelling</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Change Management & Resilience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <section className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Professional Experience
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="bg-[#252a3a] p-5 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold">Director of Product Management</h4>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>Fuller Theological Seminary</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>July 2021 - Present</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mt-3">
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Led disciplined Agile rituals, aligning development with business objectives and shifting to objective-driven roadmaps to enhance prioritization, impact, and time-to-value.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Integrated a CDN to enhance platform scalability and performance, with a focus on optimizing content delivery in rural and underserved global markets.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Pioneered digital learning experiences for underserved markets, leveraging cutting-edge technology to deliver 'magical' engagement, boosting active learners by 81% globally in 13 months.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Utilized advanced audience segmentation techniques to enhance customer satisfaction ratings by 25%, optimizing product features based on detailed data analysis.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Optimized mobile user experiences, leading to a 48% increase in mobile session engagement.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Established governance practices, ensuring compliance with privacy policies and optimizing metadata.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#252a3a] p-5 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold">Head of Product</h4>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>Download Youth Ministry</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>June 2018 - July 2021</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mt-3">
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Led the replatforming of e-commerce store to Salesforce Commerce Cloud.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Implemented data-driven product strategies to optimize ad targeting, increasing customer lifetime value by 23% and enhancing ROI for stakeholders.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Led cross-functional teams in delivering solutions aligned with objectives, boosting weekly active users by 18%.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Led upward to shift from a feature-focused to an objective-driven roadmap culture, securing stakeholder buy-in to prioritize outcomes over output and accelerate key initiatives.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#252a3a] p-5 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold">Senior Product Manager</h4>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>The Daily Mail</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>June 2017 - May 2018</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mt-3">
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Mentored and Managed a team of associate product managers, nurturing their growth and development.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Leveraged data-driven insights to drive an 18% increase in average order value.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Launched the rewards platform, integrating it with the Nectar rewards program across the United Kingdom.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Increased monthly active shoppers by 68% in one year through strategic product enhancements.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#252a3a] p-5 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold">Product Manager</h4>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>Saddleback Church</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>October 2013 - May 2017</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mt-3">
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Launched the beta engagement product, quickly reaching over 120,000 active users within the first 10 days.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Significantly reduced time-to-sign-up on the platform, decreasing sign-up abandonment rates.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Led the successful launch of Transform, the church's first-ever mobile app.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#252a3a] p-5 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold">Product Manager</h4>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>Houzz</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>April 2013 - October 2013</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mt-3">
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Helped lead the development of the eCommerce marketplace experience and growth strategy. Developed an obsessive understanding of the customer to drive product decisions. Saw $3M in sales in week 1 across mobile and web and grew significantly in the weeks and months following.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#252a3a] p-5 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold">eCommerce Product Manager</h4>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>Buy.com (Acquired by Rakuten)</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>September 2009 - April 2013</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mt-3">
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>Responsible for the user experience and overall product for the seller acquisition website. Lead the redesign and redevelopment using the Agile Scrum Framework. With a close focus on user experience and an initiative to drive growth, seller acquisition increased by 29%.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <section className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Projects & Achievements
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-[#252a3a] p-5 rounded-lg">
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-blue-400" />
                        FullerEquip.com Website Rebuild
                      </h4>
                      <p className="text-gray-300">
                        Led the transformation of FullerEquip.com into a dynamic learning platform, seamlessly integrating classroom functionality and key LMS features to deepen learner engagement. Set a bold vision and mobilized cross-functional teams—engineering, design, and content—to execute with precision and purpose. Championed a user-first approach, ensuring the platform not only met technical requirements but truly served the needs of learners. Drove key innovations, including structured course experiences, real-time progress tracking, and interactive engagement tools, leading to increased retention and course completion. Navigated complex challenges with decisiveness and clarity, reinforcing FullerEquip.com as a premier destination for theological education and setting the foundation for its long-term success.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;