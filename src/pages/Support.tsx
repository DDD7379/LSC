import { useState } from 'react';
import { Send, MessageCircle, Mail, Users, CheckCircle, AlertCircle } from 'lucide-react';
import type { ContactForm } from '../types';
import { siteConfig } from '../config/siteConfig';
import { saveSubmission } from '../utils/storage';

export default function Support() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    contactMethod: '',
    contactDetails: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const contactMethodLabels: Record<string, string> = {
        discord: 'דיסקורד',
        roblox: 'רובלוקס',
        email: 'איימיל',
        other: 'אחר',
      };

      const embed = {
        title: '💬 פנייה חדשה לתמיכה',
        color: 0x3b82f6, // blue-500
        fields: [
          { name: 'שם', value: formData.name, inline: true },
          { name: 'אמצעי יצירת קשר', value: contactMethodLabels[formData.contactMethod] || formData.contactMethod, inline: true },
          { name: 'פרטי יצירת קשר', value: formData.contactDetails || 'לא צוין', inline: true },
          { name: 'הודעה', value: formData.message },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'מערכת תמיכה' },
      };

      const response = await fetch(siteConfig.webhooks.support, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
      });

      if (response.ok) {
        saveSubmission('support', formData);
        setSubmitStatus('success');
        setFormData({ name: '', contactMethod: '', contactDetails: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      saveSubmission('support', formData);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
    <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 text-center">תמיכה</h1>
          <p className="text-xl text-gray-400 text-center mb-12">צריכים עזרה? יש לכם שאלות? אנחנו כאן בשבילכם</p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[{ icon: <MessageCircle className="w-10 h-10" />, title: 'דיסקורד', description: 'הצטרפו לשרת שלנו לתמיכה מהירה' }, { icon: <Mail className="w-10 h-10" />, title: 'איימיל', description: 'שלחו לנו הודעה דרך הטופס למטה' }, { icon: <Users className="w-10 h-10" />, title: 'קהילה', description: 'קבלו עזרה משחקנים אחרים' }].map((item, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-600 transition-all duration-200 text-center">
                <div className="text-blue-500 flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">שאלות נפוצות</h2>
              <div className="space-y-4">
                {[{ question: 'איך מצטרפים למשחק?', answer: 'לחצו על הקישור "שחקו עכשיו" ותועברו ישירות למשחק ב-Roblox.' }, { question: 'איך יוצרים קשר עם הצוות?', answer: 'תוכלו ליצור קשר דרך הטופס באתר, בשרת הדיסקורד או הקבוצה ברובלוקס.' }, { question: 'מה עושים אם יש בעיה טכנית?', answer: 'דווחו על הבעיה בדיסקורד או דרך טופס הצור קשר עם פרטים מלאים.' }, { question: 'איך מדווחים על שחקן?', answer: 'צרו קשר עם הצוות בדיסקורד עם ראיות ופרטים על האירוע.' }].map((faq, index) => (
                  <div key={index} className="border-r-4 border-blue-600 pr-4">
                    <h4 className="text-white font-bold mb-2">{faq.question}</h4>
                    <p className="text-gray-400 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">שלחו הודעה</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">שם <span className="text-red-400">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors" placeholder="הכניסו את שמכם" />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">אמצעי יצירת קשר <span className="text-red-400">*</span></label>
                  <select name="contactMethod" value={formData.contactMethod} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors">
                    <option value="">בחרו אמצעי קשר</option>
                    <option value="discord">דיסקורד</option>
                    <option value="roblox">רובלוקס</option>
                    <option value="email">איימיל</option>
                    <option value="other">אחר</option>
                  </select>
                </div>

                {formData.contactMethod && (
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">פרטי יצירת קשר <span className="text-red-400">*</span></label>
                    <input type="text" name="contactDetails" value={formData.contactDetails} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors" />
                  </div>
                )}

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">ההודעה שלכם <span className="text-red-400">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="כתבו את הודעתכם כאן..." />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-green-400 font-bold mb-1">ההודעה נשלחה!</h4>
                      <p className="text-gray-300 text-sm">נחזור אליכם בהקדם האפשרי.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-bold mb-1">אירעה שגיאה</h4>
                      <p className="text-gray-300 text-sm">נסו שוב מאוחר יותר.</p>
                    </div>
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>שולח...</span></>
                  ) : (
                    <><Send className="w-5 h-5" /><span>שלח הודעה</span></>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 bg-gray-900 p-8 rounded-xl border border-gray-800 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">זמן תגובה ממוצע</h2>
            <p className="text-gray-300 mb-4">אנחנו משתדלים לענות על כל הפניות תוך 24-48 שעות</p>
            <p className="text-sm text-gray-400">לתמיכה דחופה, הצטרפו לשרת הדיסקורד שלנו לקבלת תשובה מהירה יותר</p>
          </div>
        </div>
      </div>
    </div>
  );
}
