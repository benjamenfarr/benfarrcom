import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, ChevronDown, Check, Gauge, Loader } from 'lucide-react';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoSrc: string;
  poster: string;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  hlsInstance: Hls | null;
  availableQualities: string[];
  currentLevel: number;
  currentBitrate: number;
  bufferHealth: number;
  onPlay: () => void;
  onRetry: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoRef,
  videoSrc,
  poster,
  isPlaying,
  isLoading,
  error,
  hlsInstance,
  availableQualities,
  currentLevel,
  currentBitrate,
  bufferHealth,
  onPlay,
  onRetry
}) => {
  const [showControls, setShowControls] = useState(false);
  const [controlsTimeout, setControlsTimeout] = useState<number | null>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isQualityMenuOpen, setIsQualityMenuOpen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<number | 'auto'>('auto');
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const qualityMenuRef = useRef<HTMLDivElement>(null);
  const volumeControlRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  // Load saved quality preference from localStorage
  useEffect(() => {
    const savedQuality = localStorage.getItem('preferredQuality');
    if (savedQuality) {
      try {
        const parsedQuality = JSON.parse(savedQuality);
        setSelectedQuality(parsedQuality);
        
        // Apply saved quality if HLS is available
        if (hlsInstance && parsedQuality !== 'auto' && typeof parsedQuality === 'number') {
          hlsInstance.currentLevel = parsedQuality;
        } else if (hlsInstance && parsedQuality === 'auto') {
          hlsInstance.currentLevel = -1;
        }
      } catch (e) {
        console.error('Error parsing saved quality preference:', e);
      }
    }
  }, [hlsInstance]);

  // Load saved volume from localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem('videoPlayerVolume');
    if (savedVolume) {
      try {
        const parsedVolume = JSON.parse(savedVolume);
        setVolume(parsedVolume);
        if (videoRef.current) {
          videoRef.current.volume = parsedVolume;
        }
      } catch (e) {
        console.error('Error parsing saved volume:', e);
      }
    }
    
    const savedMuted = localStorage.getItem('videoPlayerMuted');
    if (savedMuted) {
      try {
        const parsedMuted = JSON.parse(savedMuted);
        setIsMuted(parsedMuted);
        if (videoRef.current) {
          videoRef.current.muted = parsedMuted;
        }
      } catch (e) {
        console.error('Error parsing saved muted state:', e);
      }
    }
  }, [videoRef]);

  // Update video progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
      setProgress((video.currentTime / (video.duration || 1)) * 100);
    };

    const handleTimeUpdate = () => {
      updateProgress();
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoRef]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Update overlay state when isPlaying changes
  useEffect(() => {
    setShowOverlay(!isPlaying);
  }, [isPlaying]);

  // Handle click outside quality menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (qualityMenuRef.current && !qualityMenuRef.current.contains(event.target as Node)) {
        setIsQualityMenuOpen(false);
      }
      
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setIsVolumeSliderVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show/hide controls on mouse movement
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeout) {
      window.clearTimeout(controlsTimeout);
    }
    
    const timeout = window.setTimeout(() => {
      if (isPlaying && !isQualityMenuOpen && !isVolumeSliderVisible) {
        setShowControls(false);
      }
    }, 3000);
    
    setControlsTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (controlsTimeout) {
      window.clearTimeout(controlsTimeout);
    }
    
    if (isPlaying && !isQualityMenuOpen && !isVolumeSliderVisible) {
      setShowControls(false);
    }
  };

  // Play/pause toggle
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(err => console.error('Error playing video:', err));
      setShowOverlay(false);
    } else {
      video.pause();
      setShowOverlay(true);
    }
  };

  // Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
    
    localStorage.setItem('videoPlayerVolume', JSON.stringify(newVolume));
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
    }
    
    localStorage.setItem('videoPlayerMuted', JSON.stringify(newMutedState));
  };

  // Seek control
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    setCurrentTime(seekTime);
    
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Quality selection
  const handleQualityChange = (quality: number | 'auto') => {
    if (!hlsInstance) return;

    setSelectedQuality(quality);
    
    // Save preference to localStorage
    localStorage.setItem('preferredQuality', JSON.stringify(quality));
    
    // Apply quality change
    if (quality === 'auto') {
      hlsInstance.currentLevel = -1; // -1 means auto
    } else {
      hlsInstance.currentLevel = quality;
    }
    
    setIsQualityMenuOpen(false);
  };

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

  // Handle click on video to toggle play/pause
  const handleVideoClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking on controls
    if (e.target instanceof HTMLElement) {
      const controlsArea = document.querySelector('.video-controls-area');
      if (controlsArea && controlsArea.contains(e.target)) {
        return;
      }
    }
    togglePlayPause();
  };

  // Handle play button click
  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    
    console.log("Play button clicked");
    
    if (videoRef.current && videoRef.current.paused) {
      onPlay(); // Call the onPlay prop function from parent
      videoRef.current.play()
        .then(() => {
          console.log("Video playback started successfully");
          setShowOverlay(false);
        })
        .catch(err => console.error('Error playing video:', err));
    }
  };

  return (
    <div 
      ref={playerContainerRef}
      className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Disney+ Style Overlay - IMPORTANT: pointer-events-none to allow clicks to pass through */}
      <div 
        className={`absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
          showOverlay ? 'opacity-100' : 'opacity-0'
        } pointer-events-none`}
      >
        <div className="absolute top-6 left-6 flex flex-col items-start pointer-events-none">
          <h2 className="text-[#F9F9F9] text-[2.4rem] font-bold mb-2 disney-plus-font">Carson's Adoption</h2>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-black/70 rounded-sm px-2 py-0.5">
              <span className="text-[#F9F9F9] text-xs font-medium">HD</span>
            </div>
            <div className="text-[#F9F9F9]/80 text-xs">
              {formatTime(duration)}
            </div>
          </div>
          
          <div className="text-[#F9F9F9]/80 text-sm mb-2">November 20, 2024</div>
          
          <p className="text-[#F9F9F9]/80 text-sm max-w-md">Carson becomes a Farr</p>
        </div>
      </div>
      
      {/* Error overlay */}
      {error && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
          <div className="text-center p-4">
            <p className="text-red-500 font-bold text-lg mb-2">Error</p>
            <p className="text-white">{error}</p>
            <button 
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              onClick={onRetry}
            >
              Reload Page
            </button>
          </div>
        </div>
      )}
      
      {/* Loading overlay */}
      {isLoading && !error && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
          <div className="text-center p-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-white">Loading video stream...</p>
          </div>
        </div>
      )}
      
      {/* Video element with click-to-play/pause */}
      <div className="w-full h-full" onClick={handleVideoClick}>
        <video 
          ref={videoRef} 
          className="w-full h-full object-contain" 
          playsInline
          crossOrigin="anonymous"
          poster={poster}
          autoPlay={false}
        />
      </div>
      
      {/* Custom centered play button - IMPORTANT: z-30 to ensure it's above all overlays */}
      {!isPlaying && !error && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <button 
            ref={playButtonRef}
            className="w-24 h-24 bg-[#0063e5] rounded-full flex items-center justify-center hover:bg-[#0056c7] transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
            onClick={handlePlayButtonClick}
            aria-label="Play video"
          >
            <Play className="w-12 h-12 text-white fill-current ml-1" />
          </button>
        </div>
      )}
      
      {/* Custom video controls */}
      <div 
        className={`video-controls-area absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 transition-opacity duration-300 z-20 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress bar */}
        <div className="relative w-full h-1 bg-gray-600 rounded-full mb-3 cursor-pointer group">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Seek video"
          />
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity">
            <div 
              className="absolute top-0 left-0 h-3 -mt-1 bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Buffer indicator */}
          <div 
            className="absolute top-0 left-0 h-full bg-gray-400 rounded-full opacity-50"
            style={{ width: `${Math.min((bufferHealth / (duration || 1)) * 100, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause button - adjusted spacing and alignment */}
            <button 
              onClick={togglePlayPause}
              className="text-white hover:text-blue-400 transition-colors flex items-center justify-center w-8 h-8"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            {/* Volume control */}
            <div className="relative" ref={volumeControlRef}>
              <button 
                onClick={toggleMute}
                onMouseEnter={() => setIsVolumeSliderVisible(true)}
                className="text-white hover:text-blue-400 transition-colors flex items-center justify-center w-8 h-8"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              {/* Volume slider */}
              <div 
                className={`absolute bottom-8 left-0 bg-[#252a3a] rounded-md p-2 shadow-lg transition-opacity duration-200 ${
                  isVolumeSliderVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onMouseLeave={() => setIsVolumeSliderVisible(false)}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 appearance-none bg-gray-600 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                  aria-label="Volume"
                />
              </div>
            </div>
            
            {/* Time display */}
            <div className="text-white text-sm">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Bitrate display */}
            <div className="text-white text-sm hidden md:block">
              {currentBitrate > 0 && (
                <span>{currentBitrate} kbps</span>
              )}
            </div>
            
            {/* Quality selector */}
            {availableQualities.length > 0 && (
              <div className="relative" ref={qualityMenuRef}>
                <button
                  onClick={() => setIsQualityMenuOpen(!isQualityMenuOpen)}
                  className="flex items-center space-x-1 text-white hover:text-blue-400 transition-colors"
                  aria-haspopup="true"
                  aria-expanded={isQualityMenuOpen}
                  aria-label="Select video quality"
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-sm hidden sm:inline">{getCurrentQualityLabel()}</span>
                </button>

                {isQualityMenuOpen && (
                  <div className="absolute right-0 bottom-8 w-48 bg-[#252a3a] rounded-md shadow-lg z-50 py-1 border border-gray-700">
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
            )}
            
            {/* Fullscreen button */}
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-blue-400 transition-colors flex items-center justify-center w-8 h-8"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;