import {
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import ChattingBottomInput from '../components/Chat/ChattingBottomInput';
import {useNavigation} from '@react-navigation/native';
import {getLayout} from '../utils/getLayout';
import {COLORS} from '../theme/theme';
import moment from 'moment';

type Props = {};

interface IChat {
  message_id: string;
  chat_room_id: string;
  sender_id: string;
  content: string;
  timestamp: string;
  message_type: string;
  status: string;
}

const myId = 'sender_1';

const width = getLayout();

const ChatRoom = (props: Props) => {
  const navigation = useNavigation();

  const flatListRef = useRef<FlatList>(null);

  const [nickName, setNickName] = React.useState<string>('하이룽');

  const [message, setMessage] = React.useState<string>('');

  const [chatMessage, setChatMessage] = React.useState<IChat[]>([
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
  ]);

  const renderItem = ({item}: {item: IChat}) => {
    if (item.sender_id === 'sender_1') {
      return (
        <View style={styles.myChatBox}>
          <Text style={styles.myChat}>{item.content}</Text>
        </View>
      );
    }
    return (
      <View style={styles.opponentChatBox}>
        <Text style={styles.opponentChat}>{item.content}</Text>
      </View>
    );
  };
  const keyExtractor = (item: IChat, index: number) => {
    return `${item}-${index}`;
  };
  const sendMessage = () => {
    let tempMessage = [...chatMessage];
    tempMessage.push({
      message_id: `message_${chatMessage.length + 1}`,
      chat_room_id: 'chat_room_1',
      sender_id: 'sender_1',
      content: message,
      timestamp: moment().format('yyyy/mm/dd hh:mm'),
      message_type: 'text',
      status: 'unRead',
    });
    setChatMessage(tempMessage);
    flatListRef.current?.scrollToEnd({animated: true});
    setMessage('');
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={`${nickName} 님 과의 채팅`}
          handleBackBtn={() => navigation.goBack()}
        />
        <FlatList
          ref={flatListRef}
          data={chatMessage}
          renderItem={renderItem}
          keyExtractor={(item, index) => keyExtractor(item, index)}
          style={styles.scrollContainer}
        />
        <ChattingBottomInput
          text={message}
          setText={setMessage}
          sendMessage={sendMessage}
        />
      </>
    </WholeWrapper>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  opponentChatBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  myChatBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  opponentChat: {
    maxWidth: width - 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 10,
  },
  myChat: {
    maxWidth: width - 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: COLORS.Orange2,
    overflow: 'hidden',
    fontWeight: '600',
    color: COLORS.White,
  },
});
