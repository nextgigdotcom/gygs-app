import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Alert,
  Dimensions,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const GALLERY_GAP = 8;
const GALLERY_PADDING = 80; // 20 canvas left + 20 canvas right + 20 card left + 20 card right
const GALLERY_CARD_WIDTH = Math.floor((width - GALLERY_PADDING - (GALLERY_GAP * 2)) / 3);
const GALLERY_CARD_HEIGHT = Math.round(GALLERY_CARD_WIDTH * (16 / 9));
const GALLERY_PAGE_STEP = (GALLERY_CARD_WIDTH + GALLERY_GAP) * 3;

const SAMPLE_PHOTO_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509670811275-79453d576390?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop',
];

const SAMPLE_VIDEO_PRESETS = [
  'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop',
];

const SUGGESTED_ARTIST_TYPES = ['Dance', 'Yoga', 'Fitness', 'Acting', 'Video Editor', 'Videographer'];

const WORK_EXPERIENCE_CATEGORIES = [
  'Music Videos',
  'Films',
  'Series',
  'Advertisement',
  'Workshops & Classes',
  'Shows & Events',
  'Theatre',
  'Weddings & Sangeets',
  'Social Media',
];

const ARTIST_TYPE_CATEGORIES_MAP = {
  'Dance': ['Performer', 'Choreographer', 'Digital Creator', 'Trainer'],
  'Yoga': ['Performer', 'Choreographer', 'Digital Creator', 'Trainer'],
  'Acting': ['Performer', 'Digital Creator', 'Trainer'],
  'Fitness': ['Performer', 'Digital Creator', 'Trainer'],
  'Video Editor': ['Editor', 'Colorist', 'VFX Artist', 'Editor & Cinematographer', 'Animator', 'Motion Graphics Designer'],
  'Videographer': ['Cinematographer', 'Camera Operator', 'Assistant Camera'],
};

const getAvailableCategoriesForArtistTypes = (artistTypes = []) => {
  if (!artistTypes || artistTypes.length === 0) {
    return ['Performer', 'Choreographer', 'Digital Creator', 'Trainer'];
  }
  const categorySet = new Set();
  artistTypes.forEach((type) => {
    const list = ARTIST_TYPE_CATEGORIES_MAP[type];
    if (list) {
      list.forEach((cat) => categorySet.add(cat));
    }
  });
  const result = Array.from(categorySet);
  return result.length > 0 ? result : ['Performer', 'Trainer'];
};

const ARTIST_TYPE_SKILLS_MAP = {
  'Dance': {
    title: 'Skills',
    suggested: [
      'Acrobatics',
      'Aerial',
      'Bachata',
      'Ballet',
      'Belly Dance',
      'Bharatnatyam',
      'Bollywood',
      'Breaking',
      'Classical',
      'Contemporary',
      'Flamenco',
      'Folk',
      'HipHop',
      'House',
      'Jazz',
      'Jazz Funk',
      'Kathak',
      'Kathakali',
      'Krump',
      'Latin',
      'Locking',
      'Popping',
      'Salsa',
      'SemiClassical',
      'Tanoura',
      'Waacking',
      'Zumba',
    ],
    default: ['Bollywood', 'Classical', 'Contemporary', 'HipHop', 'Jazz', 'Salsa'],
  },
  'Yoga': {
    title: 'Skills',
    suggested: [
      'Ashtanga',
      'Bikram',
      'Hatha',
      'Iyengar',
      'Kundalini',
      'Postnatal',
      'Prenatal',
      'Restorative',
      'Vinyasa',
    ],
    default: ['Ashtanga', 'Hatha', 'Iyengar', 'Restorative', 'Vinyasa'],
  },
  'Fitness': {
    title: 'Skills',
    suggested: [
      'Barre',
      'CrossFit',
      'Functional',
      'HIIT',
      'Mobility',
      'Olympic Weightlifting',
      'Pilates',
      'Powerlifting',
      'Strength and Conditioning',
      'Zumba',
    ],
    default: ['CrossFit', 'Functional', 'HIIT', 'Pilates', 'Strength and Conditioning'],
  },
  'Acting': {
    title: 'Skills',
    suggested: [
      'Improvisation',
      'Method Acting',
      'Monologues',
      'Screen Acting',
      'Stage Combat',
      'Voice Modulation',
    ],
    default: ['Improvisation', 'Method Acting', 'Screen Acting', 'Voice Modulation'],
  },
  'Video Editor': {
    title: 'Skills',
    suggested: [
      'Adobe After Effects',
      'Adobe Firefly',
      'Adobe Premiere Pro',
      'Autodesk Flame',
      'Autodesk Maya',
      'Avid Media Composer',
      'Blender',
      'CapCut Pro',
      'Cinema 4D',
      'DaVinci Resolve',
      'Descript',
      'Final Cut Pro',
      'Fusion',
      'Mocha Pro',
      'Nuke',
      'Runway AI',
      'Silhouette',
    ],
    default: ['Adobe After Effects', 'Adobe Premiere Pro', 'Cinema 4D', 'DaVinci Resolve', 'Final Cut Pro'],
  },
  'Editor': {
    title: 'Skills',
    suggested: [
      'Adobe After Effects',
      'Adobe Firefly',
      'Adobe Premiere Pro',
      'Autodesk Flame',
      'Autodesk Maya',
      'Avid Media Composer',
      'Blender',
      'CapCut Pro',
      'Cinema 4D',
      'DaVinci Resolve',
      'Descript',
      'Final Cut Pro',
      'Fusion',
      'Mocha Pro',
      'Nuke',
      'Runway AI',
      'Silhouette',
    ],
    default: ['Adobe After Effects', 'Adobe Premiere Pro', 'Cinema 4D', 'DaVinci Resolve', 'Final Cut Pro'],
  },
  'Videographer': {
    title: 'Skills',
    suggested: [
      'Action Rigs',
      'Cinema Camera',
      'Drone',
      'Gimbal & Stabilizer',
      'Live Streaming',
      'Mirrorless',
      'POV Rigs',
    ],
    default: ['Cinema Camera', 'Drone', 'Gimbal & Stabilizer', 'Live Streaming', 'Mirrorless'],
  },
};

const getSkillSectionTitle = () => 'Skills';

const getSuggestedSkillsForArtistTypes = (artistTypes = []) => {
  const skillSet = new Set();
  artistTypes.forEach((type) => {
    const data = ARTIST_TYPE_SKILLS_MAP[type];
    if (data && data.suggested) {
      data.suggested.forEach((s) => skillSet.add(s));
    }
  });
  const result = Array.from(skillSet).sort((a, b) => a.localeCompare(b));
  return result.length > 0 ? result : ARTIST_TYPE_SKILLS_MAP['Dance'].suggested.slice().sort((a, b) => a.localeCompare(b));
};

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 60 }, (_, i) => (CURRENT_YEAR - 14 - i).toString());

export default function ProfileScreen({ onBackHome }) {
  // Read-only metrics (NOT EDITABLE as requested)
  const metrics = {
    reviews: '4',
    rating: '5.0',
    totalGygs: '5',
  };

  // Editable State for All Profile Sections
  const [profile, setProfile] = useState({
    name: 'Akash Tiwari',
    location: 'Lives in Mumbai, India',
    artistTypes: ['Dance'],
    categories: ['Performer', 'Trainer'],
    age: '24 Years',
    height: '5\' 9"',
    gender: 'Male',
  });

  const [galleryItems, setGalleryItems] = useState([
    { id: '1', label: 'Close-Up', uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', isVideo: false },
    { id: '2', label: 'Full-Body', uri: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', isVideo: false },
    { id: '3', label: 'Mid', uri: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop', isVideo: false },
    { id: '4', label: 'Video 1', uri: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=400&auto=format&fit=crop', isVideo: true },
    { id: '5', label: 'Video 2', uri: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop', isVideo: true },
    { id: '6', label: 'Video 3', uri: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop', isVideo: true },
  ]);

  const [performerActiveTab, setPerformerActiveTab] = useState('Music Videos');
  const [choreographerActiveTab, setChoreographerActiveTab] = useState('Music Videos');

  const [performerProjects, setPerformerProjects] = useState([
    { 
      id: 'p_mv1', 
      category: 'Music Videos',
      title: "Ghoomar Dance Feature", 
      details: "Featured Solo Artist · T-Series Official Music Video · 2021" 
    },
    { 
      id: 'p_mv2', 
      category: 'Music Videos',
      title: "Urban Beat Cypher 2023", 
      details: "Principal Performer · Independent Record Label · 2023" 
    },
    { 
      id: 'p_f1', 
      category: 'Films',
      title: "Street Dancer 3D", 
      details: "Principal Troupe Dancer · T-Series / Remo D'Souza · 2020" 
    },
    { 
      id: 'p_s1', 
      category: 'Series',
      title: "Bandish Bandits (Amazon Prime)", 
      details: "Classical Fusion Performer · Episode 4 & 6 · 2020" 
    },
    { 
      id: 'p_ad1', 
      category: 'Advertisement',
      title: "Nike India - Make It Count", 
      details: "Movement Artist · Brand Film & Digital Campaign · 2023" 
    },
    { 
      id: 'p_ad2', 
      category: 'Advertisement',
      title: "Cadbury Celebrations Commercial", 
      details: "Principal Dancer · National TV Commercial · 2022" 
    },
    { 
      id: 'p_w1', 
      category: 'Workshops & Classes',
      title: "Urban Fusion Masterclass (Mumbai)", 
      details: "Lead Instructor · 120+ Students · Studio 11 Mumbai · 2023" 
    },
    { 
      id: 'p_se1', 
      category: 'Shows & Events',
      title: "Disney's Aladdin Musical", 
      details: "Lead Dancer · 99 Shows Across India · Musical Theatre · 2020–2021" 
    },
    { 
      id: 'p_se2', 
      category: 'Shows & Events',
      title: "Asees Kaur Live Show", 
      details: "Live Performer · Concert Choreography · National Tour · 2020–2021" 
    },
    { 
      id: 'p_th1', 
      category: 'Theatre',
      title: "Mughal-e-Azam: The Musical", 
      details: "Kathak & Contemporary Ensemble · NCPA Mumbai · 2022" 
    },
    { 
      id: 'p_ws1', 
      category: 'Weddings & Sangeets',
      title: "Royal Udaipur Destination Sangeet", 
      details: "Celebrity Couple Choreography & Stage Lead · 2023" 
    },
    { 
      id: 'p_sm1', 
      category: 'Social Media',
      title: "Viral Reel Collab @akashtiwari", 
      details: "Choreography Reel · 2.4M Views · Trend Feature · 2023" 
    },
  ]);

  const [choreographerProjects, setChoreographerProjects] = useState([
    { 
      id: 'c_mv1', 
      category: 'Music Videos',
      title: "Badshah & Saiyami Kher Music Feature", 
      details: "Lead Choreographer · Music Video Production · 2022" 
    },
    { 
      id: 'c_mv2', 
      category: 'Music Videos',
      title: "Ghoomar Fusion Music Track", 
      details: "Assistant Choreographer · Classical & Contemporary · 2020–2021" 
    },
    { 
      id: 'c_f1', 
      category: 'Films',
      title: "Bheed (Feature Film)", 
      details: "Associate Choreographer & Movement Director · 2023" 
    },
    { 
      id: 'c_s1', 
      category: 'Series',
      title: "Fabulous Lives of Bollywood Wives", 
      details: "Choreography Direction · Sangeet Episode Feature · 2022" 
    },
    { 
      id: 'c_ad1', 
      category: 'Advertisement',
      title: "Puma Nitro Campaign", 
      details: "Movement Director & Choreographer · Digital Commercial · 2023" 
    },
    { 
      id: 'c_ad2', 
      category: 'Advertisement',
      title: "Flipkart Big Billion Days Ad", 
      details: "Commercial Choreographer · Festive Ad Feature · 2022" 
    },
    { 
      id: 'c_w1', 
      category: 'Workshops & Classes',
      title: "Dance Intensive Tour (Delhi & Bangalore)", 
      details: "Master Choreographer · 3-Day Intensive Workshop · 2023" 
    },
    { 
      id: 'c_se1', 
      category: 'Shows & Events',
      title: "Badshah Live Arena Tour", 
      details: "Lead Stage Choreographer · Arena Tour Across 6 Cities · 2021" 
    },
    { 
      id: 'c_se2', 
      category: 'Shows & Events',
      title: "Filmfare Awards Opening Act", 
      details: "Associate Choreographer · Grand Stage Ensemble · 2022" 
    },
    { 
      id: 'c_th1', 
      category: 'Theatre',
      title: "Broadway Dreams India", 
      details: "Choreographer & Stage Movement Coach · 2022" 
    },
    { 
      id: 'c_ws1', 
      category: 'Weddings & Sangeets',
      title: "Grand Ambani Family Sangeet Act", 
      details: "Lead Concept Choreographer · 40-Dancer Stage Ensemble · 2023" 
    },
    { 
      id: 'c_sm1', 
      category: 'Social Media',
      title: "YouTube Dance Showcase 4K", 
      details: "Concept & Choreography · 1.2M Views · 2023" 
    },
  ]);

  const [training, setTraining] = useState({
    title: 'Diploma in Performing Arts',
    institution: 'National Academy of Dance & Performing Arts (Mumbai)',
    tag: 'Certified',
    bullet: 'Classical Rhythm · Contemporary Execution · Stage Expression',
  });

  const [instaInsights, setInstaInsights] = useState({
    followers: '12.5k followers',
    engagement: '1.7K accounts',
    partnerships: '0 brands',
    hook: '53.1%',
    interaction: '3.2%',
    reach: '44K accounts',
  });

  const [youtubeInsights, setYoutubeInsights] = useState({
    subscribers: '48.2k subscribers',
    views: '1.2M views',
    watchTime: '34.5K hrs',
    avgDuration: '4:12 mins',
    topVideo: '320K views',
    engagement: '8.4%',
  });

  const [skills, setSkills] = useState([
    'HipHop', 'Contemporary', 'Bollywood', 'Classical', 'Salsa', 'Jazz'
  ]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSocialPlatform, setSelectedSocialPlatform] = useState('instagram');
  const [socialHandles, setSocialHandles] = useState({
    instagram: 'akashtiwari',
    youtube: 'Akash Tiwari Official',
  });

  const [galleryPage, setGalleryPage] = useState(0);
  const galleryScrollRef = useRef(null);

  // Metrics Card 3D Flip State & Animations
  const [isMetricsFlipped, setIsMetricsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const handleFlipMetrics = () => {
    if (isMetricsFlipped) {
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      setIsMetricsFlipped(false);
    } else {
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      setIsMetricsFlipped(true);
    }
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const frontOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });
  const backOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  const frontAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
    opacity: frontOpacity,
  };
  const backAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
    opacity: backOpacity,
  };

  // Contextual Bottom Sheet Edit States
  const [activeModal, setActiveModal] = useState(null);
  const [tempHeightFeet, setTempHeightFeet] = useState('5');
  const [tempHeightInches, setTempHeightInches] = useState('9');
  const [selectedArtistTypes, setSelectedArtistTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [birthDay, setBirthDay] = useState('13');
  const [birthMonth, setBirthMonth] = useState('September');
  const [birthYear, setBirthYear] = useState('1999');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const calculateAgeNumber = (day, monthName, year) => {
    const monthIndex = MONTH_NAMES.indexOf(monthName);
    const m = monthIndex !== -1 ? monthIndex : 8;
    const y = parseInt(year, 10) || 1999;
    const d = parseInt(day, 10) || 13;
    const today = new Date();
    let age = today.getFullYear() - y;
    const currentMonth = today.getMonth();
    if (currentMonth < m || (currentMonth === m && today.getDate() < d)) {
      age--;
    }
    return Math.max(1, age);
  };

  // Fullscreen Media Viewer State
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentViewerIndex, setCurrentViewerIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const fullscreenFlatListRef = useRef(null);

  const openFullscreenViewer = (index) => {
    setCurrentViewerIndex(index);
    setIsPlayingVideo(false);
    setViewerVisible(true);
    setTimeout(() => {
      fullscreenFlatListRef.current?.scrollToIndex({ index, animated: false });
    }, 50);
  };

  const closeFullscreenViewer = () => {
    setViewerVisible(false);
    setIsPlayingVideo(false);
  };

  // Modal Editing State
  const [tempData, setTempData] = useState({});
  const [editingVideoId, setEditingVideoId] = useState(null);

  const handleRemoveMedia = (itemId) => {
    setTempData(prev => ({
      ...prev,
      items: (prev.items || []).filter(it => it.id !== itemId),
    }));
  };

  const handleAddOrRestorePhoto = (slotTitle) => {
    const defaultUriMap = {
      'Close-Up': SAMPLE_PHOTO_PRESETS[0],
      'Full-Body': SAMPLE_PHOTO_PRESETS[1],
      'Mid': SAMPLE_PHOTO_PRESETS[2],
    };
    const newPhoto = {
      id: Date.now().toString(),
      label: slotTitle,
      uri: defaultUriMap[slotTitle] || SAMPLE_PHOTO_PRESETS[3],
      isVideo: false,
    };
    setTempData(prev => {
      const items = [...(prev.items || [])];
      const videoItems = items.filter(it => it.isVideo);
      const photoItems = items.filter(it => !it.isVideo && it.label !== slotTitle);
      return {
        ...prev,
        items: [...photoItems, newPhoto, ...videoItems],
      };
    });
  };

  const handleChangeMedia = (itemId, isVideo) => {
    const presets = isVideo ? SAMPLE_VIDEO_PRESETS : SAMPLE_PHOTO_PRESETS;
    const currentItem = (tempData.items || []).find(it => it.id === itemId);
    const currentUri = currentItem ? currentItem.uri : '';
    const otherPresets = presets.filter(p => p !== currentUri);
    const nextPreset = otherPresets[Math.floor(Math.random() * otherPresets.length)] || presets[0];

    setTempData(prev => ({
      ...prev,
      items: (prev.items || []).map(it => it.id === itemId ? { ...it, uri: nextPreset } : it),
    }));
  };

  const handleAddVideo = () => {
    const currentVideos = (tempData.items || []).filter(it => it.isVideo);
    if (currentVideos.length >= 3) {
      Alert.alert('Limit Reached', 'You can have up to 3 showcase videos.');
      return;
    }
    const nextNum = currentVideos.length + 1;
    const newVideo = {
      id: Date.now().toString(),
      label: `Video ${nextNum}`,
      uri: SAMPLE_VIDEO_PRESETS[(nextNum - 1) % SAMPLE_VIDEO_PRESETS.length],
      isVideo: true,
    };
    setTempData(prev => ({
      ...prev,
      items: [...(prev.items || []), newVideo],
    }));
  };

  const handleAddPerformerProject = () => {
    const newProj = {
      id: Date.now().toString(),
      title: '',
      details: '',
    };
    setTempData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProj],
    }));
  };

  const handleRemovePerformerProject = (projId) => {
    setTempData(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(p => p.id !== projId),
    }));
  };

  const handleAddChoreographerProject = () => {
    const newProj = {
      id: Date.now().toString(),
      title: '',
      details: '',
    };
    setTempData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProj],
    }));
  };

  const handleRemoveChoreographerProject = (projId) => {
    setTempData(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(p => p.id !== projId),
    }));
  };

  const toggleArtistTypeTag = (tag) => {
    const currentList = (tempData.artistTypesStr || '').split(',').map(s => s.trim()).filter(Boolean);
    let updated;
    if (currentList.includes(tag)) {
      updated = currentList.filter(t => t !== tag);
    } else {
      updated = [...currentList, tag];
    }
    setTempData(prev => ({ ...prev, artistTypesStr: updated.join(', ') }));
  };

  const toggleCategoryTag = (tag) => {
    const currentList = (tempData.categoriesStr || '').split(',').map(s => s.trim()).filter(Boolean);
    let updated;
    if (currentList.includes(tag)) {
      updated = currentList.filter(t => t !== tag);
    } else {
      updated = [...currentList, tag];
    }
    setTempData(prev => ({ ...prev, categoriesStr: updated.join(', ') }));
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
    if (modalType === 'height') {
      const match = (profile.height || '').match(/(\d+)'?\s*(\d+)?/);
      if (match) {
        setTempHeightFeet(match[1] || '5');
        setTempHeightInches(match[2] || '9');
      } else {
        setTempHeightFeet('5');
        setTempHeightInches('9');
      }
    } else if (modalType === 'artistType') {
      setSelectedArtistTypes([...profile.artistTypes]);
    } else if (modalType === 'categories') {
      const validCategories = getAvailableCategoriesForArtistTypes(profile.artistTypes);
      const currentSelected = profile.categories.filter(c => validCategories.includes(c));
      setSelectedCategories(currentSelected.length > 0 ? currentSelected : [validCategories[0]]);
    } else if (modalType === 'skills') {
      setSelectedSkills([...skills]);
    } else if (modalType === 'age') {
      setActiveDropdown(null);
    } else if (modalType === 'gender') {
      setTempData({ gender: profile.gender });
    } else if (modalType === 'basic') {
      setTempData({ name: profile.name, location: profile.location });
    } else if (modalType === 'demographics') {
      setTempData({ age: profile.age, height: profile.height, gender: profile.gender });
    } else if (modalType === 'gallery') {
      setTempData({ items: galleryItems.map(item => ({ ...item })) });
      setEditingVideoId(null);
    } else if (modalType === 'performer') {
      setTempData({ projects: performerProjects.map(p => ({ ...p })) });
    } else if (modalType === 'choreographer') {
      setTempData({ projects: choreographerProjects.map(p => ({ ...p })) });
    } else if (modalType === 'training') {
      setTempData({ ...training });
    } else if (modalType === 'socials') {
      setTempData({
        instagramUsername: socialHandles.instagram,
        youtubeUsername: socialHandles.youtube,
      });
    }
  };

  const handleSaveModal = () => {
    if (activeModal === 'height') {
      setProfile(prev => ({
        ...prev,
        height: `${tempHeightFeet || '5'}' ${tempHeightInches || '0'}"`,
      }));
    } else if (activeModal === 'artistType') {
      const newArtistTypes = selectedArtistTypes.length > 0 ? selectedArtistTypes : ['Dance'];
      const validCategories = getAvailableCategoriesForArtistTypes(newArtistTypes);
      const filteredCategories = profile.categories.filter(c => validCategories.includes(c));
      const finalCategories = filteredCategories.length > 0 ? filteredCategories : [validCategories[0]];
      const defaultSkillData = ARTIST_TYPE_SKILLS_MAP[newArtistTypes[0]] || ARTIST_TYPE_SKILLS_MAP['Dance'];
      setSkills(defaultSkillData.default);
      setProfile(prev => ({
        ...prev,
        artistTypes: newArtistTypes,
        categories: finalCategories,
      }));
    } else if (activeModal === 'categories') {
      const validCategories = getAvailableCategoriesForArtistTypes(profile.artistTypes);
      const finalSelected = selectedCategories.filter(c => validCategories.includes(c));
      setProfile(prev => ({
        ...prev,
        categories: finalSelected.length > 0 ? finalSelected : [validCategories[0]]
      }));
    } else if (activeModal === 'skills') {
      setSkills(selectedSkills.length > 0 ? selectedSkills : skills);
    } else if (activeModal === 'age') {
      const calculated = calculateAgeNumber(birthDay, birthMonth, birthYear);
      setProfile(prev => ({ ...prev, age: `${calculated} Years` }));
    } else if (activeModal === 'gender') {
      setProfile(prev => ({ ...prev, gender: tempData.gender || profile.gender }));
    } else if (activeModal === 'basic') {
      setProfile(prev => ({ ...prev, name: tempData.name, location: tempData.location }));
    } else if (activeModal === 'demographics') {
      setProfile(prev => ({ ...prev, age: tempData.age, height: tempData.height, gender: tempData.gender }));
    } else if (activeModal === 'gallery') {
      if (tempData.items) setGalleryItems(tempData.items);
    } else if (activeModal === 'performer') {
      if (tempData.projects) setPerformerProjects(tempData.projects);
    } else if (activeModal === 'choreographer') {
      if (tempData.projects) setChoreographerProjects(tempData.projects);
    } else if (activeModal === 'training') {
      setTraining({
        title: tempData.title,
        institution: tempData.institution,
        tag: tempData.tag,
        bullet: tempData.bullet,
      });
    } else if (activeModal === 'socials') {
      setSocialHandles({
        instagram: (tempData.instagramUsername || '').replace(/^@/, '').trim(),
        youtube: (tempData.youtubeUsername || '').replace(/^@/, '').trim(),
      });
    }
    setActiveModal(null);
  };

  const handleGalleryScroll = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    if (xOffset > (GALLERY_PAGE_STEP / 2)) {
      setGalleryPage(1);
    } else {
      setGalleryPage(0);
    }
  };

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

        <TouchableOpacity activeOpacity={0.8} onPress={() => openModal('basic')} style={styles.navIconBtn}>
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
            colors={['#1C1C1F', '#161618']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardBlurContent}>
              
              <View style={styles.airbnbSplitRow}>
                
                {/* Left Column: Avatar + Name + Location Below Name */}
                <View style={styles.airbnbLeftCol}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => openModal('basic')} style={styles.avatarWrapper}>
                    <View style={styles.avatarCircleBlue}>
                      <Text style={styles.avatarInitialText}>
                        {profile.name ? profile.name.charAt(0).toUpperCase() : 'A'}
                      </Text>
                    </View>
                    
                    {/* Royal Blue Verification Badge */}
                    <View style={styles.shieldBadge}>
                      <Ionicons name="checkmark" size={12} color="#ffffff" />
                    </View>
                  </TouchableOpacity>

                  <Text style={styles.airbnbNameText}>{profile.name}</Text>

                  {/* Location with Globe Icon directly below Name */}
                  <View style={styles.locationBelowNameRow}>
                    <Ionicons name="globe-outline" size={13} color="#8E8E93" style={{ marginRight: 4 }} />
                    <Text style={styles.locationBelowNameText}>{profile.location}</Text>
                  </View>
                </View>

                {/* Vertical Divider Line */}
                <View style={styles.columnDivider} />

                {/* Right Column: 3 Stacked Metrics */}
                <View style={styles.airbnbRightCol}>
                  
                  {/* Metric 1: Reviews */}
                  <View style={styles.metricBlock}>
                    <View style={styles.metricRowWithHint}>
                      <Text style={styles.metricBigNumber}>{metrics.reviews}</Text>
                      <Ionicons name="swap-horizontal" size={12} color="#60A5FA" style={{ marginLeft: 5 }} />
                    </View>
                    <Text style={styles.metricLabelText}>Reviews</Text>
                  </View>

                  <View style={styles.horizontalDivider} />

                  {/* Metric 2: Rating */}
                  <View style={styles.metricBlock}>
                    <View style={styles.ratingValRow}>
                      <Text style={styles.metricBigNumber}>{metrics.rating}</Text>
                      <Ionicons name="star" size={12} color="#ffffff" style={{ marginLeft: 3 }} />
                    </View>
                    <Text style={styles.metricLabelText}>Rating</Text>
                  </View>

                  <View style={styles.horizontalDivider} />

                  {/* Metric 3: Total Gygs */}
                  <View style={styles.metricBlock}>
                    <Text style={styles.metricBigNumber}>{metrics.totalGygs}</Text>
                    <Text style={styles.metricLabelText}>Total Gygs</Text>
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

            </View>
          </LinearGradient>
        </View>

        {/* 2. Side-by-Side 'Artist Type' and 'Categories' Double Cards Row */}
        <View style={styles.doubleCardRow}>
          
          {/* Card A: Artist Type */}
          <View style={styles.halfCardWrapper}>
            <LinearGradient
              colors={['#1C1C1F', '#161618']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardBlurContentCompact}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardHeaderLabel}>ARTIST TYPE</Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('artistType')}>
                    <Ionicons name="create-outline" size={14} color="#636366" />
                  </TouchableOpacity>
                </View>
                <View style={styles.tagContainer}>
                  {profile.artistTypes.map((type, idx) => (
                    <View key={idx} style={styles.tagPill}>
                      <Text style={styles.tagPillText}>{type}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Card B: Categories */}
          <View style={styles.halfCardWrapper}>
            <LinearGradient
              colors={['#1C1C1F', '#161618']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardBlurContentCompact}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardHeaderLabel}>CATEGORIES</Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('categories')}>
                    <Ionicons name="create-outline" size={14} color="#636366" />
                  </TouchableOpacity>
                </View>
                <View style={styles.tagContainer}>
                  {profile.categories.map((cat, idx) => (
                    <View key={idx} style={styles.tagPill}>
                      <Text style={styles.tagPillText}>{cat}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </View>

        </View>

        {/* 3. Skills Card */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['#1C1C1F', '#161618']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardBlurContentCompact}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>SKILLS</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('skills')}>
                  <Ionicons name="create-outline" size={14} color="#636366" />
                </TouchableOpacity>
              </View>

              <View style={styles.tagContainer}>
                {skills.map((skill, index) => (
                  <View key={index} style={styles.tagPill}>
                    <Text style={styles.tagPillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* 4. Demographics Row (AGE, HEIGHT, GENDER Side-by-Side) */}
        <View style={styles.demographicsRow}>
          
          {/* Age Card */}
          <TouchableOpacity 
            activeOpacity={0.85} 
            onPress={() => openModal('age')}
            style={styles.tripletCardWrapper}
          >
            <LinearGradient
              colors={['#1C1C1F', '#161618']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardBlurContentSmall}>
                <View style={styles.demoHeaderRow}>
                  <Text style={styles.cardHeaderLabel}>AGE</Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('age')}>
                    <Ionicons name="create-outline" size={12} color="#636366" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.demoValueSmall}>{profile.age}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Height Card */}
          <TouchableOpacity 
            activeOpacity={0.85} 
            onPress={() => openModal('height')}
            style={styles.tripletCardWrapper}
          >
            <LinearGradient
              colors={['#1C1C1F', '#161618']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardBlurContentSmall}>
                <View style={styles.demoHeaderRow}>
                  <Text style={styles.cardHeaderLabel}>HEIGHT</Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('height')}>
                    <Ionicons name="create-outline" size={12} color="#636366" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.demoValueSmall}>{profile.height}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Gender Card */}
          <TouchableOpacity 
            activeOpacity={0.85} 
            onPress={() => openModal('gender')}
            style={styles.tripletCardWrapper}
          >
            <LinearGradient
              colors={['#1C1C1F', '#161618']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardBlurContentSmall}>
                <View style={styles.demoHeaderRow}>
                  <Text style={styles.cardHeaderLabel}>GENDER</Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('gender')}>
                    <Ionicons name="create-outline" size={12} color="#636366" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.demoValueSmall}>{profile.gender}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

        </View>

        {/* 5. Editorial Gallery */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['#1C1C1F', '#161618']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardBlurContent}>
              
              {/* Header */}
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>GALLERY</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('gallery')}>
                  <Ionicons name="create-outline" size={14} color="#636366" />
                </TouchableOpacity>
              </View>
                  <Ionicons name="create-outline" size={14} color="#888888" />
                </TouchableOpacity>
              </View>

              {/* Swipeable ScrollView Container */}
              <View style={styles.galleryViewportContainer}>
                
                {/* Floating Extreme Left Arrow Button */}
                {galleryPage > 0 && (
                  <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => galleryScrollRef.current?.scrollTo({ x: 0, animated: true })}
                    style={[styles.floatingArrowBtn, styles.floatingArrowLeft]}
                  >
                    <Ionicons name="chevron-back" size={16} color="#ffffff" />
                  </TouchableOpacity>
                )}

                {/* Floating Extreme Right Arrow Button */}
                {galleryPage === 0 && (
                  <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => galleryScrollRef.current?.scrollTo({ x: GALLERY_PAGE_STEP, animated: true })}
                    style={[styles.floatingArrowBtn, styles.floatingArrowRight]}
                  >
                    <Ionicons name="chevron-forward" size={16} color="#ffffff" />
                  </TouchableOpacity>
                )}

                <ScrollView 
                  ref={galleryScrollRef}
                  horizontal={true} 
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleGalleryScroll}
                  scrollEventThrottle={16}
                  decelerationRate="fast"
                  snapToInterval={GALLERY_PAGE_STEP}
                  contentContainerStyle={styles.galleryScrollContainer}
                >
                  {galleryItems.map((item, index) => (
                    <TouchableOpacity 
                      key={item.id} 
                      activeOpacity={0.85}
                      onPress={() => openFullscreenViewer(index)}
                      style={styles.galleryCardItem}
                    >
                      <Image 
                        source={{ uri: item.uri }} 
                        style={styles.galleryCardImage} 
                      />
                      {item.isVideo && (
                        <View style={styles.galleryPlayBadge}>
                          <Ionicons name="play" size={13} color="#ffffff" />
                        </View>
                      )}
                      <LinearGradient 
                        colors={['transparent', 'rgba(0, 0, 0, 0.88)']} 
                        style={styles.galleryCardGradientOverlay}
                      >
                        <Text style={styles.galleryCardLabelText} numberOfLines={1}>{item.label}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* 2-Dot Centered Pagination Indicator */}
              <View style={styles.dotsContainerCentered}>
                <View style={[styles.dot, galleryPage === 0 ? styles.activeDot : styles.inactiveDot]} />
                <View style={[styles.dot, galleryPage === 1 ? styles.activeDot : styles.inactiveDot]} />
              </View>

            </BlurView>
          </LinearGradient>
        </View>

        {/* 6. Work Experience Card 1: Performer */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['#1C1C1F', '#161618']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardBlurContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>PERFORMER</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('performer')}>
                  <Ionicons name="create-outline" size={14} color="#636366" />
                </TouchableOpacity>
              </View>

              {/* Filter Pills Row (Interactive 9 Sub-Categories) */}
              <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.expFilterScrollContainer}
              >
                {WORK_EXPERIENCE_CATEGORIES.map((subCat) => {
                  const isActive = performerActiveTab === subCat;
                  return (
                    <TouchableOpacity
                      key={subCat}
                      activeOpacity={0.75}
                      onPress={() => setPerformerActiveTab(subCat)}
                      style={isActive ? styles.activePillBlue : styles.inactivePillBorder}
                    >
                      <Text style={isActive ? styles.activePillText : styles.inactivePillText}>
                        {subCat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Projects filtered by selected sub-category */}
              {performerProjects.filter(p => (p.category || 'Music Videos') === performerActiveTab).length > 0 ? (
                performerProjects
                  .filter(p => (p.category || 'Music Videos') === performerActiveTab)
                  .map((proj) => (
                    <View key={proj.id} style={styles.expProjectBlock}>
                      <View style={styles.expProjectHeaderRow}>
                        <Ionicons name="business-outline" size={16} color="#ffffff" style={{ marginRight: 8 }} />
                        <Text style={styles.expProjectTitleText}>{proj.title}</Text>
                      </View>
                      <View style={styles.expSubEntryBox}>
                        <View style={styles.expLeftAccentLine} />
                        <Text style={styles.expSubEntryText}>{proj.details}</Text>
                      </View>
                    </View>
                  ))
              ) : (
                <View style={styles.expEmptySubCatBlock}>
                  <Text style={styles.expEmptySubCatText}>No {performerActiveTab} projects added yet</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </View>

        {/* 7. Work Experience Card 2: Choreographer */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['#1C1C1F', '#161618']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardBlurContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>CHOREOGRAPHER</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('choreographer')}>
                  <Ionicons name="create-outline" size={14} color="#636366" />
                </TouchableOpacity>
              </View>

              {/* Filter Pills Row (Interactive 9 Sub-Categories) */}
              <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.expFilterScrollContainer}
              >
                {WORK_EXPERIENCE_CATEGORIES.map((subCat) => {
                  const isActive = choreographerActiveTab === subCat;
                  return (
                    <TouchableOpacity
                      key={subCat}
                      activeOpacity={0.75}
                      onPress={() => setChoreographerActiveTab(subCat)}
                      style={isActive ? styles.activePillBlue : styles.inactivePillBorder}
                    >
                      <Text style={isActive ? styles.activePillText : styles.inactivePillText}>
                        {subCat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Projects filtered by selected sub-category */}
              {choreographerProjects.filter(p => (p.category || 'Music Videos') === choreographerActiveTab).length > 0 ? (
                choreographerProjects
                  .filter(p => (p.category || 'Music Videos') === choreographerActiveTab)
                  .map((proj) => (
                    <View key={proj.id} style={styles.expProjectBlock}>
                      <View style={styles.expProjectHeaderRow}>
                        <Ionicons name="business-outline" size={16} color="#ffffff" style={{ marginRight: 8 }} />
                        <Text style={styles.expProjectTitleText}>{proj.title}</Text>
                      </View>
                      <View style={styles.expSubEntryBox}>
                        <View style={styles.expLeftAccentLine} />
                        <Text style={styles.expSubEntryText}>{proj.details}</Text>
                      </View>
                    </View>
                  ))
              ) : (
                <View style={styles.expEmptySubCatBlock}>
                  <Text style={styles.expEmptySubCatText}>No {choreographerActiveTab} projects added yet</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </View>

        {/* 8. Training & Education Card */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['#1C1C1F', '#161618']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardBlurContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>TRAINING & EDUCATION</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('training')}>
                  <Ionicons name="create-outline" size={14} color="#636366" />
                </TouchableOpacity>
              </View>

              <View style={styles.experienceBlock}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.expRoleTitle}>{training.title}</Text>
                </View>
                <Text style={styles.institutionText}>{training.institution}</Text>
                
                <View style={[styles.expBulletRow, { marginTop: 6 }]}>
                  <Text style={bulletDot}>•</Text>
                  <Text style={styles.expBulletText}>{training.bullet}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* 9. Interactive Socials Component */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['#1C1C1F', '#161618']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardBlurContent}>
              
              {/* Socials Card Header */}
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderLabel}>SOCIALS</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => openModal('socials')}>
                  <Ionicons name="create-outline" size={14} color="#636366" />
                </TouchableOpacity>
              </View>

              {/* 1. The Horizontal Pill Row (Fits Both in One View) */}
              <View style={styles.socialsPillContainer}>
                {/* Instagram Pill */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelectedSocialPlatform(prev => prev === 'instagram' ? null : 'instagram')}
                  style={[
                    styles.platformPill,
                    selectedSocialPlatform === 'instagram' && styles.platformPillActive
                  ]}
                >
                  <LinearGradient
                    colors={['#833AB4', '#FD1D1D', '#FCAF45']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.platformIconCircleInstaGradient}
                  >
                    <View style={styles.platformIconCircleInstaInner}>
                      <Ionicons name="logo-instagram" size={16} color="#ffffff" />
                    </View>
                  </LinearGradient>
                  <View style={styles.platformPillTextStack}>
                    <Text style={styles.platformNameText} numberOfLines={1}>Instagram</Text>
                    <Text style={styles.platformStatText} numberOfLines={1}>{instaInsights.followers || '12.5k followers'}</Text>
                  </View>
                  {selectedSocialPlatform === 'instagram' && (
                    <View style={styles.activeDotIndicator} />
                  )}
                </TouchableOpacity>

                {/* YouTube Pill */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelectedSocialPlatform(prev => prev === 'youtube' ? null : 'youtube')}
                  style={[
                    styles.platformPill,
                    selectedSocialPlatform === 'youtube' && styles.platformPillActive
                  ]}
                >
                  <LinearGradient
                    colors={['#FF0000', '#990000']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.platformIconCircleYoutubeGradient}
                  >
                    <View style={styles.platformIconCircleYoutubeInner}>
                      <Ionicons name="logo-youtube" size={15} color="#ffffff" />
                    </View>
                  </LinearGradient>
                  <View style={styles.platformPillTextStack}>
                    <Text style={styles.platformNameText} numberOfLines={1}>YouTube</Text>
                    <Text style={styles.platformStatText} numberOfLines={1}>{youtubeInsights.subscribers || '48.2k subscribers'}</Text>
                  </View>
                  {selectedSocialPlatform === 'youtube' && (
                    <View style={styles.activeDotIndicator} />
                  )}
                </TouchableOpacity>
              </View>

              {/* 2 & 3. The Expandable View (Progressive Disclosure) */}
              {selectedSocialPlatform === 'instagram' && (
                <View style={styles.socialsExpandedContent}>
                  
                  {/* Instagram Insights Grid */}
                  <View style={styles.insightsSectionHeadingRow}>
                    <Text style={styles.insightsSectionTitle}>INSIGHTS</Text>
                  </View>

                  <View style={styles.instaRow}>
                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Followers</Text>
                      <Text style={styles.instaMetricVal}>{instaInsights.followers}</Text>
                      <Text style={styles.instaMetricSub}>Lifetime</Text>
                    </View>

                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Engagement</Text>
                      <Text style={styles.instaMetricVal}>{instaInsights.engagement}</Text>
                      <Text style={styles.instaMetricSub}>This Month</Text>
                    </View>
                  </View>

                  <View style={styles.instaRow}>
                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Partnerships</Text>
                      <Text style={styles.instaMetricVal}>{instaInsights.partnerships}</Text>
                      <Text style={styles.instaMetricSub}>Lifetime</Text>
                    </View>

                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Hook Rate</Text>
                      <Text style={styles.instaMetricVal}>{instaInsights.hook}</Text>
                      <Text style={styles.instaMetricSub}>Last 90 days</Text>
                    </View>
                  </View>

                  <View style={[styles.instaRow, { marginBottom: 16 }]}>
                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Interaction</Text>
                      <Text style={styles.instaMetricVal}>{instaInsights.interaction}</Text>
                      <Text style={styles.instaMetricSub}>Last 90 days</Text>
                    </View>

                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Reach</Text>
                      <Text style={styles.instaMetricVal}>{instaInsights.reach}</Text>
                      <Text style={styles.instaMetricSub}>This Month</Text>
                    </View>
                  </View>

                  {/* Instagram Embedded Feed Placeholder Card */}
                  <View style={styles.socialEmbedCard}>
                    <View style={styles.embedHeaderRow}>
                      <View style={styles.embedProfileRow}>
                        <LinearGradient
                          colors={['#833AB4', '#FD1D1D', '#FCAF45']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.embedAvatarInstaGradient}
                        >
                          <View style={styles.embedAvatarInstaInner}>
                            <Ionicons name="logo-instagram" size={16} color="#ffffff" />
                          </View>
                        </LinearGradient>
                        <View>
                          <View style={styles.embedNameRow}>
                            <Text style={styles.embedHandleText}>@{socialHandles.instagram || 'username'}</Text>
                            <Ionicons name="checkmark-circle" size={13} color="#3B82F6" style={{ marginLeft: 4 }} />
                          </View>
                          <Text style={styles.embedSubtext}>184 Posts · Verified Creator</Text>
                        </View>
                      </View>

                      <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={() => Alert.alert('External Link', `Opening instagram.com/${socialHandles.instagram || 'akashtiwari'}...`)}
                        style={styles.embedVisitBtnGradientWrapper}
                      >
                        <LinearGradient
                          colors={['#833AB4', '#FD1D1D', '#FCAF45']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.embedVisitBtnGradientBorder}
                        >
                          <View style={styles.embedVisitBtnInner}>
                            <Text style={styles.embedVisitBtnText}>View</Text>
                            <Ionicons name="open-outline" size={11} color="#ffffff" style={{ marginLeft: 4 }} />
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>

                    {/* 3-Post Feed Grid Placeholder */}
                    <View style={styles.embedFeedGrid}>
                      <View style={styles.embedPostItem}>
                        <Image 
                          source={{ uri: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=400&auto=format&fit=crop' }} 
                          style={styles.embedPostImage} 
                        />
                        <View style={styles.embedPostReelBadge}>
                          <Ionicons name="play" size={10} color="#ffffff" />
                        </View>
                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.embedPostOverlay}>
                          <Text style={styles.embedPostStatText}>❤️ 2.4k</Text>
                        </LinearGradient>
                      </View>

                      <View style={styles.embedPostItem}>
                        <Image 
                          source={{ uri: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop' }} 
                          style={styles.embedPostImage} 
                        />
                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.embedPostOverlay}>
                          <Text style={styles.embedPostStatText}>❤️ 1.8k</Text>
                        </LinearGradient>
                      </View>

                      <View style={styles.embedPostItem}>
                        <Image 
                          source={{ uri: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop' }} 
                          style={styles.embedPostImage} 
                        />
                        <View style={styles.embedPostReelBadge}>
                          <Ionicons name="play" size={10} color="#ffffff" />
                        </View>
                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.embedPostOverlay}>
                          <Text style={styles.embedPostStatText}>❤️ 4.1k</Text>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>

                </View>
              )}

              {/* When YouTube is active */}
              {selectedSocialPlatform === 'youtube' && (
                <View style={styles.socialsExpandedContent}>
                  
                  {/* YouTube Insights Grid */}
                  <View style={styles.insightsSectionHeadingRow}>
                    <Text style={styles.insightsSectionTitle}>ANALYTICS</Text>
                  </View>

                  <View style={styles.instaRow}>
                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Subscribers</Text>
                      <Text style={styles.instaMetricVal}>{youtubeInsights.subscribers}</Text>
                      <Text style={styles.instaMetricSub}>Lifetime</Text>
                    </View>

                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Total Views</Text>
                      <Text style={styles.instaMetricVal}>{youtubeInsights.views}</Text>
                      <Text style={styles.instaMetricSub}>This Month</Text>
                    </View>
                  </View>

                  <View style={styles.instaRow}>
                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Watch Time</Text>
                      <Text style={styles.instaMetricVal}>{youtubeInsights.watchTime}</Text>
                      <Text style={styles.instaMetricSub}>Lifetime</Text>
                    </View>

                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Avg Duration</Text>
                      <Text style={styles.instaMetricVal}>{youtubeInsights.avgDuration}</Text>
                      <Text style={styles.instaMetricSub}>Per Video</Text>
                    </View>
                  </View>

                  <View style={[styles.instaRow, { marginBottom: 16 }]}>
                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Top Video</Text>
                      <Text style={styles.instaMetricVal}>{youtubeInsights.topVideo}</Text>
                      <Text style={styles.instaMetricSub}>All-Time High</Text>
                    </View>

                    <View style={styles.instaMetricBox}>
                      <Text style={styles.instaMetricLabel}>Engagement</Text>
                      <Text style={styles.instaMetricVal}>{youtubeInsights.engagement}</Text>
                      <Text style={styles.instaMetricSub}>Last 90 days</Text>
                    </View>
                  </View>

                  {/* YouTube Video Feed Embed Placeholder Card */}
                  <View style={styles.socialEmbedCard}>
                    <View style={styles.embedHeaderRow}>
                      <View style={styles.embedProfileRow}>
                        <View style={styles.embedAvatarYoutube}>
                          <Ionicons name="play" size={14} color="#ffffff" />
                        </View>
                        <View>
                          <View style={styles.embedNameRow}>
                            <Text style={styles.embedHandleText}>{socialHandles.youtube || 'Akash Tiwari Official'}</Text>
                            <Ionicons name="checkmark-circle" size={13} color="#FF0000" style={{ marginLeft: 4 }} />
                          </View>
                          <Text style={styles.embedSubtext}>64 Videos · Official Artist Channel</Text>
                        </View>
                      </View>

                      <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={() => Alert.alert('External Link', `Opening youtube.com/@${socialHandles.youtube || 'akashtiwari'}...`)}
                        style={styles.embedVisitBtn}
                      >
                        <Text style={styles.embedVisitBtnText}>Watch</Text>
                        <Ionicons name="open-outline" size={12} color="#ffffff" style={{ marginLeft: 4 }} />
                      </TouchableOpacity>
                    </View>

                    {/* Featured Video Embed Card */}
                    <View style={styles.youtubeFeaturedEmbed}>
                      <Image 
                        source={{ uri: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop' }} 
                        style={styles.youtubeFeaturedThumb} 
                      />
                      <View style={styles.youtubeCenterPlayBtn}>
                        <Ionicons name="play" size={22} color="#ffffff" style={{ marginLeft: 2 }} />
                      </View>
                      <View style={styles.youtubeDurationBadge}>
                        <Text style={styles.youtubeDurationText}>08:42</Text>
                      </View>
                    </View>
                    <Text style={styles.youtubeVideoTitleText} numberOfLines={1}>
                      Dance Choreography Masterclass | Badshah Tour Routine
                    </Text>

                    {/* Bottom Sync Footer */}
                    <View style={styles.embedFooterRow}>
                      <Ionicons name="logo-youtube" size={12} color="#FF0000" style={{ marginRight: 5 }} />
                      <Text style={styles.embedFooterText}>Connected Channel · YouTube Partner Program</Text>
                    </View>
                  </View>

                </View>
              )}

            </BlurView>
          </LinearGradient>
        </View>

      </ScrollView>

      {/* Floating Centered Edit Modal Architecture */}
      <Modal
        visible={activeModal !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.sheetOverlay}
        >
          <View style={[styles.sheetContainer, activeModal === 'gallery' && styles.gallerySheetContainer]}>
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              style={[styles.sheetScrollBody, activeModal === 'gallery' && styles.gallerySheetScrollBody]}
              bounces={false}
            >
              
              {/* 1. Edit Height Modal */}
              {activeModal === 'height' && (
                <View>
                  <Text style={styles.sheetTitle}>Edit Height</Text>
                  <View style={styles.sheetHeightRow}>
                    <View style={styles.sheetHeightCol}>
                      <Text style={styles.sheetInputLabel}>Feet</Text>
                      <TextInput 
                        style={styles.sheetInput}
                        value={tempHeightFeet}
                        onChangeText={setTempHeightFeet}
                        keyboardType="numeric"
                        placeholder="5"
                        placeholderTextColor="#777777"
                      />
                    </View>
                    <View style={styles.sheetHeightCol}>
                      <Text style={styles.sheetInputLabel}>Inches</Text>
                      <TextInput 
                        style={styles.sheetInput}
                        value={tempHeightInches}
                        onChangeText={setTempHeightInches}
                        keyboardType="numeric"
                        placeholder="9"
                        placeholderTextColor="#777777"
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* 2. Edit Artist Types Modal */}
              {activeModal === 'artistType' && (
                <View>
                  <Text style={styles.artistModalTitle}>What best describes you?</Text>
                  <Text style={styles.artistModalSubtitle}>(Select all that apply)</Text>
                  <View style={styles.artistPillsWrapGrid}>
                    {SUGGESTED_ARTIST_TYPES.map((tag) => {
                      const isSelected = selectedArtistTypes.includes(tag);
                      return (
                        <TouchableOpacity
                          key={tag}
                          activeOpacity={0.7}
                          onPress={() => {
                            setSelectedArtistTypes(prev => 
                              prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                            );
                          }}
                          style={[
                            styles.sheetPill,
                            isSelected ? styles.sheetPillSelected : styles.sheetPillUnselected
                          ]}
                        >
                          <Text style={[styles.sheetPillText, isSelected ? styles.sheetPillTextSelected : styles.sheetPillTextUnselected]}>
                            {tag}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* 3. Edit Categories Modal (Dynamic based on selected Artist Types) */}
              {activeModal === 'categories' && (
                <View>
                  <Text style={styles.artistModalTitle}>What are your categories?</Text>
                  <Text style={styles.artistModalSubtitle}>(Select all that apply)</Text>
                  <View style={styles.artistPillsWrapGrid}>
                    {getAvailableCategoriesForArtistTypes(profile.artistTypes).map((tag) => {
                      const isSelected = selectedCategories.includes(tag);
                      return (
                        <TouchableOpacity
                          key={tag}
                          activeOpacity={0.7}
                          onPress={() => {
                            setSelectedCategories(prev => 
                              prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                            );
                          }}
                          style={[
                            styles.sheetPill,
                            isSelected ? styles.sheetPillSelected : styles.sheetPillUnselected
                          ]}
                        >
                          <Text style={[styles.sheetPillText, isSelected ? styles.sheetPillTextSelected : styles.sheetPillTextUnselected]}>
                            {tag}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* Edit Skills Modal */}
              {activeModal === 'skills' && (
                <View>
                  <Text style={styles.artistModalTitle}>Edit Skills</Text>
                  <Text style={styles.artistModalSubtitle}>(Select all that apply)</Text>
                  <View style={styles.artistPillsWrapGrid}>
                    {getSuggestedSkillsForArtistTypes(profile.artistTypes).map((sk) => {
                      const isSelected = selectedSkills.includes(sk);
                      return (
                        <TouchableOpacity
                          key={sk}
                          activeOpacity={0.7}
                          onPress={() => {
                            setSelectedSkills(prev => 
                              prev.includes(sk) ? prev.filter(s => s !== sk) : [...prev, sk]
                            );
                          }}
                          style={[
                            styles.sheetPill,
                            isSelected ? styles.sheetPillSelected : styles.sheetPillUnselected
                          ]}
                        >
                          <Text style={[styles.sheetPillText, isSelected ? styles.sheetPillTextSelected : styles.sheetPillTextUnselected]}>
                            {sk}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* 4. Edit Age / Birthday Picker Modal */}
              {activeModal === 'age' && (
                <View>
                  <Text style={styles.birthdayTitle}>When is your birthday?</Text>
                  
                  {/* The 3-Column Dropdown Row */}
                  <View style={styles.birthdayRow}>
                    
                    {/* Day Dropdown */}
                    <TouchableOpacity 
                      activeOpacity={0.8}
                      onPress={() => setActiveDropdown(activeDropdown === 'day' ? null : 'day')}
                      style={[
                        styles.birthdayDropdownBlock, 
                        { flex: 0.85 },
                        activeDropdown === 'day' && styles.birthdayDropdownBlockActive
                      ]}
                    >
                      <Text style={styles.birthdayDropdownText}>{birthDay}</Text>
                      <Ionicons name="chevron-down" size={14} color="rgba(255, 255, 255, 0.7)" />
                    </TouchableOpacity>

                    {/* Month Dropdown */}
                    <TouchableOpacity 
                      activeOpacity={0.8}
                      onPress={() => setActiveDropdown(activeDropdown === 'month' ? null : 'month')}
                      style={[
                        styles.birthdayDropdownBlock, 
                        { flex: 1.4 },
                        activeDropdown === 'month' && styles.birthdayDropdownBlockActive
                      ]}
                    >
                      <Text style={styles.birthdayDropdownText} numberOfLines={1}>{birthMonth}</Text>
                      <Ionicons name="chevron-down" size={14} color="rgba(255, 255, 255, 0.7)" />
                    </TouchableOpacity>

                    {/* Year Dropdown */}
                    <TouchableOpacity 
                      activeOpacity={0.8}
                      onPress={() => setActiveDropdown(activeDropdown === 'year' ? null : 'year')}
                      style={[
                        styles.birthdayDropdownBlock, 
                        { flex: 1.05 },
                        activeDropdown === 'year' && styles.birthdayDropdownBlockActive
                      ]}
                    >
                      <Text style={styles.birthdayDropdownText}>{birthYear}</Text>
                      <Ionicons name="chevron-down" size={14} color="rgba(255, 255, 255, 0.7)" />
                    </TouchableOpacity>

                  </View>

                  {/* Dropdown Options Popup/Accordion */}
                  {activeDropdown && (
                    <View style={styles.birthdayPickerOptionsContainer}>
                      <ScrollView 
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                        style={styles.birthdayPickerScroll}
                      >
                        {activeDropdown === 'day' && DAY_OPTIONS.map((d) => (
                          <TouchableOpacity 
                            key={d}
                            activeOpacity={0.7}
                            onPress={() => {
                              setBirthDay(d);
                              setActiveDropdown(null);
                            }}
                            style={[styles.birthdayOptionItem, birthDay === d && styles.birthdayOptionItemActive]}
                          >
                            <Text style={[styles.birthdayOptionText, birthDay === d && styles.birthdayOptionTextActive]}>
                              {d}
                            </Text>
                            {birthDay === d && <Ionicons name="checkmark" size={14} color="#60A5FA" />}
                          </TouchableOpacity>
                        ))}

                        {activeDropdown === 'month' && MONTH_NAMES.map((m) => (
                          <TouchableOpacity 
                            key={m}
                            activeOpacity={0.7}
                            onPress={() => {
                              setBirthMonth(m);
                              setActiveDropdown(null);
                            }}
                            style={[styles.birthdayOptionItem, birthMonth === m && styles.birthdayOptionItemActive]}
                          >
                            <Text style={[styles.birthdayOptionText, birthMonth === m && styles.birthdayOptionTextActive]}>
                              {m}
                            </Text>
                            {birthMonth === m && <Ionicons name="checkmark" size={14} color="#60A5FA" />}
                          </TouchableOpacity>
                        ))}

                        {activeDropdown === 'year' && YEAR_OPTIONS.map((y) => (
                          <TouchableOpacity 
                            key={y}
                            activeOpacity={0.7}
                            onPress={() => {
                              setBirthYear(y);
                              setActiveDropdown(null);
                            }}
                            style={[styles.birthdayOptionItem, birthYear === y && styles.birthdayOptionItemActive]}
                          >
                            <Text style={[styles.birthdayOptionText, birthYear === y && styles.birthdayOptionTextActive]}>
                              {y}
                            </Text>
                            {birthYear === y && <Ionicons name="checkmark" size={14} color="#60A5FA" />}
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}

                  {/* Calculated Age Display */}
                  <View style={styles.calculatedAgeBox}>
                    <Text style={styles.calculatedAgeText}>
                      Age: {calculateAgeNumber(birthDay, birthMonth, birthYear)} Years
                    </Text>
                  </View>
                </View>
              )}

              {/* 5. Edit Gender Modal */}
              {activeModal === 'gender' && (
                <View>
                  <Text style={styles.genderTitle}>What is your Gender?</Text>
                  <View style={styles.genderSegmentedRow}>
                    {['Male', 'Female', 'Other'].map((g) => {
                      const isSelected = tempData.gender === g;
                      return (
                        <TouchableOpacity
                          key={g}
                          activeOpacity={0.75}
                          onPress={() => setTempData(prev => ({ ...prev, gender: g }))}
                          style={[
                            styles.genderSegmentBtn,
                            isSelected ? styles.genderSegmentBtnSelected : styles.genderSegmentBtnUnselected
                          ]}
                        >
                          <Text style={[
                            styles.genderSegmentText, 
                            isSelected ? styles.genderSegmentTextSelected : styles.genderSegmentTextUnselected
                          ]}>
                            {g}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* 6. Edit Basic Info Modal */}
              {activeModal === 'basic' && (
                <View>
                  <Text style={styles.sheetTitle}>Edit Basic Info</Text>
                  <Text style={styles.sheetInputLabel}>FULL NAME</Text>
                  <TextInput 
                    style={styles.sheetInput}
                    value={tempData.name}
                    onChangeText={(val) => setTempData(prev => ({ ...prev, name: val }))}
                    placeholder="e.g. Akash Tiwari"
                    placeholderTextColor="#777777"
                  />
                  <Text style={[styles.sheetInputLabel, { marginTop: 14 }]}>LOCATION</Text>
                  <TextInput 
                    style={styles.sheetInput}
                    value={tempData.location}
                    onChangeText={(val) => setTempData(prev => ({ ...prev, location: val }))}
                    placeholder="e.g. Lives in Mumbai, India"
                    placeholderTextColor="#777777"
                  />
                </View>
              )}

              {/* 7. Gallery Grid Manager */}
              {activeModal === 'gallery' && tempData.items && (
                <View style={styles.gridManagerWrapper}>
                  <Text style={styles.sheetTitle}>Gallery</Text>
                  <View style={styles.gridSectionHeaderRow}>
                    <View style={styles.gridSectionTitleRow}>
                      <Ionicons name="images-outline" size={15} color="#60A5FA" style={{ marginRight: 6 }} />
                      <Text style={styles.gridSectionTitle}>Photos</Text>
                    </View>
                  </View>

                  {/* 3-Column Photos Grid */}
                  <View style={styles.photoGridRow}>
                    {['Close-Up', 'Full-Body', 'Mid'].map((slotTitle) => {
                      const item = tempData.items.find(it => !it.isVideo && it.label === slotTitle);
                      return (
                        <View key={slotTitle} style={styles.gridCardSlot}>
                          <View style={styles.gridSlotHeader}>
                            <Text style={styles.gridSlotTitleText} numberOfLines={1}>{slotTitle}</Text>
                          </View>
                          
                          {item && item.uri ? (
                            <View style={styles.gridCardPreviewBox}>
                              <Image source={{ uri: item.uri }} style={styles.gridCardImage} />
                              <View style={styles.gridCardActionOverlay}>
                                <TouchableOpacity 
                                  activeOpacity={0.8}
                                  onPress={() => handleChangeMedia(item.id, false)}
                                  style={styles.gridActionIconBtn}
                                >
                                  <Ionicons name="camera" size={13} color="#ffffff" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                  activeOpacity={0.8}
                                  onPress={() => handleRemoveMedia(item.id)}
                                  style={[styles.gridActionIconBtn, styles.gridDeleteBtn]}
                                >
                                  <Ionicons name="trash" size={13} color="#FF6B6B" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <TouchableOpacity 
                              activeOpacity={0.8}
                              onPress={() => handleAddOrRestorePhoto(slotTitle)}
                              style={styles.gridEmptyCardBox}
                            >
                              <Ionicons name="add-circle-outline" size={24} color="#60A5FA" />
                              <Text style={styles.gridEmptyAddText}>Add {slotTitle}</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })}
                  </View>

                  {/* Section 2: Performance Videos */}
                  <View style={[styles.gridSectionHeaderRow, { marginTop: 14 }]}>
                    <View style={styles.gridSectionTitleRow}>
                      <Ionicons name="videocam-outline" size={16} color="#60A5FA" style={{ marginRight: 6 }} />
                      <Text style={styles.gridSectionTitle}>Videos</Text>
                    </View>
                    {tempData.items.filter(it => it.isVideo).length < 3 && (
                      <TouchableOpacity 
                        activeOpacity={0.7}
                        onPress={handleAddVideo}
                        style={styles.gridAddVideoBtn}
                      >
                        <Ionicons name="add" size={14} color="#ffffff" style={{ marginRight: 2 }} />
                        <Text style={styles.gridAddVideoBtnText}>Add Video</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Videos Grid */}
                  <View style={styles.videoGridRow}>
                    {tempData.items.filter(it => it.isVideo).map((vItem, vIdx) => {
                      const isEditingThisTitle = editingVideoId === vItem.id;
                      return (
                        <View key={vItem.id} style={styles.videoCardSlot}>
                          <View style={styles.videoSlotHeaderRow}>
                            {isEditingThisTitle ? (
                              <View style={styles.videoRenameRow}>
                                <TextInput 
                                  style={styles.videoRenameInput}
                                  value={vItem.label}
                                  autoFocus={true}
                                  onChangeText={(val) => {
                                    const updated = [...tempData.items];
                                    const idx = updated.findIndex(it => it.id === vItem.id);
                                    if (idx !== -1) {
                                      updated[idx].label = val;
                                      setTempData(prev => ({ ...prev, items: updated }));
                                    }
                                  }}
                                  placeholder={`Video ${vIdx + 1}`}
                                  placeholderTextColor="#666666"
                                />
                                <TouchableOpacity 
                                  activeOpacity={0.8}
                                  onPress={() => setEditingVideoId(null)}
                                  style={styles.videoRenameDoneBtn}
                                >
                                  <Ionicons name="checkmark" size={14} color="#ffffff" />
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View style={styles.videoTitleDisplayRow}>
                                <Text style={styles.videoTitleText} numberOfLines={1}>{vItem.label}</Text>
                                <TouchableOpacity 
                                  activeOpacity={0.7}
                                  onPress={() => setEditingVideoId(vItem.id)}
                                  style={styles.videoEditPencilBtn}
                                >
                                  <Ionicons name="pencil" size={12} color="#60A5FA" />
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>

                          <View style={styles.gridCardPreviewBox}>
                            <Image source={{ uri: vItem.uri }} style={styles.gridCardImage} />
                            <View style={styles.videoCenterPlayIndicator}>
                              <Ionicons name="play" size={14} color="#ffffff" />
                            </View>
                            <View style={styles.gridCardActionOverlay}>
                              <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={() => handleChangeMedia(vItem.id, true)}
                                style={styles.gridActionIconBtn}
                              >
                                <Ionicons name="cloud-upload" size={13} color="#ffffff" />
                              </TouchableOpacity>
                              <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={() => handleRemoveMedia(vItem.id)}
                                style={[styles.gridActionIconBtn, styles.gridDeleteBtn]}
                              >
                                <Ionicons name="trash" size={13} color="#FF6B6B" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      );
                    })}

                    {tempData.items.filter(it => it.isVideo).length < 3 && (
                      <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={handleAddVideo}
                        style={styles.gridEmptyVideoCardBox}
                      >
                        <Ionicons name="videocam-outline" size={24} color="#60A5FA" />
                        <Text style={styles.gridEmptyAddText}>+ Add Video {tempData.items.filter(it => it.isVideo).length + 1}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}

              {/* 8. Performer Projects Editor */}
              {activeModal === 'performer' && tempData.projects && (
                <View>
                  <Text style={styles.sheetTitle}>Edit Performer Work</Text>
                  {tempData.projects.map((proj, idx) => (
                    <View key={proj.id} style={[styles.modalSectionCard, { marginBottom: 14 }]}>
                      <View style={styles.modalItemHeaderRow}>
                        <View style={styles.modalBadgePill}>
                          <Text style={styles.modalBadgePillText}>{proj.category || 'Shows & Events'}</Text>
                        </View>
                        <TouchableOpacity 
                          activeOpacity={0.7}
                          onPress={() => handleRemovePerformerProject(proj.id)}
                          style={styles.modalDeleteIconBtn}
                        >
                          <Ionicons name="trash-outline" size={15} color="#FF6B6B" />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.sheetInputLabel}>CATEGORY</Text>
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                        {WORK_EXPERIENCE_CATEGORIES.map((cat) => {
                          const isCatSelected = (proj.category || 'Shows & Events') === cat;
                          return (
                            <TouchableOpacity
                              key={cat}
                              activeOpacity={0.7}
                              onPress={() => {
                                const updated = [...tempData.projects];
                                updated[idx].category = cat;
                                setTempData(prev => ({ ...prev, projects: updated }));
                              }}
                              style={[
                                styles.sheetPill,
                                isCatSelected ? styles.sheetPillSelected : styles.sheetPillUnselected,
                                { marginRight: 6, paddingVertical: 4, paddingHorizontal: 10 }
                              ]}
                            >
                              <Text style={[styles.sheetPillText, isCatSelected ? styles.sheetPillTextSelected : styles.sheetPillTextUnselected, { fontSize: 11 }]}>
                                {cat}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>

                      <Text style={[styles.sheetInputLabel, { marginTop: 4 }]}>TITLE</Text>
                      <TextInput 
                        style={styles.sheetInput}
                        value={proj.title}
                        onChangeText={(val) => {
                          const updated = [...tempData.projects];
                          updated[idx].title = val;
                          setTempData(prev => ({ ...prev, projects: updated }));
                        }}
                        placeholder="e.g. Disney's Aladdin"
                        placeholderTextColor="#777777"
                      />

                      <Text style={[styles.sheetInputLabel, { marginTop: 12 }]}>DESCRIPTION</Text>
                      <TextInput 
                        style={styles.sheetInput}
                        value={proj.details}
                        onChangeText={(val) => {
                          const updated = [...tempData.projects];
                          updated[idx].details = val;
                          setTempData(prev => ({ ...prev, projects: updated }));
                        }}
                        placeholder="e.g. Lead Dancer · 99 Shows · Musical Theatre"
                        placeholderTextColor="#777777"
                      />
                    </View>
                  ))}

                  <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={handleAddPerformerProject}
                    style={styles.modalAddDashedBtn}
                  >
                    <Ionicons name="add-circle" size={18} color="#60A5FA" style={{ marginRight: 6 }} />
                    <Text style={styles.modalAddDashedBtnText}>+ Add Performance Project</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* 9. Choreographer Projects Editor */}
              {activeModal === 'choreographer' && tempData.projects && (
                <View>
                  <Text style={styles.sheetTitle}>Edit Choreographer Work</Text>
                  {tempData.projects.map((proj, idx) => (
                    <View key={proj.id} style={[styles.modalSectionCard, { marginBottom: 14 }]}>
                      <View style={styles.modalItemHeaderRow}>
                        <View style={styles.modalBadgePill}>
                          <Text style={styles.modalBadgePillText}>{proj.category || 'Shows & Events'}</Text>
                        </View>
                        <TouchableOpacity 
                          activeOpacity={0.7}
                          onPress={() => handleRemoveChoreographerProject(proj.id)}
                          style={styles.modalDeleteIconBtn}
                        >
                          <Ionicons name="trash-outline" size={15} color="#FF6B6B" />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.sheetInputLabel}>CATEGORY</Text>
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                        {WORK_EXPERIENCE_CATEGORIES.map((cat) => {
                          const isCatSelected = (proj.category || 'Shows & Events') === cat;
                          return (
                            <TouchableOpacity
                              key={cat}
                              activeOpacity={0.7}
                              onPress={() => {
                                const updated = [...tempData.projects];
                                updated[idx].category = cat;
                                setTempData(prev => ({ ...prev, projects: updated }));
                              }}
                              style={[
                                styles.sheetPill,
                                isCatSelected ? styles.sheetPillSelected : styles.sheetPillUnselected,
                                { marginRight: 6, paddingVertical: 4, paddingHorizontal: 10 }
                              ]}
                            >
                              <Text style={[styles.sheetPillText, isCatSelected ? styles.sheetPillTextSelected : styles.sheetPillTextUnselected, { fontSize: 11 }]}>
                                {cat}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>

                      <Text style={[styles.sheetInputLabel, { marginTop: 4 }]}>TITLE</Text>
                      <TextInput 
                        style={styles.sheetInput}
                        value={proj.title}
                        onChangeText={(val) => {
                          const updated = [...tempData.projects];
                          updated[idx].title = val;
                          setTempData(prev => ({ ...prev, projects: updated }));
                        }}
                        placeholder="e.g. Badshah & Abhishek Bachchan"
                        placeholderTextColor="#777777"
                      />

                      <Text style={[styles.sheetInputLabel, { marginTop: 12 }]}>DESCRIPTION</Text>
                      <TextInput 
                        style={styles.sheetInput}
                        value={proj.details}
                        onChangeText={(val) => {
                          const updated = [...tempData.projects];
                          updated[idx].details = val;
                          setTempData(prev => ({ ...prev, projects: updated }));
                        }}
                        placeholder="e.g. Lead Choreographer · National Tour"
                        placeholderTextColor="#777777"
                      />
                    </View>
                  ))}

                  <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={handleAddChoreographerProject}
                    style={styles.modalAddDashedBtn}
                  >
                    <Ionicons name="add-circle" size={18} color="#60A5FA" style={{ marginRight: 6 }} />
                    <Text style={styles.modalAddDashedBtnText}>+ Add Choreography Project</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* 10. Training & Education Editor */}
              {activeModal === 'training' && (
                <View>
                  <Text style={styles.sheetTitle}>Edit Training & Education</Text>
                  <Text style={styles.sheetInputLabel}>DEGREE / COURSE TITLE</Text>
                  <TextInput 
                    style={styles.sheetInput}
                    value={tempData.title}
                    onChangeText={(val) => setTempData(prev => ({ ...prev, title: val }))}
                    placeholder="e.g. Diploma in Performing Arts"
                    placeholderTextColor="#777777"
                  />
                  <Text style={[styles.sheetInputLabel, { marginTop: 14 }]}>INSTITUTION</Text>
                  <TextInput 
                    style={styles.sheetInput}
                    value={tempData.institution}
                    onChangeText={(val) => setTempData(prev => ({ ...prev, institution: val }))}
                    placeholder="e.g. National Academy of Dance"
                    placeholderTextColor="#777777"
                  />
                  <Text style={[styles.sheetInputLabel, { marginTop: 14 }]}>CURRICULUM HIGHLIGHTS</Text>
                  <TextInput 
                    style={[styles.sheetInput, { height: 75, textAlignVertical: 'top' }]}
                    multiline={true}
                    value={tempData.bullet}
                    onChangeText={(val) => setTempData(prev => ({ ...prev, bullet: val }))}
                    placeholder="e.g. Classical Rhythm · Contemporary Execution"
                    placeholderTextColor="#777777"
                  />
                </View>
              )}

              {/* 11. Socials Editor (Only Instagram and YouTube Usernames) */}
              {activeModal === 'socials' && (
                <View>
                  <Text style={styles.sheetTitle}>Edit Socials</Text>
                  
                  {/* Instagram Username Field */}
                  <View style={styles.socialModalFieldBlock}>
                    <View style={styles.socialInputLabelRow}>
                      <Ionicons name="logo-instagram" size={14} color="#ffffff" style={{ marginRight: 6 }} />
                      <Text style={styles.sheetInputLabel}>INSTAGRAM USERNAME</Text>
                    </View>
                    <View style={styles.socialInputWrapper}>
                      <Text style={styles.socialPrefixText}>@</Text>
                      <TextInput 
                        style={styles.socialInputField}
                        value={tempData.instagramUsername}
                        onChangeText={(val) => setTempData(prev => ({
                          ...prev,
                          instagramUsername: val
                        }))}
                        placeholder="akashtiwari"
                        placeholderTextColor="#777777"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  {/* YouTube Username Field */}
                  <View style={[styles.socialModalFieldBlock, { marginTop: 16 }]}>
                    <View style={styles.socialInputLabelRow}>
                      <Ionicons name="logo-youtube" size={14} color="#FF0000" style={{ marginRight: 6 }} />
                      <Text style={styles.sheetInputLabel}>YOUTUBE USERNAME / CHANNEL</Text>
                    </View>
                    <View style={styles.socialInputWrapper}>
                      <Text style={styles.socialPrefixText}>@</Text>
                      <TextInput 
                        style={styles.socialInputField}
                        value={tempData.youtubeUsername}
                        onChangeText={(val) => setTempData(prev => ({
                          ...prev,
                          youtubeUsername: val
                        }))}
                        placeholder="AkashTiwariOfficial"
                        placeholderTextColor="#777777"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>
                </View>
              )}

            </ScrollView>

            {/* 4. Save/Cancel Actions */}
            <View style={[styles.sheetActionsRow, activeModal === 'gallery' && styles.gallerySheetActionsRow]}>
              <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => setActiveModal(null)} 
                style={styles.sheetCancelBtn}
              >
                <Text style={styles.sheetCancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity={0.85} 
                onPress={handleSaveModal} 
                style={styles.sheetSaveBtn}
              >
                <Text style={styles.sheetSaveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Fullscreen Media Lightbox Viewer Modal */}
      <Modal
        visible={viewerVisible}
        transparent={false}
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={closeFullscreenViewer}
      >
        <View style={styles.fullscreenModalContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />

          {/* Fullscreen Swipeable Carousel */}
          <FlatList
            ref={fullscreenFlatListRef}
            data={galleryItems}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={currentViewerIndex}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScrollToIndexFailed={(info) => {
              setTimeout(() => {
                fullscreenFlatListRef.current?.scrollToIndex({ index: info.index, animated: false });
              }, 100);
            }}
            onMomentumScrollEnd={(e) => {
              const nextIdx = Math.round(e.nativeEvent.contentOffset.x / width);
              if (nextIdx >= 0 && nextIdx < galleryItems.length) {
                setCurrentViewerIndex(nextIdx);
                setIsPlayingVideo(false);
              }
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.fullscreenSlideContainer}>
                <Image 
                  source={{ uri: item.uri }} 
                  style={styles.fullscreenImage} 
                  resizeMode="cover"
                />

                {/* If Video: Centered Play/Pause Button & Scrubber */}
                {item.isVideo && (
                  <View style={styles.fullscreenVideoOverlay}>
                    <TouchableOpacity 
                      activeOpacity={0.85}
                      onPress={() => setIsPlayingVideo(!isPlayingVideo)}
                      style={styles.fullscreenPlayCenterBtn}
                    >
                      <Ionicons 
                        name={isPlayingVideo ? "pause" : "play"} 
                        size={32} 
                        color="#ffffff" 
                        style={{ marginLeft: isPlayingVideo ? 0 : 4 }}
                      />
                    </TouchableOpacity>

                    {/* Video Timeline & Scrub Bar */}
                    <View style={styles.fullscreenVideoTimelineBox}>
                      <View style={styles.fullscreenProgressTrack}>
                        <View style={[styles.fullscreenProgressBar, { width: isPlayingVideo ? '72%' : '30%' }]} />
                      </View>
                      <View style={styles.fullscreenTimeRow}>
                        <Text style={styles.fullscreenTimeText}>{isPlayingVideo ? '0:24' : '0:10'}</Text>
                        <Text style={styles.fullscreenTimeText}>0:45</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            )}
          />

          {/* Top Header Overlay with Counter, Tag, and Close */}
          <SafeAreaView edges={['top']} style={styles.fullscreenTopHeader}>
            <View style={styles.fullscreenTopHeaderContent}>
              <View style={styles.fullscreenBadgeRow}>
                <View style={styles.fullscreenTypeBadge}>
                  <Ionicons 
                    name={galleryItems[currentViewerIndex]?.isVideo ? "videocam" : "image"} 
                    size={13} 
                    color="#60A5FA" 
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.fullscreenTypeBadgeText}>
                    {galleryItems[currentViewerIndex]?.isVideo ? 'VIDEO' : 'PHOTO'}
                  </Text>
                </View>
                <Text style={styles.fullscreenCounterText}>
                  {currentViewerIndex + 1} / {galleryItems.length}
                </Text>
              </View>

              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={closeFullscreenViewer} 
                style={styles.fullscreenCloseBtn}
              >
                <Ionicons name="close" size={22} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Left Navigation Chevron */}
          {currentViewerIndex > 0 && (
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => {
                const next = currentViewerIndex - 1;
                fullscreenFlatListRef.current?.scrollToIndex({ index: next, animated: true });
                setCurrentViewerIndex(next);
                setIsPlayingVideo(false);
              }}
              style={[styles.fullscreenNavBtn, styles.fullscreenNavLeft]}
            >
              <Ionicons name="chevron-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}

          {/* Right Navigation Chevron */}
          {currentViewerIndex < galleryItems.length - 1 && (
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => {
                const next = currentViewerIndex + 1;
                fullscreenFlatListRef.current?.scrollToIndex({ index: next, animated: true });
                setCurrentViewerIndex(next);
                setIsPlayingVideo(false);
              }}
              style={[styles.fullscreenNavBtn, styles.fullscreenNavRight]}
            >
              <Ionicons name="chevron-forward" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}

          {/* Bottom Title & Hint Overlay */}
          <SafeAreaView edges={['bottom']} style={styles.fullscreenBottomOverlay}>
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.94)']}
              style={styles.fullscreenBottomGradient}
            >
              <Text style={styles.fullscreenTitleText}>
                {galleryItems[currentViewerIndex]?.label}
              </Text>
              <Text style={styles.fullscreenSubtitleText}>
                {galleryItems[currentViewerIndex]?.isVideo 
                  ? 'Tap center button to play / pause · Swipe left or right to browse' 
                  : 'Swipe left or right to browse photos · Tap close to exit'}
              </Text>
            </LinearGradient>
          </SafeAreaView>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const bulletDot = {
  color: '#60A5FA',
  fontSize: 14,
  marginRight: 6,
  marginTop: 1,
  fontFamily: 'AirbnbCereal-Medium',
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

  /* Master Card Architecture */
  cardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#18181A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardGradient: {
    flex: 1,
    borderRadius: 24,
  },
  cardBlurContent: {
    padding: 18,
  },
  cardBlurContentCompact: {
    padding: 16,
  },
  cardHeaderLabel: {
    color: '#8E8E93',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    includeFontPadding: false,
  },

  /* Hero Split Card Specifics */
  airbnbSplitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  airbnbLeftCol: {
    flex: 1.1,
    alignItems: 'center',
    paddingRight: 6,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  avatarCircleBlue: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#18181A',
  },
  airbnbNameText: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 8,
  },
  locationBelowNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  locationBelowNameText: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    color: '#8E8E93',
    textAlign: 'center',
  },
  columnDivider: {
    width: 1,
    height: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginHorizontal: 12,
  },
  airbnbRightCol: {
    flex: 0.9,
    paddingLeft: 4,
    justifyContent: 'center',
  },
  metricRowWithHint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricBlock: {
    paddingVertical: 1,
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
    color: '#8E8E93',
    marginTop: 2,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    marginVertical: 7,
  },
  shareProfileButton: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 13,
    marginTop: 18,
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
  halfCardWrapper: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#18181A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
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
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.35)',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  tagPillText: {
    color: '#60A5FA',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Medium',
    fontWeight: '600',
  },

  /* Demographics 3-Column Side-by-Side Row Layout */
  demographicsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  tripletCardWrapper: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#18181A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardBlurContentSmall: {
    padding: 14,
  },
  demoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  demoValueSmall: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
  },

  /* Editorial Gallery Layout */
  galleryViewportContainer: {
    position: 'relative',
  },
  floatingArrowBtn: {
    position: 'absolute',
    top: '50%',
    marginTop: -14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  floatingArrowLeft: {
    left: -6,
  },
  floatingArrowRight: {
    right: -6,
  },
  galleryScrollContainer: {
    flexDirection: 'row',
    gap: GALLERY_GAP,
  },
  galleryCardItem: {
    width: GALLERY_CARD_WIDTH,
    height: GALLERY_CARD_HEIGHT,
    borderRadius: 14,
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
  galleryPlayBadge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    paddingLeft: 2,
  },
  galleryCardGradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 18,
    paddingBottom: 6,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  galleryCardLabelText: {
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#ffffff',
    textAlign: 'center',
  },
  dotsContainerCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 18,
    backgroundColor: '#1D4ED8',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },

  /* Work Experience Styles */
  expFilterScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2,
    marginBottom: 16,
  },
  expFilterPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  activePillBlue: {
    backgroundColor: 'rgba(29, 78, 216, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  activePillText: {
    color: '#60A5FA',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Medium',
    fontWeight: '600',
  },
  inactivePillBorder: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  inactivePillText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
  },
  expEmptySubCatBlock: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expEmptySubCatText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Book',
    fontStyle: 'italic',
  },
  expProjectBlock: {
    marginBottom: 16,
  },
  expProjectHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  expProjectTitleText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
  },
  expSubEntryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    paddingLeft: 8,
  },
  expLeftAccentLine: {
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 10,
    borderRadius: 1,
  },
  expSubEntryText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Book',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 19,
    marginRight: 8,
    letterSpacing: 0.2,
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

  /* Skill Cloud Card Styles */
  skillCloudCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  skillCloudHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  skillCloudHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
  },
  skillPillCloud: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillPill: {
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(29, 78, 216, 0.3)',
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skillPillText: {
    color: '#60A5FA',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'AirbnbCereal-Medium',
  },

  /* Floating Centered Dialog Edit Modal Styles */
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 24,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 24,
  },
  gallerySheetContainer: {
    width: '95%',
    maxWidth: 450,
    maxHeight: '94%',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
  },
  gallerySheetScrollBody: {
    maxHeight: undefined,
  },
  gallerySheetActionsRow: {
    marginTop: 14,
  },
  birthdayTitle: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  birthdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  birthdayDropdownBlock: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  birthdayDropdownBlockActive: {
    borderColor: '#1D4ED8',
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
  },
  birthdayDropdownText: {
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#ffffff',
  },
  birthdayPickerOptionsContainer: {
    marginTop: 10,
    backgroundColor: '#222222',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    maxHeight: 160,
    overflow: 'hidden',
  },
  birthdayPickerScroll: {
    paddingVertical: 4,
  },
  birthdayOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  birthdayOptionItemActive: {
    backgroundColor: 'rgba(29, 78, 216, 0.25)',
  },
  birthdayOptionText: {
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Medium',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  birthdayOptionTextActive: {
    color: '#ffffff',
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
  },
  calculatedAgeBox: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculatedAgeText: {
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  socialModalFieldBlock: {
    width: '100%',
  },
  socialInputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  socialInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  socialPrefixText: {
    color: '#60A5FA',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    marginRight: 4,
  },
  socialInputField: {
    flex: 1,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Medium',
  },
  genderTitle: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  genderSegmentedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    width: '100%',
  },
  genderSegmentBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderSegmentBtnSelected: {
    backgroundColor: '#1D4ED8',
    borderWidth: 1,
    borderColor: '#1D4ED8',
  },
  genderSegmentBtnUnselected: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  genderSegmentText: {
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Medium',
  },
  genderSegmentTextSelected: {
    color: '#ffffff',
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
  },
  genderSegmentTextUnselected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  artistModalTitle: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  artistModalSubtitle: {
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 20,
  },
  artistPillsWrapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 6,
  },
  sheetHandleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
    marginBottom: 18,
  },
  sheetScrollBody: {
    maxHeight: 480,
  },
  sheetTitle: {
    fontSize: 18,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 18,
  },
  sheetInputLabel: {
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  sheetInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Medium',
  },
  sheetHeightRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sheetHeightCol: {
    flex: 1,
  },
  sheetPillWrapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  sheetPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9999,
  },
  sheetPillSelected: {
    backgroundColor: '#1D4ED8',
    borderWidth: 1,
    borderColor: '#1D4ED8',
  },
  sheetPillUnselected: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sheetPillText: {
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Medium',
  },
  sheetPillTextSelected: {
    color: '#ffffff',
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
  },
  sheetPillTextUnselected: {
    color: '#ffffff',
  },
  sheetActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    gap: 12,
  },
  sheetCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sheetCancelBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Medium',
  },
  sheetSaveBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D4ED8',
  },
  sheetSaveBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
  },
  modalDemographicsGridRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalDemoCol: {
    flex: 1,
  },
  modalItemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalBadgePill: {
    backgroundColor: 'rgba(30, 58, 138, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.35)',
  },
  modalBadgePillText: {
    color: '#93C5FD',
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  modalDeleteIconBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(60, 0, 0, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalAddDashedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(96, 165, 250, 0.4)',
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 4,
  },
  modalAddDashedBtnText: {
    color: '#93C5FD',
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  modalInstaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  modalInstaTile: {
    width: '48%',
    marginBottom: 6,
  },
  modalSaveButtonWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalSaveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
  },
  modalSaveButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
  },

  /* Fullscreen Media Lightbox Styles */
  fullscreenModalContainer: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },
  fullscreenSlideContainer: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    position: 'relative',
  },
  fullscreenImage: {
    width: width,
    height: '100%',
  },
  fullscreenVideoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenPlayCenterBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  fullscreenVideoTimelineBox: {
    position: 'absolute',
    bottom: 110,
    left: 24,
    right: 24,
  },
  fullscreenProgressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    overflow: 'hidden',
    marginBottom: 6,
  },
  fullscreenProgressBar: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#3B82F6',
  },
  fullscreenTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fullscreenTimeText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'AirbnbCereal-Book',
  },
  fullscreenTopHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  fullscreenTopHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  fullscreenBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fullscreenTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 58, 138, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  fullscreenTypeBadgeText: {
    color: '#93C5FD',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  fullscreenCounterText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Medium',
    fontWeight: '600',
  },
  fullscreenCloseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenNavBtn: {
    position: 'absolute',
    top: '50%',
    marginTop: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  fullscreenNavLeft: {
    left: 12,
  },
  fullscreenNavRight: {
    right: 12,
  },
  fullscreenBottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  fullscreenBottomGradient: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 24,
  },
  fullscreenTitleText: {
    fontSize: 20,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  fullscreenSubtitleText: {
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Book',
    color: 'rgba(255, 255, 255, 0.65)',
  },

  /* Gallery Grid Manager Styles */
  gridManagerWrapper: {
    paddingVertical: 4,
  },
  gridSectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gridSectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridSectionTitle: {
    color: '#60A5FA',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  gridStrictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  gridStrictBadgeText: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'AirbnbCereal-Medium',
  },
  gridSectionSubtext: {
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Book',
    color: 'rgba(255, 255, 255, 0.55)',
    marginBottom: 10,
  },
  photoGridRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  gridCardSlot: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 6,
    alignItems: 'center',
  },
  gridSlotHeader: {
    marginBottom: 6,
    alignItems: 'center',
  },
  gridSlotTitleText: {
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
  },
  gridCardPreviewBox: {
    width: '100%',
    height: 142,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  gridCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridCardActionOverlay: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridActionIconBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridDeleteBtn: {
    backgroundColor: 'rgba(60, 0, 0, 0.8)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  gridEmptyCardBox: {
    width: '100%',
    height: 142,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(96, 165, 250, 0.4)',
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  gridEmptyAddText: {
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#93C5FD',
    marginTop: 4,
    textAlign: 'center',
  },
  videoGridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  videoCardSlot: {
    width: '31.5%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 6,
    alignItems: 'center',
  },
  videoSlotHeaderRow: {
    width: '100%',
    marginBottom: 6,
    minHeight: 22,
    justifyContent: 'center',
  },
  videoTitleDisplayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 2,
  },
  videoTitleText: {
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
  },
  videoEditPencilBtn: {
    padding: 2,
    marginLeft: 2,
  },
  videoRenameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  videoRenameInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 10,
    color: '#ffffff',
    fontFamily: 'AirbnbCereal-Book',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  videoRenameDoneBtn: {
    backgroundColor: '#1D4ED8',
    borderRadius: 6,
    padding: 3,
    marginLeft: 3,
  },
  videoCenterPlayIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -14,
    marginLeft: -14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
  },
  gridEmptyVideoCardBox: {
    width: '31.5%',
    height: 180,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(96, 165, 250, 0.4)',
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  gridAddVideoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D4ED8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  gridAddVideoBtnText: {
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
    color: '#ffffff',
    fontWeight: '700',
  },

  /* Socials Component Styles (Google Creator Profiles Inspired) */
  socialsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  creatorVerifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 58, 138, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  creatorVerifiedText: {
    fontSize: 9,
    color: '#93C5FD',
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  socialsPillContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    width: '100%',
  },
  platformPill: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  platformPillActive: {
    borderColor: '#1D4ED8',
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
  },
  platformIconCircleInstaGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    padding: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  platformIconCircleInstaInner: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#090A0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformIconCircleYoutubeGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    padding: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  platformIconCircleYoutubeInner: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#090A0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformPillTextStack: {
    flex: 1,
    justifyContent: 'center',
  },
  platformNameText: {
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  platformStatText: {
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Book',
    color: '#929292',
    marginTop: 1,
  },
  activeDotIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#60A5FA',
  },
  socialsExpandedContent: {
    width: '100%',
  },
  insightsSectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  insightsSectionTitle: {
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    color: '#60A5FA',
    letterSpacing: 0.6,
  },
  insightsLiveDot: {
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Medium',
    color: '#10B981',
  },
  socialEmbedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.09)',
    borderRadius: 20,
    padding: 16,
    marginTop: 4,
  },
  embedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  embedProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  embedAvatarInstaGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    padding: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  embedAvatarInstaInner: {
    width: '100%',
    height: '100%',
    borderRadius: 17,
    backgroundColor: '#090A0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  embedAvatarYoutube: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  embedAvatarText: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  embedNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  embedHandleText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  embedSubtext: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Book',
    marginTop: 1,
  },
  embedVisitBtnGradientWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  embedVisitBtnGradientBorder: {
    padding: 1,
    borderRadius: 12,
  },
  embedVisitBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#090A0F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 11,
  },
  embedVisitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  embedVisitBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'AirbnbCereal-Medium',
  },
  embedFeedGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  embedPostItem: {
    flex: 1,
    height: 110,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  embedPostImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  embedPostReelBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  embedPostOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 6,
    alignItems: 'center',
  },
  embedPostStatText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
  },
  embedFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  embedFooterText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    fontFamily: 'AirbnbCereal-Book',
  },
  youtubeFeaturedEmbed: {
    width: '100%',
    height: 140,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
  },
  youtubeFeaturedThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  youtubeCenterPlayBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -22,
    marginLeft: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  youtubeDurationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  youtubeDurationText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'AirbnbCereal-Bold',
  },
  youtubeVideoTitleText: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'AirbnbCereal-Bold',
    fontWeight: '700',
    marginBottom: 10,
  },
});
