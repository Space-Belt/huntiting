import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {COLORS, FONTSIZE} from '../../theme/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  name: string;
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
};

const SettingComponent = ({name, value, setValue}: Props) => {
  const btnPosition = useSharedValue(0);
  const settingAnimatedStyle = useAnimatedStyle(() => {
    return {
      // backgroundColor: ,
      left: btnPosition.value,
    };
  });

  const backgroundColor: ViewStyle = {
    backgroundColor: COLORS.Orange2,
  };

  React.useEffect(() => {
    if (value) {
      btnPosition.value = withTiming(0, {
        duration: 1000,
      });
    } else {
      btnPosition.value = withTiming(40, {
        duration: 1000,
      });
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.settingTitle}>{name}</Text>
      <TouchableOpacity
        onPress={() => {
          setValue(prev => !prev);
        }}
        style={[styles.settingBtn, value ? backgroundColor : {}]}>
        <Animated.View style={[styles.circleStyle, settingAnimatedStyle]} />
      </TouchableOpacity>
    </View>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderColor: '#d9d7ba',
    borderWidth: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  settingTitle: {
    color: '#6b650e',
    fontSize: FONTSIZE.size_16,
  },
  settingBtn: {
    width: 70,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#877373c2',
    color: COLORS.Orange2,
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  circleStyle: {
    position: 'absolute',
    left: 40,
    margin: 2.5,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#503e3e',
  },
});
