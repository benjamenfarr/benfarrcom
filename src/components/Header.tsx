import React, { useState } from 'react';
import { Play, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className="bg-[#0e0b14] py-4 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-8">
              <Play className="w-8 h-8 text-blue-500 fill-current" />
              <span className="ml-2 text-xl font-bold">BenFarr.com</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <NavLink href="/welcome" active={location.pathname === '/welcome'}>Welcome</NavLink>
              <NavLink href="/" active={location.pathname === '/'}>CDN Project</NavLink>
              <NavLink href="/about" active={location.pathname === '/about'}>About</NavLink>
              <NavLink href="/analysis" active={location.pathname === '/analysis'}>Data Analysis</NavLink>
              <NavLink href="/metrics" active={location.pathname === '/metrics'}>CDN Metrics</NavLink>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Contact Me
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:text-blue-400 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="mt-4 py-4 space-y-4">
            <MobileNavLink 
              href="/welcome" 
              active={location.pathname === '/welcome'}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Welcome
            </MobileNavLink>
            <MobileNavLink 
              href="/" 
              active={location.pathname === '/'} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CDN Project
            </MobileNavLink>
            <MobileNavLink 
              href="/about" 
              active={location.pathname === '/about'}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </MobileNavLink>
            <MobileNavLink 
              href="/analysis" 
              active={location.pathname === '/analysis'}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Data Analysis
            </MobileNavLink>
            <MobileNavLink 
              href="/metrics" 
              active={location.pathname === '/metrics'}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CDN Metrics
            </MobileNavLink>
            
            <div className="pt-4 border-t border-gray-800">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                Contact Me
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active }) => {
  return (
    <Link 
      to={href} 
      className={`text-sm font-medium transition-colors hover:text-blue-400 ${active ? 'text-white' : 'text-gray-400'}`}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, active, onClick }) => {
  return (
    <Link 
      to={href} 
      className={`block px-4 py-2 text-base font-medium transition-colors hover:bg-[#252a3a] rounded-md ${
        active ? 'text-white bg-[#252a3a]' : 'text-gray-400'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;