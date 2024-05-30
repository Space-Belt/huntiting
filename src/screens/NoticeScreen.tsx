import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import {useNavigation} from '@react-navigation/native';
import NoticeComponent from '../components/Notice/NoticeComponent';
import ReusableModal from '../components/ReusableModal';
import FastImage from 'react-native-fast-image';
import {getLayout} from '../utils/getLayout';
import ImageShowModal from '../components/Modal/ImageShowModal';

interface Props {}

export interface INotice {
  id: number;
  title: string;
  content: string;
  images: string[];
}

const NoticeScreen = (props: Props) => {
  const navigation = useNavigation();

  const [noticeData, setNoticeData] = React.useState<INotice[]>([
    {
      id: 1,
      title: '사기피해 발생 시 적극 수사 협조 하도록 하겠습니다.',
      content:
        '사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.',
      images: ['https://picsum.photos/200', 'https://picsum.photos/200'],
    },
    {
      id: 2,
      title: '사기피해 발생 시 적극 수사 협조 하도록 하겠습니다.',
      content:
        '사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.사기피해가 급증하고 있습니다. 온라인을 통해 거래시 유의하여 주시기 바랍니다.',
      images: ['https://picsum.photos/200', 'https://picsum.photos/200'],
    },
  ]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number>();

  const onClose = () => {
    setModalOpen(prev => !prev);
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title="공지사항"
          handleBackBtn={() => navigation.goBack()}
        />
        {noticeData.map((data, index) => (
          <NoticeComponent
            key={`${data.id}_${index}`}
            data={data}
            indexNum={index}
            setModalOpen={setModalOpen}
            setSelectedIndex={setSelectedIndex}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        ))}
        <ReusableModal
          visible={modalOpen}
          animationType="fade"
          children={
            <ImageShowModal
              onClose={onClose}
              image={
                selectedIndex && selectedImageIndex
                  ? noticeData[selectedIndex].images[selectedImageIndex]
                  : ''
              }
              index={selectedImageIndex ? selectedImageIndex : 0}
            />
          }
          onClose={onClose}
        />
      </>
    </WholeWrapper>
  );
};

export default NoticeScreen;

const styles = StyleSheet.create({});
