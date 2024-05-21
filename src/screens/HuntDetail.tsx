import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import {getLayout} from '../utils/getLayout';
import ProductDescribe from '../components/Detail/ProductDescribe';

type Props = {};

const width = getLayout();

const HuntDetail = (props: Props) => {
  const renderItem = (item: any) => {
    return <FastImage source={{uri: item}} style={styles.imageStyle} />;
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader title={'상세보기'} />
        <View style={styles.imageWrapper}>
          <Carousel
            loop
            // mode={'parallax'}
            width={width}
            height={width}
            data={[
              'https://picsum.photos/400',
              'https://picsum.photos/400',
              'https://picsum.photos/400',
            ]}
            renderItem={({item}) => renderItem(item)}
          />
        </View>
        <ProductDescribe
          name={'폴로 빈티지 제품'}
          price={10000}
          description={'2023년 스투시랑 콜라보한 제품입니다'}
          count={10}
        />
      </>
    </WholeWrapper>
  );
};

export default HuntDetail;

const styles = StyleSheet.create({
  imageWrapper: {width: width, height: width},
  imageStyle: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  detailContainer: {},
});
