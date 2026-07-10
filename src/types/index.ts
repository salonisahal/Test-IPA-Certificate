export interface KPI {
  id: string;
  label: string;
  value: string;
  trend: string;
}

export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  time: string;
}

export interface Feature {
  id: string;
  title: string;
  summary: string;
  benefit: string;
  usage: string;
}

export interface Plan {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  description: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  unread: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  outcome: string;
}
