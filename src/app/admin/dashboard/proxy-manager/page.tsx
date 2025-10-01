// app/admin/proxy-manager/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    Loader2,
    CheckCircle,
    XCircle,
    Eye,
    EyeOff,
    ArrowLeft,
    Globe,
    Search,
    Filter,
    RefreshCw,
    AlertCircle,
    Clock,
    Zap,
    Settings,
    Cable
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Proxy {
    id: string;
    host: string;
    port: number;
    type: 'http' | 'https' | 'socks4' | 'socks5';
    username?: string;
    password?: string;
    active: boolean;
    lastChecked?: string;
    isWorking?: boolean;
    responseTime?: number;
    country?: string;
    city?: string;
}

type FilterType = 'all' | 'working' | 'failed' | 'untested' | 'http' | 'https' | 'socks4' | 'socks5';

export default function ProxyManager() {
    const [proxies, setProxies] = useState<Proxy[]>([]);
    const [filteredProxies, setFilteredProxies] = useState<Proxy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editingProxy, setEditingProxy] = useState<Proxy | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [testingProxies, setTestingProxies] = useState<Set<string>>(new Set());
    const [showPasswords, setShowPasswords] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
    const [bulkTesting, setBulkTesting] = useState(false);

    const [newProxy, setNewProxy] = useState<Omit<Proxy, 'id'>>({
        host: '',
        port: 0,
        type: 'http',
        username: '',
        password: '',
        active: true
    });

    useEffect(() => {
        loadProxies();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [proxies, searchTerm, currentFilter]);

    const loadProxies = async () => {
        try {
            const response = await fetch('/api/proxy');
            if (!response.ok) throw new Error('Failed to load proxies');
            const data = await response.json();
            setProxies(data);
        } catch (err) {
            setError('Failed to load proxies');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = proxies;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(proxy =>
                proxy.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
                proxy.port.toString().includes(searchTerm) ||
                proxy.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        switch (currentFilter) {
            case 'working':
                filtered = filtered.filter(proxy => proxy.isWorking === true);
                break;
            case 'failed':
                filtered = filtered.filter(proxy => proxy.isWorking === false);
                break;
            case 'untested':
                filtered = filtered.filter(proxy => proxy.isWorking === undefined);
                break;
            case 'http':
            case 'https':
            case 'socks4':
            case 'socks5':
                filtered = filtered.filter(proxy => proxy.type === currentFilter);
                break;
        }

        setFilteredProxies(filtered);
    };

    const showMessage = (message: string, type: 'success' | 'error') => {
        if (type === 'success') {
            setSuccess(message);
            setError('');
            setTimeout(() => setSuccess(''), 5000);
        } else {
            setError(message);
            setSuccess('');
        }
    };

    const handleAddProxy = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProxy.host || !newProxy.port) return;

        try {
            const response = await fetch('/api/proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProxy),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add proxy');
            }

            await loadProxies();
            setShowAddForm(false);
            setNewProxy({
                host: '',
                port: 0,
                type: 'http',
                username: '',
                password: '',
                active: true
            });
            showMessage('Proxy added successfully!', 'success');
        } catch (err) {
            showMessage(err instanceof Error ? err.message : 'Failed to add proxy', 'error');
        }
    };

    const handleUpdateProxy = async (proxy: Proxy) => {
        try {
            const response = await fetch(`/api/proxy/${proxy.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(proxy),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update proxy');
            }

            await loadProxies();
            setEditingProxy(null);
            showMessage('Proxy updated successfully!', 'success');
        } catch (err) {
            showMessage(err instanceof Error ? err.message : 'Failed to update proxy', 'error');
        }
    };

    const handleDeleteProxy = async (id: string) => {
        if (!confirm('Are you sure you want to delete this proxy?')) return;

        try {
            const response = await fetch(`/api/proxy/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete proxy');
            }

            await loadProxies();
            showMessage('Proxy deleted successfully!', 'success');
        } catch (err) {
            showMessage(err instanceof Error ? err.message : 'Failed to delete proxy', 'error');
        }
    };

    const testProxy = async (proxy: Proxy) => {
        setTestingProxies(prev => new Set(prev).add(proxy.id));

        try {
            const response = await fetch(`/api/proxy/test/${proxy.id}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Test failed');
            }

            await loadProxies();
            showMessage(`Proxy ${proxy.host}:${proxy.port} tested successfully!`, 'success');
        } catch (err) {
            showMessage(`Failed to test proxy ${proxy.host}:${proxy.port}`, 'error');
        } finally {
            setTestingProxies(prev => {
                const newSet = new Set(prev);
                newSet.delete(proxy.id);
                return newSet;
            });
        }
    };

    const testAllProxies = async () => {
        const activeProxies = proxies.filter(p => p.active);
        setBulkTesting(true);
        setTestingProxies(new Set(activeProxies.map(p => p.id)));

        try {
            const response = await fetch('/api/proxy/test-all', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to test proxies');
            }

            await loadProxies();
            showMessage(`Successfully tested ${activeProxies.length} proxies!`, 'success');
        } catch (err) {
            showMessage('Failed to test all proxies', 'error');
        } finally {
            setBulkTesting(false);
            setTestingProxies(new Set());
        }
    };

    const toggleShowPassword = (proxyId: string) => {
        setShowPasswords(prev => {
            const newSet = new Set(prev);
            if (newSet.has(proxyId)) {
                newSet.delete(proxyId);
            } else {
                newSet.add(proxyId);
            }
            return newSet;
        });
    };

    const getStatusIcon = (proxy: Proxy) => {
        if (testingProxies.has(proxy.id)) {
            return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
        }
        if (proxy.isWorking === true) {
            return <CheckCircle className="w-4 h-4 text-green-500" />;
        }
        if (proxy.isWorking === false) {
            return <XCircle className="w-4 h-4 text-red-500" />;
        }
        return <Clock className="w-4 h-4 text-gray-400" />;
    };

    const getStats = () => {
        const working = proxies.filter(p => p.isWorking === true).length;
        const failed = proxies.filter(p => p.isWorking === false).length;
        const untested = proxies.filter(p => p.isWorking === undefined).length;
        const avgResponseTime = proxies
            .filter(p => p.responseTime)
            .reduce((acc, p) => acc + (p.responseTime || 0), 0) / 
            (proxies.filter(p => p.responseTime).length || 1);

        return { working, failed, untested, avgResponseTime: Math.round(avgResponseTime) };
    };

    const stats = getStats();

    const filterOptions = [
        { value: 'all', label: 'All Proxies', count: proxies.length },
        { value: 'working', label: 'Working', count: stats.working },
        { value: 'failed', label: 'Failed', count: stats.failed },
        { value: 'https', label: 'HTTPS', count: proxies.filter(p => p.type === 'https').length },
        { value: 'socks4', label: 'SOCKS4', count: proxies.filter(p => p.type === 'socks4').length },
        { value: 'socks5', label: 'SOCKS5', count: proxies.filter(p => p.type === 'socks5').length },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
                    <p className="mt-4 text-gray-600">Loading proxy servers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-xl">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                Proxy Manager
                            </h1>
                            <p className="text-gray-600 mt-1">Manage and monitor your proxy servers</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => loadProxies()}
                            disabled={loading}
                            className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2 transition-all"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <button
                            onClick={testAllProxies}
                            disabled={bulkTesting || proxies.filter(p => p.active).length === 0}
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 flex items-center gap-2 transition-all"
                        >
                            <Cable className="w-4 h-4" />
                            {bulkTesting ? 'Testing...' : 'Test All'}
                        </button>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-4 h-4" />
                            Add Proxy
                        </button>
                 
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Proxies</p>
                                <p className="text-2xl font-bold text-gray-900">{proxies.length}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Globe className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Working</p>
                                <p className="text-2xl font-bold text-green-600">{stats.working}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Failed</p>
                                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                            </div>
                            <div className="p-3 bg-red-100 rounded-lg">
                                <XCircle className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Avg Response</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.avgResponseTime}ms</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                {(error || success) && (
                    <div className="mb-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                                <button onClick={() => setError('')} className="ml-auto">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                {success}
                                <button onClick={() => setSuccess('')} className="ml-auto">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Search and Filter */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search proxies by host, port, or type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border placeholder:text-gray-400 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                            {filterOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setCurrentFilter(option.value as FilterType)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                                        currentFilter === option.value
                                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <Filter className="w-4 h-4" />
                                    {option.label}
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                                        currentFilter === option.value ? 'bg-blue-200' : 'bg-gray-200'
                                    }`}>
                                        {option.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add Proxy Form */}
                {showAddForm && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Add New Proxy</h2>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddProxy} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Host</label>
                                    <input
                                        type="text"
                                        value={newProxy.host}
                                        onChange={(e) => setNewProxy({ ...newProxy, host: e.target.value })}
                                        className="w-full px-3 py-2 border text-gray-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="proxy.example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                                    <input
                                        type="number"
                                        value={newProxy.port || ''}
                                        onChange={(e) => setNewProxy({ ...newProxy, port: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border text-gray-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="8080"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                    <select
                                        value={newProxy.type}
                                        onChange={(e) => setNewProxy({ ...newProxy, type: e.target.value as Proxy['type'] })}
                                        className="w-full px-3 py-2 border text-gray-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="http">HTTP</option>
                                        <option value="https">HTTPS</option>
                                        <option value="socks4">SOCKS4</option>
                                        <option value="socks5">SOCKS5</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Save className="w-4 h-4" />
                                        Add Proxy
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Username (optional)</label>
                                    <input
                                        type="text"
                                        value={newProxy.username || ''}
                                        onChange={(e) => setNewProxy({ ...newProxy, username: e.target.value })}
                                        className="w-full px-3 py-2 border text-gray-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password (optional)</label>
                                    <input
                                        type="password"
                                        value={newProxy.password || ''}
                                        onChange={(e) => setNewProxy({ ...newProxy, password: e.target.value })}
                                        className="w-full px-3 py-2 border text-gray-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Proxy List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Proxy Servers ({filteredProxies.length})
                        </h2>
                    </div>
                    
                    {filteredProxies.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host:Port</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credentials</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Checked</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {filteredProxies.map((proxy) => (
                                        <tr key={proxy.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    {getStatusIcon(proxy)}
                                                    <div className={`w-2 h-2 rounded-full ${proxy.active ? 'bg-green-400' : 'bg-gray-400'}`} />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingProxy?.id === proxy.id ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={editingProxy.host}
                                                            onChange={(e) => setEditingProxy({ ...editingProxy, host: e.target.value })}
                                                            className="px-2 py-1 border text-gray-900 border-gray-300 rounded text-sm"
                                                        />
                                                        <input
                                                            type="number"
                                                            value={editingProxy.port}
                                                            onChange={(e) => setEditingProxy({ ...editingProxy, port: parseInt(e.target.value) })}
                                                            className="w-20 px-2 py-1 border text-gray-900 border-gray-300 rounded text-sm"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-900">{proxy.host}:{proxy.port}</span>
                                                        {proxy.country && (
                                                            <div className="text-xs text-gray-500">{proxy.city}, {proxy.country}</div>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingProxy?.id === proxy.id ? (
                                                    <select
                                                        value={editingProxy.type}
                                                        onChange={(e) => setEditingProxy({ ...editingProxy, type: e.target.value as Proxy['type'] })}
                                                        className="px-2 py-1 border border-gray-300 text-gray-900 rounded text-sm"
                                                    >
                                                        <option value="http">HTTP</option>
                                                        <option value="https">HTTPS</option>
                                                        <option value="socks4">SOCKS4</option>
                                                        <option value="socks5">SOCKS5</option>
                                                    </select>
                                                ) : (
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        proxy.type === 'http' ? 'bg-blue-100 text-blue-800' :
                                                        proxy.type === 'https' ? 'bg-green-100 text-green-800' :
                                                        proxy.type === 'socks4' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-orange-100 text-orange-800'
                                                    }`}>
                                                        {proxy.type.toUpperCase()}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-wrap">
                                                {proxy.username ? (
                                                    <div className="text-sm">
                                                        <div className="text-gray-900">User: {proxy.username}</div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            Pass:
                                                            {showPasswords.has(proxy.id) ? proxy.password : '••••••••'}
                                                            <button
                                                                onClick={() => toggleShowPassword(proxy.id)}
                                                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                                            >
                                                                {showPasswords.has(proxy.id) ?
                                                                    <EyeOff className="w-3 h-3" /> :
                                                                    <Eye className="w-3 h-3" />
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-500">No auth</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {proxy.responseTime ? (
                                                    <span className={`text-sm font-medium ${
                                                        proxy.responseTime < 500 ? 'text-green-600' :
                                                        proxy.responseTime < 1000 ? 'text-yellow-600' :
                                                        'text-red-600'
                                                    }`}>
                                                        {proxy.responseTime}ms
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {proxy.lastChecked ? new Date(proxy.lastChecked).toLocaleString() : 'Never'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    {editingProxy?.id === proxy.id ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleUpdateProxy(editingProxy)}
                                                                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all"
                                                                title="Save changes"
                                                            >
                                                                <Save className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingProxy(null)}
                                                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
                                                                title="Cancel"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => testProxy(proxy)}
                                                                disabled={testingProxies.has(proxy.id)}
                                                                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg disabled:opacity-50 transition-all"
                                                                title="Test proxy"
                                                            >
                                                                <Cable className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingProxy(proxy)}
                                                                className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all"
                                                                title="Edit proxy"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProxy(proxy.id)}
                                                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                                                title="Delete proxy"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            {searchTerm || currentFilter !== 'all' ? (
                                <>
                                    <Search className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No matching proxies</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Try adjusting your search or filter criteria.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchTerm('');
                                            setCurrentFilter('all');
                                        }}
                                        className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                                    >
                                        Clear filters
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Globe className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No proxy servers</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Get started by adding your first proxy server.
                                    </p>
                                    <button
                                        onClick={() => setShowAddForm(true)}
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Proxy
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}