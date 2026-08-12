import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ onBackHome }) {
  const specialties = ['Solo Vocalist', 'Acoustic Guitarist', 'Music Producer', 'Bollywood', 'Commercial Live'];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackHome} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>
          Akash Tiwari
        </Text>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#60A5FA" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* 1. Pro Member Golden Halo & Cover Headshot Card */}
        <View style={styles.proCardOuter}>
          {/* Soft Golden Halo Glow behind card */}
          <LinearGradient
            colors={['rgba(186, 148, 62, 0.22)', 'rgba(186, 148, 62, 0)']}
            style={styles.haloGlow}
          />
          {/* Golden Gradient Border Wrapper */}
          <LinearGradient
            colors={['#ba943e', '#ffd700', '#ba943e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.goldBorderWrapper}
          >
            <View style={styles.profileHeaderCard}>
              {/* Dark Liquid Glass Content Container */}
              <LinearGradient
                colors={['rgba(30, 30, 30, 0.95)', 'rgba(10, 10, 10, 0.95)']}
                style={styles.coverImageContainer}
              >
                {/* Large Profile Initial Avatar Graphic */}
                <View style={styles.avatarCircleGlow}>
                  <Text style={styles.avatarInitial}>A</Text>
                </View>

                {/* Info Bottom Overlay */}
                <View style={styles.infoOverlay}>
                  <View style={styles.nameRow}>
                    <Text style={styles.artistNameText}>Akash Tiwari</Text>

                    {/* Golden Crown Icon */}
                    <View style={styles.crownContainer}>
                      <Ionicons name="sparkles" size={16} color="#ffd700" />
                    </View>

                    {/* PRO Badge */}
                    <View style={styles.proBadge}>
                      <Ionicons name="star" size={8} color="#000000" />
                      <Text style={styles.proText}>PRO</Text>
                    </View>
                  </View>

                  <Text style={styles.artistEmailText}>akashtiwari@gygs.in</Text>
                </View>
              </LinearGradient>
            </View>
          </LinearGradient>
        </View>

        {/* 2. Physical Specifications 2x2 Matrix */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Physical Specifications</Text>
          <View style={styles.specsMatrix}>
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>AGE</Text>
              <Text style={styles.specValue}>24 Years</Text>
            </View>
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>HEIGHT</Text>
              <Text style={styles.specValue}>5' 9" (175 cm)</Text>
            </View>
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>GENDER</Text>
              <Text style={styles.specValue}>Male</Text>
            </View>
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>CITY</Text>
              <Text style={styles.specValue}>Mumbai</Text>
            </View>
          </View>
        </View>

        {/* 3. Specialty Coordinates Chips */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Specialty Coordinates</Text>
          <View style={styles.specsRow}>
            {specialties.map((spec, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.specChip, 
                  idx === 0 ? styles.specChipPrimary : null
                ]}
              >
                <Text style={styles.specChipText}>{spec}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 4. Photos Portfolio Slots */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <View style={styles.photoGrid}>
            
            <View style={styles.gridImageContainer}>
              <BlurView intensity={30} tint="dark" style={styles.photoSlot}>
                <Ionicons name="camera-outline" size={24} color="#60A5FA" />
                <Text style={styles.photoSlotLabel}>Close-Up</Text>
              </BlurView>
            </View>

            <View style={styles.gridImageContainer}>
              <BlurView intensity={30} tint="dark" style={styles.photoSlot}>
                <Ionicons name="person-outline" size={24} color="#60A5FA" />
                <Text style={styles.photoSlotLabel}>Full-Body</Text>
              </BlurView>
            </View>

            <View style={styles.gridImageContainer}>
              <BlurView intensity={30} tint="dark" style={styles.photoSlot}>
                <Ionicons name="mic-outline" size={24} color="#60A5FA" />
                <Text style={styles.photoSlotLabel}>Stage Set</Text>
              </BlurView>
            </View>

          </View>
        </View>

        {/* 5. Videos & Performance Reels */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Videos & Performance Reels</Text>
          <View style={styles.videoCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.02)']}
              style={styles.videoCardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.videoCardContent}>
                <View style={styles.playIconCircle}>
                  <Ionicons name="play" size={22} color="#ffffff" style={{ marginLeft: 2 }} />
                </View>
                <Text style={styles.videoTitle}>Live Performance Showcase 2026</Text>
                <Text style={styles.videoSubtitle}>Acoustic Vocals & Guitar Medley</Text>
              </BlurView>
            </LinearGradient>
          </View>
        </View>

        {/* 6. About & Experience */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About & Experience</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              Passionate vocalist and music producer with over 5 years of live performance experience across Bollywood, Acoustic, and Commercial live show setups. Available for private events, club gigs, and studio recording sessions.
            </Text>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
    gap: 20,
  },
  proCardOuter: {
    position: 'relative',
    marginBottom: 4,
  },
  haloGlow: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 24,
  },
  goldBorderWrapper: {
    borderRadius: 16,
    padding: 1.5,
  },
  profileHeaderCard: {
    height: 280,
    borderRadius: 14.5,
    overflow: 'hidden',
    position: 'relative',
  },
  coverImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatarCircleGlow: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#60A5FA',
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  avatarInitial: {
    color: '#ffffff',
    fontSize: 36,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: 18,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  artistNameText: {
    fontSize: 22,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
  },
  crownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffd700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  proText: {
    fontSize: 9,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#000000',
  },
  artistEmailText: {
    fontSize: 13,
    color: '#888888',
    fontFamily: 'AirbnbCereal-Book',
    marginTop: 4,
  },
  sectionCard: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.2,
  },
  specsMatrix: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specBox: {
    width: (width - 32 - 10) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    padding: 16,
  },
  specLabel: {
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#888888',
    letterSpacing: 0.8,
  },
  specValue: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 6,
  },
  specsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  specChipPrimary: {
    borderColor: '#1D4ED8',
    backgroundColor: 'rgba(29, 78, 216, 0.18)',
  },
  specChipText: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Medium',
  },
  photoGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  gridImageContainer: {
    flex: 1,
    height: 110,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  photoSlot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  photoSlotLabel: {
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#888888',
    marginTop: 6,
  },
  videoCardWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  videoCardGradient: {
    padding: 16,
  },
  videoCardContent: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  playIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  videoTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  videoSubtitle: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    marginTop: 2,
  },
  aboutCard: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  aboutText: {
    color: '#d4d4d4',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Book',
    lineHeight: 22,
  },
});
