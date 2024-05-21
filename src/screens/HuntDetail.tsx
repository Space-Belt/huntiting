import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import {getLayout} from '../utils/getLayout';
import ProductDescribe from '../components/Detail/ProductDescribe';
import BottomDeal from '../components/Detail/BottomDeal';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const width = getLayout();

const lorem: string =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia rhoncus tortor ac tristique. Maecenas tincidunt quis quam varius fringilla. Mauris sit amet mi turpis. Praesent sit amet consectetur eros. Maecenas tempor consequat commodo. Mauris convallis ipsum at consequat condimentum. Nulla lacinia lacus sem, sed congue mi posuere id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque hendrerit cursus gravida. Duis at dictum nisl. Nulla ligula justo, luctus non felis quis, vestibulum dictum velit. Sed sit amet volutpat metus. Mauris dictum sit amet nisl sed viverra. Pellentesque a nisi eget risus iaculis aliquam. Nam pretium at leo nec consectetur.';

const HuntDetail = (props: Props) => {
  const navigation = useNavigation();

  const renderItem = (item: any) => {
    return <FastImage source={{uri: item}} style={styles.imageStyle} />;
  };

  const handleChat = () => {
    navigation.navigate('chatRoom' as never);
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader title={'상세보기'} />
        <ScrollView style={styles.scrollStyle}>
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
            description={lorem}
            count={10}
          />
        </ScrollView>
        <BottomDeal count={5} price={10000} onPress={handleChat} />
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
  scrollStyle: {flex: 1},
  detailContainer: {},
});
