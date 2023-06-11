import React, {memo, useEffect, useState} from 'react';
import {Platform} from 'react-native';

import {BlurView, BlurViewProps} from '@react-native-community/blur';

const FDStableBlurView: React.FC<BlurViewProps> = memo(props => {
  const [shouldRenderBlur, setShouldRenderBlur] = useState(
    Platform.OS === 'android' ? false : true,
  );

  useEffect(() => {
    setTimeout(() => setShouldRenderBlur(true), 0);
  }, []);

  if (!shouldRenderBlur) {
    return null;
  }
  return <BlurView {...props} />;
});

export default FDStableBlurView;
