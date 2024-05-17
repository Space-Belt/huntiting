import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getLayout} from '../../utils/getLayout';
import {useRecoilValue} from 'recoil';
import {toastContent} from '../../recoil/ToastStore';
import WholeWrapper from '../WholeWrapper';

type Props = {};

const {width} = getLayout();

const ToastMessage = (props: Props) => {
  const toastDetail = useRecoilValue(toastContent);

  if (toastDetail.isVisible === true) {
    return (
      <View style={styles.container}>
        <Text>{toastDetail.message}</Text>
      </View>
    );
  }

  return;
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 25,
    left: '50%',
    backgroundColor: '#fefefe',
    transform: [{translateX: -width / 2}],
    borderRadius: 8,
  },
});
