export const colors = {
  primary: '#DC2626',
  primaryDark: '#991B1B',
  primaryLight: '#FEE2E2',
  accent: '#EF4444',
  background: '#F5F7FB',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E2E8F0',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textDisabled: '#94A3B8',
  textInverse: '#FFFFFF',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
  info: '#0EA5E9',
  shadowColor: '#000000',
} as const;

export type Colors = typeof colors;
