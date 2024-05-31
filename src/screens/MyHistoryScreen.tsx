import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../theme/theme';
import {useLayout} from '../hooks/useLayout';
import TabPanelComponent from '../components/MyHistory/TabPanelComponent';

type Props = {};

const tabLists = [
  {
    text: '진행중',
  },
  {
    text: '진행완료',
  },
];

const MyHistoryScreen = (props: Props) => {
  const navigation = useNavigation();

  const tabChange = useSharedValue(0);

  const [layout, onLayout] = useLayout();

  const tabAnimatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [
      //   {
      //     translateX: tabChange.value,
      //   },
      // ],
      left: tabChange.value,
      borderTopLeftRadius: selectedTabIndex === 0 ? 15 : 0,
      borderTopRightRadius: selectedTabIndex === 1 ? 15 : 0,
    };
  });

  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  const renderStyle = (index: number): StyleProp<TextStyle> => {
    return {
      color: selectedTabIndex === index ? '#fff' : '#616161da',
    };
  };

  React.useEffect(() => {
    if (selectedTabIndex === 0) {
      tabChange.value = withTiming(0, {duration: 500});
    } else {
      tabChange.value = withTiming(layout.width, {duration: 500});
    }
  }, [selectedTabIndex]);

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
          />
          {/* <View style={styles.tabContainer}>
            <Animated.View
              onLayout={onLayout}
              style={[styles.animateTabBox, tabAnimatedStyle]}
            />
            {tabLists.map((tabEl, index) => (
              <View style={styles.tabBox}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTabIndex(index);
                  }}>
                  <Animated.View style={[styles.tabStyle]}>
                    <Text style={[styles.tabText, renderStyle(index)]}>
                      {tabEl.text}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            ))}
          </View> */}
        </View>
      </>
    </WholeWrapper>
  );
};

export default MyHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#4d4b4ba1',
  },
  animateTabBox: {
    position: 'absolute',
    width: '50%',
    height: 50,
    borderBottomWidth: 1,
    backgroundColor: '#ea2f2f99',
    borderBottomColor: COLORS.Orange2,
  },
  tabBox: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: {alignItems: 'center'},
  tabText: {
    textAlign: 'center',
    fontWeight: '700',
  },
});
