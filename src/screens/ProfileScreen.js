import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileScreen({ onBackHome }) {
  const artistTypes = ['Solo Vocalist', 'Acoustic Performer'];
  const categories = ['Bollywood', 'Classical', 'Commercial', 'Acoustic'];

  const handleShareProfile = () => {
    Alert.alert('Profile Link Copied!', 'https://gygs.in/artist/profile/akashtiwari has been copied to your clipboard.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />

      {/* Header Navigation Bar */}
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={onBackHome} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#ffffff" />
        </TouchableOpacity>
        
        <Text style={styles.navTitle} numberOfLines={1}>
          My Profile
        </Text>

        <TouchableOpacity activeOpacity={0.7} style={styles.backButton}>
          <Ionicons name="create-outline" size={18} color="#60A5FA" />
        </TouchableOpacity>
      </View>

      {/* Global Canvas: Deep Black Background #0A0A0A & >40px Bottom Padding */}
      <ScrollView 
        style={styles.canvasScrollView} 
        contentContainerStyle={styles.canvasContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* 1. Redesigned Top Header (Hero Trust Card - Airbnb Inspired Split Layout) */}
        <View style={styles.masterCard}>
          <View style={styles.heroSplitRow}>
            
            {/* Left side: Prominent circular avatar next to name & Verified Artist badge */}
            <View style={styles.heroLeftSection}>
              <View style={styles.avatarCircleBlue}>
                <Text style={styles.avatarInitialText}>A</Text>
              </View>

              <View style={styles.heroNameBlock}>
                <Text style={styles.nameText}>Akash Tiwari</Text>
                
                <View style={styles.verifiedBadgeBlue}>
                  <Ionicons name="checkmark-circle" size={13} color="#60A5FA" />
                  <Text style={styles.verifiedBadgeText}>Verified Artist</Text>
                </View>
              </View>
            </View>

            {/* Right side: Clean vertical stack of key metrics */}
            <View style={styles.heroMetricsStack}>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingValueText}>5.0</Text>
                <Ionicons name="star" size={14} color="#F59E0B" style={{ marginLeft: 3 }} />
              </View>

              <Text style={styles.metricSubtext}>4 Reviews</Text>
              <Text style={styles.metricSubtext}>5 Years active</Text>
            </View>

          </View>

          {/* Bottom Row: Full-width Solid Royal Blue Share Profile Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleShareProfile}
            style={styles.shareProfileButton}
          >
            <Text style={styles.shareProfileButtonText}>Share Profile</Text>
            <Ionicons name="open-outline" size={14} color="#ffffff" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        {/* 2. Side-by-Side 'Artist Type' and 'Categories' Double Cards Row */}
        <View style={styles.doubleCardRow}>
          
          {/* Card A: Artist Type */}
          <View style={styles.halfMasterCard}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitleSmall}>Artist Type</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Ionicons name="create-outline" size={14} color="#929292" />
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              {artistTypes.map((type, idx) => (
                <View key={idx} style={styles.tagPill}>
                  <Text style={styles.tagPillText}>{type}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Card B: Categories */}
          <View style={styles.halfMasterCard}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitleSmall}>Categories</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Ionicons name="create-outline" size={14} color="#929292" />
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              {categories.map((cat, idx) => (
                <View key={idx} style={styles.tagPill}>
                  <Text style={styles.tagPillText}>{cat}</Text>
                </View>
              ))}
            </View>
          </View>

        </View>

        {/* 3. Demographics Grid (Age, Height, Gender, City) - 2-Column Grid */}
        <View style={styles.demographicsContainer}>
          <View style={styles.demographicCard}>
            <Text style={styles.demoLabel}>AGE</Text>
            <Text style={styles.demoValue}>24 Years</Text>
          </View>

          <View style={styles.demographicCard}>
            <Text style={styles.demoLabel}>HEIGHT</Text>
            <Text style={styles.demoValue}>5' 9" (175 cm)</Text>
          </View>

          <View style={styles.demographicCard}>
            <Text style={styles.demoLabel}>GENDER</Text>
            <Text style={styles.demoValue}>Male</Text>
          </View>

          <View style={styles.demographicCard}>
            <Text style={styles.demoLabel}>CITY</Text>
            <Text style={styles.demoValue}>Mumbai</Text>
          </View>
        </View>

        {/* 4. Gallery Card */}
        <View style={styles.masterCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Gallery</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="create-outline" size={16} color="#929292" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryScrollContainer}
          >
            <View style={styles.galleryImageBlock}>
              <Ionicons name="image-outline" size={24} color="#60A5FA" />
            </View>
            <View style={styles.galleryImageBlock}>
              <Ionicons name="image-outline" size={24} color="#60A5FA" />
            </View>
            <View style={styles.galleryImageBlock}>
              <Ionicons name="image-outline" size={24} color="#60A5FA" />
            </View>
          </ScrollView>
        </View>

        {/* 5. About Me Card */}
        <View style={styles.masterCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>About Me</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="create-outline" size={16} color="#929292" />
            </TouchableOpacity>
          </View>
          <Text style={styles.aboutText}>
            Passionate vocalist and music producer with over 5 years of live performance experience across Bollywood, Acoustic, and Commercial live show setups.
          </Text>
        </View>

        {/* 6. Show Rates Card */}
        <View style={styles.masterCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Show Rates</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="create-outline" size={16} color="#929292" />
            </TouchableOpacity>
          </View>

          <View style={styles.rateRow}>
            <View>
              <Text style={styles.rateTitle}>Standard Live Performance</Text>
              <Text style={styles.rateSubtitle}>2-Hour set with PA sound setup</Text>
            </View>
            <Text style={styles.rateAmount}>₹15,000</Text>
          </View>
        </View>

        {/* 7. Connected Accounts Card */}
        <View style={styles.masterCard}>
          <Text style={[styles.cardTitle, { marginBottom: 12 }]}>Connected Accounts</Text>

          <View style={styles.socialRow}>
            <View style={styles.socialLeft}>
              <Ionicons name="logo-instagram" size={18} color="#E1306C" />
              <Text style={styles.socialHandle}>@akashtiwari.music</Text>
            </View>
            <View style={styles.connectedBadgeBlue}>
              <Text style={styles.connectedBadgeBlueText}>Connected</Text>
            </View>
          </View>

          <View style={styles.socialDivider} />

          <View style={styles.socialRow}>
            <View style={styles.socialLeft}>
              <Ionicons name="logo-youtube" size={18} color="#FF0000" />
              <Text style={styles.socialHandle}>Akash Tiwari Official</Text>
            </View>
            <View style={styles.connectedBadgeBlue}>
              <Text style={styles.connectedBadgeBlueText}>Connected</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
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
  navTitle: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
  },
  canvasScrollView: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  canvasContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
  
  /* Master Card Styling */
  masterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },

  /* Redesigned Hero Trust Header Card Specifics */
  heroSplitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  avatarCircleBlue: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
    marginRight: 12,
  },
  avatarInitialText: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
  },
  heroNameBlock: {
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 20,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  verifiedBadgeBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
    borderWidth: 1,
    borderColor: '#1D4ED8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  verifiedBadgeText: {
    color: '#60A5FA',
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Medium',
    fontWeight: '600',
  },
  heroMetricsStack: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingValueText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
  },
  metricSubtext: {
    color: '#929292',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    marginTop: 2,
  },
  shareProfileButton: {
    backgroundColor: '#1D4ED8',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  shareProfileButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
  },

  /* Side-by-Side Double Cards Row */
  doubleCardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  halfMasterCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardTitleSmall: {
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
  },

  /* Card Header Rows */
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
  },

  /* Tag Pills Layout */
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
    borderWidth: 1,
    borderColor: '#1D4ED8',
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagPillText: {
    color: '#60A5FA',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Medium',
    fontWeight: '600',
  },

  /* Demographics 2-Column Grid Layout */
  demographicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  demographicCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  demoLabel: {
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#929292',
    letterSpacing: 0.8,
  },
  demoValue: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 6,
  },

  /* Gallery Horizontal Scroll */
  galleryScrollContainer: {
    paddingRight: 10,
  },
  galleryImageBlock: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },

  /* About Text */
  aboutText: {
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Book',
    color: '#d4d4d4',
    lineHeight: 22,
  },

  /* Show Rates Row */
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateTitle: {
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
  },
  rateSubtitle: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    color: '#929292',
    marginTop: 2,
  },
  rateAmount: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  /* Connected Accounts Social Row */
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
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
  connectedBadgeBlue: {
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
    borderWidth: 1,
    borderColor: '#1D4ED8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  connectedBadgeBlueText: {
    color: '#60A5FA',
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
  },
  socialDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginVertical: 10,
  },
});
