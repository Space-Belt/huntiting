import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {dateConverter} from '../../utils/dateConverter';
import {IChatRoom} from '../../screens/ChatList';
import {FONTSIZE, COLORS} from '../../theme/theme';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

type Props = {
  handleGotoChatRoom: (id: number) => void;
  item: IChatRoom;
};

const ChatListComponent = ({handleGotoChatRoom, item}: Props) => {
  const panGestureEvent = Gesture.Pan()
    .onStart(() => {})
    .onUpdate(event => {})
    .onEnd(event => {});

  return (
    <GestureDetector gesture={panGestureEvent}>
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
    </GestureDetector>
  );
};

export default ChatListComponent;

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
