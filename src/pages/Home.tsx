import { Gamepad2, Users, Shield } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function Home() {
  const { navigateTo } = useRouter();

  const features = [
    {
      icon: <Gamepad2 className="w-7 h-7 text-blue-400" />,
      title: 'חווית משחק ייחודית',
      description: 'משחקים עם רעיונות מקוריים, מערכות חכמות ותשומת לב לפרטים.',
    },
    {
      icon: <Users className="w-7 h-7 text-blue-400" />,
      title: 'קהילה פעילה',
      description: 'שחקנים, אירועים ועדכונים שיוצרים חוויה חיה ומתמשכת.',
    },
    {
      icon: <Shield className="w-7 h-7 text-blue-400" />,
      title: 'צוות מקצועי',
      description: 'צוות שנמצא במשחקים, עוזר לשחקנים ושומר על חוויה הוגנת.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* HERO */}
      <section className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl min-h-[calc(100svh-72px)] sm:min-h-[calc(70vh-72px)] flex flex-col justify-center py-10 sm:py-16 lg:py-20">
          <div className="text-center">

<h1 className="mt-8 mb-8 font-extrabold tracking-tight text-white text-5xl sm:text-6xl lg:text-[6.5rem] leading-[1.1] flex flex-col items-center">
  <span className="block">
    ברוכים הבאים
  </span>

  <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
    קבוצת
  </span>

  <span
    dir="ltr"
    className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent whitespace-nowrap"
  >
    LSC_Studio
  </span>
</h1>



<p className="mt-6 mx-auto max-w-[42ch] sm:max-w-2xl text-slate-300 text-lg sm:text-xl leading-relaxed">
              הבית הרשמי של המשחקים, העדכונים והצוות שלנו ברובלוקס.
              הצטרפו לקהילה וגלו חוויות משחק חדשות.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateTo('games')}
              className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-semibold transition-colors"
            >
              שחקו עכשיו
            </button>

            <button
              onClick={() => navigateTo('about')}
              className="w-full sm:w-auto px-10 py-4 border border-slate-700 text-white rounded-full text-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              למידע נוסף
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-4 py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            מה תמצאו אצלנו
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            חוויות משחק, קהילה פעילה וצוות שנמצא באמת בתוך המשחקים.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900/50 border border-slate-800 p-7 sm:p-8 rounded-2xl hover:border-blue-600/40 transition-all hover:scale-[1.02]"
            >
              <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-white text-xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16 sm:pb-24">
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
          <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
            רוצים להצטרף?
          </h3>

          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            גלו את המשחקים שלנו, הצטרפו לקהילה והתחילו לשחק.
          </p>

          <button
            onClick={() => navigateTo('games')}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-semibold transition-colors"
          >
            גלו את המשחקים
          </button>
        </div>
      </section>
    </div>
  );
}
