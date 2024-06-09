import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {FONTSIZE} from '../../theme/theme';
import {getPlatform} from '../../utils/getPlatform';

type Props = {
  onClose: (args?: string) => void;
  isMine: boolean;
};

const HuntEditModal = ({onClose, isMine}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => onClose()}>
      <View style={styles.background}>
        <View style={styles.whiteBox}>
          {!isMine ? (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                console.log('신고');
              }}>
              <Text style={styles.actionText}>신고</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  console.log('수정');
                }}>
                <Text style={styles.actionText}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  console.log('성공');
                }}>
                <Text style={styles.actionText}>성공</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  console.log('실패');
                }}>
                <Text style={styles.actionText}>실패</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  console.log('마감');
                }}>
                <Text style={styles.actionText}>마감</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  console.log('삭제');
                }}>
                <Text style={styles.actionText}>삭제</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HuntEditModal;

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
  btnContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    borderTopWidth: 0.5,
    // borderBottomLeftRadius: 15,
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
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_14 : FONTSIZE.size_12,
  },
});
