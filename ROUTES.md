# Test IPA Certificate 

## How to run
cd /home/hewlett/projects/frontendX_backend_merged/frontend_runs/run_5d255d52_20260710_054205/project
npm install && npx expo start
# Press 'a' for Android, 'i' for iOS simulator, 'w' for web,
# or scan the QR code with the Expo Go app on a physical iOS/Android device.

## Screens
| Screen | File | Description |
|--------|------|-------------|
| Login | src/screens/LoginScreen.tsx | Email/password login with mock credentials and social placeholders. |
| ForgotPassword | src/screens/ForgotPasswordScreen.tsx | Request password reset via email. |
| Home | src/screens/HomeScreen.tsx | KPI snapshot, quick actions, recent activity list. |
| Dashboard | src/screens/DashboardScreen.tsx | KPI metrics with daily/weekly/monthly filters. |
| Features | src/screens/FeaturesScreen.tsx | Feature list with usage stats. |
| FeatureDetail | src/screens/FeatureDetailScreen.tsx | Feature insights and activation toggle. |
| Pricing | src/screens/PricingScreen.tsx | Plan selection with monthly/yearly toggle and confirmation. |
| Resources | src/screens/ResourcesScreen.tsx | Searchable resource library. |
| ResourceDetail | src/screens/ResourceDetailScreen.tsx | Resource details with bookmark toggle. |
| Profile | src/screens/ProfileScreen.tsx | User profile, settings, and logout. |
| Contact | src/screens/ContactScreen.tsx | Contact form with validation and submission feedback. |
| Notifications | src/screens/NotificationsScreen.tsx | Notification center with read/unread controls. |
| Testimonials | src/screens/TestimonialsScreen.tsx | Swipeable testimonial carousel with pagination. |
| NotFound | src/screens/NotFoundScreen.tsx | Fallback screen. |

## Navigation map
- Login -> MainTabs (tap “Sign In” with valid credentials)
- Login -> ForgotPassword (tap “Forgot password?”)
- Home -> Contact (tap “Contact support” quick action)
- Home -> Notifications (tap “Notification center” quick action)
- Home -> Testimonials (tap “Customer stories” quick action)
- Home -> Dashboard (tap any recent activity row)
- Features -> FeatureDetail (tap a feature card)
- Resources -> ResourceDetail (tap a resource card)
- Profile -> Contact (tap “Edit profile”)
- Profile -> Login (tap “Log out”)

## Shared components
- src/components/HeaderBar.tsx — Section header with optional action.
- src/components/PrimaryButton.tsx — Primary CTA button.
- src/components/StatCard.tsx — KPI stat card.
- src/components/SectionCard.tsx — Tappable quick action card.
- src/components/SegmentedTabs.tsx — Segmented control for filters.
- src/components/AvatarPlaceholder.tsx — Avatar placeholder icon.
- src/components/EmptyState.tsx — Empty/error state messaging.
- src/components/LoadingState.tsx — Inline loading indicator.

## Design tokens
primary, primaryDark, primaryLight, accent, background, surface, card, border, textPrimary, textSecondary, textDisabled, textInverse, success, warning, error, info, shadowColor.
