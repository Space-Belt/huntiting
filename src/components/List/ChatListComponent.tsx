import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {IChatRoom} from '../../screens/ChatList';
import {COLORS, FONTSIZE} from '../../theme/theme';
import {dateConverter} from '../../utils/dateConverter';
import {getLayout} from '../../utils/getLayout';
import {getPlatform} from '../../utils/getPlatform';

type Props = {
  handleGotoChatRoom: (id: number) => void;

  item: IChatRoom;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedChatId: Dispatch<SetStateAction<number>>;
};

const DEFAULT_WIDTH = 0;
const DEFAULT_TRANSLATEX = 0;

const layout = getLayout();

const ChatListComponent = ({
  handleGotoChatRoom,
  item,
  modalOpen,
  setModalOpen,
  setSelectedChatId,
}: Props) => {
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
          runOnJS(setSelectedChatId)(item.id);
          runOnJS(setModalOpen)(true);
        });
        translateX.value = withTiming(-layout, {duration: 500}, () => {});
      }
    });

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

  React.useEffect(() => {
    if (!modalOpen) {
      translateX.value = withSpring(0);
      deleteBtnWidth.value = withSpring(0);
    }
  }, [modalOpen]);

  return (
    <GestureDetector
      gesture={panGestureEvent}
      key={`${item.id}_${item.opponentNickname}`}>
      <View>
        <TouchableOpacity
          onPress={() => {
            handleGotoChatRoom(item.id);
            translateX.value = withSpring(0);
            deleteBtnWidth.value = withSpring(0);
          }}>
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
          <TouchableOpacity
            onPress={() => {
              setSelectedChatId(item.id);
              setModalOpen(prev => !prev);
            }}>
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
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_16 : FONTSIZE.size_14,
    color: COLORS.Orange,
  },
  messageCountText: {
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_14 : 8,
    width: getPlatform() === 'ios' ? 25 : 20,
    height: getPlatform() === 'ios' ? 25 : 20,
    lineHeight: getPlatform() === 'ios' ? 25 : 13,
    backgroundColor: COLORS.Orange2,
    color: COLORS.White,
    textAlign: 'center',
    borderRadius: getPlatform() === 'ios' ? 12.5 : 10,
    overflow: 'hidden',
  },
  messageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_12 : FONTSIZE.size_10,
  },
  timeWrapper: {
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_10 : 7,
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
