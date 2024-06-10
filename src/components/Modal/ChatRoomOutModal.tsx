import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {FONTSIZE} from '../../theme/theme';
import {getPlatform} from '../../utils/getPlatform';

interface IProps {
  onClose: (args?: string) => void;
  type: string;
}

const ChatRoomOutModal = ({onClose, type}: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => onClose()}>
      <View style={styles.background}>
        <View style={styles.whiteBox}>
          <Text style={styles.noticeWord}>이 채팅방을 나가시겠습니까?</Text>
          <View style={styles.btnContainer}>
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: '#eee'}}
              onPress={() => {
                onClose(type);
              }}>
              <Text style={styles.actionText}>채팅방 나가기</Text>
            </Pressable>
            <Pressable
              style={styles.secondActionButton}
              android_ripple={{color: '#eee'}}
              onPress={() => {
                onClose(type);
              }}>
              <Text style={styles.actionText}>신고하기</Text>
            </Pressable>
            <Pressable
              style={styles.secondActionButton}
              android_ripple={{color: '#eee'}}
              onPress={() => {
                onClose();
              }}>
              <Text style={styles.actionText}>취소</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatRoomOutModal;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#00000092',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 330,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  noticeWord: {
    textAlign: 'center',
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_16 : 12,
    paddingVertical: 20,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderTopWidth: 0.5,
    borderBottomLeftRadius: 15,
  },
  secondActionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomRightRadius: 15,
  },
  iconStyle: {
    fontSize: FONTSIZE.size_18,
    marginRight: 15,
  },
  text: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
  actionText: {
    color: 'black',
    textAlign: 'center',
    flex: 1,
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_14 : FONTSIZE.size_10,
  },
});
