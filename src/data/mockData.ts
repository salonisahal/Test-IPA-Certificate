import { Activity, Feature, KPI, NotificationItem, Plan, ResourceItem, Testimonial } from '../types';

export const kpis: KPI[] = [
  { id: 'kpi-1', label: 'Customers', value: '1,248', trend: '+12%' },
  { id: 'kpi-2', label: 'Revenue', value: '$98.4k', trend: '+8%' },
  { id: 'kpi-3', label: 'Engagement', value: '74%', trend: '+3%' },
  { id: 'kpi-4', label: 'Uptime', value: '99.98%', trend: '+0.02%' },
];

export const activities: Activity[] = [
  { id: 'act-1', title: 'Acme upgraded to Pro', subtitle: 'Billing update', time: '2h ago' },
  { id: 'act-2', title: 'New automation triggered', subtitle: 'Workflow: Onboarding', time: '4h ago' },
  { id: 'act-3', title: 'Weekly report generated', subtitle: 'Analytics', time: 'Yesterday' },
  { id: 'act-4', title: 'New comment in Workspace Vega', subtitle: 'Collaboration', time: '2 days ago' },
];

export const features: Feature[] = [
  { id: 'feat-1', title: 'Analytics', summary: 'Real-time dashboards and insights.', benefit: 'Improve retention with cohort visibility.', usage: '72% weekly adoption' },
  { id: 'feat-2', title: 'Automation', summary: 'No-code workflows and alerts.', benefit: 'Save 14h per team per week.', usage: '58% weekly adoption' },
  { id: 'feat-3', title: 'Collaboration', summary: 'Shared workspaces and approvals.', benefit: 'Reduce handoff time by 33%.', usage: '81% weekly adoption' },
];

export const plans: Plan[] = [
  { id: 'plan-1', name: 'Starter', monthly: 29, yearly: 264, description: 'For growing teams and pilots.' },
  { id: 'plan-2', name: 'Professional', monthly: 79, yearly: 708, description: 'Advanced analytics and automation.' },
  { id: 'plan-3', name: 'Enterprise', monthly: 149, yearly: 1332, description: 'Custom security and SLAs.' },
];

export const resources: ResourceItem[] = [
  { id: 'res-1', title: 'Scaling SaaS Metrics', category: 'Articles', excerpt: 'Learn the core SaaS metrics that matter.' },
  { id: 'res-2', title: 'Automation Playbook', category: 'Guides', excerpt: 'Build workflows to reduce manual ops.' },
  { id: 'res-3', title: 'Onboarding Checklist', category: 'Tutorials', excerpt: 'Create delightful onboarding experiences.' },
  { id: 'res-4', title: 'Security FAQ', category: 'FAQs', excerpt: 'Answer enterprise security questions.' },
];

export const notifications: NotificationItem[] = [
  { id: 'note-1', title: 'Daily summary ready', body: 'Your KPI summary is ready to view.', unread: true },
  { id: 'note-2', title: 'Usage spike detected', body: 'Automation usage is up 18%.', unread: true },
  { id: 'note-3', title: 'Billing reminder', body: 'Invoice #3841 is due in 3 days.', unread: false },
];

export const testimonials: Testimonial[] = [
  { id: 'test-1', name: 'Elena Ruiz', role: 'VP Growth', company: 'OrbitIQ', rating: 5, outcome: 'Cut churn by 12% in one quarter.' },
  { id: 'test-2', name: 'Marcus Lee', role: 'COO', company: 'SignalFlow', rating: 5, outcome: 'Automated 40% of ops workflows.' },
  { id: 'test-3', name: 'Priya Singh', role: 'Head of Product', company: 'Lumen', rating: 4, outcome: 'Improved activation by 22%.' },
];
