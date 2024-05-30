import React, {Dispatch, SetStateAction} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  FlipInXUp,
  FlipOutXUp,
  RotateOutDownLeft,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ArrowSvg from '../../assets/icons/arrowDown.svg';
import {INotice} from '../../screens/NoticeScreen';
import {COLORS, FONTSIZE} from '../../theme/theme';

type Props = {
  data: INotice;
  indexNum: number;
  setSelectedIndex: Dispatch<SetStateAction<number | undefined>>;
  setSelectedImageIndex: Dispatch<SetStateAction<number | undefined>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const NoticeComponent = ({
  data,
  indexNum,
  setSelectedIndex,
  setSelectedImageIndex,
  setModalOpen,
}: Props) => {
  const [openNotice, setOpenNotice] = React.useState<boolean>(false);

  const svgRotate = useSharedValue(0);
  const accordionHeight = useSharedValue(0);

  const svgAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateX: `${svgRotate.value}deg`,
        },
      ],
    };
  });

  const imageBoxStyle: StyleProp<ViewStyle> = {
    marginRight: 10,
  };
  const containerStyle: StyleProp<ViewStyle> = {
    borderBottomWidth: 0,
  };

  return (
    <Animated.View
      style={[styles.container, indexNum === 0 ? containerStyle : {}]}>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => {
          setOpenNotice(prev => !prev);

          svgRotate.value = withTiming(openNotice ? 360 : 180, {
            duration: 1000,
          });
          accordionHeight.value = withSpring(openNotice ? 1 : 0, {
            duration: 1000,
          });
        }}>
        <View style={styles.accordionWrapper}>
          <Text style={styles.titleText} numberOfLines={2}>
            [공지] {data.title}
          </Text>
          <Animated.View style={[styles.svgStyle, svgAnimatedStyle]}>
            <ArrowSvg />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {openNotice && (
        <Animated.View
          entering={FlipInXUp.duration(500)}
          exiting={FlipOutXUp.duration(400)}
          style={[styles.openContainer]}>
          <View style={styles.openWrapper}>
            <Text style={styles.contentText}>{data.content}</Text>
            <View style={styles.imagesContainer}>
              {data.images.map((image, index) => (
                <TouchableOpacity
                  key={`${image}--${index}`}
                  onPress={() => {
                    setSelectedIndex(indexNum);
                    setSelectedImageIndex(index);
                    setModalOpen(prev => !prev);
                  }}
                  style={index !== data.images.length - 1 ? imageBoxStyle : {}}>
                  <Animated.Image
                    entering={ZoomIn.duration(500)}
                    exiting={RotateOutDownLeft.duration(500)}
                    source={{uri: image}}
                    style={[styles.imageStyle]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default NoticeComponent;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.Orange2,
    borderTopColor: COLORS.Orange2,
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  accordionWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    marginRight: 20,
  },
  svgStyle: {
    width: 24,
    height: 24,
  },
  openContainer: {
    paddingHorizontal: 10,
  },
  openWrapper: {},
  contentText: {
    fontSize: FONTSIZE.size_14,
    lineHeight: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 15,
  },
});
