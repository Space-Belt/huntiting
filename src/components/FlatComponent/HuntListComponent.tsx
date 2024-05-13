import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {ReactElement} from 'react';

type Props = {
  data: any[];
  renderItem: ({item}: {item: any}) => ReactElement;
  keyExtractor: (item: any) => string;
};

const HuntListComponent = ({data, renderItem, keyExtractor}: Props) => {
  return (
    <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
  );
};

export default HuntListComponent;

const styles = StyleSheet.create({});
