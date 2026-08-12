import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MOCK_GIGS } from '../data/mockGigs';
import GigCard from '../components/GigCard';

export default function DashboardScreen({ onNavigateBrowse, onSelectGig }) {
  const activeGigsCount = MOCK_GIGS.filter((g) => g.active).length;
  const appliedCount = MOCK_GIGS.filter((g) => g.application).length;
  const recentGigs = MOCK_GIGS.slice(0, 3);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>A</Text>
            </View>
            <View>
              <Text style={styles.greetingText}>Welcome back,</Text>
              <Text style={styles.userNameText}>Akash Tiwari</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={20} color="#ffffff" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* 2. Key Metrics Row */}
        <View style={styles.metricsRow}>
          <BlurView intensity={30} tint="dark" style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Earnings</Text>
            <Text style={styles.metricValue}>₹45,000</Text>
            <Text style={styles.metricSubtext}>+18% this month</Text>
          </BlurView>

          <BlurView intensity={30} tint="dark" style={styles.metricCard}>
            <Text style={styles.metricLabel}>Applications</Text>
            <Text style={styles.metricValue}>{appliedCount} Active</Text>
            <Text style={styles.metricSubtext}>1 Shortlisted</Text>
          </BlurView>
        </View>

        {/* 3. Featured Quick Action: Browse Gygs Near Me (Primary Brand Accent #1D4ED8) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onNavigateBrowse}
          style={styles.browseBannerWrapper}
        >
          <View style={styles.browseBanner}>
            <View style={styles.browseBannerLeft}>
              <View style={styles.bannerIconBadge}>
                <Ionicons name="compass" size={22} color="#ffffff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>Browse Gygs Near Me</Text>
                <Text style={styles.bannerSubtitle}>
                  {activeGigsCount} verified live opportunities in your area
                </Text>
              </View>
            </View>

            <View style={styles.bannerArrowCircle}>
              <Ionicons name="arrow-forward" size={18} color="#ffffff" />
            </View>
          </View>
        </TouchableOpacity>

        {/* 4. Secondary Action Cards Grid */}
        <View style={styles.gridContainer}>
          <TouchableOpacity activeOpacity={0.85} style={styles.gridCardWrapper}>
            <BlurView intensity={30} tint="dark" style={styles.gridCard}>
              <Ionicons name="document-text-outline" size={22} color="#60A5FA" style={styles.gridIcon} />
              <Text style={styles.gridCardTitle}>My Applications</Text>
              <Text style={styles.gridCardDesc}>Track status & messages</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.gridCardWrapper}>
            <BlurView intensity={30} tint="dark" style={styles.gridCard}>
              <Ionicons name="sparkles-outline" size={22} color="#10B981" style={styles.gridIcon} />
              <Text style={styles.gridCardTitle}>Talent Assistant</Text>
              <Text style={styles.gridCardDesc}>AI portfolio optimizer</Text>
            </BlurView>
          </TouchableOpacity>
        </View>

        {/* 5. Recent Gygs Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Opportunities</Text>
          <TouchableOpacity onPress={onNavigateBrowse}>
            <Text style={styles.seeAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        {/* 6. Feed of Recent Gyg Cards */}
        {recentGigs.map((gig) => (
          <GigCard
            key={gig._id}
            gig={gig}
            onPress={onSelectGig || onNavigateBrowse}
          />
        ))}

        {/* Explore All CTA Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onNavigateBrowse}
          style={styles.exploreCtaBtn}
        >
          <Text style={styles.exploreCtaText}>Explore All {MOCK_GIGS.length} Gygs</Text>
          <Ionicons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
  },
  greetingText: {
    color: '#888888',
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Medium',
  },
  userNameText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'AirbnbCereal-Bold',
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  metricLabel: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Medium',
    marginBottom: 4,
  },
  metricValue: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'AirbnbCereal-Bold',
    marginBottom: 2,
  },
  metricSubtext: {
    color: '#10B981',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Book',
  },
  browseBannerWrapper: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  browseBanner: {
    backgroundColor: '#1D4ED8',
    padding: 18,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  browseBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 12,
  },
  bannerIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'AirbnbCereal-Bold',
  },
  bannerSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    marginTop: 2,
  },
  bannerArrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  gridCardWrapper: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },
  gridCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gridIcon: {
    marginBottom: 8,
  },
  gridCardTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
  },
  gridCardDesc: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'AirbnbCereal-Bold',
  },
  seeAllText: {
    color: '#60A5FA',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Bold',
  },
  exploreCtaBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  exploreCtaText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Bold',
  },
});
