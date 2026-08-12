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
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40 - 16) / 2; 

export default function DashboardScreen({ onNavigateBrowse }) {
  const [chatInput, setChatInput] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />

      {/* Main Content Area */}
      <View style={styles.content}>
        
        {/* Top Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8} style={styles.appGridBtnWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.04)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.appGridBtn}
            >
              <Ionicons name="grid-outline" size={22} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.menuBtn}>
            <Ionicons name="menu-outline" size={28} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Welcome Header */}
        <Text style={styles.welcomeTitle}>Welcome back, Akash</Text>

        {/* 2x2 Grid of Liquid White Glass Gradient Cards */}
        <View style={styles.gridContainer}>
          
          {/* Card 1: TOTAL EARNINGS */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardContent}>
                <Text style={styles.cardHeaderLabel}>TOTAL EARNINGS</Text>
                <View style={styles.cardBottomSection}>
                  <Text style={styles.earningsValue}>₹0</Text>
                </View>
              </BlurView>
            </LinearGradient>
          </View>

          {/* Card 2: UP NEXT */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardContent}>
                <Text style={styles.cardHeaderLabel}>UP NEXT</Text>
                <View style={styles.upNextSection}>
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateMonthText}>AUG</Text>
                    <Text style={styles.dateDayText}>12</Text>
                  </View>
                  <Text style={styles.calendarSubtext}>Your calendar is clear</Text>
                </View>
              </BlurView>
            </LinearGradient>
          </View>

          {/* Card 3: BROWSE GYGS (Interactive -> Navigates to Browse Gygs Screen) */}
          <TouchableOpacity 
            activeOpacity={0.85}
            onPress={onNavigateBrowse}
            style={styles.cardWrapper}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.22)', 'rgba(255, 255, 255, 0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.cardGradient, styles.browseCardBorder]}
            >
              <BlurView intensity={50} tint="dark" style={styles.cardContent}>
                <Text style={styles.cardHeaderLabel}>BROWSE</Text>
                <View style={styles.browseSection}>
                  <View style={styles.dotsRow}>
                    <View style={[styles.dot, styles.dotWhiteGlow]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                  </View>
                  <Text style={styles.browseTitle}>Gygs</Text>
                </View>
              </BlurView>
            </LinearGradient>
          </TouchableOpacity>

          {/* Card 4: MY PROFILE */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.cardContent}>
                <Text style={styles.cardHeaderLabel}>MY PROFILE</Text>
                <View style={styles.profileSection}>
                  <View style={styles.profileAvatar}>
                    <Text style={styles.profileAvatarText}>A</Text>
                  </View>
                  <View style={styles.profileNameContainer}>
                    <Text style={styles.profileNameText} numberOfLines={2}>
                      Akash{'\n'}Tiwari
                    </Text>
                  </View>
                </View>
              </BlurView>
            </LinearGradient>
          </View>

        </View>

      </View>

      {/* Bottom Fixed AI Input Bar */}
      <View style={styles.bottomBarContainer}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.04)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bottomBarGradient}
        >
          <BlurView intensity={40} tint="dark" style={styles.bottomBarContent}>
            <TouchableOpacity activeOpacity={0.7} style={styles.attachBtn}>
              <Ionicons name="attach" size={24} color="#888888" />
            </TouchableOpacity>

            <TextInput
              placeholder="Create an"
              placeholderTextColor="#777777"
              value={chatInput}
              onChangeText={setChatInput}
              style={styles.inputField}
            />

            <TouchableOpacity activeOpacity={0.8} style={styles.micBtn}>
              <Ionicons name="mic" size={18} color="#ffffff" />
            </TouchableOpacity>
          </BlurView>
        </LinearGradient>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
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
    marginBottom: 32,
  },
  appGridBtnWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  appGridBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBtn: {
    padding: 6,
  },
  welcomeTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: -0.6,
    marginBottom: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  cardWrapper: {
    width: cardWidth,
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  browseCardBorder: {
    borderColor: 'rgba(255, 255, 255, 0.28)',
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  cardHeaderLabel: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  cardBottomSection: {
    justifyContent: 'flex-end',
  },
  earningsValue: {
    color: '#ffffff',
    fontSize: 34,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  upNextSection: {
    justifyContent: 'flex-end',
  },
  dateBadge: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  dateMonthText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: 0.5,
    opacity: 0.8,
  },
  dateDayText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    marginTop: -2,
  },
  calendarSubtext: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Book',
  },
  browseSection: {
    justifyContent: 'flex-end',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  dotWhiteGlow: {
    backgroundColor: '#ffffff',
    width: 16,
  },
  browseTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  profileNameContainer: {
    flex: 1,
  },
  profileNameText: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    lineHeight: 22,
  },
  bottomBarContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  bottomBarGradient: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    overflow: 'hidden',
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  attachBtn: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Book',
  },
  micBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
