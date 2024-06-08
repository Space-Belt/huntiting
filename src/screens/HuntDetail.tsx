import React from 'react';
import {
  ActionSheetIOS,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import BottomDeal from '../components/Detail/BottomDeal';
import ProductDescribe from '../components/Detail/ProductDescribe';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import {getLayout} from '../utils/getLayout';
import MoreBtn from '../assets/icons/moreBtn.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../theme/theme';
import ReusableModal from '../components/ReusableModal';
import HuntEditModal from '../components/Modal/HuntEditModal';
import {RootStackParamList} from '../App';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';

type Props = {};

const width = getLayout();

const lorem: string =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia rhoncus tortor ac tristique. Maecenas tincidunt quis quam varius fringilla. Mauris sit amet mi turpis. Praesent sit amet consectetur eros. Maecenas tempor consequat commodo. Mauris convallis ipsum at consequat condimentum. Nulla lacinia lacus sem, sed congue mi posuere id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque hendrerit cursus gravida. Duis at dictum nisl. Nulla ligula justo, luctus non felis quis, vestibulum dictum velit. Sed sit amet volutpat metus. Mauris dictum sit amet nisl sed viverra. Pellentesque a nisi eget risus iaculis aliquam. Nam pretium at leo nec consectetur.';

type IRequestProps = NativeStackScreenProps<RootStackParamList, 'request'>;

const HuntDetail = ({route, navigation}: IRequestProps) => {
  const [isMine, setIsMine] = React.useState<boolean>(true);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const renderItem = (item: any) => {
    return <FastImage source={{uri: item}} style={styles.imageStyle} />;
  };

  const handleChat = () => {
    navigation.navigate('chatRoom' as never);
  };

  const handleMoreBtn = () => {};
  const onClose = () => {
    if (Platform.OS === 'android') {
      setModalOpen(prev => !prev);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['수정', '완료처리', '대기처리', '삭제', '취소'],
          cancelButtonIndex: 4,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            navigation.navigate('request', {id: 1});
          } else if (buttonIndex === 1) {
          }
        },
      );
    }
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={'상세보기'}
          handleBackBtn={() => navigation.goBack()}
          rightBtnIcon={
            isMine ? (
              <TouchableOpacity
                onPress={() => {
                  onClose();
                }}>
                <MoreBtn style={styles.moreBtn} />
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
        />
        <ScrollView style={styles.scrollStyle}>
          <View style={styles.imageWrapper}>
            <Carousel
              loop
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
            createdAt={'2024/05/20'}
            description={lorem}
          />
        </ScrollView>
        <BottomDeal count={5} price={10000} onPress={handleChat} />
        <ReusableModal
          animationType="fade"
          onClose={handleMoreBtn}
          visible={modalOpen}
          children={
            <HuntEditModal
              onClose={() => {
                setModalOpen(false);
              }}
            />
          }
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
  moreBtn: {
    width: 30,
    height: 30,
    color: COLORS.Orange,
  },
  scrollStyle: {flex: 1},
  detailContainer: {},
});
