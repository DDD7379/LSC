import { Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Games() {
  const [imageError, setImageError] = useState(false);

  const game = {
    id: 'dream',
    title: 'בואו לחלום',
    description:
      'בואו לחלום הוא משחק רובלוקס ישראלי שמתעדכן באופן קבוע, עם צוות פעיל ותוכן חדש שנוסף עם הזמן. במשחק תמצאו עולם פתוח, מערכת כסף, מערכת מוזיקה, טבלאות שיאים וקהילה פעילה לשחק ולדבר עם חברים. המשחק תומך במחשב, טלפון, קונסולות ומציאות מדומה, ואם בא לכם מקום כיף ורגוע להעביר בו זמן זה בדיוק כאן',
    image: 'https://i.imgur.com/wrKXeCO.png',
    url: 'https://www.roblox.com/games/99526426838075/unnamed',
    tag: 'חדש',
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">


            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
              המשחקים שלנו
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
כאן תוכלו להכיר את כל המשחקים והפרויקטים של LSC_Studio.
כל משחק נבנה מתוך מחשבה על חוויית משחק איכותית, פיתוח מתמשך וקשב אמיתי לקהילה, וממשיך להתעדכן ולהשתפר לאורך הזמן            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/40 backdrop-blur-sm">
            <div className="relative">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              </div>

              {!imageError ? (
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-[280px] md:h-[360px] object-cover"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-[280px] md:h-[360px] flex items-center justify-center bg-slate-950">
                  <div className="text-center">
                    <Sparkles className="w-14 h-14 text-blue-400 mx-auto mb-3" />
                    <p className="text-gray-300 text-sm">התמונה לא נטענה</p>
                  </div>
                </div>
              )}

              <div className="absolute top-4 right-4">
                <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-gray-100 text-sm">
                  {game.tag}
                </div>
              </div>

              <div className="absolute bottom-4 right-4 left-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white font-bold text-2xl md:text-3xl drop-shadow">
                    {game.title}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-7 md:p-8">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {game.description}
              </p>

              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 transition-colors"
              >
                <span>כניסה למשחק</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <div className="mt-5 text-center text-gray-500 text-sm">
                טיפ: הצטרפו לשרת הדיסקורד שלנו בשביל לקבל עדכונים לפני כולם 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
