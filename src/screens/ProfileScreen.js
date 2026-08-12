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
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileScreen({ onBackHome }) {
  const artistTypes = ['Solo Vocalist', 'Acoustic Performer'];
  const categories = ['Bollywood', 'Classical', 'Commercial', 'Acoustic'];

  const handleCopyShareLink = () => {
    Alert.alert('Profile Link Copied!', 'https://gygs.in/artist/profile/akashtiwari has been copied to your clipboard.');
  };

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
        
        {/* 1. Production Artist Header Card */}
        <View style={styles.heroCardWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.04)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCardGradient}
          >
            <BlurView intensity={50} tint="dark" style={styles.heroCardContent}>
              
              {/* Header Info Row */}
              <View style={styles.headerInfoRow}>
                <View style={styles.headerLeftCol}>
                  <View style={styles.nameRow}>
                    <Text style={styles.userNameText}>Akash Tiwari</Text>
                    <Ionicons name="checkmark-circle" size={18} color="#10B981" style={{ marginLeft: 6 }} />
                  </View>
                  <Text style={styles.userRoleSubtitle}>Verified Artist</Text>
                </View>

                <View style={styles.headerRightCol}>
                  <Text style={styles.userPhoneText}>+91 98765 43210</Text>
                  <Text style={styles.userEmailText}>akashtiwari@gygs.in</Text>
                </View>
              </View>

              {/* Share Profile Action Bar */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleCopyShareLink}
                style={styles.shareProfileBar}
              >
                <Text style={styles.shareProfileBarText}>Share Profile</Text>
                <Ionicons name="open-outline" size={14} color="#ffffff" />
              </TouchableOpacity>

            </BlurView>
          </LinearGradient>
        </View>

        {/* 2. Artist Type & Categories Double Cards Row */}
        <View style={styles.doubleCardRow}>
          
          {/* Card A: Artist Type */}
          <View style={styles.doubleCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.doubleCardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.doubleCardContent}>
                <View style={styles.cardEditHeader}>
                  <Text style={styles.cardHeaderLabel}>ARTIST TYPE</Text>
                  <Ionicons name="create-outline" size={14} color="#888888" />
                </View>
                <View style={styles.chipRow}>
                  {artistTypes.map((type, i) => (
                    <View key={i} style={styles.categoryChip}>
                      <Text style={styles.categoryChipText}>{type}</Text>
                    </View>
                  ))}
                </View>
              </BlurView>
            </LinearGradient>
          </View>

          {/* Card B: Categories */}
          <View style={styles.doubleCardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.doubleCardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.doubleCardContent}>
                <View style={styles.cardEditHeader}>
                  <Text style={styles.cardHeaderLabel}>CATEGORIES</Text>
                  <Ionicons name="create-outline" size={14} color="#888888" />
                </View>
                <View style={styles.chipRow}>
                  {categories.map((cat, i) => (
                    <View key={i} style={styles.categoryChip}>
                      <Text style={styles.categoryChipText}>{cat}</Text>
                    </View>
                  ))}
                </View>
              </BlurView>
            </LinearGradient>
          </View>

        </View>

        {/* 3. About & Bio Section */}
        <View style={styles.sectionWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.sectionContent}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionHeading}>ABOUT ME</Text>
                <Ionicons name="create-outline" size={14} color="#888888" />
              </View>
              <Text style={styles.bioText}>
                Passionate vocalist and music producer with over 5 years of live performance experience across Bollywood, Acoustic, and Commercial music sets.
              </Text>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 4. Performance Fees & Show Rates */}
        <View style={styles.sectionWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.sectionContent}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionHeading}>SHOW RATES</Text>
                <Ionicons name="create-outline" size={14} color="#888888" />
              </View>

              <View style={styles.rateCardRow}>
                <View>
                  <Text style={styles.rateTitle}>Standard Live Performance</Text>
                  <Text style={styles.rateSubtitle}>2-Hour set with PA sound setup</Text>
                </View>
                <Text style={styles.rateAmount}>₹15,000</Text>
              </View>
            </BlurView>
          </LinearGradient>
        </View>

        {/* 5. Connected Social Accounts */}
        <View style={styles.sectionWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionGradient}
          >
            <BlurView intensity={40} tint="dark" style={styles.sectionContent}>
              <Text style={styles.sectionHeading}>CONNECTED ACCOUNTS</Text>

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
    fontSize: 18,
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
  heroCardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
  },
  heroCardGradient: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  heroCardContent: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  headerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeftCol: {
    flex: 1,
    paddingRight: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 24,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
    fontWeight: '700',
  },
  userRoleSubtitle: {
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#60A5FA',
    marginTop: 2,
  },
  headerRightCol: {
    alignItems: 'flex-end',
  },
  userPhoneText: {
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#ffffff',
  },
  userEmailText: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    color: '#888888',
    marginTop: 2,
  },
  shareProfileBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1D4ED8',
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 4,
  },
  shareProfileBarText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  doubleCardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  doubleCardWrapper: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  doubleCardGradient: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  doubleCardContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  cardEditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderLabel: {
    color: '#888888',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  categoryChip: {
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(29, 78, 216, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  categoryChipText: {
    color: '#60A5FA',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Medium',
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeading: {
    color: '#888888',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Book',
    color: '#d4d4d4',
    lineHeight: 22,
  },
  rateCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateTitle: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
  },
  rateSubtitle: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    color: '#888888',
    marginTop: 2,
  },
  rateAmount: {
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
});
