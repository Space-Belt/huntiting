import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useRef} from 'react';
import {FlatList, SectionList, StyleSheet, Text, View} from 'react-native';
import ChattingBottomInput from '../components/Chat/ChattingBottomInput';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import {COLORS, FONTSIZE} from '../theme/theme';
import {getLayout} from '../utils/getLayout';

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
interface ISectionData {
  title: string;
  data: IChat[];
}

const chats: IChat[] = [
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

const myId = 'sender_1';

const width = getLayout();

const ChatRoom = (props: Props) => {
  const navigation = useNavigation();

  const flatListRef = useRef<FlatList>(null);
  const sectionListRef = useRef<SectionList>(null);

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
      content: '네 안녕하세요ㅇㅇ!!',
      timestamp: '2024/05/21 09:15',
      message_type: 'text',
      status: 'unRead',
    },
  ]);

  const [sectionList, setSectionList] = React.useState<ISectionData[]>([]);

  const renderItem = ({item}: {item: IChat}) => {
    if (item.sender_id === 'sender_1') {
      return (
        <View style={styles.myChatBox}>
          <Text style={styles.dateText}>{item.timestamp.split(' ')[1]}</Text>
          <Text style={styles.myChat}>{item.content}</Text>
        </View>
      );
    }
    return (
      <View style={styles.opponentChatBox}>
        <Text style={styles.opponentChat}>{item.content}</Text>
        <Text style={styles.dateText}>{item.timestamp.split(' ')[1]}</Text>
      </View>
    );
  };

  const renderSectionHeader = ({section}: {section: any}) => {
    return (
      <View>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  const keyExtractor = (item: IChat, index: number) => {
    return `${item}-${index}`;
  };

  const sendMessage = () => {
    const today = moment().format('YYYY/MM/DD');

    const sectionIndex = sectionList.findIndex(
      section => section.title === today,
    );

    let newSections = [...sectionList];

    console.log(newSections);
    console.log(sectionIndex);

    if (sectionIndex !== -1) {
      newSections[sectionIndex].data.push({
        message_id: `message_${chatMessage.length + 1}`,
        chat_room_id: 'chat_room_1',
        sender_id: 'sender_1',
        content: message,
        timestamp: moment().format('YYYY/MM/DD hh:mm'),
        message_type: 'text',
        status: 'unRead',
      });
    } else {
      newSections.push({
        title: today,
        data: [
          {
            message_id: `message_${chatMessage.length + 1}`,
            chat_room_id: 'chat_room_1',
            sender_id: 'sender_1',
            content: message,
            timestamp: moment().format('YYYY/MM/DD hh:mm'),
            message_type: 'text',
            status: 'unRead',
          },
        ],
      });
    }
    flatListRef.current?.scrollToEnd({animated: true});
    setSectionList(newSections);

    setMessage('');
  };

  React.useEffect(() => {
    let tempDatas: ISectionData[] = [];
    let grouped: {[key: string]: IChat[]} = {};

    chats.forEach(message => {
      const date = message.timestamp.split(' ')[0]; // '2024/05/21'
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });

    console.log(grouped);

    Object.keys(grouped).map(date => {
      tempDatas.push({
        title: date,
        data: grouped[date],
      });
    });

    setSectionList(tempDatas);
  }, [chats]);

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={`${nickName} 님 과의 채팅`}
          handleBackBtn={() => navigation.goBack()}
        />
        <SectionList
          ref={sectionListRef}
          sections={sectionList}
          renderItem={renderItem}
          style={styles.scrollContainer}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item: IChat) => `${item.chat_room_id}-${item.content}`}
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
  sectionHeaderText: {textAlign: 'center', color: '#988080', marginBottom: 10},

  opponentChatBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  myChatBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  dateText: {
    alignSelf: 'flex-end',
    fontSize: FONTSIZE.size_12,
    color: '#ab8181',
    marginHorizontal: 5,
  },
  opponentChat: {
    maxWidth: width - 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 14,
    fontWeight: '600',
  },
  myChat: {
    maxWidth: width - 100,
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
