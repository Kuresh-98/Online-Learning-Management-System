import React, { useState } from 'react';
import {
    HiDocumentDownload,
    HiDocumentText,
    HiCalendar,
    HiChartBar,
    HiUsers,
    HiBookOpen,
    HiCurrencyDollar,
    HiDownload
} from 'react-icons/hi';

const Reports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    const reports = [
        {
            id: 1,
            name: 'User Activity Report',
            description: 'Detailed breakdown of user registrations, logins, and activity patterns',
            icon: <HiUsers className="w-6 h-6" />,
            color: 'blue',
            lastGenerated: '2 hours ago'
        },
        {
            id: 2,
            name: 'Course Performance Report',
            description: 'Analytics on course enrollments, completions, and ratings',
            icon: <HiBookOpen className="w-6 h-6" />,
            color: 'purple',
            lastGenerated: '1 day ago'
        },
        {
            id: 3,
            name: 'Revenue Report',
            description: 'Financial summary including course sales and instructor payouts',
            icon: <HiCurrencyDollar className="w-6 h-6" />,
            color: 'green',
            lastGenerated: '3 days ago'
        },
        {
            id: 4,
            name: 'Engagement Analytics',
            description: 'Insights on student engagement, watch time, and quiz performance',
            icon: <HiChartBar className="w-6 h-6" />,
            color: 'yellow',
            lastGenerated: '1 week ago'
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            green: 'bg-green-100 text-green-600',
            yellow: 'bg-yellow-100 text-yellow-600'
        };
        return colors[color] || colors.blue;
    };

    const handleDownload = (reportName) => {
        // In a real app, this would trigger a download
        alert(`Downloading ${reportName}...`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                    <p className="text-gray-500">Generate and download platform reports</p>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
                    {['week', 'month', 'quarter', 'year'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${selectedPeriod === period
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <HiCalendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-blue-100 text-sm">Report Period</p>
                        <p className="text-xl font-bold capitalize">{selectedPeriod}ly Report</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-2xl font-bold">156</p>
                        <p className="text-blue-100 text-sm">New Users</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-2xl font-bold">48</p>
                        <p className="text-blue-100 text-sm">New Courses</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-2xl font-bold">892</p>
                        <p className="text-blue-100 text-sm">Enrollments</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-2xl font-bold">67%</p>
                        <p className="text-blue-100 text-sm">Completion</p>
                    </div>
                </div>
            </div>

            {/* Available Reports */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Available Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reports.map((report) => (
                        <div key={report.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(report.color)}`}>
                                    {report.icon}
                                </div>
                                <span className="text-xs text-gray-400">Last: {report.lastGenerated}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{report.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDownload(report.name)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors"
                                >
                                    <HiDocumentDownload className="w-4 h-4" />
                                    Download PDF
                                </button>
                                <button
                                    onClick={() => handleDownload(report.name)}
                                    className="p-2.5 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-colors"
                                    title="Download CSV"
                                >
                                    <HiDownload className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Downloads */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Downloads</h2>
                <div className="space-y-3">
                    {[
                        { name: 'User Activity Report - January 2026', date: 'Feb 5, 2026', size: '2.4 MB' },
                        { name: 'Course Performance Report - Q4 2025', date: 'Jan 15, 2026', size: '1.8 MB' },
                        { name: 'Revenue Report - December 2025', date: 'Jan 2, 2026', size: '856 KB' }
                    ].map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <HiDocumentText className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                                    <p className="text-xs text-gray-500">{file.date} · {file.size}</p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                <HiDownload className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reports;
