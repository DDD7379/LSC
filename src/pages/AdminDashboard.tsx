import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  UserCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Eye, 
  EyeOff,
  LogOut,
  Filter,
  Search,
  Mail,
  Phone,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { 
  getSubmissions, 
  markAsRead, 
  markAsUnread, 
  deleteSubmission,
  clearAllSubmissions,
  getUnreadCount,
  setAdminAuthenticated,
  isAdminAuthenticated
} from '../utils/storage';
import type { Submission, ContactForm, StaffApplicationForm } from '../types';

export default function AdminDashboard() {
  const { navigateTo } = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<'all' | 'support' | 'staff-application' | 'unread'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigateTo('admin-login');
      return;
    }
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    setSubmissions(getSubmissions());
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    navigateTo('admin-login');
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    loadSubmissions();
  };

  const handleMarkAsUnread = (id: string) => {
    markAsUnread(id);
    loadSubmissions();
  };

  const handleDelete = (id: string) => {
    if (confirm('האם אתם בטוחים שברצונכם למחוק את הפנייה הזו?')) {
      deleteSubmission(id);
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
      loadSubmissions();
    }
  };

  const handleClearAll = () => {
    if (confirm('האם אתם בטוחים שברצונכם למחוק את כל הפניות? פעולה זו לא ניתנת לביטול.')) {
      clearAllSubmissions();
      loadSubmissions();
      setSelectedSubmission(null);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    if (filter === 'unread' && submission.read) return false;
    if (filter !== 'all' && filter !== 'unread' && submission.type !== filter) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const data = submission.data;
      if (submission.type === 'support') {
        const contact = data as ContactForm;
        return (
          contact.name.toLowerCase().includes(searchLower) ||
          contact.message.toLowerCase().includes(searchLower) ||
          contact.contactMethod.toLowerCase().includes(searchLower)
        );
      } else {
        const staff = data as StaffApplicationForm;
        return (
          staff.fullName.toLowerCase().includes(searchLower) ||
          staff.discordUsername.toLowerCase().includes(searchLower) ||
          staff.robloxUsername.toLowerCase().includes(searchLower) ||
          staff.position.toLowerCase().includes(searchLower)
        );
      }
    }
    return true;
  });

  const unreadCount = getUnreadCount();
  const supportCount = submissions.filter(s => s.type === 'support').length;
  const staffCount = submissions.filter(s => s.type === 'staff-application').length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">פאנל ניהול</h1>
              <p className="text-gray-400">ניהול כל הפניות והמועמדויות</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={loadSubmissions}
                className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2"
                title="רענן"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                התנתק
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">{submissions.length}</span>
              </div>
              <p className="text-gray-300 text-sm">סה"כ פניות</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <Mail className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">{supportCount}</span>
              </div>
              <p className="text-gray-300 text-sm">פניות תמיכה</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 backdrop-blur-sm p-6 rounded-xl border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <UserCheck className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold text-white">{staffCount}</span>
              </div>
              <p className="text-gray-300 text-sm">מועמדויות צוות</p>
            </div>
            <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/20 backdrop-blur-sm p-6 rounded-xl border border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-orange-400" />
                <span className="text-2xl font-bold text-white">{unreadCount}</span>
              </div>
              <p className="text-gray-300 text-sm">לא נקראו</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="חפש בפניות..."
                  className="w-full px-4 py-3 pr-12 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors text-right"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {(['all', 'unread', 'support', 'staff-application'] as const).map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      filter === filterType
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {filterType === 'all' && 'הכל'}
                    {filterType === 'unread' && 'לא נקראו'}
                    {filterType === 'support' && 'תמיכה'}
                    {filterType === 'staff-application' && 'מועמדויות'}
                  </button>
                ))}
              </div>
              {submissions.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  מחק הכל
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">
                  פניות ({filteredSubmissions.length})
                </h2>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {filteredSubmissions.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">אין פניות להצגה</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-700">
                    {filteredSubmissions.map((submission) => {
                      const isSupport = submission.type === 'support';
                      const data = submission.data as ContactForm | StaffApplicationForm;
                      
                      return (
                        <div
                          key={submission.id}
                          onClick={() => setSelectedSubmission(submission)}
                          className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-700/50 ${
                            !submission.read ? 'bg-blue-900/20 border-r-4 border-blue-500' : ''
                          } ${selectedSubmission?.id === submission.id ? 'bg-gray-700/70' : ''}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {isSupport ? (
                                <Mail className="w-5 h-5 text-purple-400" />
                              ) : (
                                <UserCheck className="w-5 h-5 text-green-400" />
                              )}
                              <span className={`text-sm font-semibold ${
                                isSupport ? 'text-purple-400' : 'text-green-400'
                              }`}>
                                {isSupport ? 'תמיכה' : 'מועמדות צוות'}
                              </span>
                              {!submission.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {formatDate(submission.timestamp)}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-white font-bold mb-1">
                            {isSupport 
                              ? (data as ContactForm).name 
                              : (data as StaffApplicationForm).fullName}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {isSupport
                              ? (data as ContactForm).message
                              : `תפקיד: ${(data as StaffApplicationForm).position}`}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submission Details */}
          <div className="lg:col-span-1">
            {selectedSubmission ? (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">פרטי הפנייה</h2>
                  <div className="flex gap-2">
                    {selectedSubmission.read ? (
                      <button
                        onClick={() => {
                          handleMarkAsUnread(selectedSubmission.id);
                        }}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        title="סמן כלא נקרא"
                      >
                        <EyeOff className="w-4 h-4 text-gray-300" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleMarkAsRead(selectedSubmission.id);
                        }}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        title="סמן כנקרא"
                      >
                        <Eye className="w-4 h-4 text-gray-300" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selectedSubmission.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      title="מחק"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedSubmission.timestamp)}
                  </div>

                  {selectedSubmission.type === 'support' ? (
                    <div className="space-y-4">
                      {(selectedSubmission.data as ContactForm).name && (
                        <div>
                          <label className="text-gray-400 text-sm">שם</label>
                          <p className="text-white font-semibold">{(selectedSubmission.data as ContactForm).name}</p>
                        </div>
                      )}
                      {(selectedSubmission.data as ContactForm).contactMethod && (
                        <div>
                          <label className="text-gray-400 text-sm">אמצעי יצירת קשר</label>
                          <p className="text-white">{(selectedSubmission.data as ContactForm).contactMethod}</p>
                        </div>
                      )}
                      {(selectedSubmission.data as ContactForm).message && (
                        <div>
                          <label className="text-gray-400 text-sm">הודעה</label>
                          <p className="text-white whitespace-pre-wrap bg-gray-900/50 p-3 rounded-lg">
                            {(selectedSubmission.data as ContactForm).message}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(selectedSubmission.data as StaffApplicationForm).fullName && (
                        <div>
                          <label className="text-gray-400 text-sm">שם מלא</label>
                          <p className="text-white font-semibold">{(selectedSubmission.data as StaffApplicationForm).fullName}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        {(selectedSubmission.data as StaffApplicationForm).age && (
                          <div>
                            <label className="text-gray-400 text-sm">גיל</label>
                            <p className="text-white">{(selectedSubmission.data as StaffApplicationForm).age}</p>
                          </div>
                        )}
                        {(selectedSubmission.data as StaffApplicationForm).timezone && (
                          <div>
                            <label className="text-gray-400 text-sm">אזור זמן</label>
                            <p className="text-white">{(selectedSubmission.data as StaffApplicationForm).timezone}</p>
                          </div>
                        )}
                      </div>
                      {(selectedSubmission.data as StaffApplicationForm).discordUsername && (
                        <div>
                          <label className="text-gray-400 text-sm">Discord</label>
                          <p className="text-white">{(selectedSubmission.data as StaffApplicationForm).discordUsername}</p>
                        </div>
                      )}
                      {(selectedSubmission.data as StaffApplicationForm).robloxUsername && (
                        <div>
                          <label className="text-gray-400 text-sm">Roblox</label>
                          <p className="text-white">{(selectedSubmission.data as StaffApplicationForm).robloxUsername}</p>
                        </div>
                      )}
                      {(selectedSubmission.data as StaffApplicationForm).position && (
                        <div>
                          <label className="text-gray-400 text-sm">תפקיד מבוקש</label>
                          <p className="text-white font-semibold">{(selectedSubmission.data as StaffApplicationForm).position}</p>
                        </div>
                      )}
                      {(selectedSubmission.data as StaffApplicationForm).weeklyHours && (
                        <div>
                          <label className="text-gray-400 text-sm">שעות זמינות</label>
                          <p className="text-white">{(selectedSubmission.data as StaffApplicationForm).weeklyHours}</p>
                        </div>
                      )}
                      {(selectedSubmission.data as StaffApplicationForm).experience && (
                        <div>
                          <label className="text-gray-400 text-sm">ניסיון קודם</label>
                          <p className="text-white whitespace-pre-wrap bg-gray-900/50 p-3 rounded-lg">
                            {(selectedSubmission.data as StaffApplicationForm).experience}
                          </p>
                        </div>
                      )}
                      {(selectedSubmission.data as StaffApplicationForm).motivation && (
                        <div>
                          <label className="text-gray-400 text-sm">מוטיבציה</label>
                          <p className="text-white whitespace-pre-wrap bg-gray-900/50 p-3 rounded-lg">
                            {(selectedSubmission.data as StaffApplicationForm).motivation}
                          </p>
                        </div>
                      )}
                      {(selectedSubmission.data as StaffApplicationForm).scenario && (
                        <div>
                          <label className="text-gray-400 text-sm">תרחיש דוגמה</label>
                          <p className="text-white whitespace-pre-wrap bg-gray-900/50 p-3 rounded-lg">
                            {(selectedSubmission.data as StaffApplicationForm).scenario}
                          </p>
                        </div>
                      )}
                      {(selectedSubmission.data as StaffApplicationForm).additionalInfo && (
                        <div>
                          <label className="text-gray-400 text-sm">מידע נוסף</label>
                          <p className="text-white whitespace-pre-wrap bg-gray-900/50 p-3 rounded-lg">
                            {(selectedSubmission.data as StaffApplicationForm).additionalInfo}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 text-center">
                <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">בחרו פנייה כדי לראות פרטים</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

