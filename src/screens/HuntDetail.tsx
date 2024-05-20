import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import {getLayout} from '../utils/getLayout';

type Props = {};

const HuntDetail = (props: Props) => {
  const renderItem = (item: any) => {
    return (
      <View>
        <FastImage source={{uri: item}} style={styles.imageStyle} />
      </View>
    );
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader title={'상세보기'} />
        <View>
          <Carousel
            loop
            width={getLayout()}
            height={getLayout()}
            autoPlay={true}
            data={[
              'https://picsum.photos/400',
              'https://picsum.photos/400',
              'https://picsum.photos/400',
            ]}
            renderItem={({item}) => renderItem(item)}
          />
        </View>
      </>
    </WholeWrapper>
  );
};

export default HuntDetail;

const styles = StyleSheet.create({
  imageWrapper: {},
  imageStyle: {
    width: getLayout(),
    height: getLayout(),
    resizeMode: 'cover',
  },
});
