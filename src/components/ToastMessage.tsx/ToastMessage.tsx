import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getLayout} from '../../utils/getLayout';

type Props = {};

const {width} = getLayout();

const ToastMessage = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>AlertToastMessage</Text>
    </View>
  );
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
