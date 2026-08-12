import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  ScrollView, 
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MOCK_GIGS } from '../data/mockGigs';
import GigCard, { currencyConverter } from '../components/GigCard';

// Exact User Category Bar List
const CATEGORIES = ['All', 'Dance', 'Acting', 'Yoga', 'Fitness', 'Video Editor', 'Videographer'];

export default function BrowseScreen({ onBackHome }) {
  const [gigs, setGigs] = useState(MOCK_GIGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGigModal, setSelectedGigModal] = useState(null);

  const activeGigsCount = useMemo(() => {
    return gigs.filter((g) => g.active).length;
  }, [gigs]);

  // Global filtering model: Filter by search query AND active category pill
  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) => {
      // Category filter check
      const matchesCategory = selectedCategory === 'All' || 
        (gig.gig_type && gig.gig_type.toLowerCase().includes(selectedCategory.toLowerCase())) ||
        (gig.categories && gig.categories.some(c => c.toLowerCase().includes(selectedCategory.toLowerCase())));
      
      // Search query check
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query ||
        gig.title.toLowerCase().includes(query) ||
        (gig.event_location || '').toLowerCase().includes(query) ||
        (gig.gig_type || '').toLowerCase().includes(query) ||
        (gig.added_by_name || gig.added_by || '').toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [gigs, searchQuery, selectedCategory]);

  const handleWithdraw = (gig) => {
    setGigs((prev) =>
      prev.map((item) =>
        item._id === gig._id
          ? { ...item, application: null }
          : item
      )
    );
    if (selectedGigModal && selectedGigModal._id === gig._id) {
      setSelectedGigModal((prev) => ({ ...prev, application: null }));
    }
  };

  const handleContact = (gig, method) => {
    alert(`Initiating ${method === 'whatsapp' ? 'WhatsApp message' : 'phone call'} to ${gig.added_by_name || 'Contractor'}...`);
  };

  const handleApply = (gig) => {
    setGigs((prev) =>
      prev.map((item) =>
        item._id === gig._id
          ? { ...item, application: { application_id: 'app_' + Date.now(), application_status: 'APPLIED' } }
          : item
      )
    );
    if (selectedGigModal && selectedGigModal._id === gig._id) {
      setSelectedGigModal((prev) => ({
        ...prev,
        application: { application_id: 'app_' + Date.now(), application_status: 'APPLIED' },
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBackHome}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#d7d7d7" />
        </TouchableOpacity>

        {/* Pixel-Perfect Flush Left Aligned Title & Subtitle Container */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Gygs Near Me</Text>
          <Text style={styles.headerSubtitle}>{activeGigsCount} active available</Text>
        </View>
      </View>

      {/* Glass Search Bar Container */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#888888"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search by title, location, skill..."
          placeholderTextColor="#888888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#888888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter Bar with Deep Royal Blue #1D4ED8 Active Fill */}
      <View style={styles.categoryBarContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryBarScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.categoryPill,
                  isSelected ? styles.categoryPillActive : styles.categoryPillInactive
                ]}
              >
                <Text style={isSelected ? styles.categoryPillActiveText : styles.categoryPillInactiveText}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Feed List of Glass Gygs */}
      {filteredGigs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={64} color="#888888" />
          <Text style={styles.emptyTitle}>No Gygs Found</Text>
          <Text style={styles.emptySubtitle}>
            Try modifying your search query or selecting a different category filter.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredGigs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <GigCard
              gig={item}
              onPress={(gig) => setSelectedGigModal(gig)}
              onWithdraw={handleWithdraw}
              onContact={handleContact}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Glassmorphism Gig Details Modal Sheet */}
      {selectedGigModal && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedGigModal(null)}
        >
          <View style={styles.modalOverlay}>
            <BlurView intensity={40} tint="dark" style={styles.modalContent}>
              
              {/* Modal Header */}
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeaderTitle} numberOfLines={1}>
                  Gig Details
                </Text>
                <TouchableOpacity 
                  onPress={() => setSelectedGigModal(null)}
                  style={styles.closeBtn}
                >
                  <Ionicons name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                <Text style={styles.modalGigTitle}>{selectedGigModal.title}</Text>
                
                {selectedGigModal.categories && (
                  <View style={styles.modalCategoryRow}>
                    {[selectedGigModal.gig_type, ...selectedGigModal.categories].filter(Boolean).map((cat, i) => (
                      <View key={i} style={styles.modalGlassPill}>
                        <Text style={styles.modalGlassPillText}>{cat}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.modalEarningsCard}>
                  <Text style={styles.modalEarningsLabel}>Offered Pay</Text>
                  <Text style={styles.modalEarningsValue}>
                    ₹{currencyConverter(selectedGigModal.budget)}
                  </Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionHeading}>Location & Venue</Text>
                  <View style={styles.modalInfoRow}>
                    <Ionicons name="location-outline" size={16} color="#a3a3a3" />
                    <Text style={styles.modalInfoText}>
                      {selectedGigModal.event_location || 'Location upon shortlist'}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionHeading}>Schedule & Dates</Text>
                  <View style={styles.modalInfoRow}>
                    <Ionicons name="calendar-outline" size={16} color="#a3a3a3" />
                    <Text style={styles.modalInfoText}>
                      {Array.isArray(selectedGigModal.event_dates) 
                        ? selectedGigModal.event_dates.join(', ') 
                        : selectedGigModal.event_dates}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionHeading}>Overview</Text>
                  <Text style={styles.modalDescText}>
                    {selectedGigModal.description}
                  </Text>
                </View>
              </ScrollView>

              {/* Action Button */}
              <View style={styles.modalFooter}>
                {selectedGigModal.application?.application_status ? (
                  <TouchableOpacity
                    onPress={() => handleWithdraw(selectedGigModal)}
                    style={styles.modalWithdrawBtn}
                  >
                    <Text style={styles.modalWithdrawText}>Withdraw Application</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleApply(selectedGigModal)}
                    style={styles.modalApplyBtn}
                  >
                    <Text style={styles.modalApplyText}>Submit Portfolio Application</Text>
                  </TouchableOpacity>
                )}
              </View>

            </BlurView>
          </View>
        </Modal>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
    letterSpacing: 0,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 0,
    marginLeft: 0,
    includeFontPadding: false,
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 4,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#888888',
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 0,
    marginLeft: 0,
    includeFontPadding: false,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
    color: '#ffffff',
    fontFamily: 'AirbnbCereal-Book',
  },
  categoryBarContainer: {
    marginVertical: 10,
  },
  categoryBarScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  categoryPillInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryPillInactiveText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Medium',
  },
  categoryPillActive: {
    backgroundColor: '#1D4ED8',
    borderWidth: 0,
  },
  categoryPillActiveText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Bold',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    marginTop: 16,
    color: '#ffffff',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    color: '#888888',
    fontFamily: 'AirbnbCereal-Book',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingTop: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeaderTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
  },
  closeBtn: {
    padding: 4,
  },
  modalBody: {
    marginBottom: 16,
  },
  modalGigTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'AirbnbCereal-Bold',
    marginBottom: 10,
    lineHeight: 28,
  },
  modalCategoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  modalGlassPill: {
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(29, 78, 216, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  modalGlassPillText: {
    color: '#60A5FA',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
  },
  modalEarningsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  modalEarningsLabel: {
    color: '#888888',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'AirbnbCereal-Medium',
  },
  modalEarningsValue: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'AirbnbCereal-Bold',
    marginTop: 4,
  },
  modalSection: {
    marginBottom: 18,
  },
  modalSectionHeading: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Bold',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  modalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalInfoText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Book',
  },
  modalDescText: {
    color: '#d4d4d4',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Book',
    lineHeight: 22,
  },
  modalFooter: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalApplyBtn: {
    backgroundColor: '#1D4ED8',
    borderWidth: 0,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalApplyText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
  },
  modalWithdrawBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalWithdrawText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
  },
});
