import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import FastImage from 'react-native-fast-image';
import {dateConverter} from '../../utils/dateConverter';
import {IChatRoom} from '../../screens/ChatList';
import {FONTSIZE, COLORS} from '../../theme/theme';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useLayout} from '../../hooks/useLayout';
import {getPlatform} from '../../utils/getPlatform';
import {getLayout} from '../../utils/getLayout';

type Props = {
  handleGotoChatRoom: (id: number) => void;
  item: IChatRoom;
};

const DEFAULT_WIDTH = 0;
const DEFAULT_TRANSLATEX = 0;

const layout = getLayout();

const ChatListComponent = ({handleGotoChatRoom, item}: Props) => {
  const ref = useRef(null);

  const translateX = useSharedValue(DEFAULT_TRANSLATEX);
  const tempTranslateX = useSharedValue(DEFAULT_TRANSLATEX);

  const deleteBtnWidth = useSharedValue(DEFAULT_WIDTH);
  const tempDeleteBtnWidth = useSharedValue(DEFAULT_WIDTH);

  const deleteBtnTextOpacity = useSharedValue(0);
  const tempDeleteBtnTextOpacity = useSharedValue(0);

  const translateXHandler = (transX: number) => {};

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {
      tempTranslateX.value = translateX.value;
      tempDeleteBtnWidth.value = deleteBtnWidth.value;
      tempDeleteBtnTextOpacity.value = deleteBtnTextOpacity.value;
    })
    .onUpdate(event => {
      console.log(tempTranslateX.value);

      translateX.value = withSpring(tempTranslateX.value + event.translationX, {
        duration: 1000,
      });

      deleteBtnWidth.value = withSpring(
        tempDeleteBtnWidth.value - event.translationX,
        {duration: 1000},
      );

      if (translateX.value < -40) {
        deleteBtnTextOpacity.value = withTiming(1, {
          duration: 300,
        });
      } else {
        deleteBtnTextOpacity.value = withSpring(0, {
          duration: 300,
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

  const deleteAnimatedStyle = useAnimatedStyle(() => {
    if (deleteBtnWidth.value > 0) {
      return {
        width: deleteBtnWidth.value,
        opacity: 1,
      };
    } else {
      return {
        width: 0,
        opacity: 0,
      };
    }
  });

  const deleteBtnTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: deleteBtnTextOpacity.value,
    };
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
    <GestureDetector
      gesture={panGestureEvent}
      key={`${item.id}_${item.opponentNickname}`}>
      <View ref={ref}>
        <TouchableOpacity onPress={() => handleGotoChatRoom(item.id)}>
          <Animated.View style={[styles.chatListContainer, listAnimatedStyle]}>
            <View>
              <FastImage
                source={{uri: item.opponentProfileImg}}
                style={styles.profileImg}
              />
            </View>
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
        <Animated.View style={[styles.deleteBtn, deleteAnimatedStyle]}>
          <TouchableOpacity onPress={() => {}}>
            <Animated.Text
              style={[styles.deleteBtnText, deleteBtnTextAnimatedStyle]}>
              삭제
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default ChatListComponent;

const styles = StyleSheet.create({
  chatListContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 80,
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
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nickNameText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Orange,
  },
  messageCountText: {
    fontSize: getPlatform() === 'ios' ? 12 : 8,
    width: 20,
    height: 20,
    lineHeight: getPlatform() === 'ios' ? 20 : 13,
    backgroundColor: COLORS.Orange2,
    color: COLORS.White,
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
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
  deleteBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    opacity: 0,
    width: 0,
    height: 80,
    backgroundColor: 'red',
  },
  deleteBtnText: {
    width: 50,
    opacity: 0,
    color: COLORS.White,
    fontSize: getPlatform() === 'ios' ? 15 : 10,
    textAlign: 'center',
    fontWeight: '700',
  },
});
