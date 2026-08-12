import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Alert,
  Dimensions,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ onBackHome }) {
  const artistTypes = ['Dance'];
  const categories = ['Performer', 'Trainer'];

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
                  <TouchableOpacity activeOpacity={0.7}>
                    <Ionicons name="create-outline" size={14} color="#888888" />
                  </TouchableOpacity>
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
                  <TouchableOpacity activeOpacity={0.7}>
                    <Ionicons name="create-outline" size={14} color="#888888" />
                  </TouchableOpacity>
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

        {/* 3. Demographics Liquid Glass Row (AGE, HEIGHT, GENDER Side-by-Side) */}
        <View style={styles.demographicsRow}>
          
          <View style={styles.tripletCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardBlurContentSmall}>
                <Text style={styles.cardHeaderLabel}>AGE</Text>
                <Text style={styles.demoValueSmall}>24 Years</Text>
              </BlurView>
            </LinearGradient>
          </View>

          <View style={styles.tripletCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardBlurContentSmall}>
                <Text style={styles.cardHeaderLabel}>HEIGHT</Text>
                <Text style={styles.demoValueSmall}>5' 9"</Text>
              </BlurView>
            </LinearGradient>
          </View>

          <View style={styles.tripletCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardBlurContentSmall}>
                <Text style={styles.cardHeaderLabel}>GENDER</Text>
                <Text style={styles.demoValueSmall}>Male</Text>
              </BlurView>
            </LinearGradient>
          </View>

        </View>

        {/* 4. Gallery Liquid Glass Card (Replicated from Production Screenshot) */}
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
                <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons name="create-outline" size={14} color="#888888" />
                </TouchableOpacity>
              </View>

              <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.galleryScrollContainer}
              >
                {/* Close-Up Card */}
                <View style={styles.galleryCardItem}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop' }} 
                    style={styles.galleryCardImage} 
                  />
                  <LinearGradient 
                    colors={['transparent', 'rgba(0, 0, 0, 0.88)']} 
                    style={styles.galleryCardGradientOverlay}
                  >
                    <Text style={styles.galleryCardLabelText}>Close-Up</Text>
                  </LinearGradient>
                </View>

                {/* Full-Body Card */}
                <View style={styles.galleryCardItem}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop' }} 
                    style={styles.galleryCardImage} 
                  />
                  <LinearGradient 
                    colors={['transparent', 'rgba(0, 0, 0, 0.88)']} 
                    style={styles.galleryCardGradientOverlay}
                  >
                    <Text style={styles.galleryCardLabelText}>Full-Body</Text>
                  </LinearGradient>
                </View>

                {/* Mid-Shot Card */}
                <View style={styles.galleryCardItem}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop' }} 
                    style={styles.galleryCardImage} 
                  />
                  <LinearGradient 
                    colors={['transparent', 'rgba(0, 0, 0, 0.88)']} 
                    style={styles.galleryCardGradientOverlay}
                  >
                    <Text style={styles.galleryCardLabelText}>Mid-Shot</Text>
                  </LinearGradient>
                </View>
              </ScrollView>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 5. Work Experience Liquid Glass Card (Replicated from Production Screenshot) */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>WORK EXPERIENCE</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons name="create-outline" size={14} color="#888888" />
                </TouchableOpacity>
              </View>

              {/* Experience Item 1: Performer */}
              <View style={styles.experienceBlock}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.expRoleTitle}>Performer & Choreographer</Text>
                  <View style={styles.tagPill}>
                    <Text style={styles.tagPillText}>2021 - Present</Text>
                  </View>
                </View>
                
                <View style={styles.expBulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.expBulletText}>Led 50+ live dance shows and high-energy stage performances across major venues.</Text>
                </View>
                <View style={styles.expBulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.expBulletText}>Choreographed commercial sequences for corporate events and brand launches.</Text>
                </View>
              </View>

              <View style={styles.socialDivider} />

              {/* Experience Item 2: Dance Trainer */}
              <View style={styles.experienceBlock}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.expRoleTitle}>Senior Dance Trainer</Text>
                  <View style={styles.tagPill}>
                    <Text style={styles.tagPillText}>2022 - 2024</Text>
                  </View>
                </View>
                
                <View style={styles.expBulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.expBulletText}>Conducted intensive masterclasses in Contemporary, Hip-Hop, and Bollywood styles.</Text>
                </View>
                <View style={styles.expBulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.expBulletText}>Mentored over 200+ aspiring dancers for professional auditions and competitions.</Text>
                </View>
              </View>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 6. Training & Certification Liquid Glass Card (Replicated from Production Screenshot) */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>TRAINING & CERTIFICATION</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons name="create-outline" size={14} color="#888888" />
                </TouchableOpacity>
              </View>

              <View style={styles.experienceBlock}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.expRoleTitle}>Diploma in Performing Arts</Text>
                  <View style={styles.tagPill}>
                    <Text style={styles.tagPillText}>Certified</Text>
                  </View>
                </View>
                <Text style={styles.institutionText}>National Academy of Dance & Performing Arts (Mumbai)</Text>
                
                <View style={[styles.expBulletRow, { marginTop: 6 }]}>
                  <Text style={bulletDot}>•</Text>
                  <Text style={styles.expBulletText}>Specialized in classical rhythm, contemporary execution, and stage expression.</Text>
                </View>
              </View>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 7. Instagram Insights Card (100% Exact Replica from Screenshot) */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.cardBlurContent}>
              
              {/* Instagram Card Header */}
              <View style={styles.instaHeaderRow}>
                <Text style={styles.instaHeaderTitle}>Instagram Insights</Text>
              </View>

              {/* 3 Explicit Side-by-Side Rows */}
              <View style={styles.instaRow}>
                {/* Box 1: Followers */}
                <View style={styles.instaMetricBox}>
                  <Text style={styles.instaMetricLabel}>Followers</Text>
                  <Text style={styles.instaMetricVal}>3.3K</Text>
                  <Text style={styles.instaMetricSub}>Lifetime</Text>
                </View>

                {/* Box 2: Engagement */}
                <View style={styles.instaMetricBox}>
                  <Text style={styles.instaMetricLabel}>Engagement</Text>
                  <Text style={styles.instaMetricVal}>1.7K accounts</Text>
                  <Text style={styles.instaMetricSub}>This Month</Text>
                </View>
              </View>

              <View style={styles.instaRow}>
                {/* Box 3: Partnerships */}
                <View style={styles.instaMetricBox}>
                  <Text style={styles.instaMetricLabel}>Partnerships</Text>
                  <Text style={styles.instaMetricVal}>0 brands</Text>
                  <Text style={styles.instaMetricSub}>Lifetime</Text>
                </View>

                {/* Box 4: Hook */}
                <View style={styles.instaMetricBox}>
                  <Text style={styles.instaMetricLabel}>Hook</Text>
                  <Text style={styles.instaMetricVal}>53.1%</Text>
                  <Text style={styles.instaMetricSub}>Last 90 days</Text>
                </View>
              </View>

              <View style={[styles.instaRow, { marginBottom: 0 }]}>
                {/* Box 5: Interaction */}
                <View style={styles.instaMetricBox}>
                  <Text style={styles.instaMetricLabel}>Interaction</Text>
                  <Text style={styles.instaMetricVal}>3.2%</Text>
                  <Text style={styles.instaMetricSub}>Last 90 days</Text>
                </View>

                {/* Box 6: Reach */}
                <View style={styles.instaMetricBox}>
                  <Text style={styles.instaMetricLabel}>Reach</Text>
                  <Text style={styles.instaMetricVal}>44K accounts</Text>
                  <Text style={styles.instaMetricSub}>This Month</Text>
                </View>
              </View>

            </BlurView>
          </LinearGradient>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const bulletDot = {
  color: '#60A5FA',
  fontSize: 14,
  marginRight: 6,
  marginTop: 1,
};

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

  /* Demographics 3-Column Side-by-Side Row Layout */
  demographicsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  tripletCardWrapper: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardBlurContentSmall: {
    padding: 16,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  demoValueSmall: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 6,
  },

  /* Gallery Layout matching Screenshot */
  galleryScrollContainer: {
    paddingRight: 10,
    gap: 12,
  },
  galleryCardItem: {
    width: 105,
    height: 130,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  galleryCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  galleryCardGradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  galleryCardLabelText: {
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#ffffff',
  },

  /* Work Experience & Training Specifics */
  experienceBlock: {
    marginVertical: 4,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  expRoleTitle: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  expBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginBottom: 8,
  },
  bulletDotText: {
    color: '#60A5FA',
    fontSize: 14,
    marginRight: 6,
    marginTop: 1,
  },
  expBulletText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Book',
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: 22,
  },
  institutionText: {
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#60A5FA',
    marginTop: 2,
  },

  /* Instagram Insights Layout */
  socialHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  socialLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  socialHandle: {
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
  },
  socialSubText: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 1,
  },
  /* Instagram Insights 2-Column Side-by-Side Rows (100% Screenshot Replica) */
  instaHeaderRow: {
    marginBottom: 16,
  },
  instaHeaderTitle: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  instaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  instaMetricBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 16,
    paddingVertical: 18,
  },
  instaMetricLabel: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#ffffff',
  },
  instaMetricVal: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 14,
    marginBottom: 6,
  },
  instaMetricSub: {
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Book',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  reelsGridContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  reelThumbnailCard: {
    flex: 1,
    height: 110,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  reelImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playIconBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginVertical: 12,
  },
});
