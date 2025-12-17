import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import type { StaffApplicationForm } from '../types';
import { siteConfig } from '../config/siteConfig';
import { saveSubmission } from '../utils/storage';

export default function StaffApplication() {
  const [formData, setFormData] = useState<StaffApplicationForm>({
    fullName: '',
    age: '',
    discordUsername: '',
    robloxUsername: '',
    timezone: '',
    position: '',
    experience: '',
    weeklyHours: '',
    motivation: '',
    scenario: '',
    additionalInfo: '',
    agreedToRules: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const embed = {
        title: '🎯 מועמדות חדשה לצוות',
        color: 0x3b82f6,
        fields: [
          { name: 'שם מלא', value: formData.fullName, inline: true },
          { name: 'גיל', value: formData.age, inline: true },
          { name: 'שם משתמש Discord', value: formData.discordUsername, inline: true },
          { name: 'שם משתמש Roblox', value: formData.robloxUsername, inline: true },
          { name: 'אזור זמן', value: formData.timezone, inline: true },
          { name: 'תפקיד מבוקש', value: formData.position, inline: true },
          { name: 'ניסיון קודם', value: formData.experience },
          { name: 'שעות זמינות בשבוע', value: formData.weeklyHours },
          { name: 'מוטיבציה', value: formData.motivation },
          { name: 'תרחיש דוגמה', value: formData.scenario },
          { name: 'מידע נוסף', value: formData.additionalInfo },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'מערכת מועמדויות צוות' },
      };

      const response = await fetch(siteConfig.webhooks.staffApplication, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
      });

      if (response.ok) {
        saveSubmission('staff-application', formData);
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          age: '',
          discordUsername: '',
          robloxUsername: '',
          timezone: '',
          position: '',
          experience: '',
          weeklyHours: '',
          motivation: '',
          scenario: '',
          additionalInfo: '',
          agreedToRules: false,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      saveSubmission('staff-application', formData);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 text-center">הגשת מועמדות לצוות</h1>
          <p className="text-xl text-gray-400 text-center mb-12">מעוניינים להצטרף לצוות שלנו? מלאו את הטופס בקפידה</p>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8">
            <h2 className="text-xl font-bold text-white mb-3">לפני שאתם ממשיכים:</h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span><span>ודאו שקראתם את חוקי הקהילה</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span><span>ענו בכנות ובפירוט על כל השאלות</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span><span>הקפידו על לשון נקייה ומכבדת</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span><span>ייתכן ותקבלו תשובה תוך 7-14 ימים</span></li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">פרטים אישיים</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">שם מלא <span className="text-red-400">*</span></label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors" placeholder="הכניסו את שמכם המלא" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">גיל <span className="text-red-400">*</span></label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required min="13" max="100" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors" placeholder="הכניסו את גילכם" />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">אזור זמן <span className="text-red-400">*</span></label>
                    <input type="text" name="timezone" value={formData.timezone} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors" placeholder="לדוגמה: GMT+2" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">שם משתמש Discord <span className="text-red-400">*</span></label>
                    <input type="text" name="discordUsername" value={formData.discordUsername} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors" placeholder="username#0000" />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">שם משתמש Roblox <span className="text-red-400">*</span></label>
                    <input type="text" name="robloxUsername" value={formData.robloxUsername} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors" placeholder="שם המשתמש שלכם" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">פרטי המועמדות</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">תפקיד מבוקש <span className="text-red-400">*</span></label>
                  <input type="text" name="position" value={formData.position} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors" placeholder="הכניסו את התפקיד המבוקש" />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">ניסיון קודם בתפקידי צוות <span className="text-red-400">*</span></label>
                  <textarea name="experience" value={formData.experience} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="תארו את הניסיון שלכם בתפקידי צוות קודמים" />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">כמה שעות בשבוע תוכלו להקדיש? <span className="text-red-400">*</span></label>
                  <select name="weeklyHours" value={formData.weeklyHours} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors">
                    <option value="">בחרו טווח שעות</option>
                    <option value="1-5">1-5 שעות</option>
                    <option value="5-10">5-10 שעות</option>
                    <option value="10-20">10-20 שעות</option>
                    <option value="20+">20+ שעות</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">למה אתם רוצים להצטרף לצוות? <span className="text-red-400">*</span></label>
                  <textarea name="motivation" value={formData.motivation} onChange={handleChange} required rows={5} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="ספרו לנו על המוטיבציה שלכם ומה אתם מקווים לתרום" />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">תארו איך הייתם מטפלים בסיטואציה מאתגרת <span className="text-red-400">*</span></label>
                  <textarea name="scenario" value={formData.scenario} onChange={handleChange} required rows={5} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="לדוגמה: איך הייתם מטפלים בסכסוך בין שני שחקנים?" />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">מידע נוסף שתרצו לשתף <span className="text-red-400">*</span></label>
                  <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="כל מידע נוסף שחשוב לנו לדעת" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="agreedToRules" checked={formData.agreedToRules} onChange={handleChange} required className="mt-1 w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900" />
                <span className="text-gray-300">אני מאשר/ת שקראתי את חוקי הקהילה ומתחייב/ת לפעול לפיהם. אני מבין/ה שמתן מידע כוזב עלול להוביל לדחיית המועמדות. <span className="text-red-400">*</span></span>
              </label>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-900/30 border border-green-500 rounded-xl p-6 flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-green-400 font-bold text-lg mb-2">המועמדות נשלחה בהצלחה!</h4>
                  <p className="text-gray-300">תודה על הגשת המועמדות. נבדוק את הפרטים שלכם ונחזור אליכם בהקדם.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-900/30 border border-red-500 rounded-xl p-6 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-red-400 font-bold text-lg mb-2">אירעה שגיאה</h4>
                  <p className="text-gray-300">לא הצלחנו לשלוח את המועמדות. אנא נסו שוב מאוחר יותר או צרו איתנו קשר ישירות.</p>
                </div>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3">
              {isSubmitting ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>שולח...</span></>
              ) : (
                <><Send className="w-5 h-5" /><span>שלח מועמדות</span></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
