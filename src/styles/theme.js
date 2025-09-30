import { StyleSheet, Dimensions } from 'react-native';
import { THEME_COLORS, APP_CONFIG } from '../utils/constants';

const { width, height } = Dimensions.get('window');

export const WHEEL_SIZE = Math.min(width * 0.95, height * 0.70);
export const CENTER_LOGO_SIZE = Math.min(WHEEL_SIZE * 0.25, 150);

export const theme = {
  colors: THEME_COLORS,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    round: 50,
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    huge: 32,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 16,
    },
  },
};

export const commonStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  
  // Text
  text: {
    color: theme.colors.DARK_GRAY,
    fontSize: theme.fontSize.md,
  },
  textXs: {
    fontSize: theme.fontSize.xs,
  },
  textSm: {
    fontSize: theme.fontSize.sm,
  },
  textMd: {
    fontSize: theme.fontSize.md,
  },
  textLg: {
    fontSize: theme.fontSize.lg,
  },
  textXl: {
    fontSize: theme.fontSize.xl,
  },
  textXxl: {
    fontSize: theme.fontSize.xxl,
  },
  textXxxl: {
    fontSize: theme.fontSize.xxxl,
  },
  textHuge: {
    fontSize: theme.fontSize.huge,
  },
  textBold: {
    fontWeight: theme.fontWeight.bold,
  },
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  
  // Colors
  textPrimary: {
    color: theme.colors.PRIMARY,
  },
  textSecondary: {
    color: theme.colors.SECONDARY,
  },
  textWhite: {
    color: theme.colors.WHITE,
  },
  textGray: {
    color: theme.colors.GRAY,
  },
  textDark: {
    color: theme.colors.DARK_GRAY,
  },
  
  // Backgrounds
  bgPrimary: {
    backgroundColor: theme.colors.PRIMARY,
  },
  bgSecondary: {
    backgroundColor: theme.colors.SECONDARY,
  },
  bgWhite: {
    backgroundColor: theme.colors.WHITE,
  },
  bgGray: {
    backgroundColor: theme.colors.LIGHT_GRAY,
  },
  
  // Spacing
  pXs: { padding: theme.spacing.xs },
  pSm: { padding: theme.spacing.sm },
  pMd: { padding: theme.spacing.md },
  pLg: { padding: theme.spacing.lg },
  pXl: { padding: theme.spacing.xl },
  pXxl: { padding: theme.spacing.xxl },
  
  pxXs: { paddingHorizontal: theme.spacing.xs },
  pxSm: { paddingHorizontal: theme.spacing.sm },
  pxMd: { paddingHorizontal: theme.spacing.md },
  pxLg: { paddingHorizontal: theme.spacing.lg },
  pxXl: { paddingHorizontal: theme.spacing.xl },
  pxXxl: { paddingHorizontal: theme.spacing.xxl },
  
  pyXs: { paddingVertical: theme.spacing.xs },
  pySm: { paddingVertical: theme.spacing.sm },
  pyMd: { paddingVertical: theme.spacing.md },
  pyLg: { paddingVertical: theme.spacing.lg },
  pyXl: { paddingVertical: theme.spacing.xl },
  pyXxl: { paddingVertical: theme.spacing.xxl },
  
  mXs: { margin: theme.spacing.xs },
  mSm: { margin: theme.spacing.sm },
  mMd: { margin: theme.spacing.md },
  mLg: { margin: theme.spacing.lg },
  mXl: { margin: theme.spacing.xl },
  mXxl: { margin: theme.spacing.xxl },
  
  mxXs: { marginHorizontal: theme.spacing.xs },
  mxSm: { marginHorizontal: theme.spacing.sm },
  mxMd: { marginHorizontal: theme.spacing.md },
  mxLg: { marginHorizontal: theme.spacing.lg },
  mxXl: { marginHorizontal: theme.spacing.xl },
  mxXxl: { marginHorizontal: theme.spacing.xxl },
  
  myXs: { marginVertical: theme.spacing.xs },
  mySm: { marginVertical: theme.spacing.sm },
  myMd: { marginVertical: theme.spacing.md },
  myLg: { marginVertical: theme.spacing.lg },
  myXl: { marginVertical: theme.spacing.xl },
  myXxl: { marginVertical: theme.spacing.xxl },
  
  // Borders
  border: {
    borderWidth: 1,
    borderColor: theme.colors.LIGHT_GRAY,
  },
  borderPrimary: {
    borderWidth: 1,
    borderColor: theme.colors.PRIMARY,
  },
  borderSecondary: {
    borderWidth: 1,
    borderColor: theme.colors.SECONDARY,
  },
  
  // Border radius
  roundedSm: { borderRadius: theme.borderRadius.sm },
  roundedMd: { borderRadius: theme.borderRadius.md },
  roundedLg: { borderRadius: theme.borderRadius.lg },
  roundedXl: { borderRadius: theme.borderRadius.xl },
  roundedXxl: { borderRadius: theme.borderRadius.xxl },
  rounded: { borderRadius: theme.borderRadius.round },
  
  // Shadows
  shadowSm: theme.shadows.sm,
  shadowMd: theme.shadows.md,
  shadowLg: theme.shadows.lg,
  shadowXl: theme.shadows.xl,
  
  // Buttons
  button: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: theme.colors.PRIMARY,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.SECONDARY,
  },
  buttonWhite: {
    backgroundColor: theme.colors.WHITE,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.LIGHT_GRAY,
    opacity: 0.6,
  },
  
  // Cards
  card: {
    backgroundColor: theme.colors.WHITE,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  
  // Inputs
  input: {
    borderWidth: 1,
    borderColor: theme.colors.LIGHT_GRAY,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    backgroundColor: theme.colors.WHITE,
  },
  inputFocused: {
    borderColor: theme.colors.PRIMARY,
    borderWidth: 2,
  },
  inputError: {
    borderColor: theme.colors.ERROR,
  },
  
  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.WHITE,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    width: '90%',
    maxWidth: 400,
    ...theme.shadows.xl,
  },
  
  // FAB
  fab: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
    zIndex: 1000,
  },
  
  // Tabs
  tab: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
  },
  tabActive: {
    backgroundColor: theme.colors.SECONDARY,
  },
  tabText: {
    color: theme.colors.WHITE,
    fontWeight: theme.fontWeight.bold,
  },
  tabTextActive: {
    color: theme.colors.PRIMARY,
  },
});

export const wheelStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  wheelWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelContainer: {
    // Clean container without shadows
  },
  centerLogo: {
    position: 'absolute',
    width: CENTER_LOGO_SIZE,
    height: CENTER_LOGO_SIZE,
    borderRadius: CENTER_LOGO_SIZE / 2,
    backgroundColor: theme.colors.ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: theme.colors.SECONDARY,
    ...theme.shadows.lg,
    zIndex: 200,
    padding: 4,
  },
  logoImage: {
    width: CENTER_LOGO_SIZE * 0.7,
    height: CENTER_LOGO_SIZE * 0.7,
  },
  pointerContainer: {
    position: 'absolute',
    right: -30,
    top: '50%',
    zIndex: 150,
    transform: [{ translateY: -20 }],
  },
  pointerSvg: {
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
  },
});

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
  },
  catchphraseContainer: {
    backgroundColor: theme.colors.PRIMARY,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.SECONDARY,
    ...theme.shadows.md,
  },
  catchphrase: {
    color: theme.colors.SECONDARY,
    fontSize: theme.fontSize.huge,
    fontWeight: theme.fontWeight.black,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  header: {
    backgroundColor: theme.colors.PRIMARY,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.SECONDARY,
  },
  headerTitle: {
    color: theme.colors.WHITE,
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 250,
    zIndex: 10,
  },
  expandedMenu: {
    position: 'absolute',
    bottom: 60,
    right: 0,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  fabSubButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.md,
  },
  activeFabButton: {
    backgroundColor: theme.colors.SECONDARY,
  },
  fabSubButtonText: {
    fontSize: theme.fontSize.xxl,
    color: theme.colors.WHITE,
  },
  mainFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
    zIndex: 1000,
  },
  mainFabText: {
    fontSize: theme.fontSize.huge,
    color: theme.colors.PRIMARY,
    fontWeight: theme.fontWeight.bold,
  },
  mainFabTextRotated: {
    transform: [{ rotate: '45deg' }],
  },
});

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
    padding: theme.spacing.xl,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.PRIMARY,
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  activeTab: {
    backgroundColor: theme.colors.SECONDARY,
  },
  tabText: {
    color: theme.colors.WHITE,
    fontWeight: theme.fontWeight.bold,
  },
  activeTabText: {
    color: theme.colors.PRIMARY,
  },
  section: {
    backgroundColor: theme.colors.WHITE,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.PRIMARY,
  },
  addButton: {
    backgroundColor: theme.colors.PRIMARY,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: theme.colors.WHITE,
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.LIGHT_GRAY,
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.LIGHT_GRAY,
  },
  categoryInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  categoryName: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.DARK_GRAY,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: 2,
  },
  categoryColorName: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.GRAY,
    fontStyle: 'italic',
  },
  categoryActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.LIGHT_GRAY,
  },
  settingLabel: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.DARK_GRAY,
  },
  historyItem: {
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.LIGHT_GRAY,
  },
  historyText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.DARK_GRAY,
    fontWeight: theme.fontWeight.medium,
  },
  historyDate: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.GRAY,
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.GRAY,
    fontStyle: 'italic',
    paddingVertical: theme.spacing.xl,
  },
});

export const spinWheelScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  containerCustom: {
    backgroundColor: theme.colors.WHITE,
  },
  wheelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 10,
    maxHeight: '75%',
  },
  keyboardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
    paddingBottom: theme.spacing.xl + 10,
    zIndex: 5,
  },
  keyboardInstruction: {
    color: theme.colors.PRIMARY,
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.SECONDARY,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: theme.colors.PRIMARY,
    ...theme.shadows.md,
  },
  keyboardInstructionDisabled: {
    backgroundColor: theme.colors.LIGHT_GRAY,
    color: theme.colors.GRAY,
    borderColor: theme.colors.GRAY,
  },
  celebrationModal: {
    backgroundColor: theme.colors.ACCENT,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl + 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    maxWidth: 400,
    borderWidth: 4,
    borderColor: theme.colors.SECONDARY,
    ...theme.shadows.xl,
    position: 'relative',
  },
  celebrationTitle: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.PRIMARY,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    textShadowColor: 'rgba(255,215,0,0.8)',
    zIndex: 10,
  },
  celebrationPrize: {
    fontSize: theme.fontSize.huge,
    fontWeight: theme.fontWeight.black,
    color: theme.colors.SECONDARY,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    textShadowColor: 'rgba(178,34,34,0.8)',
    zIndex: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  celebrationSubtext: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.PRIMARY,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    fontStyle: 'italic',
    zIndex: 10,
  },
});
