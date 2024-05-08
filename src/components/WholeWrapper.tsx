import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactElement;
};

const WholeWrapper = ({children}: Props) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default WholeWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
