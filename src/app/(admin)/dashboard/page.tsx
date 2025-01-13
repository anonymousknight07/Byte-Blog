"use client";

import { useEffect, useState } from 'react';
import Container from '@/components/Container';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useThemeContext } from '@/lib/context/ThemeContext';
import Image from 'next/image';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface CountryStats {
  country: string;
  count: number;
  percentage: number;
}

interface PostStats {
  postId: string;
  postTitle: string;
  totalVisits: number;
  countries: {
    country: string;
    count: number;
    percentage: number;
  }[];
}

interface AnalyticsData {
  overall: CountryStats[];
  posts: PostStats[];
}

export default function DashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const { theme } = useThemeContext();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) throw new Error('Failed to fetch analytics');
        
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#fff' : '#000'
        }
      }
    }
  };

  // Filter out null or undefined values and create chart data
  const validCountryStats = data?.overall.filter(stat => 
    stat.country && stat.country.toLowerCase() !== 'null' && 
    stat.country.toLowerCase() !== 'undefined'
  ) || [];

  const overallChartData = {
    labels: validCountryStats.map(stat => stat.country),
    datasets: [
      {
        data: validCountryStats.map(stat => stat.percentage),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  const postsChartData = {
    labels: data?.posts.map(post => post.postTitle) || [],
    datasets: [
      {
        label: 'Total Visits',
        data: data?.posts.map(post => post.totalVisits) || [],
        backgroundColor: theme === 'dark' ? '#8b94ff' : '#251e56',
      }
    ]
  };

  const getCountryCode = (countryName: string) => {
    const countryMap: { [key: string]: string } = {
      'United States': 'us',
      'United Kingdom': 'gb',
      'India': 'in',
      // Add more country mappings as needed
    };
    return countryMap[countryName]?.toLowerCase() || 'unknown';
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen dark:text-white">
      Loading...
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen text-red-500">
      {error}
    </div>
  );

  return (
    <Container className="py-8 px-4 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Demographics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Overall Reader Demographics</h2>
          <div className="aspect-square">
            <Pie data={overallChartData} options={chartOptions} />
          </div>
          <div className="mt-4">
            {validCountryStats.map((stat) => (
              <div key={stat.country} className="flex items-center justify-between py-2 border-b dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Image
                    src={`https://flagcdn.com/24x18/${getCountryCode(stat.country)}.png`}
                    alt={stat.country}
                    width={24}
                    height={18}
                    className="rounded-sm"
                  />
                  <span className="dark:text-white">{stat.country}</span>
                </div>
                <span className="dark:text-white">{stat.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Posts Overview</h2>
          <Bar data={postsChartData} options={chartOptions} />
        </div>
      </div>

      {/* Per-Post Details */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Post Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-2 dark:text-white">Post Title</th>
                <th className="text-right py-2 dark:text-white">Total Visits</th>
                <th className="text-right py-2 dark:text-white">Top Country</th>
              </tr>
            </thead>
            <tbody>
              {data?.posts.map((post) => (
                <tr 
                  key={post.postId} 
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedPost(selectedPost === post.postId ? null : post.postId)}
                >
                  <td className="py-2 dark:text-white">{post.postTitle}</td>
                  <td className="text-right dark:text-white">{post.totalVisits}</td>
                  <td className="text-right flex items-center justify-end gap-2 py-2">
                    {post.countries[0] && (
                      <>
                        <Image
                          src={`https://flagcdn.com/24x18/${getCountryCode(post.countries[0].country)}.png`}
                          alt={post.countries[0].country}
                          width={24}
                          height={18}
                          className="rounded-sm"
                        />
                        <span className="dark:text-white">
                          {post.countries[0].country} ({post.countries[0].percentage.toFixed(1)}%)
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}