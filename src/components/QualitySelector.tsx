import React, { useState, useEffect, useRef } from 'react';
import { Settings, ChevronDown, Check, Gauge } from 'lucide-react';
import Hls from 'hls.js';

interface QualitySelectorProps {
  hls: Hls | null;
  availableQualities: string[];
  currentLevel: number;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({ 
  hls, 
  availableQualities, 
  currentLevel 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<number | 'auto'>('auto');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved quality preference from localStorage
  useEffect(() => {
    const savedQuality = localStorage.getItem('preferredQuality');
    if (savedQuality) {
      try {
        const parsedQuality = JSON.parse(savedQuality);
        setSelectedQuality(parsedQuality);
        
        // Apply saved quality if HLS is available
        if (hls && parsedQuality !== 'auto' && typeof parsedQuality === 'number') {
          hls.currentLevel = parsedQuality;
        } else if (hls && parsedQuality === 'auto') {
          hls.currentLevel = -1;
        }
      } catch (e) {
        console.error('Error parsing saved quality preference:', e);
      }
    }
  }, [hls]);

  // Update selected quality when currentLevel changes (for auto mode)
  useEffect(() => {
    if (selectedQuality === 'auto' && currentLevel !== -1) {
      // Don't update the selectedQuality state, just reflect the current auto-selected level
    }
  }, [currentLevel, selectedQuality]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleQualityChange = (quality: number | 'auto') => {
    if (!hls) return;

    setSelectedQuality(quality);
    
    // Save preference to localStorage
    localStorage.setItem('preferredQuality', JSON.stringify(quality));
    
    // Apply quality change
    if (quality === 'auto') {
      hls.currentLevel = -1; // -1 means auto
      // Note: autoLevelEnabled is a getter-only property, we don't need to set it
      // Setting currentLevel to -1 automatically enables auto level selection
    } else {
      hls.currentLevel = quality;
      // Setting a specific level automatically disables auto level selection
    }
    
    setIsOpen(false);
  };

  // Get the label for the currently selected quality
  const getCurrentQualityLabel = () => {
    if (selectedQuality === 'auto') {
      // If in auto mode, show the current auto-selected quality
      if (currentLevel >= 0 && currentLevel < availableQualities.length) {
        return `Auto (${availableQualities[currentLevel].split(' ')[0]})`;
      }
      return 'Auto';
    }
    
    // If manually selected, show that quality
    if (typeof selectedQuality === 'number' && selectedQuality >= 0 && selectedQuality < availableQualities.length) {
      return availableQualities[selectedQuality].split(' ')[0]; // Just show resolution, not bitrate
    }
    
    return 'Quality';
  };

  // Don't render if no qualities are available
  if (!availableQualities.length) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 bg-[#252a3a] hover:bg-[#2d3343] text-white px-3 py-1.5 rounded-md text-sm transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select video quality"
      >
        <Settings className="w-4 h-4 mr-1" />
        <span>{getCurrentQualityLabel()}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-[#252a3a] rounded-md shadow-lg z-50 py-1 border border-gray-700">
          <div className="max-h-60 overflow-y-auto">
            {/* Auto option */}
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-[#2d3343] flex items-center justify-between"
              onClick={() => handleQualityChange('auto')}
              aria-label="Automatic quality selection"
            >
              <div className="flex items-center">
                <Gauge className="w-4 h-4 mr-2 text-blue-400" />
                <span>Auto</span>
              </div>
              {selectedQuality === 'auto' && <Check className="w-4 h-4 text-blue-400" />}
            </button>
            
            <div className="border-t border-gray-700 my-1"></div>
            
            {/* Quality options */}
            {availableQualities.map((quality, index) => {
              const qualityName = quality.split(' ')[0]; // Just show resolution, not bitrate
              
              return (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#2d3343] flex items-center justify-between"
                  onClick={() => handleQualityChange(index)}
                  aria-label={`Select ${qualityName} quality`}
                >
                  <span>{qualityName}</span>
                  {selectedQuality === index && <Check className="w-4 h-4 text-blue-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QualitySelector;