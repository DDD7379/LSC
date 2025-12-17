import { Globe, Zap, Trophy, Heart, Star, Target } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 text-center">
אודות הקבוצה          </h1>
          <p className="text-xl text-gray-400 text-center mb-16">
            גלו את העולם שמחכה לכם
          </p>

          <div className="bg-gray-900/60 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-800 mb-12">
<h2 className="text-3xl font-bold text-white mb-6">
  מי אנחנו?
</h2>

<p className="text-gray-300 text-lg leading-relaxed mb-6">
  LSC_Studio היא קבוצת יוצרים ושחקנים ברובלוקס, שמפתחת משחקים, מערכות וחוויות
  מקוריות עם דגש על איכות, חשיבה לטווח ארוך וקהילה אמיתית.
</p>

<p className="text-gray-300 text-lg leading-relaxed mb-6">
  הקבוצה שלנו משלבת פיתוח פעיל, עדכונים שוטפים וצוות שנמצא בתוך המשחקים עצמם,
  מקשיב לשחקנים ודואג שהכל יעבוד כמו שצריך.
</p>

<p className="text-gray-300 text-lg leading-relaxed">
  אם אתם מחפשים מקום ישראלי, רציני וכיף להיות בו כזה שבאמת משקיע במשחקים
  ובאנשים שמאחוריהם הגעתם למקום הנכון.
</p>

          </div>
<div className="mb-12">
  <h2 className="text-3xl font-bold text-white mb-8 text-center">
    מה תמצאו בקבוצה
  </h2>

  <div className="grid md:grid-cols-2 gap-6">
    {[
      {
        icon: <Globe className="w-10 h-10" />,
        title: 'משחקים ופרויקטים',
        description:
          'משחקים וחוויות שנמצאים בפיתוח מתמשך, עם מחשבה על איכות ולא על כמות.',
      },
      {
        icon: <Target className="w-10 h-10" />,
        title: 'עדכונים ותוכן חדש',
        description:
          'עדכונים שוטפים, שיפורים ורעיונות חדשים שנכנסים לקבוצה עם הזמן.',
      },
      {
        icon: <Star className="w-10 h-10" />,
        title: 'צוות מקצועי',
        description:
          'צוות פעיל שנמצא במשחקים, עוזר לשחקנים ושומר על סביבה נעימה והוגנת.',
      },
      {
        icon: <Heart className="w-10 h-10" />,
        title: 'קהילה ישראלית',
        description:
          'קהילה שמבוססת על כבוד, זרימה טובה ואנשים שבאמת כיף לשחק איתם.',
      },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl"
      >
        <div className="text-blue-400 mb-4">{item.icon}</div>
        <h3 className="text-white text-xl font-bold mb-2">
          {item.title}
        </h3>
        <p className="text-slate-400 leading-relaxed">
          {item.description}
        </p>
      </div>
    ))}
  </div>
</div>


          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              מה תמצאו במשחקים שלנו
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: 'מערכות משחק',
                  description: 'מערכות שמתפתחות עם הזמן ומוסיפות עומק בלי לסבך.',
                },
                {
                  icon: <Trophy className="w-8 h-8" />,
                  title: 'אתגרים ודירוגים',
                  description: 'תחרויות, הישגים ומטרות שנותנות מוטיבציה להמשיך.',
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: 'כלכלה ופריטים',
                  description: 'איסוף, מסחר ושדרוגים בצורה מאוזנת וכיפית.',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-blue-600/40 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-blue-400 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-800 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              מוכנים להתחיל?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              הצטרפו עכשיו והתחילו לשחק
            </p>
            <a
              href={siteConfig.links.game}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105"
            >
              שחקו עכשיו
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
