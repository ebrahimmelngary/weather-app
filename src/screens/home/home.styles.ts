import {StyleSheet} from 'react-native';
import {COLORS} from '../../common/colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  imageBackGroundStyle: {
    flexGrow: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  headerTextStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.white,
  },
  hourTextStyle: {
    color: COLORS.white,
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  weatherStatusContainer: {
    marginVertical: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryContainer: {
    padding: 16,
    flexDirection: 'row',
  },
  countryTextStyle: {
    fontWeight: '500',
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  conditionTextStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.white,
  },
  loaderStyle: {
    top: 25,
  },
});
