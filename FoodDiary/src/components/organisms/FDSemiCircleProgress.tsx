import {Animated, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Colors} from '../../constants/Colors';

interface FDSemiCircleProgressProps {
  progressShadowColor?: string;
  progressColor?: string;
  interiorCircleColor?: string;
  circleRadius?: number;
  progressWidth?: number;
  percentage: number;
  exteriorCircleStyle?: ViewStyle;
  interiorCircleStyle?: ViewStyle;
  animationSpeed?: number;
  initialPercentage?: number;
  minValue: number;
  maxValue?: number;
  currentValue: number;
  children: JSX.Element;
}

const FDSemiCircleProgress: React.FC<FDSemiCircleProgressProps> = ({
  progressColor = Colors.PRIMARY,
  percentage,
  progressShadowColor = Colors.PRIMARY,
  progressWidth = 10,
  initialPercentage = 0,
  interiorCircleColor = Colors.WHITE,
  interiorCircleStyle,
  exteriorCircleStyle,
  maxValue = 100,
  minValue,
  currentValue,
  circleRadius = 150,
  animationSpeed = 2,
  children,
}) => {
  const rotationAnimation = useRef(
    new Animated.Value(initialPercentage),
  ).current;
  const rotate = rotationAnimation.interpolate({
    inputRange: [0, maxValue],
    outputRange: ['0deg', '180deg'],
  });

  const getPercentage = () => {
    if (percentage) return Math.max(Math.min(percentage, maxValue), 0);

    if (currentValue && minValue && maxValue) {
      const newPercent =
        ((currentValue - minValue) / (maxValue - minValue)) * 100;
      return Math.max(Math.min(newPercent, maxValue), 0);
    }

    return 0;
  };

  const animate = () => {
    const toValue: number = getPercentage();
    console.log(toValue);

    const speed: number = animationSpeed;

    Animated.spring(rotationAnimation, {
      toValue,
      speed,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate();
  }, [percentage, initialPercentage]);

  const styles = StyleSheet.create({
    exteriorCircle: {
      width: circleRadius * 2,
      height: circleRadius,
      borderRadius: circleRadius,
      backgroundColor: progressShadowColor,
    },
    rotatingCircleWrap: {
      width: circleRadius * 2,
      height: circleRadius,
      top: circleRadius,
    },
    rotatingCircle: {
      width: circleRadius * 2,
      height: circleRadius,
      borderRadius: circleRadius,
      backgroundColor: progressColor,
      transform: [
        {translateY: -circleRadius / 2},
        {
          rotate: rotate as any,
        },
        {translateY: circleRadius / 2},
      ],
    },
    interiorCircle: {
      width: (circleRadius - progressWidth) * 2,
      height: circleRadius - progressWidth,
      borderRadius: circleRadius - progressWidth,
      backgroundColor: interiorCircleColor,
      top: progressWidth,
    },
  });

  return (
    <View
      style={[
        defaultStyles.exteriorCircle,
        styles.exteriorCircle,
        exteriorCircleStyle,
      ]}>
      <View
        style={[defaultStyles.rotatingCircleWrap, styles.rotatingCircleWrap]}>
        <Animated.View
          style={[defaultStyles.rotatingCircle, styles.rotatingCircle]}
        />
      </View>
      <View
        style={[
          defaultStyles.interiorCircle,
          styles.interiorCircle,
          interiorCircleStyle,
        ]}>
        {children}
      </View>
    </View>
  );
};

export default FDSemiCircleProgress;

const defaultStyles = StyleSheet.create({
  exteriorCircle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
  rotatingCircleWrap: {
    position: 'absolute',
    left: 0,
  },
  rotatingCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  interiorCircle: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
