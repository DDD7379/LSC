import { Menu, X, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { isAdminAuthenticated } from '../utils/storage';

const navItems = [
  { id: 'home' as const, label: 'בית' },
  { id: 'about' as const, label: 'אודות הקבוצה' },
  { id: 'games' as const, label: 'המשחקים שלנו' },
  { id: 'staff-application' as const, label: 'טפסים לצוות' },
  { id: 'support' as const, label: 'תמיכה' },
  { id: 'links' as const, label: 'קישורים' },
];

export default function Navigation() {
  const { currentPage, navigateTo } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const adminAuthenticated = isAdminAuthenticated();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-[#020617]/70 backdrop-blur-xl' : 'bg-transparent backdrop-blur-0'}
      `}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 relative">
          <button
            onClick={() => {
              navigateTo('home');
              closeMenu();
            }}
            className="absolute right-0 text-2xl font-bold text-white hover:text-blue-300 transition-colors duration-200"
          >
            LSC_Studio
          </button>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-blue-500/20 text-blue-200'
                    : 'text-slate-200 hover:text-white hover:bg-blue-500/10'
                }`}
              >
                {item.label}
              </button>
            ))}

            {adminAuthenticated && (
              <button
                onClick={() => navigateTo('admin')}
                className={`ml-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                  currentPage === 'admin'
                    ? 'bg-blue-500/20 text-blue-200'
                    : 'text-slate-200 hover:text-white hover:bg-blue-500/10'
                }`}
              >
                <Shield className="w-4 h-4" />
                פאנל ניהול
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden absolute left-0 text-white p-2 hover:bg-blue-500/10 rounded-lg transition-colors"
            aria-label="תפריט"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden animate-slideDown">
          <div className="bg-[#020617]/85 backdrop-blur-xl border-t border-white/5">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigateTo(item.id);
                    closeMenu();
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 text-right ${
                    currentPage === item.id
                      ? 'bg-blue-500/20 text-blue-200'
                      : 'text-slate-200 hover:text-white hover:bg-blue-500/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {adminAuthenticated && (
                <button
                  onClick={() => {
                    navigateTo('admin');
                    closeMenu();
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 text-right flex items-center justify-end gap-2 ${
                    currentPage === 'admin'
                      ? 'bg-blue-500/20 text-blue-200'
                      : 'text-slate-200 hover:text-white hover:bg-blue-500/10'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  פאנל ניהול
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
