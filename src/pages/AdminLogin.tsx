import { useState } from 'react';
import { Lock, Shield, AlertCircle } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/siteConfig';
import { setAdminAuthenticated } from '../utils/storage';

export default function AdminLogin() {
  const { navigateTo } = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (password === siteConfig.admin.password) {
        setAdminAuthenticated(true);
        navigateTo('admin');
      } else {
        setError('סיסמה שגויה. נסו שוב.');
        setPassword('');
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-gray-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">כניסת מנהל</h1>
            <p className="text-gray-400">הזינו את קוד המנהל כדי לגשת לפאנל הניהול</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 font-semibold mb-2 text-right">
                קוד מנהל
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-3 pr-12 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors text-right"
                  placeholder="הזינו את הקוד"
                  autoFocus
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full px-6 py-3 bg-gradient-to-l from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>מתחבר...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>התחבר</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              ← חזרה לאתר
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            אזור זה מיועד למנהלי האתר בלבד
          </p>
        </div>
      </div>
    </div>
  );
}

