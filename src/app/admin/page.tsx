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
    TestTube,
    Globe
} from 'lucide-react';
import Link from 'next/link';

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
}

export default function ProxyManager() {
    const [proxies, setProxies] = useState<Proxy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingProxy, setEditingProxy] = useState<Proxy | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [testingProxies, setTestingProxies] = useState<Set<string>>(new Set());
    const [showPasswords, setShowPasswords] = useState<Set<string>>(new Set());

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

    const handleAddProxy = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProxy.host || !newProxy.port) return;

        try {
            const response = await fetch('/api/proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
            setError('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add proxy');
        }
    };

    const handleUpdateProxy = async (proxy: Proxy) => {
        try {
            const response = await fetch(`/api/proxy/${proxy.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proxy),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update proxy');
            }

            await loadProxies();
            setEditingProxy(null);
            setError('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update proxy');
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
            setError('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete proxy');
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
        } catch (err) {
            setError(`Failed to test proxy ${proxy.host}:${proxy.port}`);
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
        setTestingProxies(new Set(activeProxies.map(p => p.id)));

        try {
            const response = await fetch('/api/proxy/test-all', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to test proxies');
            }

            await loadProxies();
        } catch (err) {
            setError('Failed to test all proxies');
        } finally {
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
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2  hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Globe className="text-blue-600" />
                            Proxy Manager
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={testAllProxies}
                            disabled={testingProxies.size > 0}
                            className="px-4 py-2 bg-yellow-600  rounded-lg hover:bg-yellow-700 disabled:opacity-50 flex items-center gap-2"
                        >
                            <TestTube className="w-4 h-4" />
                            Test All
                        </button>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="px-4 py-2 bg-blue-600  rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Proxy
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {/* Add Proxy Form */}
                {showAddForm && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Add New Proxy</h2>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="p-1  hover:"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddProxy} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium  mb-1">Host</label>
                                <input
                                    type="text"
                                    value={newProxy.host}
                                    onChange={(e) => setNewProxy({ ...newProxy, host: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="proxy.example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium  mb-1">Port</label>
                                <input
                                    type="number"
                                    value={newProxy.port || ''}
                                    onChange={(e) => setNewProxy({ ...newProxy, port: parseInt(e.target.value) || 0 })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    placeholder="8080"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium  mb-1">Type</label>
                                <select
                                    value={newProxy.type}
                                    onChange={(e) => setNewProxy({ ...newProxy, type: e.target.value as Proxy['type'] })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="http">HTTP</option>
                                    <option value="https">HTTPS</option>
                                    <option value="socks4">SOCKS4</option>
                                    <option value="socks5">SOCKS5</option>
                                </select>
                            </div>
                            <div className="flex items-end gap-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600  rounded-md hover:bg-green-700 flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Add
                                </button>
                            </div>
                            <div>
                                <label className="block text-sm font-medium  mb-1">Username (optional)</label>
                                <input
                                    type="text"
                                    value={newProxy.username || ''}
                                    onChange={(e) => setNewProxy({ ...newProxy, username: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium  mb-1">Password (optional)</label>
                                <input
                                    type="password"
                                    value={newProxy.password || ''}
                                    onChange={(e) => setNewProxy({ ...newProxy, password: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </form>
                    </div>
                )}

                {/* Proxy List */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold">Proxy Servers ({proxies.length})</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Host:Port</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Credentials</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Response Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Last Checked</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {proxies.map((proxy) => (
                                    <tr key={proxy.id}>
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
                                                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={editingProxy.port}
                                                        onChange={(e) => setEditingProxy({ ...editingProxy, port: parseInt(e.target.value) })}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-sm font-medium">{proxy.host}:{proxy.port}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingProxy?.id === proxy.id ? (
                                                <select
                                                    value={editingProxy.type}
                                                    onChange={(e) => setEditingProxy({ ...editingProxy, type: e.target.value as Proxy['type'] })}
                                                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                >
                                                    <option value="http">HTTP</option>
                                                    <option value="https">HTTPS</option>
                                                    <option value="socks4">SOCKS4</option>
                                                    <option value="socks5">SOCKS5</option>
                                                </select>
                                            ) : (
                                                <span className="text-sm text-gray-900 uppercase">{proxy.type}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {proxy.username ? (
                                                <div className="text-sm">
                                                    <div>User: {proxy.username}</div>
                                                    <div className="flex items-center gap-2">
                                                        Pass:
                                                        {showPasswords.has(proxy.id) ? proxy.password : '••••••••'}
                                                        <button
                                                            onClick={() => toggleShowPassword(proxy.id)}
                                                            className="p-1 text-gray-400 hover:"
                                                        >
                                                            {showPasswords.has(proxy.id) ?
                                                                <EyeOff className="w-3 h-3" /> :
                                                                <Eye className="w-3 h-3" />
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-sm ">No auth</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                            {proxy.responseTime ? `${proxy.responseTime}ms` : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                            {proxy.lastChecked ? new Date(proxy.lastChecked).toLocaleString() : 'Never'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                {editingProxy?.id === proxy.id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateProxy(editingProxy)}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingProxy(null)}
                                                            className=" hover:text-gray-900"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => testProxy(proxy)}
                                                            disabled={testingProxies.has(proxy.id)}
                                                            className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                                                        >
                                                            <TestTube className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingProxy(proxy)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProxy(proxy.id)}
                                                            className="text-red-600 hover:text-red-900"
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
                </div>

                {proxies.length === 0 && (
                    <div className="text-center py-12">
                        <Globe className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No proxy servers</h3>
                        <p className="mt-1 text-sm ">Get started by adding your first proxy server.</p>
                        <div className="mt-6">
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md  bg-blue-600 hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Proxy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}