export interface StaffApplicationForm {
  fullName: string;
  age: string;
  discordUsername: string;
  robloxUsername: string;
  timezone: string;
  position: string;
  experience: string;
  weeklyHours: string;
  motivation: string;
  scenario: string;
  additionalInfo: string;
  agreedToRules: boolean;
}

export interface ContactForm {
  name: string;
  contactMethod: string;
  contactDetails: string;
  message: string;
}

export interface Submission {
  id: string;
  type: 'support' | 'staff-application';
  data: StaffApplicationForm | ContactForm;
  timestamp: string;
  read: boolean;
}
