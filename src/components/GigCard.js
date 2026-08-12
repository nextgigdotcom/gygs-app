import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';

const KNOWN_STATES_COUNTRIES = [
  'india', 'maharashtra', 'karnataka', 'rajasthan', 'delhi', 'tamil nadu', 
  'telangana', 'gujarat', 'uttar pradesh', 'west bengal', 'kerala', 'punjab', 'ncr'
];

export function getCityOnly(locationString) {
  if (!locationString) return 'Not Specified';
  
  const parts = locationString.split(',').map(p => p.trim()).filter(Boolean);
  if (parts.length === 0) return 'Not Specified';
  
  const cleanParts = parts.filter(p => !KNOWN_STATES_COUNTRIES.includes(p.toLowerCase()));
  
  if (cleanParts.length > 0) {
    return cleanParts[cleanParts.length - 1];
  }

  return parts[0];
}

export function formatDateConcise(eventDates) {
  if (!eventDates) return '';
  
  let rawStr = '';
  if (Array.isArray(eventDates)) {
    if (eventDates.length === 0) return '';
    if (eventDates.length === 1) {
      rawStr = eventDates[0];
    } else {
      const firstParts = eventDates[0].replace(/\b20\d{2}\b/g, '').trim().split(/\s+/);
      const lastParts = eventDates[eventDates.length - 1].replace(/\b20\d{2}\b/g, '').trim().split(/\s+/);
      
      const day1 = firstParts[0];
      const day2 = lastParts[0];
      const month = lastParts[1] || firstParts[1] || '';
      
      if (day1 && day2 && month && day1 !== day2) {
        return `${day1} - ${day2} ${month}`.trim();
      }
      return `${firstParts.join(' ')} - ${lastParts.join(' ')}`.trim();
    }
  } else {
    rawStr = String(eventDates);
  }

  let clean = rawStr.replace(/\b20\d{2}\b/g, '').trim();

  const rangeMatch = clean.match(/^(\d{1,2})\s+([A-Za-z]{3,9})\s*[-–—]\s*(\d{1,2})\s+([A-Za-z]{3,9})$/);
  if (rangeMatch) {
    const [, d1, m1, d2, m2] = rangeMatch;
    if (m1.toLowerCase() === m2.toLowerCase()) {
      return `${d1} - ${d2} ${m1}`;
    }
  }

  return clean.replace(/\s+/g, ' ').trim();
}

export function currencyConverter(budget) {
  if (!budget) return '0';
  return budget.toLocaleString('en-IN');
}

export function timeAgo(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${Math.max(1, seconds)}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export default function GigCard({ gig, onPress, onWithdraw, onContact }) {
  const isClosed = !gig.active;
  const status = gig.application?.application_status;

  const categoriesList = [
    ...(Array.isArray(gig.gig_type) ? gig.gig_type : [gig.gig_type]),
    ...(gig.categories || [])
  ].filter(Boolean);

  const employerName = gig.added_by_name || gig.added_by || 'Employer';
  const employerInitial = employerName.charAt(0).toUpperCase();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress && onPress(gig)}
      style={styles.cardWrapper}
    >
      <BlurView intensity={45} tint="dark" style={styles.card}>
        
        {/* 1. Job Title (18px, 600 weight, #FFFFFF) */}
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={2}>{gig.title}</Text>
          {isClosed && (
            <Text style={styles.closedText}>Closed</Text>
          )}
        </View>

        {/* 2. Single Category Tag Badge (White Translucent Liquid Glass Fill & Crisp #FFFFFF Text) */}
        {categoriesList.length > 0 && (
          <View style={styles.categoryContainer}>
            {categoriesList.slice(0, 1).map((cat, idx) => (
              <View key={idx} style={styles.categoryGlassPill}>
                <Text style={styles.categoryGlassPillText}>{cat}</Text>
              </View>
            ))}
          </View>
        )}

        {/* 3. Details Row: Location/Date & Price */}
        <View style={styles.detailsRow}>
          <View style={styles.detailsLeft}>
            {gig.event_location && (
              <View style={styles.infoLine}>
                <Ionicons name="location-outline" size={14} color="#929292" style={styles.infoIcon} />
                <Text style={styles.infoText} numberOfLines={1}>
                  {getCityOnly(gig.event_location)}
                </Text>
              </View>
            )}
            {gig.event_dates && (
              <View style={styles.infoLine}>
                <Ionicons name="calendar-outline" size={14} color="#929292" style={styles.infoIcon} />
                <Text style={styles.infoText} numberOfLines={1}>
                  {formatDateConcise(gig.event_dates)}
                </Text>
              </View>
            )}
          </View>

          {/* Price / Earnings Display */}
          <View style={styles.earningsContainer}>
            <Text style={styles.earningsLabel}>
              Earn{gig.gig_duration_type === 1 ? ' per month' : ''}
            </Text>
            <Text style={styles.earningsValue}>
              ₹{currencyConverter(gig.budget)}
            </Text>
          </View>
        </View>

        {/* Single Thin Glass Divider Line */}
        <View style={styles.dividerLine} />

        {/* Footer Section: 2-Line Employer Name Layout */}
        <View style={styles.footerRow}>
          <View style={styles.postedByContainer}>
            <View style={styles.employerAvatar}>
              <Text style={styles.employerAvatarText}>{employerInitial}</Text>
            </View>
            <Text 
              style={styles.employerNameText} 
              numberOfLines={2}
            >
              {employerName}
            </Text>
          </View>

          <Text style={styles.postedDateText}>
            Posted {timeAgo(gig.created_at)}
          </Text>
        </View>

        {/* Application Status Action Items */}
        {status && (
          <View style={styles.actionsContainer}>
            {(status === 'APPLIED' || status === 'MAYBE') && !isClosed && (
              <TouchableOpacity
                onPress={() => onWithdraw && onWithdraw(gig)}
                style={styles.buttonWithdraw}
              >
                <Text style={styles.buttonTextWithdraw}>Withdraw Application</Text>
              </TouchableOpacity>
            )}

            {status === 'SHORTLISTED' && !isClosed && (
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  onPress={() => onContact && onContact(gig, 'whatsapp')}
                  style={[styles.buttonGreen, { marginRight: 8 }]}
                >
                  <Ionicons name="logo-whatsapp" size={14} color="#ffffff" style={styles.buttonIcon} />
                  <Text style={styles.buttonTextWhite}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onContact && onContact(gig, 'call')}
                  style={styles.buttonGreen}
                >
                  <Ionicons name="call" size={14} color="#ffffff" style={styles.buttonIcon} />
                  <Text style={styles.buttonTextWhite}>Call</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 14,
    borderRadius: 24,
    overflow: 'hidden',
  },
  card: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    paddingRight: 8,
    lineHeight: 25,
  },
  closedText: {
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ef4444',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryGlassPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)', // White Translucent Glass fill
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)', // White Specular Glass border
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  categoryGlassPillText: {
    color: '#FFFFFF', // Crisp White Text
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Medium',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailsLeft: {
    flex: 1,
    paddingRight: 12,
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoIcon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#929292',
    fontFamily: 'AirbnbCereal-Book',
    lineHeight: 20,
    flex: 1,
  },
  earningsContainer: {
    alignItems: 'flex-end',
  },
  earningsLabel: {
    fontSize: 12,
    color: '#929292',
    marginBottom: 2,
    fontFamily: 'AirbnbCereal-Medium',
  },
  earningsValue: {
    fontSize: 22,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dividerLine: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 14,
    width: '100%',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  employerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    flexShrink: 0,
  },
  employerAvatarText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  employerNameText: {
    fontSize: 14,
    color: '#929292',
    fontFamily: 'AirbnbCereal-Book',
    lineHeight: 18,
    flex: 1,
  },
  postedDateText: {
    fontSize: 14,
    color: '#929292',
    fontFamily: 'AirbnbCereal-Book',
    flexShrink: 0,
  },
  actionsContainer: {
    marginTop: 14,
    gap: 8,
  },
  buttonWithdraw: {
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  buttonTextWithdraw: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGreen: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonTextWhite: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
});
