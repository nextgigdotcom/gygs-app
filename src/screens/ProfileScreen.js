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
  const jobTypes = ['Solo Vocalist', 'Acoustic Performer', 'Music Producer'];
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

        <View style={{ width: 36 }} />
      </View>

      {/* Global Canvas: Deep Black Background #0A0A0A & >40px Bottom Padding */}
      <ScrollView 
        style={styles.canvasScrollView} 
        contentContainerStyle={styles.canvasContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* SECTION 1: The Header Card */}
        <View style={styles.masterCard}>
          {/* Top Row: Flex row space-between */}
          <View style={styles.headerTopRow}>
            <Text style={styles.nameText}>Akash Tiwari</Text>

            <View style={styles.contactStack}>
              <Text style={styles.contactText}>+91 98765 43210</Text>
              <Text style={styles.contactText}>akashtiwari@gygs.in</Text>
            </View>
          </View>

          {/* Bottom Row: Full-width Solid Royal Blue Share Profile Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleShareProfile}
            style={styles.shareProfileButton}
          >
            <Text style={styles.shareProfileButtonText}>Share Profile</Text>
            <Ionicons name="open-outline" size={14} color="#ffffff" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        {/* SECTION 2: Tag-Based Card - Job Type (Full-Width, Stacked Vertically) */}
        <View style={styles.masterCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Job Type</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="create-outline" size={16} color="#929292" />
            </TouchableOpacity>
          </View>

          <View style={styles.tagContainer}>
            {jobTypes.map((type, idx) => (
              <View key={idx} style={styles.tagPill}>
                <Text style={styles.tagPillText}>{type}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* SECTION 3: Tag-Based Card - Categories (Full-Width, Stacked Vertically) */}
        <View style={styles.masterCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Categories</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="create-outline" size={16} color="#929292" />
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

        {/* SECTION 4: The Gallery Card */}
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
              <Ionicons name="image-outline" size={24} color="#555555" />
            </View>
            <View style={styles.galleryImageBlock}>
              <Ionicons name="image-outline" size={24} color="#555555" />
            </View>
            <View style={styles.galleryImageBlock}>
              <Ionicons name="image-outline" size={24} color="#555555" />
            </View>
          </ScrollView>
        </View>

        {/* SECTION 5: Demographics Grid (Age, Height, Gender - 2-Column Grid) */}
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
  
  /* Reusable Master Card Style */
  masterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },

  /* Header Card Specifics */
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 22,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contactStack: {
    alignItems: 'flex-end',
  },
  contactText: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    color: '#929292',
    textAlign: 'right',
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
    gap: 8,
  },
  tagPill: {
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
    borderWidth: 1,
    borderColor: '#1D4ED8',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagPillText: {
    color: '#60A5FA',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Medium',
    fontWeight: '600',
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
});
