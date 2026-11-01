import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Lock,
  User,
  LogOut,
  Mail,
  FolderKanban,
  FileText,
  Briefcase,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  Loader2
} from 'lucide-react';

export default function AdminPage({ navigate }) {
  const [token, setToken] = useState(localStorage.getItem('ivr_admin_token') || '');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Data
  const [activeTab, setActiveTab] = useState('overview'); // overview, inquiries, rfps, applications, articles
  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [rfps, setRfps] = useState([]);
  const [applications, setApplications] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // New Article Form State
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    slug: '',
    category: 'Technology',
    summary: '',
    content: '',
    author: 'IVR Tech Solutions Editorial Team',
    read_time: '5 min read',
  });

  useEffect(() => {
    if (token) {
      loadDashboard();
    }
  }, [token, activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await api.adminLogin({ username, password });
      if (res.success && res.token) {
        localStorage.setItem('ivr_admin_token', res.token);
        setToken(res.token);
      } else {
        setLoginError(res.error || 'Authentication rejected. Verify credentials.');
      }
    } catch (err) {
      setLoginError('Server authentication failure. Ensure server is running.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ivr_admin_token');
    setToken('');
    setStats(null);
  };

  const loadDashboard = async () => {
    setLoadingData(true);
    try {
      if (activeTab === 'overview') {
        const res = await api.getAdminStats();
        if (res.success) setStats(res.stats);
      } else if (activeTab === 'inquiries') {
        const res = await api.getAdminInquiries();
        if (res.success) setInquiries(res.inquiries || []);
      } else if (activeTab === 'rfps') {
        const res = await api.getAdminRfps();
        if (res.success) setRfps(res.rfps || []);
      } else if (activeTab === 'applications') {
        const res = await api.getAdminApplications();
        if (res.success) setApplications(res.applications || []);
      } else if (activeTab === 'articles') {
        const res = await api.getAdminArticles();
        if (res.success) setArticles(res.articles || []);
      }
    } catch (err) {
      console.error('Admin data load error:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateInquiryStatus = async (id, newStatus) => {
    await api.updateInquiryStatus(id, newStatus);
    loadDashboard();
  };

  const handleUpdateRfpStatus = async (id, newStatus) => {
    await api.updateRfpStatus(id, newStatus);
    loadDashboard();
  };

  const handleUpdateAppStatus = async (id, newStatus) => {
    await api.updateApplicationStatus(id, newStatus);
    loadDashboard();
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createAdminArticle(newArticle);
      if (res.success) {
        setShowArticleModal(false);
        setNewArticle({
          title: '',
          slug: '',
          category: 'Technology',
          summary: '',
          content: '',
          author: 'IVR Tech Solutions Editorial Team',
          read_time: '5 min read',
        });
        loadDashboard();
      } else {
        alert(res.error || 'Failed to publish article.');
      }
    } catch (err) {
      alert('Error creating article.');
    }
  };

  const handleDeleteArticle = async (id) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await api.deleteAdminArticle(id);
      loadDashboard();
    }
  };

  // If Not Logged In, Render Secure Login Screen
  if (!token) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-2xl max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7047EB] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Corporate Admin Portal</h2>
            <p className="text-xs text-gray-500">
              Sign in to manage client inquiries, project proposals, candidate applications, and insights.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7047EB] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl font-bold text-sm text-white gradient-accent shadow hover:opacity-95 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              <span>Authenticate & Enter</span>
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-gray-400 border-t border-gray-100">
            IVR Tech Solutions Private Limited • Internal Administration
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard UI
  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F5F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Bar */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Authorized Executive Session
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mt-1">
              IVR Tech Solutions • Operations Console
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
            >
              View Public Website
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: FileText },
            { id: 'inquiries', label: 'Contact Inquiries', icon: Mail },
            { id: 'rfps', label: 'Project RFPs', icon: FolderKanban },
            { id: 'applications', label: 'Job Applications', icon: Briefcase },
            { id: 'articles', label: 'Insights & Blog', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#111827] text-white shadow'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {loadingData ? (
          <div className="bg-white rounded-2xl p-16 text-center text-sm text-gray-400 border border-gray-200">
            Loading data records...
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Inquiries</span>
                    <div className="text-3xl font-black text-gray-900">{stats?.inquiries ?? 0}</div>
                    <span className="text-[11px] text-gray-500">Contact form submissions</span>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7047EB]">Project RFPs</span>
                    <div className="text-3xl font-black text-[#7047EB]">{stats?.rfps ?? 0}</div>
                    <span className="text-[11px] text-gray-500">"Let's Talk" proposals</span>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3478E5]">Job Applications</span>
                    <div className="text-3xl font-black text-[#3478E5]">{stats?.applications ?? 0}</div>
                    <span className="text-[11px] text-gray-500">Candidate resumes received</span>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Published Insights</span>
                    <div className="text-3xl font-black text-gray-900">{stats?.articles ?? 0}</div>
                    <span className="text-[11px] text-gray-500">Articles & whitepapers</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">System Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <strong className="block text-gray-900 mb-1">Company Entity</strong>
                      <span>IVR Tech Solutions Private Limited</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <strong className="block text-gray-900 mb-1">Database Engine</strong>
                      <span>Embedded SQLite (ACID Compliant)</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <strong className="block text-gray-900 mb-1">Storage Security</strong>
                      <span>Sanitized Multer Storage (/server/uploads/resumes)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Contact Form Inquiries ({inquiries.length})</h3>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-12 text-center text-xs text-gray-400">No contact inquiries yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 text-gray-500 uppercase font-bold tracking-wider border-b border-gray-100">
                        <tr>
                          <th className="p-4">Date</th>
                          <th className="p-4">Sender</th>
                          <th className="p-4">Service</th>
                          <th className="p-4">Subject & Message</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {inquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-gray-50">
                            <td className="p-4 text-gray-400 whitespace-nowrap">
                              {new Date(inq.created_at).toLocaleString()}
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-gray-900">{inq.name}</div>
                              <div className="text-gray-500">{inq.email}</div>
                              {inq.phone && <div className="text-gray-500">{inq.phone}</div>}
                              {inq.company && <div className="text-purple-600 font-semibold">{inq.company}</div>}
                            </td>
                            <td className="p-4 font-semibold text-gray-800">{inq.service}</td>
                            <td className="p-4 max-w-sm">
                              <div className="font-bold text-gray-900">{inq.subject}</div>
                              <p className="text-gray-600 mt-1 line-clamp-2">{inq.message}</p>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                inq.status === 'RESOLVED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : inq.status === 'IN_PROGRESS'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-purple-100 text-purple-800'
                              }`}>
                                {inq.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <select
                                value={inq.status}
                                onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                                className="px-2 py-1 rounded border border-gray-300 text-xs bg-white"
                              >
                                <option value="NEW">NEW</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="RESOLVED">RESOLVED</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* RFPS TAB */}
            {activeTab === 'rfps' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Project Proposals & RFPs ({rfps.length})</h3>
                </div>

                {rfps.length === 0 ? (
                  <div className="p-12 text-center text-xs text-gray-400">No project RFPs yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 text-gray-500 uppercase font-bold tracking-wider border-b border-gray-100">
                        <tr>
                          <th className="p-4">Date</th>
                          <th className="p-4">Client</th>
                          <th className="p-4">Project Type</th>
                          <th className="p-4">Budget & Timeline</th>
                          <th className="p-4">Scope Description</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {rfps.map((rfp) => (
                          <tr key={rfp.id} className="hover:bg-gray-50">
                            <td className="p-4 text-gray-400 whitespace-nowrap">
                              {new Date(rfp.created_at).toLocaleString()}
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-gray-900">{rfp.name}</div>
                              <div className="text-gray-500">{rfp.email}</div>
                              <div className="text-gray-500">{rfp.phone}</div>
                              {rfp.company && <div className="text-purple-600 font-semibold">{rfp.company}</div>}
                            </td>
                            <td className="p-4 font-bold text-gray-900">{rfp.project_type}</td>
                            <td className="p-4">
                              <div className="font-semibold text-emerald-700">{rfp.budget}</div>
                              <div className="text-gray-500">{rfp.timeline}</div>
                            </td>
                            <td className="p-4 max-w-sm">
                              <p className="text-gray-600 line-clamp-3 leading-relaxed">{rfp.description}</p>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                rfp.status === 'CLOSED'
                                  ? 'bg-gray-100 text-gray-700'
                                  : rfp.status === 'PROPOSAL_SENT'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {rfp.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <select
                                value={rfp.status}
                                onChange={(e) => handleUpdateRfpStatus(rfp.id, e.target.value)}
                                className="px-2 py-1 rounded border border-gray-300 text-xs bg-white"
                              >
                                <option value="NEW">NEW</option>
                                <option value="IN_REVIEW">IN_REVIEW</option>
                                <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                                <option value="CLOSED">CLOSED</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* APPLICATIONS TAB */}
            {activeTab === 'applications' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Career Applications & Resumes ({applications.length})</h3>
                </div>

                {applications.length === 0 ? (
                  <div className="p-12 text-center text-xs text-gray-400">No applications received yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 text-gray-500 uppercase font-bold tracking-wider border-b border-gray-100">
                        <tr>
                          <th className="p-4">Date</th>
                          <th className="p-4">Candidate</th>
                          <th className="p-4">Position</th>
                          <th className="p-4">Resume File</th>
                          <th className="p-4">Cover Letter</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {applications.map((app) => (
                          <tr key={app.id} className="hover:bg-gray-50">
                            <td className="p-4 text-gray-400 whitespace-nowrap">
                              {new Date(app.created_at).toLocaleString()}
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-gray-900">{app.name}</div>
                              <div className="text-gray-500">{app.email}</div>
                              <div className="text-gray-500">{app.phone}</div>
                            </td>
                            <td className="p-4 font-bold text-[#7047EB]">{app.position}</td>
                            <td className="p-4">
                              <a
                                href={`/api/admin/resumes/${app.resume_filename}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-[#7047EB] font-bold hover:bg-purple-100 transition"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span className="truncate max-w-[140px]">{app.resume_original_name}</span>
                              </a>
                            </td>
                            <td className="p-4 max-w-sm">
                              <p className="text-gray-600 line-clamp-2">
                                {app.cover_letter || 'No cover letter attached.'}
                              </p>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                app.status === 'HIRED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.status === 'INTERVIEWING'
                                  ? 'bg-blue-100 text-blue-800'
                                  : app.status === 'REJECTED'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-purple-100 text-purple-800'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <select
                                value={app.status}
                                onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                                className="px-2 py-1 rounded border border-gray-300 text-xs bg-white"
                              >
                                <option value="RECEIVED">RECEIVED</option>
                                <option value="INTERVIEWING">INTERVIEWING</option>
                                <option value="HIRED">HIRED</option>
                                <option value="REJECTED">REJECTED</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ARTICLES TAB */}
            {activeTab === 'articles' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Corporate Insights & Articles ({articles.length})</h3>
                  <button
                    onClick={() => setShowArticleModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white gradient-accent shadow hover:opacity-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Article</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-bold tracking-wider border-b border-gray-100">
                      <tr>
                        <th className="p-4">Category</th>
                        <th className="p-4">Title & Slug</th>
                        <th className="p-4">Author</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {articles.map((art) => (
                        <tr key={art.id} className="hover:bg-gray-50">
                          <td className="p-4 font-bold text-[#7047EB]">{art.category}</td>
                          <td className="p-4">
                            <div className="font-bold text-gray-900">{art.title}</div>
                            <div className="text-gray-400 font-mono text-[11px]">{art.slug}</div>
                          </td>
                          <td className="p-4 text-gray-500">{art.author}</td>
                          <td className="p-4 text-gray-400 whitespace-nowrap">
                            {new Date(art.published_at).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => handleDeleteArticle(art.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                              title="Delete Article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* New Article Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 p-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Publish Corporate Insight</h3>
            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={newArticle.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    setNewArticle({ ...newArticle, title, slug });
                  }}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={newArticle.slug}
                    onChange={(e) => setNewArticle({ ...newArticle, slug: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300 bg-white"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Company Updates">Company Updates</option>
                    <option value="Digital Transformation">Digital Transformation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Summary / Executive Abstract
                </label>
                <textarea
                  rows={2}
                  value={newArticle.summary}
                  onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Article Body Content
                </label>
                <textarea
                  rows={6}
                  required
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  placeholder="Draft your corporate analysis, paragraphs separated by blank lines..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-xs font-bold text-white gradient-accent shadow hover:opacity-95"
                >
                  Publish to Insights
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
