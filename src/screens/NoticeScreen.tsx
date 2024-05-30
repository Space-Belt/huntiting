import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import {useNavigation} from '@react-navigation/native';
import NoticeComponent from '../components/Notice/NoticeComponent';

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

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title="공지사항"
          handleBackBtn={() => navigation.goBack()}
        />
        {noticeData.map((data, index) => (
          <NoticeComponent data={data} indexNum={index} />
        ))}
      </>
    </WholeWrapper>
  );
};

export default NoticeScreen;

const styles = StyleSheet.create({});
