import { Gamepad2, MessageCircle, Users, Youtube, Music, Instagram, ExternalLink } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function Links() {
  const { navigateTo } = useRouter();

  const mainLinks = [
    {
      icon: <Gamepad2 className="w-16 h-16" />,
      title: 'המשחק ברובלוקס',
      description: 'הצטרפו למשחק והתחילו את ההרפתקה',
      url: 'https://www.roblox.com/games/99526426838075/unnamed',
    },
    {
      icon: <MessageCircle className="w-16 h-16" />,
      title: 'שרת הדיסקורד',
      description: 'הצטרפו לקהילה בדיסקורד',
      url: 'https://discord.gg/MGFcjHpB',
    },
    {
      icon: <Users className="w-16 h-16" />,
      title: 'הגרופ שלנו',
      description: 'הצטרפו לקבוצה הרשמית שלנו',
      url: 'https://www.roblox.com/communities/341553257/LSC-Studio#!/about',
    },
  ];

  const socialLinks = [
    {
      icon: <Youtube className="w-12 h-12" />,
      title: 'יוטיוב',
      description: 'צפו בסרטונים ועדכונים',
      url: 'https://youtube.com/your-channel',
    },
    {
      icon: <Music className="w-12 h-12" />,
      title: 'טיקטוק',
      description: 'סרטונים קצרים ועדכונים',
      url: 'https://www.tiktok.com/@your-account',
    },
    {
      icon: <Instagram className="w-12 h-12" />,
      title: 'אינסטגרם',
      description: 'תמונות ועדכונים יומיים',
      url: 'https://instagram.com/your-account',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 text-center">
            קישורים חשובים
          </h1>
          <p className="text-xl text-gray-400 text-center mb-16">
            כל הקישורים שאתם צריכים במקום אחד
          </p>

          <div className="space-y-6 mb-16">
            {mainLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
className="block bg-gray-900/60 backdrop-blur-sm p-8 md:p-10 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 group border border-gray-800 hover:border-blue-600/40"
              >
                <div className="flex items-center gap-6">
                  <div className="text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-2">{link.title}</h3>
                    <p className="text-blue-100 text-lg">{link.description}</p>
                  </div>
                  <ExternalLink className="w-8 h-8 text-white/70 flex-shrink-0 group-hover:text-white transition-colors" />
                </div>
              </a>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              עקבו אחרינו ברשתות החברתיות
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-800 hover:border-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-center group"
                >
                  <div className="flex justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{link.title}</h3>
                  <p className="text-gray-400 text-sm">{link.description}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border-2 border-gray-800 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">צריכים עזרה?</h2>
            <p className="text-gray-300 mb-6">
              אם יש לכם שאלות או בעיות, אנחנו כאן בשבילכם
            </p>
            <button
              type="button"
              onClick={() => navigateTo('support')}
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              צרו קשר
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
