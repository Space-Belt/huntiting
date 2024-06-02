import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {COLORS} from '../../theme/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useLayout} from '../../hooks/useLayout';

export interface ITabList {
  text: string;
}

type Props = {
  selectedTabIndex: number;
  setSelectedTabIndex: Dispatch<SetStateAction<number>>;
  tabLists: ITabList[];
};

const TabPanelComponent = ({
  selectedTabIndex,
  setSelectedTabIndex,
  tabLists,
}: Props) => {
  const tabChange = useSharedValue(0);

  const [layout, onLayout] = useLayout();

  const tabAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: tabChange.value,
    };
  });

  const renderStyle = (index: number): StyleProp<TextStyle> => {
    return {
      color: selectedTabIndex === index ? '#fff' : '#616161da',
    };
  };

  React.useEffect(() => {
    tabChange.value = withTiming(layout.width * selectedTabIndex, {
      duration: 500,
    });
  }, [selectedTabIndex]);

  const tabBoxWidth: StyleProp<ViewStyle> = {
    width: `${100 / tabLists.length}%`,
  };

  return (
    <View style={styles.tabContainer}>
      <Animated.View
        onLayout={onLayout}
        style={[tabBoxWidth, styles.animateTabBox, tabAnimatedStyle]}
      />
      {tabLists.map((tabEl, index) => (
        <View style={[tabBoxWidth, styles.tabBox]} key={`${tabEl}_${index}`}>
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
    </View>
  );
};

export default TabPanelComponent;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#4d4b4ba1',
  },
  animateTabBox: {
    position: 'absolute',

    height: 50,
    borderBottomWidth: 1,
    backgroundColor: '#ea2f2f99',
    borderBottomColor: COLORS.Orange2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tabBox: {
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
