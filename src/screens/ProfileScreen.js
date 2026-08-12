import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Alert,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ onBackHome }) {
  const artistTypes = ['Solo Vocalist', 'Acoustic Performer'];
  const categories = ['Bollywood', 'Classical', 'Commercial', 'Acoustic'];

  const handleShareProfile = () => {
    Alert.alert('Profile Link Copied!', 'https://gygs.in/artist/profile/akashtiwari has been copied to your clipboard.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />

      {/* Header Navigation Bar */}
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={onBackHome} style={styles.navIconBtn}>
          <Ionicons name="chevron-back" size={20} color="#ffffff" />
        </TouchableOpacity>
        
        <Text style={styles.navTitle} numberOfLines={1}>
          My Profile
        </Text>

        <TouchableOpacity activeOpacity={0.8} style={styles.navIconBtn}>
          <Ionicons name="create-outline" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Global Canvas: Dashboard Deep Black Background #050505 */}
      <ScrollView 
        style={styles.canvasScrollView} 
        contentContainerStyle={styles.canvasContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* 1. Dashboard Theme Liquid Glass Airbnb Hero Profile Card */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
              
              <View style={styles.airbnbSplitRow}>
                
                {/* Left Column: Avatar + Name + Location Below Name */}
                <View style={styles.airbnbLeftCol}>
                  <View style={styles.avatarWrapper}>
                    <View style={styles.avatarCircleBlue}>
                      <Text style={styles.avatarInitialText}>A</Text>
                    </View>
                    
                    {/* Royal Blue Verification Shield Badge */}
                    <View style={styles.shieldBadge}>
                      <Ionicons name="checkmark-sharp" size={12} color="#ffffff" />
                    </View>
                  </View>

                  <Text style={styles.airbnbNameText}>Akash Tiwari</Text>

                  {/* Location with Globe Icon directly below Name */}
                  <View style={styles.locationBelowNameRow}>
                    <Ionicons name="globe-outline" size={13} color="#888888" style={{ marginRight: 4 }} />
                    <Text style={styles.locationBelowNameText}>Lives in Mumbai, India</Text>
                  </View>
                </View>

                {/* Vertical Divider Line */}
                <View style={styles.columnDivider} />

                {/* Right Column: 3 Stacked Metrics */}
                <View style={styles.airbnbRightCol}>
                  
                  {/* Metric 1: Reviews */}
                  <View style={styles.metricBlock}>
                    <Text style={styles.metricBigNumber}>4</Text>
                    <Text style={styles.metricLabelText}>Reviews</Text>
                  </View>

                  <View style={styles.horizontalDivider} />

                  {/* Metric 2: Rating */}
                  <View style={styles.metricBlock}>
                    <View style={styles.ratingValRow}>
                      <Text style={styles.metricBigNumber}>5.0</Text>
                      <Ionicons name="star" size={13} color="#ffffff" style={{ marginLeft: 3 }} />
                    </View>
                    <Text style={styles.metricLabelText}>Rating</Text>
                  </View>

                  <View style={styles.horizontalDivider} />

                  {/* Metric 3: Years Active */}
                  <View style={styles.metricBlock}>
                    <Text style={styles.metricBigNumber}>5</Text>
                    <Text style={styles.metricLabelText}>Years active</Text>
                  </View>

                </View>

              </View>

              {/* Dashboard Solid Royal Blue Share Profile Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleShareProfile}
                style={styles.shareProfileButton}
              >
                <Text style={styles.shareProfileButtonText}>Share Profile</Text>
                <Ionicons name="open-outline" size={14} color="#ffffff" style={{ marginLeft: 6 }} />
              </TouchableOpacity>

            </BlurView>
          </LinearGradient>
        </View>

        {/* 2. Side-by-Side 'Artist Type' and 'Categories' Liquid Glass Double Cards Row */}
        <View style={styles.doubleCardRow}>
          
          {/* Card A: Artist Type */}
          <View style={styles.halfCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardHeaderLabel}>ARTIST TYPE</Text>
                  <Ionicons name="create-outline" size={14} color="#888888" />
                </View>
                <View style={styles.tagContainer}>
                  {artistTypes.map((type, idx) => (
                    <View key={idx} style={styles.tagPill}>
                      <Text style={styles.tagPillText}>{type}</Text>
                    </View>
                  ))}
                </View>
              </BlurView>
            </LinearGradient>
          </View>

          {/* Card B: Categories */}
          <View style={styles.halfCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardHeaderLabel}>CATEGORIES</Text>
                  <Ionicons name="create-outline" size={14} color="#888888" />
                </View>
                <View style={styles.tagContainer}>
                  {categories.map((cat, idx) => (
                    <View key={idx} style={styles.tagPill}>
                      <Text style={styles.tagPillText}>{cat}</Text>
                    </View>
                  ))}
                </View>
              </BlurView>
            </LinearGradient>
          </View>

        </View>

        {/* 3. Demographics Liquid Glass 2-Column Grid */}
        <View style={styles.demographicsContainer}>
          
          <View style={styles.demographicCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
                <Text style={styles.cardHeaderLabel}>AGE</Text>
                <Text style={styles.demoValue}>24 Years</Text>
              </BlurView>
            </LinearGradient>
          </View>

          <View style={styles.demographicCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
                <Text style={styles.cardHeaderLabel}>HEIGHT</Text>
                <Text style={styles.demoValue}>5' 9" (175 cm)</Text>
              </BlurView>
            </LinearGradient>
          </View>

          <View style={styles.demographicCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
                <Text style={styles.cardHeaderLabel}>GENDER</Text>
                <Text style={styles.demoValue}>Male</Text>
              </BlurView>
            </LinearGradient>
          </View>

          <View style={styles.demographicCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
                <Text style={styles.cardHeaderLabel}>CITY</Text>
                <Text style={styles.demoValue}>Mumbai</Text>
              </BlurView>
            </LinearGradient>
          </View>

        </View>

        {/* 4. Gallery Liquid Glass Card */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>GALLERY</Text>
                <Ionicons name="create-outline" size={14} color="#888888" />
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
            </BlurView>
          </LinearGradient>
        </View>

        {/* 5. About Me Liquid Glass Card */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>ABOUT ME</Text>
                <Ionicons name="create-outline" size={14} color="#888888" />
              </View>
              <Text style={styles.aboutText}>
                Passionate vocalist and music producer in pursuit of creating unforgettable live show experiences. Specialized in Bollywood, Acoustic, and Commercial set ups.
              </Text>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 6. Show Rates Liquid Glass Card */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>SHOW RATES</Text>
                <Ionicons name="create-outline" size={14} color="#888888" />
              </View>

              <View style={styles.rateRow}>
                <View>
                  <Text style={styles.rateTitle}>Standard Live Performance</Text>
                  <Text style={styles.rateSubtitle}>2-Hour set with PA sound setup</Text>
                </View>
                <Text style={styles.rateAmount}>₹15,000</Text>
              </View>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 7. Connected Accounts Liquid Glass Card */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
              <Text style={[styles.cardHeaderLabel, { marginBottom: 12 }]}>CONNECTED ACCOUNTS</Text>

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
            </BlurView>
          </LinearGradient>
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
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  navIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 20,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
  },
  canvasScrollView: {
    flex: 1,
    backgroundColor: '#050505',
  },
  canvasContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 50,
  },

  /* Master Liquid White Glass Card Architecture */
  cardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardBlurContent: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  cardHeaderLabel: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    includeFontPadding: false,
  },

  /* Airbnb Hero Split Card Specifics */
  airbnbSplitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  airbnbLeftCol: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 10,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarCircleBlue: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  avatarInitialText: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
  },
  shieldBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#050505',
  },
  airbnbNameText: {
    fontSize: 20,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  locationBelowNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  locationBelowNameText: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    color: 'rgba(255, 255, 255, 0.65)',
    textAlign: 'center',
  },
  columnDivider: {
    width: 1,
    height: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 12,
  },
  airbnbRightCol: {
    flex: 1,
    paddingLeft: 6,
    justifyContent: 'center',
  },
  metricBlock: {
    paddingVertical: 2,
  },
  metricBigNumber: {
    fontSize: 19,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  ratingValRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricLabelText: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    color: 'rgba(255, 255, 255, 0.65)',
    marginTop: 1,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  shareProfileButton: {
    backgroundColor: '#1D4ED8',
    borderRadius: 16,
    paddingVertical: 13,
    marginTop: 20,
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
    gap: 16,
    marginBottom: 16,
  },
  halfCardWrapper: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    borderColor: 'rgba(96, 165, 250, 0.4)',
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
    marginBottom: 0,
  },
  demographicCardWrapper: {
    width: (width - 40 - 16) / 2,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
  },
  demoValue: {
    fontSize: 16,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 8,
  },

  /* Gallery Horizontal Scroll */
  galleryScrollContainer: {
    paddingRight: 10,
  },
  galleryImageBlock: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },

  /* About Text */
  aboutText: {
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Book',
    color: 'rgba(255, 255, 255, 0.8)',
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
    color: 'rgba(255, 255, 255, 0.65)',
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
    borderColor: 'rgba(96, 165, 250, 0.4)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 10,
  },
});
