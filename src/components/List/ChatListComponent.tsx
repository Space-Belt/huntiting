import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import FastImage from 'react-native-fast-image';
import {dateConverter} from '../../utils/dateConverter';
import {IChatRoom} from '../../screens/ChatList';
import {FONTSIZE, COLORS} from '../../theme/theme';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {getPlatform} from '../../utils/getPlatform';
import {getLayout} from '../../utils/getLayout';

type Props = {
  handleGotoChatRoom: (id: number) => void;
  handleDeleteBtn: (id: number) => void;
  item: IChatRoom;
};

const DEFAULT_WIDTH = 0;
const DEFAULT_TRANSLATEX = 0;

const layout = getLayout();

const ChatListComponent = ({
  handleGotoChatRoom,
  handleDeleteBtn,
  item,
}: Props) => {
  const ref = useRef(null);

  const translateX = useSharedValue(DEFAULT_TRANSLATEX);
  const tempTranslateX = useSharedValue(DEFAULT_TRANSLATEX);

  const deleteBtnWidth = useSharedValue(DEFAULT_WIDTH);
  const tempDeleteBtnWidth = useSharedValue(DEFAULT_WIDTH);

  const deleteBtnTextOpacity = useSharedValue(0);
  const tempDeleteBtnTextOpacity = useSharedValue(0);

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {
      tempTranslateX.value = translateX.value;
      tempDeleteBtnWidth.value = deleteBtnWidth.value;
      tempDeleteBtnTextOpacity.value = deleteBtnTextOpacity.value;
    })
    .onUpdate(event => {
      if (tempTranslateX.value === 0 && event.translationX > 0) {
        return;
      } else {
        translateX.value = withSpring(
          tempTranslateX.value + event.translationX,
          {duration: 0},
          () => {
            if (tempTranslateX.value + event.translationX < -10) {
              translateX.value = withSpring(-100, {duration: 2000});
            }

            if (event.translationX > -10) {
              translateX.value = withSpring(0, {duration: 2000});
            }
          },
        );

        deleteBtnWidth.value = withSpring(
          tempDeleteBtnWidth.value - event.translationX,
          {duration: 0},
          () => {
            if (tempDeleteBtnWidth.value - event.translationX > 10) {
              deleteBtnWidth.value = withSpring(100, {duration: 2000});
            }
            if (event.translationX > -10) {
              deleteBtnWidth.value = withSpring(0, {duration: 2000});
            }
          },
        );
      }

      if (translateX.value < -30) {
        deleteBtnTextOpacity.value = withTiming(1, {
          duration: 0,
        });
      } else {
        deleteBtnTextOpacity.value = withSpring(0, {
          duration: 0,
        });
      }
    })
    .onEnd(event => {
      if (tempTranslateX.value + event.translationX < (-layout / 3) * 2) {
        deleteBtnWidth.value = withTiming(layout, {duration: 500}, () => {
          runOnJS(handleDeleteBtn)(item.id);
        });
        translateX.value = withTiming(-layout, {duration: 500}, () => {});
      }
    });
  React.useEffect(() => {
    if (translateX.value === layout) {
      handleDeleteBtn(item.id);
    }
    console.log(translateX.value);
  }, [translateX]);

  const listAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
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
    opacity: 1,
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
