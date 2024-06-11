import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import TabPanelComponent, {
  ITabList,
} from '../components/MyHistory/TabPanelComponent';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import {COLORS} from '../theme/theme';
import HuntListComponent from '../components/FlatComponent/HuntListComponent';
import {IHuntList, huntList} from '../assets/mockData/huntList';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {};

const tabLists: ITabList[] = [
  {
    text: '진행중',
  },
  {
    text: '진행완료',
  },
];

const MyHistoryScreen = (props: Props) => {
  const navigation = useNavigation();

  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  const [datas, setDatas] = React.useState<IHuntList[]>([]);

  const listRotate = useSharedValue(0);

  const frontListAnimatedStyle = useAnimatedStyle(() => {
    const spin = interpolate(listRotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: `${spin}deg`,
        },
      ],
    };
  });
  const backListAnimatedStyle = useAnimatedStyle(() => {
    const spin = interpolate(listRotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: `${spin}deg`,
        },
      ],
    };
  });

  const listBoxStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      position: 'absolute',
      backfaceVisibility: 'hidden',
    };
  }, []);

  React.useEffect(() => {
    if (selectedTabIndex === 0) {
      let tempData = [...huntList].filter(el => el.status === 'pending');
      setDatas(tempData);
    } else {
      let tempData = [...huntList].filter(el => el.status !== 'pending');
      setDatas(tempData);
    }
  }, [selectedTabIndex]);

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {})
    .onUpdate(event => {
      if (event.translationX < -60) {
        runOnJS(setSelectedTabIndex)(1);
      } else if (event.translationX > 60) {
        runOnJS(setSelectedTabIndex)(0);
      }
    })
    .onEnd(event => {
      if (event.translationX < -60) {
        listRotate.value = withTiming(listRotate.value ? 0 : 1, {
          duration: 600,
        });
      } else if (event.translationX > 60) {
        listRotate.value = withTiming(listRotate.value ? 0 : 1, {
          duration: 600,
        });
      }
    });

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={'이용내역'}
          handleBackBtn={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TabPanelComponent
            selectedTabIndex={selectedTabIndex}
            setSelectedTabIndex={setSelectedTabIndex}
            tabLists={tabLists}
          />
          <GestureDetector gesture={panGestureEvent}>
            <View style={styles.animationContainer}>
              <Animated.View
                style={[
                  styles.animatedList,
                  listBoxStyle,
                  frontListAnimatedStyle,
                ]}>
                <ScrollView>
                  <HuntListComponent data={datas} />
                </ScrollView>
              </Animated.View>
              <Animated.View
                style={[
                  styles.animatedList,
                  listBoxStyle,
                  backListAnimatedStyle,
                ]}>
                <ScrollView>
                  <HuntListComponent data={datas} />
                </ScrollView>
              </Animated.View>
            </View>
          </GestureDetector>
        </View>
      </>
    </WholeWrapper>
  );
};

export default MyHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  animatedList: {
    width: '100%',
  },
  animationContainer: {
    flex: 1,
  },
});
