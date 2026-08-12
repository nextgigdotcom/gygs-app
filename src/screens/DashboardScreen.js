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
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Luminous White Ambient Background Glows */}
      <View style={styles.ambientGlowTopRight} pointerEvents="none" />
      <View style={styles.ambientGlowBottomLeft} pointerEvents="none" />

      {/* Main Content Container */}
      <View style={styles.content}>
        
        {/* Top Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8} style={styles.appGridWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.04)']}
              style={styles.appGridGradient}
            >
              <BlurView intensity={40} tint="dark" style={styles.appGridBlur}>
                <Ionicons name="grid-outline" size={22} color="#ffffff" />
              </BlurView>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.menuBtn}>
            <Ionicons name="menu-outline" size={28} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Welcome Header */}
        <Text style={styles.welcomeTitle}>Welcome back, Akash</Text>

        {/* 2x2 Grid of White Liquid Glass Cards */}
        <View style={styles.gridContainer}>
          
          {/* Card 1: TOTAL EARNINGS */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.cardGradient}
            >
              <BlurView intensity={45} tint="dark" style={styles.cardBlur}>
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
              colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.cardGradient}
            >
              <BlurView intensity={45} tint="dark" style={styles.cardBlur}>
                <Text style={styles.cardHeaderLabel}>UP NEXT</Text>
                <View style={styles.upNextSection}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.06)']}
                    style={styles.dateBadgeGradient}
                  >
                    <Text style={styles.dateMonthText}>AUG</Text>
                    <Text style={styles.dateDayText}>12</Text>
                  </LinearGradient>
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
              colors={['rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.05)']}
              style={[styles.cardGradient, styles.browseCardBorder]}
            >
              <BlurView intensity={50} tint="dark" style={styles.cardBlur}>
                <Text style={styles.cardHeaderLabel}>BROWSE</Text>
                <View style={styles.browseSection}>
                  <View style={styles.dotsRow}>
                    <View style={[styles.dot, styles.dotWhite]} />
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
              colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.cardGradient}
            >
              <BlurView intensity={45} tint="dark" style={styles.cardBlur}>
                <Text style={styles.cardHeaderLabel}>MY PROFILE</Text>
                <View style={styles.profileSection}>
                  <LinearGradient
                    colors={['#ffffff', '#d4d4d4']}
                    style={styles.profileAvatar}
                  >
                    <Text style={styles.profileAvatarText}>A</Text>
                  </LinearGradient>
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

      {/* Bottom Fixed White Liquid Glass AI Input Bar */}
      <View style={styles.bottomBarContainer}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.04)']}
          style={styles.bottomBarGradient}
        >
          <BlurView intensity={50} tint="dark" style={styles.bottomBarBlur}>
            <TouchableOpacity activeOpacity={0.7} style={styles.attachBtn}>
              <Ionicons name="attach" size={24} color="#888888" />
            </TouchableOpacity>

            <TextInput
              placeholder="Create an"
              placeholderTextColor="#666666"
              value={chatInput}
              onChangeText={setChatInput}
              style={styles.inputField}
            />

            <TouchableOpacity activeOpacity={0.8} style={styles.micBtnWrapper}>
              <LinearGradient
                colors={['#ffffff', '#e5e5e5']}
                style={styles.micBtn}
              >
                <Ionicons name="mic" size={18} color="#000000" />
              </LinearGradient>
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
    backgroundColor: '#000000',
  },
  ambientGlowTopRight: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    filter: 'blur(70px)',
  },
  ambientGlowBottomLeft: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    filter: 'blur(70px)',
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
  appGridWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  appGridGradient: {
    borderRadius: 16,
    padding: 1,
  },
  appGridBlur: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
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
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  browseCardBorder: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardBlur: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    justifyContent: 'space-between',
  },
  cardHeaderLabel: {
    color: '#888888',
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
  dateBadgeGradient: {
    width: 54,
    height: 54,
    borderRadius: 16,
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
  },
  dateDayText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    marginTop: -2,
  },
  calendarSubtext: {
    color: '#888888',
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
    backgroundColor: '#444444',
  },
  dotWhite: {
    backgroundColor: '#ffffff',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarText: {
    color: '#000000',
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
    borderColor: 'rgba(255, 255, 255, 0.14)',
    overflow: 'hidden',
  },
  bottomBarBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 30,
    height: 56,
    paddingHorizontal: 16,
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
  micBtnWrapper: {
    marginLeft: 10,
    borderRadius: 19,
    overflow: 'hidden',
  },
  micBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
