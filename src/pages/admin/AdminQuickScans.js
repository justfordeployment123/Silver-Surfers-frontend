import React, { useState, useEffect } from 'react';
import { adminListQuickScans } from '../../api';

const AdminQuickScans = () => {
  const [quickScans, setQuickScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('scanDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [refreshing, setRefreshing] = useState(false);
  const [statistics, setStatistics] = useState({
    totalScans: 0,
    completedScans: 0,
    failedScans: 0,
    uniqueEmails: 0,
    uniqueUrls: 0
  });

  useEffect(() => {
    loadQuickScans();
  }, [sortBy, sortOrder]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery !== undefined) {
        loadQuickScans();
      }
    }, 500);
    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const loadQuickScans = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {
        limit: 100,
        search: searchQuery || undefined,
        sortBy,
        sortOrder
      };
      
      const result = await adminListQuickScans(params);
      if (result.error) {
        setError(result.error);
        setQuickScans([]);
        setStatistics({
          totalScans: 0,
          completedScans: 0,
          failedScans: 0,
          uniqueEmails: 0,
          uniqueUrls: 0
        });
      } else {
        setQuickScans(result.items || []);
        setStatistics(result.statistics || {
          totalScans: 0,
          completedScans: 0,
          failedScans: 0,
          uniqueEmails: 0,
          uniqueUrls: 0
        });
      }
    } catch (err) {
      setError('Failed to load quick scan data');
      setQuickScans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadQuickScans();
    setRefreshing(false);
  };

  const handleExport = () => {
    // Prepare CSV data
    const headers = ['URL', 'Email', 'First Name', 'Last Name', 'Score (%)', 'Scan Date', 'Status'];
    const csvData = quickScans.map(scan => [
      scan.url,
      scan.email,
      scan.firstName || '',
      scan.lastName || '',
      scan.scanScore !== null && scan.scanScore !== undefined ? scan.scanScore : 'N/A',
      new Date(scan.scanDate).toLocaleString(),
      scan.status
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `quick-scans-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 shadow rounded-lg">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quick Scans</h1>
          <p className="mt-2 text-gray-600">Monitor all free quick scan requests</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            disabled={quickScans.length === 0}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            {refreshing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refreshing...
              </>
            ) : (
              'Refresh'
            )}
          </button>
        </div>
      </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">📊</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Scans</dt>
                  <dd className="text-lg font-medium text-gray-900">{statistics.totalScans}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-semibold">✅</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                  <dd className="text-lg font-medium text-gray-900">{statistics.completedScans}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-semibold">❌</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Failed</dt>
                  <dd className="text-lg font-medium text-gray-900">{statistics.failedScans}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">📧</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Unique Emails</dt>
                  <dd className="text-lg font-medium text-gray-900">{statistics.uniqueEmails}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-semibold">🔗</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Unique URLs</dt>
                  <dd className="text-lg font-medium text-gray-900">{statistics.uniqueUrls}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search by URL or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="scanDate-desc">Newest First</option>
            <option value="scanDate-asc">Oldest First</option>
            <option value="email-asc">Email A-Z</option>
            <option value="email-desc">Email Z-A</option>
            <option value="url-asc">URL A-Z</option>
            <option value="url-desc">URL Z-A</option>
          </select>
          <button
            onClick={() => {
              setSearchQuery('');
              setSortBy('scanDate');
              setSortOrder('desc');
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Scans Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Quick Scan Records ({quickScans.length})
          </h3>
        </div>
        
        {quickScans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('url')}
                      className="hover:text-gray-700 flex items-center"
                    >
                      URL
                      {sortBy === 'url' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('email')}
                      className="hover:text-gray-700 flex items-center"
                    >
                      Email
                      {sortBy === 'email' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('scanDate')}
                      className="hover:text-gray-700 flex items-center"
                    >
                      Scan Date
                      {sortBy === 'scanDate' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quickScans.map((scan) => (
                  <tr key={scan._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={scan.url}>
                        {scan.url}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{scan.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {[scan.firstName, scan.lastName].filter(Boolean).join(' ') || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {scan.scanScore !== null && scan.scanScore !== undefined ? (
                        <div className="flex items-center">
                          <span className={`text-sm font-semibold ${
                            scan.scanScore >= 80 ? 'text-green-600' :
                            scan.scanScore >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {scan.scanScore}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(scan.scanDate).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No quick scans found</h3>
            <p className="mt-1 text-sm text-gray-500">No quick scan records found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminQuickScans;
