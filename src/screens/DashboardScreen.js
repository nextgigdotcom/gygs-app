import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  StatusBar,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40 - 14) / 2; // 2-column grid with 20px padding and 14px gap

export default function DashboardScreen({ onNavigateBrowse }) {
  const [chatInput, setChatInput] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Main Content Area */}
      <View style={styles.content}>
        
        {/* 1. Top Header Navigation (Grid Icon Left, Menu Icon Right) */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8} style={styles.headerIconBtn}>
            <Ionicons name="grid-outline" size={22} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.headerMenuBtn}>
            <Ionicons name="menu-outline" size={26} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* 2. Welcome Title */}
        <Text style={styles.welcomeTitle}>Welcome back, Akash</Text>

        {/* 3. 2x2 Dashboard Cards Grid */}
        <View style={styles.gridContainer}>
          
          {/* Card 1: TOTAL EARNINGS */}
          <View style={styles.card}>
            <Text style={styles.cardHeaderLabel}>TOTAL EARNINGS</Text>
            <View style={styles.cardBottomContent}>
              <Text style={styles.earningsValue}>₹0</Text>
            </View>
          </View>

          {/* Card 2: UP NEXT */}
          <View style={styles.card}>
            <Text style={styles.cardHeaderLabel}>UP NEXT</Text>
            <View style={styles.upNextBody}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateMonthText}>AUG</Text>
                <Text style={styles.dateDayText}>12</Text>
              </View>
              <Text style={styles.upNextSubtext}>Your calendar is clear</Text>
            </View>
          </View>

          {/* Card 3: BROWSE GYGS (Interactive -> Navigates to Browse Gygs Page) */}
          <TouchableOpacity 
            activeOpacity={0.85}
            onPress={onNavigateBrowse}
            style={[styles.card, styles.browseCardHighlight]}
          >
            <Text style={styles.cardHeaderLabel}>BROWSE</Text>
            <View style={styles.browseDotsRow}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <Text style={styles.browseTitle}>Gygs</Text>
          </TouchableOpacity>

          {/* Card 4: MY PROFILE */}
          <View style={styles.card}>
            <Text style={styles.cardHeaderLabel}>MY PROFILE</Text>
            <View style={styles.profileRow}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>A</Text>
              </View>
              <Text style={styles.profileNameText} numberOfLines={2}>
                Akash Tiwari
              </Text>
            </View>
          </View>

        </View>

      </View>

      {/* 4. Bottom AI Chat Input Bar */}
      <View style={styles.bottomBarWrapper}>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="attach" size={22} color="#888888" />
          </TouchableOpacity>

          <TextInput
            placeholder="Create an"
            placeholderTextColor="#666666"
            value={chatInput}
            onChangeText={setChatInput}
            style={styles.chatInputText}
          />

          <TouchableOpacity style={styles.micBtn}>
            <Ionicons name="mic" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMenuBtn: {
    padding: 6,
  },
  welcomeTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'AirbnbCereal-Bold',
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  card: {
    width: cardWidth,
    height: 165,
    borderRadius: 22,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    justifyContent: 'space-between',
  },
  browseCardHighlight: {
    borderColor: 'rgba(29, 78, 216, 0.4)',
    backgroundColor: 'rgba(18, 18, 18, 0.95)',
  },
  cardHeaderLabel: {
    color: '#888888',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    letterSpacing: 0.8,
  },
  earningsValue: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'AirbnbCereal-Bold',
  },
  upNextBody: {
    flex: 1,
    justifyContent: 'center',
  },
  dateBadge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(29, 78, 216, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(29, 78, 216, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dateMonthText: {
    color: '#60A5FA',
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
  },
  dateDayText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    marginTop: -2,
  },
  upNextSubtext: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
  },
  browseDotsRow: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
    marginBottom: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#444444',
  },
  dotActive: {
    backgroundColor: '#1D4ED8',
    width: 14,
  },
  browseTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'AirbnbCereal-Bold',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  profileAvatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
  },
  profileNameText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'AirbnbCereal-Bold',
    flex: 1,
    lineHeight: 20,
  },
  bottomBarWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderRadius: 28,
    height: 54,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  attachBtn: {
    marginRight: 10,
  },
  chatInputText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Book',
  },
  micBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
