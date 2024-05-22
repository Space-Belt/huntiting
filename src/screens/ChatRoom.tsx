import {ScrollView, SectionList, StyleSheet, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import ChattingBottomInput from '../components/Chat/ChattingBottomInput';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const chatMessage: {
  message_id: string;
  chat_room_id: string;
  sender_id: string;
  content: string;
  timestamp: string;
  message_type: string;
  status: string;
}[] = [
  {
    message_id: 'message_1',
    chat_room_id: 'chat_room_1',
    sender_id: 'sender_1',
    content: '안녕하세요!!',
    timestamp: '2024/05/21 09:00',
    message_type: 'text',
    status: 'read',
  },
  {
    message_id: 'message_2',
    chat_room_id: 'chat_room_1',
    sender_id: 'sender_2',
    content: '네 안녕하세요!!',
    timestamp: '2024/05/21 09:15',
    message_type: 'text',
    status: 'unRead',
  },
];

const ChatRoom = (props: Props) => {
  const navigation = useNavigation();
  const [nickName, setNickName] = React.useState<string>('하이룽');

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={`${nickName} 님 과의 채팅`}
          handleBackBtn={() => navigation.goBack()}
        />
        <ScrollView style={styles.scrollContainer}>
          {/* <SectionList data={chatMessage} /> */}
        </ScrollView>
        <ChattingBottomInput />
      </>
    </WholeWrapper>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
});
