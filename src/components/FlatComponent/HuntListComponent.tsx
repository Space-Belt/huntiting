import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IHuntList} from '../../assets/mockData/huntList';
import {COLORS, FONTSIZE} from '../../theme/theme';

type Props = {
  data: IHuntList[];
};

const HuntListComponent = ({data}: Props) => {
  const navigation = useNavigation();

  const keyExtractor = (item: IHuntList) => {
    return `${item.id}`;
  };

  const renderItem = ({item}: {item: IHuntList}) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate('detail' as never);
        }}>
        <FastImage
          source={{
            uri:
              item.productPhotoUrl !== undefined
                ? item.productPhotoUrl[0]
                : 'https://picsum.photos/200',
          }}
          style={styles.imageStyle}
        />
        <View style={styles.textInfoWrapper}>
          <Text style={styles.productName}>{item.productName}</Text>
          <Text style={styles.productPriceNCount}>
            가격: {item.price} 수량: {item.productCount}
          </Text>
        </View>
      </TouchableOpacity>
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
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 20,
  },
  textInfoWrapper: {
    // flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    color: COLORS.Orange,
    fontSize: FONTSIZE.size_14,
    fontWeight: '700',
  },
  productPriceNCount: {
    color: COLORS.Orange,
    fontSize: FONTSIZE.size_12,
  },

  divider: {
    borderWidth: 0.4,
    width: '80%',
    borderColor: '#d9d7ba',
  },
  dividerWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
