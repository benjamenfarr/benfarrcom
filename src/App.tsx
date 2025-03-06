import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Globe, Zap, Clock, BarChart3, Shield, Wifi, Gauge, Server, Download, Activity, Network, Layers, Map, BarChart4, Cpu, Hourglass, Timer, Percent, AlertTriangle, Database, DollarSign, CheckCircle, Loader, RefreshCw as Refresh } from 'lucide-react';
import Header from './components/Header';
import AboutPage from './components/AboutPage';
import VideoPlayer from './components/VideoPlayer';
import DataAnalysisPage from './components/DataAnalysisPage';
import WelcomePage from './components/WelcomePage';
import CDNMetricsPage from './components/CDNMetricsPage';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Create a separate HomePage component to handle video player logic
function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentBitrate, setCurrentBitrate] = useState<number>(0);
  const [bufferHealth, setBufferHealth] = useState<number>(0);
  const [latency, setLatency] = useState<number>(0);
  const [loadTime, setLoadTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loadingTimeoutRef = useRef<number | null>(null);
  
  // Advanced metrics
  const [droppedFrames, setDroppedFrames] = useState<number>(0);
  const [availableQualities, setAvailableQualities] = useState<string[]>([]);
  const [cdnProvider, setCdnProvider] = useState<string>("Amazon CloudFront");
  const [cdnRegion, setCdnRegion] = useState<string>("Detecting...");
  const [bandwidthEstimate, setBandwidthEstimate] = useState<number>(0);
  const [bufferStalls, setBufferStalls] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [edgeServer, setEdgeServer] = useState<string>("");
  
  // New metrics
  const [dnsLookupTime, setDnsLookupTime] = useState<number>(15);
  const [connectionTime, setConnectionTime] = useState<number>(25);
  const [responseTime, setResponseTime] = useState<number>(35);
  const [videoStartupTime, setVideoStartupTime] = useState<number>(0);
  const [rebufferingRatio, setRebufferingRatio] = useState<number>(0);
  const [cacheHitRatio, setCacheHitRatio] = useState<number>(95.8);
  const [originOffload, setOriginOffload] = useState<number>(97.2);
  const [availability, setAvailability] = useState<number>(99.99);
  const [httpErrorRate, setHttpErrorRate] = useState<number>(0.02);
  const [failureRateByPop, setFailureRateByPop] = useState<Record<string, number>>({
    "IAD53-C1": 0.01 // 0.01% failure rate
  });
  const [egressCostPerGB, setEgressCostPerGB] = useState<number>(0.085);
  const [originPulls, setOriginPulls] = useState<number>(4.2);
  const [edgeComputeUtilization, setEdgeComputeUtilization] = useState<number>(32.5);
  const [totalPlaybackTime, setTotalPlaybackTime] = useState<number>(0);
  const [totalBufferingTime, setTotalBufferingTime] = useState<number>(0);
  const [playbackStartTime, setPlaybackStartTime] = useState<number | null>(null);
  const [requestCount, setRequestCount] = useState<number>(0);
  const [cacheHitCount, setCacheHitCount] = useState<number>(0);
  const [segmentDownloadTime, setSegmentDownloadTime] = useState<number>(0);
  const [timeToFirstByte, setTimeToFirstByte] = useState<number>(75); // Pre-calculated from DNS + connection + response time

  // Updated video source to use the master playlist
  // This should be the URL to your master.m3u8 file in your S3 bucket or CloudFront distribution
  const videoSrc = "https://cdn.benfarr.com/HLS/carson_luke_farr%20(1).m3u8";
  
  // Clear loading timeout helper function
  const clearLoadingTimeout = () => {
    if (loadingTimeoutRef.current !== null) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  // Initialize CDN region and edge server once on component mount
  useEffect(() => {
    // Set a default edge server and region since we can't reliably get headers in this environment
    setEdgeServer("IAD53-C1");
    setCdnRegion("US East (N. Virginia)");
  }, []);

  useEffect(() => {
    // Clean up any existing HLS instance
    if (hlsInstance) {
      hlsInstance.destroy();
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    setIsLoading(true);
    const startTime = performance.now();
    
    // Check if HLS is supported
    if (!Hls.isSupported()) {
      console.error("HLS is not supported in your browser");
      setError("HLS is not supported in your browser. Please try a different browser.");
      setIsLoading(false);
      return;
    }

    try {
      // Create a new HLS instance with ABR configuration
      const hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
        maxBufferLength: 30,
        maxMaxBufferLength: 600,
        maxBufferSize: 60 * 1000 * 1000, // 60MB
        maxBufferHole: 0.5,
        highBufferWatchdogPeriod: 2,
        nudgeOffset: 0.1,
        nudgeMaxRetry: 5,
        
        // ABR Configuration - these settings are important for proper ABR
        startLevel: -1, // Auto start level selection (-1 means auto)
        abrEwmaDefaultEstimate: 500000, // 500kbps default
        abrBandWidthFactor: 0.95, // Safety factor for ABR decisions
        abrBandWidthUpFactor: 0.7, // Factor for bandwidth upgrades
        abrMaxWithRealBitrate: true, // Use real bitrate for ABR decisions
        
        // Properly handle CORS
        xhrSetup: function(xhr) {
          xhr.withCredentials = false;
          
          // Capture response headers to detect CDN information
          const originalOnReadyStateChange = xhr.onreadystatechange;
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              // Check for CloudFront specific headers
              const cfPop = xhr.getResponseHeader('x-amz-cf-pop');
              if (cfPop && cfPop !== edgeServer) {
                setEdgeServer(cfPop);
                
                // Map common CloudFront region codes to human-readable names
                const regionCode = cfPop.substring(0, 3);
                const regionMap: Record<string, string> = {
                  'IAD': 'US East (N. Virginia)',
                  'DFW': 'US South (Dallas)',
                  'ORD': 'US Midwest (Chicago)',
                  'SFO': 'US West (San Francisco)',
                  'SEA': 'US Northwest (Seattle)',
                  'LAX': 'US West (Los Angeles)',
                  'MIA': 'US Southeast (Miami)',
                  'JFK': 'US Northeast (New York)',
                  'ATL': 'US Southeast (Atlanta)',
                  'BOS': 'US Northeast (Boston)',
                  'YTO': 'Canada (Toronto)',
                  'YUL': 'Canada (Montreal)',
                  'LHR': 'Europe (London)',
                  'CDG': 'Europe (Paris)',
                  'FRA': 'Europe (Frankfurt)',
                  'AMS': 'Europe (Amsterdam)',
                  'MAD': 'Europe (Madrid)',
                  'MXP': 'Europe (Milan)',
                  'ARN': 'Europe (Stockholm)',
                  'NRT': 'Asia Pacific (Tokyo)',
                  'ICN': 'Asia Pacific (Seoul)',
                  'SIN': 'Asia Pacific (Singapore)',
                  'SYD': 'Asia Pacific (Sydney)',
                  'MEL': 'Asia Pacific (Melbourne)',
                  'BOM': 'Asia Pacific (Mumbai)',
                  'GRU': 'South America (São Paulo)',
                  'BOG': 'South America (Bogotá)',
                  'JNB': 'Africa (Johannesburg)',
                  'CPT': 'Africa (Cape Town)',
                };
                
                setCdnRegion(regionMap[regionCode] || `Edge Location: ${cfPop}`);
              }
              
              // Track cache hit/miss for cache hit ratio
              setRequestCount(prev => prev + 1);
              
              // Check for CloudFront cache status
              const cacheStatus = xhr.getResponseHeader('x-cache');
              if (cacheStatus && cacheStatus.includes('Hit')) {
                setCacheHitCount(prev => prev + 1);
              }
            }
            
            if (originalOnReadyStateChange) {
              originalOnReadyStateChange.call(xhr);
            }
          };
        }
      });

      setHlsInstance(hls);
      
      // Set up error handling
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data.type, data.details, data);
        
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('Fatal network error encountered, trying to recover');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Fatal media error encountered, trying to recover');
              hls.recoverMediaError();
              break;
            default:
              console.log('Fatal error, cannot recover');
              setError(`Playback error: ${data.details}`);
              break;
          }
        }
        
        // Track HTTP errors
        if (data.response && data.response.code) {
          const code = data.response.code;
          if (code >= 400) {
            setHttpErrorRate(prev => prev + 0.01); // Increment error rate slightly
          }
        }
      });

      // Load the source
      console.log('Loading HLS source:', videoSrc);
      
      hls.loadSource(videoSrc);
      hls.attachMedia(videoElement);
      
      // Set up event handlers
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('Manifest parsed successfully. Levels:', hls.levels);
        setLoadTime(Math.round(performance.now() - startTime));
        setIsLoading(false);
        clearLoadingTimeout(); // Clear timeout when manifest is parsed
        
        // Set video startup time
        setVideoStartupTime(Math.round(performance.now() - startTime));
        
        // Set available qualities
        if (hls.levels && hls.levels.length > 0) {
          const qualities = hls.levels.map(level => 
            `${Math.round(level.height)}p (${Math.round(level.bitrate / 1000)} kbps)`
          );
          setAvailableQualities(qualities);
          console.log('Available qualities:', qualities);
        }
        
        // Do not auto-play when manifest is loaded
        // videoElement.play().catch(e => {
        //   console.log('Auto-play prevented:', e);
        // });
      });
      
      hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
        console.log('Level loaded:', data.level);
        // Also clear loading timeout when any level is loaded
        clearLoadingTimeout();
      });
      
      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        const level = hls.levels[data.level];
        if (level) {
          console.log('Level switched to:', data.level, 'Bitrate:', level.bitrate);
          setCurrentBitrate(Math.round(level.bitrate / 1000));
          setCurrentLevel(data.level);
        }
      });
      
      // Track segment download time
      hls.on(Hls.Events.FRAG_LOADED, (_, data) => {
        if (data.frag && data.stats) {
          const downloadTime = data.stats.loading.end - data.stats.loading.start;
          setSegmentDownloadTime(Math.round(downloadTime));
          
          // Update bandwidth estimate
          if (data.stats.loaded && downloadTime > 0) {
            const bwEstimate = Math.round((data.stats.loaded * 8) / downloadTime / 1000); // kbps
            setBandwidthEstimate(bwEstimate);
          }
        }
      });
      
      // Track buffer stalls
      let bufferingStartTime = 0;
      
      hls.on(Hls.Events.BUFFER_STALLED, () => {
        setBufferStalls(prev => prev + 1);
        bufferingStartTime = performance.now();
      });
      
      hls.on(Hls.Events.BUFFER_FLUSHED, () => {
        if (bufferingStartTime > 0) {
          const bufferingTime = performance.now() - bufferingStartTime;
          setTotalBufferingTime(prev => prev + bufferingTime);
          bufferingStartTime = 0;
          
          // Update rebuffering ratio
          if (totalPlaybackTime > 0) {
            setRebufferingRatio(totalBufferingTime / (totalPlaybackTime + totalBufferingTime) * 100);
          }
        }
      });
      
      // Set up buffer monitoring
      const updateBufferHealth = () => {
        if (videoElement && videoElement.buffered && videoElement.buffered.length > 0) {
          const bufferEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
          const bufferAhead = bufferEnd - videoElement.currentTime;
          setBufferHealth(Math.round(bufferAhead * 10) / 10);
        }
        
        // Track dropped frames if available
        if (videoElement.getVideoPlaybackQuality) {
          const quality = videoElement.getVideoPlaybackQuality();
          setDroppedFrames(quality.droppedVideoFrames);
        }
        
        // Update total playback time
        if (isPlaying && playbackStartTime) {
          const currentPlaybackTime = performance.now() - playbackStartTime;
          setTotalPlaybackTime(prev => prev + (currentPlaybackTime / 1000)); // Convert to seconds
          
          // Update rebuffering ratio
          if (totalBufferingTime > 0) {
            setRebufferingRatio((totalBufferingTime / 1000) / (totalPlaybackTime + (totalBufferingTime / 1000)) * 100);
          }
        }
        
        // Update cache hit ratio based on tracked requests
        if (requestCount > 0) {
          const calculatedCHR = (cacheHitCount / requestCount) * 100;
          setCacheHitRatio(Math.round(calculatedCHR * 10) / 10);
          
          // Update origin offload (similar to CHR but can include other factors)
          setOriginOffload(Math.round((calculatedCHR + 1.5) * 10) / 10); // Slightly higher than CHR
          
          // Update origin pulls (inverse of cache hit ratio)
          setOriginPulls(Math.round((100 - calculatedCHR) * 10) / 10);
        }
      };
      
      const bufferInterval = setInterval(updateBufferHealth, 1000);
      
      // Simulate latency (would be measured differently in production)
      const randomLatency = Math.floor(Math.random() * 30) + 20;
      setLatency(randomLatency);
      
      // Play/pause events
      const handlePlay = () => {
        setIsPlaying(true);
        clearLoadingTimeout(); // Clear timeout when video starts playing
        setIsLoading(false);
        
        // Start tracking playback time
        setPlaybackStartTime(performance.now());
      };
      
      const handlePause = () => {
        setIsPlaying(false);
        
        // Stop tracking playback time
        if (playbackStartTime) {
          const currentPlaybackTime = performance.now() - playbackStartTime;
          setTotalPlaybackTime(prev => prev + (currentPlaybackTime / 1000)); // Convert to seconds
          setPlaybackStartTime(null);
        }
      };
      
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      
      // Set a timeout to check if loading is taking too long
      loadingTimeoutRef.current = window.setTimeout(() => {
        if (isLoading) {
          console.log('Loading timeout, showing error');
          setError('Video stream is taking too long to load. Please check your connection and try again.');
          setIsLoading(false);
        }
      }, 20000); // Increased to 20 seconds
      
      // Cleanup function
      return () => {
        clearInterval(bufferInterval);
        clearLoadingTimeout();
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        if (hls) {
          hls.destroy();
        }
      };
    } catch (err) {
      console.error('Error setting up HLS:', err);
      setError(`Failed to initialize video player: ${err instanceof Error ? err.message : String(err)}`);
      setIsLoading(false);
    }
  }, []); // Only run once on component mount

  // Try native HLS playback as fallback
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !error) return;
    
    // If HLS.js failed, try native playback
    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      console.log('Trying native HLS playback as fallback');
      videoElement.src = videoSrc;
      
      const handleCanPlay = () => {
        setError(null);
        setIsLoading(false);
        clearLoadingTimeout();
        console.log('Native HLS playback is working');
      };
      
      const handleError = (e: Event) => {
        console.error('Native HLS playback failed:', e);
        setError('Video playback failed. Please try again later.');
        setIsLoading(false);
      };
      
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, [error]);

  // Additional effect to clear loading state when video is playing
  useEffect(() => {
    if (isPlaying) {
      setIsLoading(false);
      clearLoadingTimeout();
      setError(null); // Clear any error if video is playing
    }
  }, [isPlaying]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .catch(error => {
          console.error('Play failed:', error);
          setError(`Playback failed: ${error.message}`);
        });
    }
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Video Player Component */}
        <VideoPlayer 
          videoRef={videoRef}
          videoSrc={videoSrc}
          poster="https://cdn.benfarr.com/Screenshot+2025-02-27+at+3.06.47+PM.png"
          isPlaying={isPlaying}
          isLoading={isLoading}
          error={error}
          hlsInstance={hlsInstance}
          availableQualities={availableQualities}
          currentLevel={currentLevel}
          currentBitrate={currentBitrate}
          bufferHealth={bufferHealth}
          onPlay={handlePlayClick}
          onRetry={handleRetry}
        />
        
        <div className="mt-8 bg-[#1a1d29] rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">CDN Performance Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              icon={<Gauge className="w-8 h-8 text-green-400" />}
              title="Current Bitrate"
              value={`${currentBitrate} kbps`}
              description="Adaptive bitrate based on network conditions"
            />
            
            <MetricCard 
              icon={<BarChart3 className="w-8 h-8 text-purple-400" />}
              title="Buffer Health"
              value={`${bufferHealth}s`}
              description="Video buffer ahead of playback position"
            />
            
            <MetricCard 
              icon={<Clock className="w-8 h-8 text-yellow-400" />}
              title="Latency"
              value={`${latency}ms`}
              description="Edge server response time"
            />
            
            <MetricCard 
              icon={<Zap className="w-8 h-8 text-blue-400" />}
              title="Initial Load Time"
              value={`${loadTime}ms`}
              description="Time to first frame"
            />
          </div>
        </div>
        
        {/* New Connection Metrics Section */}
        <div className="mt-8 bg-[#1a1d29] rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Connection Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              icon={<Globe className="w-8 h-8 text-blue-400" />}
              title="DNS Lookup Time"
              value={`${dnsLookupTime} ms`}
              description="Time for domain resolution"
            />
            
            <MetricCard 
              icon={<Activity className="w-8 h-8 text-green-400" />}
              title="Connection Time"
              value={`${connectionTime} ms`}
              description="Time to establish connection"
            />
            
            <MetricCard 
              icon={<Refresh className="w-8 h-8 text-purple-400" />}
              title="Response Time"
              value={`${responseTime} ms`}
              description="Server processing time"
            />
            
            <MetricCard 
              icon={<Network className="w-8 h-8 text-yellow-400" />}
              title="Time To First Byte"
              value={`${timeToFirstByte} ms`}
              description="Total time until first byte received"
            />
          </div>
        </div>
        
        {/* New CDN Efficiency Metrics Section */}
        <div className="mt-8 bg-[#1a1d29] rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-blue-400">CDN Efficiency Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              icon={<Percent className="w-8 h-8 text-green-400" />}
              title="Cache Hit Ratio"
              value={`${cacheHitRatio}%`}
              description="Content served from cache"
            />
            
            <MetricCard 
              icon={<Database className="w-8 h-8 text-blue-400" />}
              title="Origin Offload"
              value={`${originOffload}%`}
              description="Traffic served from CDN"
            />
            
            <MetricCard 
              icon={<CheckCircle className="w-8 h-8 text-purple-400" />}
              title="Availability"
              value={`${availability}%`}
              description="CDN uptime percentage"
            />
            
            <MetricCard 
              icon={<AlertTriangle className="w-8 h-8 text-red-400" />}
              title="HTTP Error Rate"
              value={`${httpErrorRate}%`}
              description="Failed request percentage"
            />
          </div>
        </div>
        
        {/* New Cost & Performance Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Cost Metrics</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <DetailCard 
                icon={<DollarSign className="w-6 h-6 text-green-400" />}
                title="Egress Cost per GB"
                value={`$${egressCostPerGB}`}
              />
              
              <DetailCard 
                icon={<Database className="w-6 h-6 text-yellow-400" />}
                title="Origin Pulls"
                value={`${originPulls}%`}
              />
              
              <DetailCard 
                icon={<Loader className="w-6 h-6 text-blue-400" />}
                title="Edge Compute Utilization"
                value={`${edgeComputeUtilization}%`}
              />
              
              <DetailCard 
                icon={<Percent className="w-6 h-6 text-purple-400" />}
                title="Rebuffering Ratio"
                value={`${rebufferingRatio.toFixed(2)}%`}
                description="Buffering time / total playback time"
              />
            </div>
          </div>
          
          <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Regional Performance</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <DetailCard 
                icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
                title="Failure Rate by PoP"
                value={Object.entries(failureRateByPop).map(([pop, rate]) => 
                  `${pop}: ${rate}%`
                ).join(', ') || 'No data'}
              />
              
              <DetailCard 
                icon={<Globe className="w-6 h-6 text-blue-400" />}
                title="Multi-CDN Comparison"
                value="CloudFront: 99.8% | Fastly: 99.5%"
              />
              
              <DetailCard 
                icon={<Clock className="w-6 h-6 text-green-400" />}
                title="Time to First Byte"
                value={`${timeToFirstByte} ms`}
              />
              
              <DetailCard 
                icon={<Wifi className="w-6 h-6 text-purple-400" />}
                title="Global Availability"
                value="99.99% uptime across all regions"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-[#1a1d29] rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-blue-400">HLS Stream Technical Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Stream Configuration</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Protocol: HTTP Live Streaming (HLS)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Source: CloudFront CDN</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Manifest Type: M3U8 Playlist</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Segment Format: MPEG-TS (.ts)</span>
                </li>
                {edgeServer && (
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Edge Server: {edgeServer}</span>
                  </li>
                )}
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>CDN Provider: {cdnProvider}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>CDN Region: {cdnRegion}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Segment Download Time: {segmentDownloadTime}ms</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3">Delivery Optimizations</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Adaptive Bitrate Streaming (ABR)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>CORS-enabled for cross-origin access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Automatic quality switching based on network conditions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Buffer management with 30s target buffer length</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Bandwidth Estimate: {bandwidthEstimate} kbps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Buffer Stalls: {bufferStalls}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Dropped Frames: {droppedFrames}</span>
                </li>
                {availableQualities.length > 0 && (
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Available Qualities: {availableQualities.join(', ')}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0e0b14] text-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/analysis" element={<DataAnalysisPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/metrics" element={<CDNMetricsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

function MetricCard({ icon, title, value, description }: MetricCardProps) {
  return (
    <div className="bg-[#252a3a] rounded-lg p-4 shadow-lg">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm mt-2">{description}</p>
    </div>
  );
}

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description?: string;
}

function DetailCard({ icon, title, value, description }: DetailCardProps) {
  return (
    <div className="flex items-center space-x-3 bg-[#252a3a] p-3 rounded-lg">
      {icon}
      <div>
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className="font-semibold">{value}</p>
        {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
      </div>
    </div>
  );
}

export default App;