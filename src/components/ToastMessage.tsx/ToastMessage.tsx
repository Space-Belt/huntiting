import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {BounceIn, BounceOut} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import CheckCircle from '../../assets/icons/checkCircle.svg';
import ErrorBang from '../../assets/icons/errorBang.svg';
import ErrorX from '../../assets/icons/errorX.svg';
import {toastContent} from '../../recoil/ToastStore';
import {COLORS} from '../../theme/theme';
import {getLayout} from '../../utils/getLayout';

type Props = {};

const width = getLayout();

const ToastMessage = (props: Props) => {
  const toastDetail = useRecoilValue(toastContent);

  if (toastDetail.isVisible === true) {
    return (
      <View style={styles.container}>
        <Animated.View entering={BounceIn} exiting={BounceOut}>
          {toastDetail.type === 'success' ? (
            <CheckCircle />
          ) : toastDetail.type === 'error' ? (
            <ErrorX />
          ) : (
            <ErrorBang />
          )}
        </Animated.View>
        <Text style={styles.textStyle}>{toastDetail.message}</Text>
      </View>
    );
  }

  return;
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width - 30,
    alignItems: 'center',
    height: 200,
    padding: 15,
    top: '50%',
    left: 15,
    backgroundColor: '#fefefe',
    transform: [{translateY: -200 / 2}],
    borderRadius: 15,
  },
  textStyle: {
    color: COLORS.Orange2,
  },
});
