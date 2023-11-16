import {StyleSheet} from 'react-native';
import {COLORS} from '../../common/colors';

export default StyleSheet.create({
  imageStyle: {
    width: 50,
    height: 50,
  },
  cardStyle: {
    backgroundColor: COLORS.white,
    width: 100,
    height: 100,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  columnWrapperStyle: {
    justifyContent: 'space-around',
  },
});
