import {FlatList, StyleSheet, View} from 'react-native';
import React, {ReactElement} from 'react';
import {IHuntList} from '../../assets/mockData/huntList';
import FastImage from 'react-native-fast-image';

type Props = {
  data: IHuntList[];
};

const HuntListComponent = ({data}: Props) => {
  const keyExtractor = (item: IHuntList) => {
    return `${item.id}`;
  };

  const renderItem = ({item}: {item: IHuntList}) => {
    return (
      <View style={styles.container}>
        <FastImage
          source={{
            uri:
              item.productPhotoUrl !== undefined
                ? item.productPhotoUrl[0]
                : 'https://picsum.photos/200',
          }}
          style={styles.imageStyle}
        />
        <View></View>
      </View>
    );
  };

  const seperator = () => {
    return (
      <View style={styles.dividerWrapper}>
        <View style={styles.divider} />
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: IHuntList) => keyExtractor(item)}
      ItemSeparatorComponent={seperator}
    />
  );
};

export default HuntListComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    height: 100,
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  divider: {
    borderWidth: 0.5,
    width: '80%',
    borderColor: '#da5252',
  },
  dividerWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
