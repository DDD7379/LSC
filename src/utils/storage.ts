import type { Submission, StaffApplicationForm, ContactForm } from '../types';

const STORAGE_KEY = 'site_submissions';
const ADMIN_KEY = 'admin_authenticated';

export function saveSubmission(type: 'support' | 'staff-application', data: StaffApplicationForm | ContactForm): void {
  const submissions = getSubmissions();
  const newSubmission: Submission = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    data,
    timestamp: new Date().toISOString(),
    read: false,
  };
  submissions.unshift(newSubmission);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

export function getSubmissions(): Submission[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function markAsRead(id: string): void {
  const submissions = getSubmissions();
  const submission = submissions.find((s) => s.id === id);
  if (submission) {
    submission.read = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }
}

export function markAsUnread(id: string): void {
  const submissions = getSubmissions();
  const submission = submissions.find((s) => s.id === id);
  if (submission) {
    submission.read = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }
}

export function deleteSubmission(id: string): void {
  const submissions = getSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllSubmissions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getUnreadCount(): number {
  const submissions = getSubmissions();
  return submissions.filter((s) => !s.read).length;
}

export function setAdminAuthenticated(value: boolean): void {
  if (value) {
    localStorage.setItem(ADMIN_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_KEY);
  }
}

export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(ADMIN_KEY) === 'true';
}

