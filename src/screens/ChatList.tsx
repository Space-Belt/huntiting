import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {dateConverter} from '../utils/dateConverter';
import {COLORS, FONTSIZE} from '../theme/theme';
import ChatListComponent from '../components/List/ChatListComponent';

type Props = {};

export interface IChatRoom {
  id: number;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageCount: number;
  opponentNickname: string;
  opponentProfileImg: string;
}

const chatRooms: IChatRoom[] = [
  {
    id: 1,
    lastMessage: '저희가 필요한 제품을 공수해드릴수 있을것 같아요',
    lastMessageTime: '2024/05/27 05:11',
    lastMessageCount: 3,
    opponentNickname: '강감찬',
    opponentProfileImg: 'https://picsum.photos/200',
  },
  {
    id: 2,
    lastMessage: '제가 가지고 있는 여분의 제품이있습니다.',
    lastMessageTime: '2024/05/27 05:11',
    lastMessageCount: 3,
    opponentNickname: '정약용',
    opponentProfileImg: 'https://picsum.photos/200',
  },
  {
    id: 3,
    lastMessage: '안녕하세요! 저기에 있습니다.',
    lastMessageTime: '2024/05/27 05:11',
    lastMessageCount: 3,
    opponentNickname: '길동홍',
    opponentProfileImg: 'https://picsum.photos/200',
  },
];

const ChatList = (props: Props) => {
  const navigation = useNavigation();

  const handleGotoChatRoom = (id: number) => {
    navigation.navigate('chatRoom' as never);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader title={'채팅'} handleBackBtn={handleGoBack} />
        <ScrollView>
          {chatRooms.map(el => (
            <ChatListComponent
              key={`${el.id}_${el.opponentNickname}`}
              handleGotoChatRoom={handleGotoChatRoom}
              item={el}
            />
          ))}
        </ScrollView>
      </>
    </WholeWrapper>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
