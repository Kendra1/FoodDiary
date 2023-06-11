import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../constants/Images';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/Colors';

interface FDImageHeaderProps {
  title: string;
}

const FDImageHeader: React.FC<FDImageHeaderProps> = ({title}) => {
  return (
    <ImageBackground source={Images.HEADER_BACKGROUND} style={styles.header}>
      <LinearGradient
        colors={['rgba(255,255,255,0)', Colors.WHITE]}
        style={styles.gradient}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </ImageBackground>
  );
};

export default FDImageHeader;

const styles = StyleSheet.create({
  header: {
    height: 140,
    width: '100%',
  },
  gradient: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  text: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '500',
  },
});
