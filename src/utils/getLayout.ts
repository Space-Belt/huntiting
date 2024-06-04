import {Dimensions} from 'react-native';

export const getLayout = () => {
  const {width, height} = Dimensions.get('window');
  return width;
};
