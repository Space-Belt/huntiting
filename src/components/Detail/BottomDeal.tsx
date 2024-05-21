import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const BottomDeal = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>BottomDeal</Text>
    </View>
  );
};

export default BottomDeal;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#e4e4e4ea',
    borderTopWidth: 0.5,
    borderColor: '#eee',
  },
});
