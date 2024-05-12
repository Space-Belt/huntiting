import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  data: any[];
  renderElement: React.ReactElement;
  keyExtractor: () => void;
};

const ReusableFlatList = (data, renderElement, keyExtractor: Props) => {
  const renderList = ({item}: {item: any}) => {
    return renderElement;
  };
  return (
    <View>
      <FlatList data={data} renderItem={renderList} />
    </View>
  );
};

export default ReusableFlatList;

const styles = StyleSheet.create({});
