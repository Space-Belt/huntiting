import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {dateConverter} from '../../utils/dateConverter';
import {IChatRoom} from '../../screens/ChatList';
import {FONTSIZE, COLORS} from '../../theme/theme';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useLayout} from '../../hooks/useLayout';

type Props = {
  handleGotoChatRoom: (id: number) => void;
  item: IChatRoom;
};

const DEFAULT_WIDTH = 0;
const DEFAULT_TRANSLATEX = 0;

const ChatListComponent = ({handleGotoChatRoom, item}: Props) => {
  const translateX = useSharedValue(DEFAULT_TRANSLATEX);
  const tempTranslateX = useSharedValue(DEFAULT_TRANSLATEX);

  const deleteBtnWidth = useSharedValue(DEFAULT_WIDTH);

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {
      tempTranslateX.value = translateX.value;
    })
    .onUpdate(event => {
      if (tempTranslateX.value === 0 && event.translationX > 0) {
        return;
      } else {
        translateX.value = withTiming(event.translationX, {
          duration: 0,
        });
      }
    })
    .onEnd(event => {});

  const listAnimatedStyle = useAnimatedStyle(() => {
    if (translateX.value > 0) {
      return {
        transform: [{translateX: 0}],
      };
    } else {
      return {
        transform: [{translateX: translateX.value}],
      };
    }
  });

  /**
   * 1. 전체를 제스쳐핸들러로 감싸기
   * 2. 왼쪽으로 움직이는 위에 올라오는 채팅
   * 3. 삭제 누를수 있는 버튼 (길어짐)
   * 4. 삭제버튼은 제스쳐따라 늘어남, 조금만 움직였으면 어느정도 width로 고정,
   *    많이 움직이면 자동 삭제, 나갈건지 물어보는 모달
   * 5. 삭제 버튼 누르거나 다른거
   */
  return (
    <GestureDetector gesture={panGestureEvent}>
      <View>
        <TouchableOpacity
          key={`${item.id}_${item.opponentNickname}`}
          onPress={() => handleGotoChatRoom(item.id)}>
          <Animated.View style={[styles.chatListContainer, listAnimatedStyle]}>
            <FastImage
              source={{uri: item.opponentProfileImg}}
              style={styles.profileImg}
            />
            <View style={styles.messageContainer}>
              <View style={styles.nickNameWrapper}>
                <Text style={styles.nickNameText}>{item.opponentNickname}</Text>
                <Text style={styles.messageCountText}>
                  {item.lastMessageCount}
                </Text>
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
          </Animated.View>
        </TouchableOpacity>
        <Animated.View>
          <TouchableOpacity onPress={() => {}}>
            <Text>삭제버튼</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
