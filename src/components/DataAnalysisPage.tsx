import React, { useState, useRef } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  PointElement, 
  LineElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';
import { 
  Download, 
  Printer, 
  BarChart, 
  PieChart, 
  LineChart, 
  Globe, 
  Users, 
  Film, 
  Tv, 
  Calendar, 
  Star, 
  Clock, 
  Filter
} from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

import { 
  disneyData, 
  getContentTypeDistribution, 
  getReleaseYearTrends, 
  getTopGenres, 
  getRatingDistribution,
  getAverageMovieDuration,
  getTVShowSeasonDistribution,
  getContentAdditionsByYear,
  getCountryDistribution,
  getTopDirectors,
  getTopCastMembers,
  getContentByYearAndType
} from '../data/disneyData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

// Define chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#fff'
      }
    },
    title: {
      display: true,
      color: '#fff'
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff'
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ccc'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    y: {
      ticks: {
        color: '#ccc'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  }
};

const DataAnalysisPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const reportRef = useRef<HTMLDivElement>(null);
  
  // Get data for charts
  const contentTypeData = getContentTypeDistribution();
  const releaseYearData = getReleaseYearTrends();
  const topGenresData = getTopGenres();
  const ratingDistributionData = getRatingDistribution();
  const averageMovieDuration = getAverageMovieDuration();
  const tvShowSeasons = getTVShowSeasonDistribution();
  const contentAdditions = getContentAdditionsByYear();
  const countryDistribution = getCountryDistribution();
  const topDirectors = getTopDirectors();
  const topCastMembers = getTopCastMembers();
  const contentByYearAndType = getContentByYearAndType();
  
  // Prepare chart data
  const contentTypeChartData = {
    labels: Object.keys(contentTypeData),
    datasets: [
      {
        label: 'Content Count',
        data: Object.values(contentTypeData),
        backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)'],
        borderColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
        borderWidth: 1,
      },
    ],
  };
  
  const releaseYearChartData = {
    labels: releaseYearData.years,
    datasets: [
      {
        label: 'Content Released',
        data: releaseYearData.counts,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  const topGenresChartData = {
    labels: topGenresData.genres,
    datasets: [
      {
        label: 'Content Count',
        data: topGenresData.counts,
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
      },
    ],
  };
  
  const ratingChartData = {
    labels: ratingDistributionData.map(item => item.rating),
    datasets: [
      {
        label: 'Content Count',
        data: ratingDistributionData.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const contentAdditionsChartData = {
    labels: contentAdditions.years,
    datasets: [
      {
        label: 'Content Added',
        data: contentAdditions.counts,
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 1,
      },
    ],
  };
  
  const contentByYearTypeChartData = {
    labels: contentByYearAndType.years,
    datasets: [
      {
        label: 'Movies',
        data: contentByYearAndType.movies,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
      {
        label: 'TV Shows',
        data: contentByYearAndType.tvShows,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };
  
  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };
  
  // Handle PDF export
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Disney+ Content Analysis Report', 14, 22);
    
    // Add date
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Add content type distribution
    doc.setFontSize(14);
    doc.text('Content Type Distribution', 14, 40);
    
    const contentTypeTable = [
      ['Content Type', 'Count'],
      ...Object.entries(contentTypeData).map(([type, count]) => [type, count.toString()])
    ];
    
    (doc as any).autoTable({
      startY: 45,
      head: [contentTypeTable[0]],
      body: contentTypeTable.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] }
    });
    
    // Add top genres
    doc.setFontSize(14);
    doc.text('Top Genres', 14, (doc as any).lastAutoTable.finalY + 15);
    
    const genresTable = [
      ['Genre', 'Count'],
      ...topGenresData.genres.map((genre, index) => [genre, topGenresData.counts[index].toString()])
    ];
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [genresTable[0]],
      body: genresTable.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] }
    });
    
    // Add rating distribution
    doc.setFontSize(14);
    doc.text('Rating Distribution', 14, (doc as any).lastAutoTable.finalY + 15);
    
    const ratingsTable = [
      ['Rating', 'Count'],
      ...ratingDistributionData.map(item => [item.rating, item. count.toString()])
    ];
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [ratingsTable[0]],
      body: ratingsTable.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] }
    });
    
    // Add top directors
    doc.setFontSize(14);
    doc.text('Top Directors', 14, (doc as any).lastAutoTable.finalY + 15);
    
    const directorsTable = [
      ['Director', 'Content Count'],
      ...topDirectors.map(item => [item.director, item.count.toString()])
    ];
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [directorsTable[0]],
      body: directorsTable.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] }
    });
    
    // Save the PDF
    doc.save('disney-plus-content-analysis.pdf');
  };
  
  // Handle CSV export
  const handleExportCSV = () => {
    // Prepare data for CSV export
    const csvData = disneyData.map(item => ({
      show_id: item.show_id,
      type: item.type,
      title: item.title,
      director: item.director,
      cast: item.cast,
      country: item.country,
      date_added: item.date_added,
      release_year: item.release_year,
      rating: item.rating,
      duration: item.duration,
      listed_in: item.listed_in
    }));
    
    // Convert to CSV
    const csv = Papa.unparse(csvData);
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'disney-plus-content-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen bg-[#0e0b14] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Disney+ Content Analysis</h1>
              <p className="text-gray-400">Comprehensive data analysis of Disney+ streaming catalog</p>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button 
                onClick={handlePrint}
                className="flex items-center space-x-2 bg-[#252a3a] hover:bg-[#2d3343] px-4 py-2 rounded-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
              
              <button 
                onClick={handleExportPDF}
                className="flex items-center space-x-2 bg-[#252a3a] hover:bg-[#2d3343] px-4 py-2 rounded-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
              
              <button 
                onClick={handleExportCSV}
                className="flex items-center space-x-2 bg-[#252a3a] hover:bg-[#2d3343] px-4 py-2 rounded-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mb-8 border-b border-gray-700">
            <nav className="flex overflow-x-auto pb-1">
              <button 
                className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'content-trends' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('content-trends')}
              >
                Content Trends
              </button>
              <button 
                className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'genres' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('genres')}
              >
                Genres & Ratings
              </button>
              <button 
                className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'geography' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('geography')}
              >
                Geographic Analysis
              </button>
              <button 
                className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'people' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('people')}
              >
                Directors & Cast
              </button>
            </nav>
          </div>
          
          {/* Report Content */}
          <div ref={reportRef} className="print:text-black">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard 
                    icon={<Film className="w-8 h-8 text-blue-400" />}
                    title="Total Movies"
                    value={contentTypeData['Movie']}
                    description="Feature films in the catalog"
                  />
                  
                  <StatCard 
                    icon={<Tv className="w-8 h-8 text-pink-400" />}
                    title="Total TV Shows"
                    value={contentTypeData['TV Show']}
                    description="Series and TV shows available"
                  />
                  
                  <StatCard 
                    icon={<Calendar className="w-8 h-8 text-green-400" />}
                    title="Latest Content Year"
                    value={Math.max(...releaseYearData.years)}
                    description="Most recent release year"
                  />
                  
                  <StatCard 
                    icon={<Star className="w-8 h-8 text-yellow-400" />}
                    title="Most Common Rating"
                    value={ratingDistributionData.sort((a, b) => b.count - a.count)[0].rating}
                    description="Most frequent content rating"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                      <PieChart className="w-5 h-5 mr-2" />
                      Content Type Distribution
                    </h2>
                    <div className="h-80">
                      <Pie 
                        data={contentTypeChartData} 
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Movies vs. TV Shows'
                            }
                          }
                        }} 
                      />
                    </div>
                    <div className="mt-4 text-gray-300">
                      <p>The Disney+ catalog consists predominantly of movies, which make up {Math.round((contentTypeData['Movie'] / (contentTypeData['Movie'] + contentTypeData['TV Show'])) * 100)}% of the content. TV shows represent the remaining {Math.round((contentTypeData['TV Show'] / (contentTypeData['Movie'] + contentTypeData['TV Show'])) * 100)}%.</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                      <BarChart className="w-5 h-5 mr-2" />
                      Top 5 Genres
                    </h2>
                    <div className="h-80">
                      <Bar 
                        data={{
                          labels: topGenresData.genres.slice(0, 5),
                          datasets: [{
                            label: 'Content Count',
                            data: topGenresData.counts.slice(0, 5),
                            backgroundColor: 'rgba(153, 102, 255, 0.8)',
                            borderColor: 'rgb(153, 102, 255)',
                            borderWidth: 1,
                          }]
                        }} 
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Most Popular Content Categories'
                            }
                          }
                        }} 
                      />
                    </div>
                    <div className="mt-4 text-gray-300">
                      <p>The most dominant genre on Disney+ is {topGenresData.genres[0]} with {topGenresData.counts[0]} titles, followed by {topGenresData.genres[1]} and {topGenresData.genres[2]}. This reflects Disney's focus on family-friendly content and franchise-based entertainment.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl mb-8">
                  <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                    <LineChart className="w-5 h-5 mr-2" />
                    Content Release Trends Over Time
                  </h2>
                  <div className="h-80">
                    <Line 
                      data={releaseYearChartData} 
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: {
                            ...chartOptions.plugins.title,
                            text: 'Content Released by Year'
                          }
                        }
                      }} 
                    />
                  </div>
                  <div className="mt-4 text-gray-300">
                    <p>The data shows a significant increase in content production in recent years, with a notable spike in {releaseYearData.years[releaseYearData.counts.indexOf(Math.max(...releaseYearData.counts))]}. This trend aligns with Disney's strategic focus on creating exclusive content for its streaming platform to compete with other services.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Duration Analysis
                    </h2>
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2">Movies</h3>
                      <p className="text-3xl font-bold text-white">{Math.round(averageMovieDuration)} min</p>
                      <p className="text-gray-400 text-sm mt-1">Average movie duration</p>
                      
                      <div className="mt-4 bg-gray-700 h-2 rounded-full">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(averageMovieDuration / 200) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>0 min</span>
                        <span>200 min</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-2">TV Shows</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {tvShowSeasons.map((item, index) => (
                          <div key={index} className="bg-[#252a3a] p-3 rounded-lg">
                            <p className="text-sm text-gray-400">Season{parseInt(item.seasons) > 1 ? 's' : ''}</p>
                            <div className="flex items-end">
                              <span className="text-2xl font-bold">{item.seasons}</span>
                              <span className="ml-2 text-gray-400">({item.count} shows)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Rating Distribution
                    </h2>
                    <div className="h-80">
                      <Pie 
                        data={ratingChartData} 
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Content by Rating Category'
                            }
                          }
                        }} 
                      />
                    </div>
                    <div className="mt-4 text-gray-300">
                      <p>The most common rating on Disney+ is {ratingDistributionData.sort((a, b) => b.count - a.count)[0].rating}, accounting for {Math.round((ratingDistributionData.sort((a, b) => b.count - a.count)[0].count / disneyData.length) * 100)}% of all content. This reflects Disney's focus on family-friendly entertainment suitable for a wide audience range.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Content Trends Tab */}
            {activeTab === 'content-trends' && (
              <div>
                <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl mb-8">
                  <h2 className="text-xl font-bold mb-4 text-blue-400">Release Year Trends</h2>
                  <div className="h-96">
                    <Line 
                      data={releaseYearChartData} 
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: {
                            ...chartOptions.plugins.title,
                            text: 'Content Released by Year'
                          }
                        }
                      }} 
                    />
                  </div>
                  <div className="mt-6 text-gray-300">
                    <h3 className="font-semibold text-lg mb-2">Key Insights:</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Content production has shown a steady increase since 2019, coinciding with the launch of Disney+.</li>
                      <li>The peak year for content releases was {releaseYearData.years[releaseYearData.counts.indexOf(Math.max(...releaseYearData.counts))]} with {Math.max(...releaseYearData.counts)} titles.</li>
                      <li>The growth trend indicates Disney's commitment to expanding its streaming library to compete with established services.</li>
                      <li>Recent years show a focus on both original content and leveraging existing IP from Disney's vast catalog.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl mb-8">
                  <h2 className="text-xl font-bold mb-4 text-blue-400">Content Additions to Disney+</h2>
                  <div className="h-96">
                    <Bar 
                      data={contentAdditionsChartData} 
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: {
                            ...chartOptions.plugins.title,
                            text: 'Content Added to Platform by Year'
                          }
                        }
                      }} 
                    />
                  </div>
                  <div className="mt-6 text-gray-300">
                    <h3 className="font-semibold text-lg mb-2">Platform Growth Analysis:</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Disney+ has consistently added new content since its launch, with significant additions in {contentAdditions.years[contentAdditions.counts.indexOf(Math.max(...contentAdditions.counts))]}.</li>
                      <li>The platform's content library grew most rapidly during its first two years, establishing a competitive catalog.</li>
                      <li>Recent additions show a strategic balance between new releases and older catalog titles.</li>
                      <li>The addition pattern suggests a planned content release strategy to maintain subscriber interest throughout the year.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                  <h2 className="text-xl font-bold mb-4 text-blue-400">Movies vs. TV Shows Over Time</h2>
                  <div className="h-96">
                    <Bar 
                      data={contentByYearTypeChartData} 
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: {
                            ...chartOptions.plugins.title,
                            text: 'Movies and TV Shows by Release Year'
                          }
                        }
                      }} 
                    />
                  </div>
                  <div className="mt-6 text-gray-300">
                    <h3 className="font-semibold text-lg mb-2">Content Type Evolution:</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Movies have historically dominated Disney's content production, reflecting the company's film studio heritage.</li>
                      <li>TV show production has increased significantly since 2019, showing Disney's adaptation to streaming platform demands.</li>
                      <li>The ratio of movies to TV shows has shifted from approximately {Math.round(contentByYearAndType.movies[0] / (contentByYearAndType.tvShows[0] || 1))}:1 in early years to {Math.round(contentByYearAndType.movies[contentByYearAndType.years.length - 1] / (contentByYearAndType.tvShows[contentByYearAndType.years.length - 1] || 1))}:1 in recent years.</li>
                      <li>This trend aligns with industry shifts toward serialized content that keeps viewers engaged over longer periods.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Genres & Ratings Tab */}
            {activeTab === 'genres' && (
              <div>
                <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl mb-8">
                  <h2 className="text-xl font-bold mb-4 text-blue-400">Top 10 Genres</h2>
                  <div className="h-96">
                    <Bar 
                      data={topGenresChartData} 
                      options={{
                        ...chartOptions,
                        indexAxis: 'y' as const,
                        plugins: {
                          ...chartOptions.plugins,
                          title: {
                            ...chartOptions.plugins.title,
                            text: 'Most Common Content Categories'
                          }
                        }
                      }} 
                    />
                  </div>
                  <div className="mt-6 text-gray-300">
                    <h3 className="font-semibold text-lg mb-2">Genre Analysis:</h3>
                    <p className="mb-4">The Disney+ catalog shows a clear emphasis on certain genres that align with the company's brand identity and target audience preferences:</p>
                    <ul className="space-y-2 list-disc pl-5">
                      <li><span className="font-medium text-blue-400">{topGenresData.genres[0]}</span>: Dominates with {topGenresData.counts[0]} titles, reflecting Disney's core focus on all-ages entertainment.</li>
                      <li><span className="font-medium text-blue-400">{topGenresData.genres[1]}</span>: Second most common with {topGenresData.counts[1]} titles, showcasing Disney's animation heritage.</li>
                      <li><span className="font-medium text-blue-400">{topGenresData.genres[2]}</span>: Represents {topGenresData.counts[2]} titles, highlighting the importance of action-oriented content from Marvel and Star Wars franchises.</li>
                      <li>The prevalence of genres like Comedy and Drama indicates a balanced approach to content variety while maintaining family-friendly themes.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-blue-400">Rating Distribution</h2>
                    <div className="h-80">
                      <Pie 
                        data={ratingChartData} 
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Content by Rating Category'
                            }
                          }
                        }} 
                      />
                    </div>
                    <div className="mt-4 text-gray-300">
                      <h3 className="font-semibold text-lg mb-2">Rating Insights:</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>The most common rating is <span className="font-medium text-blue-400">{ratingDistributionData.sort((a, b) => b.count - a.count)[0].rating}</span> with {ratingDistributionData.sort((a, b) => b.count - a.count)[0].count} titles ({Math.round((ratingDistributionData.sort((a, b) => b.count - a.count)[0].count / disneyData.length) * 100)}%).</li>
                        <li>Family-friendly ratings (G, PG, TV-Y, TV-G) account for approximately {Math.round(ratingDistributionData.filter(item => ['G', 'PG', 'TV-Y', 'TV-G', 'TV-Y7'].includes(item.rating)).reduce((sum, item) => sum + item.count, 0) / disneyData.length * 100)}% of all content.</li>
                        <li>The distribution reflects Disney's brand positioning as a family-oriented entertainment provider.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-blue-400">Genre Combinations</h2>
                    <div className="h-80">
                      <Radar 
                        data={{
                          labels: topGenresData.genres.slice(0, 8),
                          datasets: [
                            {
                              label: 'Movies',
                              data: topGenresData.genres.slice(0, 8).map(genre => {
                                return disneyData.filter(item => item.type === 'Movie' && item.listed_in.includes(genre)).length;
                              }),
                              backgroundColor: 'rgba(54, 162, 235, 0.2)',
                              borderColor: 'rgb(54, 162, 235)',
                              pointBackgroundColor: 'rgb(54, 162, 235)',
                              pointBorderColor: '#fff',
                              pointHoverBackgroundColor: '#fff',
                              pointHoverBorderColor: 'rgb(54, 162, 235)'
                            },
                            {
                              label: 'TV Shows',
                              data: topGenresData.genres.slice(0, 8).map(genre => {
                                return disneyData.filter(item => item.type === 'TV Show' && item.listed_in.includes(genre)).length;
                              }),
                              backgroundColor: 'rgba(255, 99, 132, 0.2)',
                              borderColor: 'rgb(255, 99, 132)',
                              pointBackgroundColor: 'rgb(255, 99, 132)',
                              pointBorderColor: '#fff',
                              pointHoverBackgroundColor: '#fff',
                              pointHoverBorderColor: 'rgb(255, 99, 132)'
                            }
                          ]
                        }}
                        options={{
                          ...chartOptions,
                          scales: {
                            r: {
                              angleLines: {
                                color: 'rgba(255, 255, 255, 0.1)'
                              },
                              grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                              },
                              pointLabels: {
                                color: '#ccc'
                              },
                              ticks: {
                                backdropColor: 'transparent',
                                color: '#ccc'
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="mt-4 text-gray-300">
                      <h3 className="font-semibold text-lg mb-2">Cross-Genre Analysis:</h3>
                      <p>The radar chart reveals distinct genre patterns between movies and TV shows:</p>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Movies show stronger representation in Animation and Family categories.</li>
                        <li>TV Shows have proportionally more content in Action and Adventure genres.</li>
                        <li>This distribution reflects different storytelling approaches between film and television formats.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                  <h2 className="text-xl font-bold mb-4 text-blue-400">Genre Trends Over Time</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-sm text-left">
                      <thead className="text-xs uppercase bg-[#252a3a]">
                        <tr>
                          <th scope="col" className="px-6 py-3">Year</th>
                          {topGenresData.genres.slice(0, 5).map((genre, index) => (
                            <th key={index} scope="col" className="px-6 py-3">{genre}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {contentByYearAndType.years.slice(-10).map((year, yearIndex) => (
                          <tr key={yearIndex} className={yearIndex % 2 === 0 ? 'bg-[#1e2130]' : 'bg-[#252a3a]'}>
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                              {year}
                            </th>
                            {topGenresData.genres.slice(0, 5).map((genre, genreIndex) => {
                              const count = disneyData.filter(
                                item => item.release_year === year && item.listed_in.includes(genre)
                              ).length;
                              return (
                                <td key={genreIndex} className="px-6 py-4">
                                  {count > 0 ? (
                                    <div className="flex items-center">
                                      <span className="mr-2">{count}</span>
                                      <div className="w-16 bg-gray-700 h-2 rounded-full">
                                        <div 
                                          className="bg-blue-500 h-2 rounded-full" 
                                          style={{ width: `${(count / 10) * 100}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  ) : (
                                    <span>-</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 text-gray-300">
                    <p>This table shows how genre representation has evolved over the past decade, highlighting Disney's shifting content priorities and the influence of major acquisitions like Marvel and Star Wars on the catalog composition.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Geographic Analysis Tab */}
            {activeTab === 'geography' && (
              <div>
                <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl mb-8">
                  <h2 className="text-xl font-bold mb-4 text-blue-400">Content by Country of Origin</h2>
                  <div className="h-96">
                    <ComposableMap
                      projectionConfig={{
                        scale: 147,
                        rotation: [-11, 0, 0],
                      }}
                      className="text-[#ccc]"
                    >
                      <Geographies geography="/world-110m.json">
                        {({ geographies }) =>
                          geographies.map((geo) => {
                            const countryName = geo.properties.NAME;
                            const countryData = countryDistribution.find(
                              item => item.country.includes(countryName)
                            );
                            const fillColor = countryData 
                              ? `rgba(54, 162, 235, ${Math.min(countryData.count / 20, 0.9)})`
                              : 'rgba(54, 162, 235, 0.05)';
                            
                            return (
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={fillColor}
                                stroke="#1a1d29"
                                style={{
                                  default: { outline: 'none' },
                                  hover: { outline: 'none', fill: 'rgba(54, 162, 235, 0.7)' },
                                  pressed: { outline: 'none' },
                                }}
                              />
                            );
                          })
                        }
                      </Geographies>
                      {countryDistribution.slice(0, 5).map(({ country, count }) => {
                        // Simplified marker positions for top countries
                        const markerPosition = {
                          'United States': [-95, 38],
                          'United Kingdom': [0, 55],
                          'Canada': [-100, 60],
                          'Australia': [135, -30],
                          'France': [2, 46],
                          'Japan': [138, 38],
                          'Germany': [10, 51],
                          'India': [78, 22],
                        }[country] || [0, 0];
                        
                        return markerPosition[0] !== 0 ? (
                          <Marker key={country} coordinates={markerPosition as [number, number]}>
                            <circle r={Math.log(count) * 3} fill="rgba(255, 99, 132, 0.8)" />
                            <text
                              textAnchor="middle"
                              y={-10}
                              style={{ 
                                fontFamily: "system-ui", 
                                fill: "#FFFFFF",
                                fontSize: "8px",
                                fontWeight: "bold",
                                textShadow: "1px 1px 1px rgba(0,0,0,0.5)"
                              }}
                            >
                              {country} ({count})
                            </text>
                          </Marker>
                        ) : null;
                      })}
                    </ComposableMap>
                  </div>
                  <div className="mt-6 text-gray-300">
                    <h3 className="font-semibold text-lg mb-2">Geographic Distribution Insights:</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>The Disney+ catalog is heavily dominated by content from the United States, which accounts for {Math.round((countryDistribution.find(c => c.country === 'United States')?.count || 0) / disneyData.length * 100)}% of all titles.</li>
                      <li>International representation is limited, with only a small percentage of content originating outside North America.</li>
                      <li>This distribution reflects Disney's historical focus on American-produced entertainment, though recent years have seen efforts to diversify content origins.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-blue-400">Top Content Origins</h2>
                    <div className="overflow-y-auto max-h-96">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-[#252a3a]">
                          <tr>
                            <th scope="col" className="px-6 py-3">Country</th>
                            <th scope="col" className="px-6 py-3">Content Count</th>
                            <th scope="col" className="px-6 py-3">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {countryDistribution.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-[#1e2130]' : 'bg-[#252a3a]'}>
                              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                {item.country}
                              </th>
                              <td className="px-6 py-4">{item.count}</td>
                              <td className="px-6 py-4">
                                {Math.round((item.count / disneyData.length) * 100)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-blue-400">International Content Growth</h2>
                    <div className="h-80">
                      <Line 
                        data={{
                          labels: contentByYearAndType.years.slice(-10),
                          datasets: [
                            {
                              label: 'US Content',
                              data: contentByYearAndType.years.slice(-10).map(year => 
                                disneyData.filter(item => 
                                  item.release_year === year && 
                                  item.country.includes('United States')
                                ).length
                              ),
                              borderColor: 'rgb(54, 162, 235)',
                              backgroundColor: 'rgba(54, 162, 235, 0.5)',
                              tension: 0.3,
                            },
                            {
                              label: 'International Content',
                              data: contentByYearAndType.years.slice(-10).map(year => 
                                disneyData.filter(item => 
                                  item.release_year === year && 
                                  !item.country.includes('United States')
                                ).length
                              ),
                              borderColor: 'rgb(255, 99, 132)',
                              backgroundColor: 'rgba(255, 99, 132, 0.5)',
                              tension: 0.3,
                            }
                          ]
                        }}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'US vs. International Content Over Time'
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="mt-4 text-gray-300">
                      <p>While US-produced content continues to dominate, there has been a gradual increase in international titles in recent years, reflecting Disney's global expansion strategy and efforts to appeal to diverse audiences worldwide.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Directors & Cast Tab */}
            {activeTab === 'people' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-blue-400">Top Directors</h2>
                    <div className="overflow-y-auto max-h-96">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-[#252a3a]">
                          <tr>
                            <th scope="col" className="px-6 py-3">Director</th>
                            <th scope="col" className="px-6 py-3">Content Count</th>
                            <th scope="col" className="px-6 py-3">Most Recent Title</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topDirectors.map((item, index) => {
                            const mostRecentTitle = disneyData
                              .filter(content => content.director.includes(item.director))
                              .sort((a, b) => b.release_year - a.release_year)[0]?.title || '';
                            
                            return (
                              <tr key={index} className={index % 2 === 0 ? 'bg-[#1e2130]' : 'bg-[#252a3a]'}>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                  {item.director}
                                </th>
                                <td className="px-6 py-4">{item.count}</td>
                                <td className="px-6 py-4 truncate max-w-[200px]">{mostRecentTitle}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 text-gray-300">
                      <p>The most prolific directors on Disney+ reflect the platform's focus on franchise content and animation, with many directors working across multiple titles in the same series or universe.</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-blue-400">Top Cast Members</h2>
                    <div className="overflow-y-auto max-h-96">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-[#252a3a]">
                          <tr>
                            <th scope="col" className="px-6 py-3">Actor</th>
                            <th scope="col" className="px-6 py-3">Appearances</th>
                            <th scope="col" className="px-6 py-3">Content Types</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topCastMembers.map((item, index) => {
                            const contentTypes = {
                              movies: disneyData.filter(content => 
                                content.cast.includes(item.member) && 
                                content.type === 'Movie'
                              ).length,
                              tvShows: disneyData.filter(content => 
                                content.cast.includes(item.member) && 
                                content.type === 'TV Show'
                              ).length
                            };
                            
                            return (
                              <tr key={index} className={index % 2 === 0 ? 'bg-[#1e2130]' : 'bg-[#252a3a]'}>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                  {item.member}
                                </th>
                                <td className="px-6 py-4">{item.count}</td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-blue-400">{contentTypes.movies} Movies</span>
                                    <span>•</span>
                                    <span className="text-pink-400">{contentTypes.tvShows} TV Shows</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 text-gray-300">
                      <p>The most frequent cast members on Disney+ are often associated with major franchises like Marvel and Star Wars, appearing across both movies and TV shows within these universes.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1a1d29] rounded-lg p-6 shadow-xl">
                  <h2 className="text-xl font-bold mb-4 text-blue-400">Director-Actor Collaborations</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-sm text-left">
                      <thead className="text-xs uppercase bg-[#252a3a]">
                        <tr>
                          <th scope="col" className="px-6 py-3">Director</th>
                          <th scope="col" className="px-6 py-3">Actor</th>
                          <th scope="col" className="px-6 py-3">Collaborations</th>
                          <th scope="col" className="px-6 py-3">Projects</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Calculate top collaborations */}
                        {(() => {
                          const collaborations: {
                            director: string;
                            actor: string;
                            count: number;
                            titles: string[];
                          }[] = [];
                          
                          // For each director
                          topDirectors.slice(0, 5).forEach(directorItem => {
                            // For each top cast member
                            topCastMembers.slice(0, 10).forEach(castItem => {
                              // Find titles where they worked together
                              const titles = disneyData.filter(content => 
                                content.director.includes(directorItem.director) && 
                                content.cast.includes(castItem.member)
                              ).map(content => content.title);
                              
                              if (titles.length > 0) {
                                collaborations.push({
                                  director: directorItem.director,
                                  actor: castItem.member,
                                  count: titles.length,
                                  titles
                                });
                              }
                            });
                          });
                          
                          // Sort by collaboration count
                          return collaborations
                            .sort((a, b) => b.count - a.count)
                            .slice(0, 10)
                            .map((collab, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-[#1e2130]' : 'bg-[#252a3a]'}>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                  {collab.director}
                                </th>
                                <td className="px-6 py-4">{collab.actor}</td>
                                <td className="px-6 py-4">{collab.count}</td>
                                <td className="px-6 py-4 truncate max-w-[300px]">
                                  {collab.titles.join(', ')}
                                </td>
                              </tr>
                            ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 text-gray-300">
                    <h3 className="font-semibold text-lg mb-2">Collaboration Insights:</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Frequent director-actor collaborations are common in Disney's content, particularly within franchise properties.</li>
                      <li>These recurring partnerships help maintain consistency in character portrayal and storytelling across multiple titles.</li>
                      <li>The most prolific collaborations often span years or even decades, showing Disney's commitment to long-term creative relationships.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  description: string;
}

function StatCard({ icon, title, value, description }: StatCardProps) {
  return (
    <div className="bg-[#1a1d29] rounded-lg p-4 shadow-lg">
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

export default DataAnalysisPage;