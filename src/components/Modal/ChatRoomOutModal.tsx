import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {FONTSIZE} from '../../theme/theme';

interface IProps {
  onClose: (args?: string) => void;
}

const ChatRoomOutModal = ({onClose}: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.background}>
        <View style={styles.whiteBox}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onClose('exit');
            }}>
            <Text style={styles.actionText}>채팅방 나가기</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onClose();
            }}>
            <Text style={styles.actionText}>취소</Text>
          </Pressable>
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
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: FONTSIZE.size_18,
    marginRight: 15,
  },
  text: {
    fontSize: 26,
    color: 'white',
  },
  actionText: {
    color: 'black',
  },
});
