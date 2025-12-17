import { RouterProvider, useRouter } from './context/RouterContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Games from './pages/Games';
import StaffApplication from './pages/StaffApplication';
import Support from './pages/Support';
import Links from './pages/Links';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { isAdminAuthenticated } from './utils/storage';

function AppContent() {
  const { currentPage, navigateTo } = useRouter();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'games':
        return <Games />;
      case 'staff-application':
        return <StaffApplication />;
      case 'support':
        return <Support />;
      case 'links':
        return <Links />;
      case 'admin-login':
        return <AdminLogin />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  const isAdminPage = currentPage === 'admin-login' || currentPage === 'admin';

  return (
<div className="min-h-screen bg-transparent">
      {!isAdminPage && <Navigation />}
<main className={isAdminPage ? '' : 'pt-16 sm:pt-16'}>{renderPage()}</main>
      {!isAdminPage && (
        <footer className="bg-black border-t border-gray-900 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400 mb-2">
              © 2025 קבוצת LSC_Studio, כל הזכויות שמורות
            </p>
            {!isAdminAuthenticated() && (
              <button
                onClick={() => navigateTo('admin-login')}
                className="text-purple-500/50 hover:text-purple-400 text-xs transition-colors"
              >
                מנהל
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
