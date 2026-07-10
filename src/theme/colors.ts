export const colors = {
  primary: '#60A5FA',
  primaryDark: '#2563EB',
  primaryLight: '#1E3A8A',
  accent: '#F97316',
  background: '#0B1220',
  surface: '#111827',
  card: '#1F2937',
  border: '#273244',
  textPrimary: '#F9FAFB',
  textSecondary: '#CBD5F5',
  textDisabled: '#9CA3AF',
  textInverse: '#0B1220',
  success: '#22C55E',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#38BDF8',
  shadowColor: '#000000',
} as const;

export type Colors = typeof colors;
