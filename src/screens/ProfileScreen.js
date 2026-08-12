import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileScreen({ onBackHome }) {
  const [isAvailable, setIsAvailable] = useState(true);

  const skills = ['Vocals', 'Acoustic Guitar', 'Music Production', 'Songwriting', 'Sound Engineering'];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackHome} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <TouchableOpacity style={styles.editHeaderBtn}>
          <Ionicons name="create-outline" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. Hero Profile Glass Card */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <BlurView intensity={50} tint="dark" style={styles.heroCardContent}>
              <View style={styles.heroTopRow}>
                {/* Profile Avatar with Royal Blue Glow Ring */}
                <View style={styles.avatarRing}>
                  <View style={styles.avatarInner}>
                    <Text style={styles.avatarText}>A</Text>
                  </View>
                </View>

                {/* Verified Badge & Availability Status */}
                <View style={styles.badgeColumn}>
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                    <Text style={styles.verifiedText}>Verified Artist</Text>
                  </View>

                  <View style={styles.availableBadge}>
                    <View style={[styles.statusDot, { backgroundColor: isAvailable ? '#10B981' : '#EF4444' }]} />
                    <Text style={styles.availableText}>{isAvailable ? 'Available for booking' : 'Busy'}</Text>
                  </View>
                </View>
              </View>

              {/* Artist Name & Category */}
              <Text style={styles.artistName}>Akash Tiwari</Text>
              <Text style={styles.artistTagline}>Vocalist & Music Producer</Text>

              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#888888" />
                <Text style={styles.locationText}>Mumbai, Maharashtra</Text>
              </View>

              {/* Metrics Stats Row */}
              <View style={styles.statsDivider} />

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>1,280</Text>
                  <Text style={styles.statLabel}>Views</Text>
                </View>

                <View style={styles.statVerticalLine} />

                <View style={styles.statItem}>
                  <Text style={styles.statValue}>14</Text>
                  <Text style={styles.statLabel}>Gygs Done</Text>
                </View>

                <View style={styles.statVerticalLine} />

                <View style={styles.statItem}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Text style={styles.statValue}>4.9</Text>
                    <Ionicons name="star" size={14} color="#F59E0B" />
                  </View>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
              </View>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 2. About & Bio Section */}
        <View style={styles.sectionWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.sectionContent}>
              <Text style={styles.sectionHeading}>About Me</Text>
              <Text style={styles.bioText}>
                Passionate vocalist and music producer with over 5 years of live performance and studio experience. 
                Specialized in Bollywood, Acoustic, and Commercial live show setups.
              </Text>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 3. Skills & Specializations */}
        <View style={styles.sectionWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.sectionContent}>
              <Text style={styles.sectionHeading}>Skills & Expertise</Text>
              <View style={styles.skillsRow}>
                {skills.map((skill, index) => (
                  <View key={index} style={styles.skillPill}>
                    <Text style={styles.skillPillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 4. Rates & Booking Info */}
        <View style={styles.sectionWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.sectionContent}>
              <Text style={styles.sectionHeading}>Performance Rates</Text>
              <View style={styles.rateCard}>
                <View>
                  <Text style={styles.rateLabel}>Standard Show Rate</Text>
                  <Text style={styles.rateSubtext}>2-hour live set + equipment</Text>
                </View>
                <Text style={styles.rateValue}>₹15,000</Text>
              </View>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 5. Connected Profiles */}
        <View style={styles.sectionWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.sectionContent}>
              <Text style={styles.sectionHeading}>Connected Accounts</Text>

              <View style={styles.socialRow}>
                <View style={styles.socialLeft}>
                  <Ionicons name="logo-instagram" size={18} color="#E1306C" />
                  <Text style={styles.socialHandle}>@akashtiwari.music</Text>
                </View>
                <View style={styles.connectedBadge}>
                  <Text style={styles.connectedBadgeText}>Connected</Text>
                </View>
              </View>

              <View style={styles.socialDivider} />

              <View style={styles.socialRow}>
                <View style={styles.socialLeft}>
                  <Ionicons name="logo-youtube" size={18} color="#FF0000" />
                  <Text style={styles.socialHandle}>Akash Tiwari Official</Text>
                </View>
                <View style={styles.connectedBadge}>
                  <Text style={styles.connectedBadgeText}>Connected</Text>
                </View>
              </View>
            </BlurView>
          </LinearGradient>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.primaryActionBtnWrapper}>
            <LinearGradient
              colors={['#1D4ED8', '#1E40AF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryActionBtn}
            >
              <Ionicons name="create-outline" size={16} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.primaryActionText}>Edit Profile</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.secondaryActionBtnWrapper}>
            <BlurView intensity={30} tint="dark" style={styles.secondaryActionBtn}>
              <Ionicons name="share-outline" size={16} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.secondaryActionText}>Share</Text>
            </BlurView>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
  },
  editHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
  },
  heroGradient: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  heroCardContent: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 3,
    backgroundColor: 'rgba(29, 78, 216, 0.4)',
    borderWidth: 1,
    borderColor: '#1D4ED8',
  },
  avatarInner: {
    flex: 1,
    borderRadius: 33,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'AirbnbCereal-Bold',
  },
  badgeColumn: {
    alignItems: 'flex-end',
    gap: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  verifiedText: {
    color: '#10B981',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  availableText: {
    color: '#d4d4d4',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Medium',
  },
  artistName: {
    fontSize: 26,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  artistTagline: {
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#60A5FA',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    color: '#888888',
    fontFamily: 'AirbnbCereal-Book',
  },
  statsDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#888888',
    marginTop: 2,
  },
  statVerticalLine: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 14,
  },
  sectionGradient: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  sectionContent: {
    padding: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  sectionHeading: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Book',
    color: '#d4d4d4',
    lineHeight: 22,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillPill: {
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(29, 78, 216, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  skillPillText: {
    color: '#60A5FA',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Medium',
  },
  rateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateLabel: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
  },
  rateSubtext: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    color: '#888888',
    marginTop: 2,
  },
  rateValue: {
    fontSize: 22,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#10B981',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  socialLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  socialHandle: {
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#ffffff',
  },
  connectedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  connectedBadgeText: {
    color: '#10B981',
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
  },
  socialDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 10,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  primaryActionBtnWrapper: {
    flex: 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  primaryActionBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
  },
  secondaryActionBtnWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  secondaryActionBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  secondaryActionText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
  },
});
