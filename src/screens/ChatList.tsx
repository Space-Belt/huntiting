import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {dateConverter} from '../utils/dateConverter';
import {COLORS, FONTSIZE} from '../theme/theme';

type Props = {};

interface IChatRoom {
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

  const renderItem = (item: IChatRoom) => {
    return (
      <TouchableOpacity
        key={`${item.id}_${item.opponentNickname}`}
        style={styles.chatListContainer}
        onPress={() => handleGotoChatRoom(item.id)}>
        <FastImage
          source={{uri: item.opponentProfileImg}}
          style={styles.profileImg}
        />
        <View style={styles.messageContainer}>
          <View style={styles.nickNameWrapper}>
            <Text style={styles.nickNameText}>{item.opponentNickname}</Text>
            <Text style={styles.messageCountText}>{item.lastMessageCount}</Text>
          </View>
          <View style={styles.messageWrapper}>
            <Text style={styles.messageText}>
              {item.lastMessage.length > 18
                ? item.lastMessage.slice(0, 18) + '...'
                : item.lastMessage}
            </Text>
            <Text style={styles.timeWrapper}>
              {dateConverter(item.lastMessageTime)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader title={'채팅'} handleBackBtn={handleGoBack} />
        <ScrollView>
          {chatRooms.map(el => {
            return renderItem(el);
          })}
        </ScrollView>
      </>
    </WholeWrapper>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  chatListContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#b98181b9',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  nickNameWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nickNameText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Orange,
  },
  messageCountText: {
    fontSize: 8,
    width: 20,
    height: 20,
    lineHeight: 13,
    backgroundColor: COLORS.Orange2,
    color: COLORS.White,
    textAlign: 'center',
    borderRadius: 10,
  },
  messageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    fontSize: FONTSIZE.size_10,
  },
  timeWrapper: {
    fontSize: 7,
  },
});
