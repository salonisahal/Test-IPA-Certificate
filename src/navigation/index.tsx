import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import FeaturesScreen from '../screens/FeaturesScreen';
import FeatureDetailScreen from '../screens/FeatureDetailScreen';
import PricingScreen from '../screens/PricingScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import ResourceDetailScreen from '../screens/ResourceDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ContactScreen from '../screens/ContactScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import TestimonialsScreen from '../screens/TestimonialsScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Features: undefined;
  Pricing: undefined;
  Resources: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  FeatureDetail: { id: string };
  ResourceDetail: { id: string };
  Contact: undefined;
  Notifications: undefined;
  Testimonials: undefined;
  NotFound: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: Platform.select({ ios: 83, android: 60, default: 60 }),
          paddingBottom: Platform.select({ ios: 28, android: 8, default: 8 }),
          paddingTop: 8,
          ...Platform.select({ android: { elevation: 8 }, ios: {}, default: {} }),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          fontFamily: 'Inter-Medium',
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: 'home',
            Dashboard: 'bar-chart',
            Features: 'sparkles',
            Pricing: 'pricetags',
            Resources: 'library',
            Profile: 'person-circle',
          };
          const iconName = iconMap[route.name] ?? 'ellipse';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Features" component={FeaturesScreen} />
      <Tab.Screen name="Pricing" component={PricingScreen} />
      <Tab.Screen name="Resources" component={ResourcesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
          ...Platform.select({ android: { elevation: 4 }, ios: {}, default: {} }),
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          fontWeight: '600',
          fontSize: 17,
          color: colors.textPrimary,
        },
        headerTintColor: colors.primary,
        headerBackTitleVisible: false,
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Reset Password' }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="FeatureDetail" component={FeatureDetailScreen} options={{ title: 'Feature detail' }} />
      <Stack.Screen name="ResourceDetail" component={ResourceDetailScreen} options={{ title: 'Resource' }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Testimonials" component={TestimonialsScreen} options={{ title: 'Testimonials' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Not found' }} />
    </Stack.Navigator>
  );
}
