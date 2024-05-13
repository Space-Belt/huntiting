import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HuntListComponent from './HuntListComponent';

type Props = {
  data: any[];
  renderElement: React.ReactElement;
  keyExtractor: () => void;
};

const ReusableFlatList = (data, renderElement, keyExtractor: Props) => {
  return <View>{/* <FlatList data={data} renderItem={renderList} /> */}</View>;
};

export default ReusableFlatList;

const styles = StyleSheet.create({});
