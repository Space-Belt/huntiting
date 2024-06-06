import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GestureDetector, TouchableOpacity} from 'react-native-gesture-handler';
import {IHuntList} from '../../assets/mockData/huntList';
import {COLORS, FONTSIZE} from '../../theme/theme';
import {getPlatform} from '../../utils/getPlatform';

type Props = {
  data: IHuntList[];
  modalOpen?: () => void;
};

const HuntListComponent = ({data, modalOpen}: Props) => {
  const navigation = useNavigation();

  const keyExtractor = (item: IHuntList) => {
    return `${item.id}`;
  };

  const renderStatus = (status: 'successed' | 'pending' | 'failed') => {
    if (status === 'successed') {
      return <Text style={[styles.statusStyle, styles.success]}>완료</Text>;
    } else if (status === 'pending') {
      return <Text style={[styles.statusStyle, styles.pending]}>대기</Text>;
    } else {
      return <Text style={[styles.statusStyle, styles.fail]}>실패</Text>;
    }
  };

  const renderItem = ({item}: {item: IHuntList}) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate('detail' as never);
        }}
        onLongPress={() => {
          modalOpen ? modalOpen() : {};
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
          <View style={styles.productNameNstatusWrapper}>
            <Text style={styles.productName}>{item.productName}</Text>
            {item.status && renderStatus(item.status)}
          </View>
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
    flex: 1,
    justifyContent: 'space-between',
  },
  productNameNstatusWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusStyle: {
    width: 50,
    textAlign: 'center',
    paddingVertical: 7.5,
    borderRadius: 12,
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_12 : FONTSIZE.size_10,
    color: COLORS.White,
    fontWeight: '700',
    overflow: 'hidden',
  },
  success: {backgroundColor: COLORS.Orange2},
  pending: {backgroundColor: '#4c4a4a98'},
  fail: {backgroundColor: 'red'},

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
