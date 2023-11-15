import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import styles from './Input.styles';

const Input = (props: TextInputProps) => {
  return <TextInput testID='custom-input'{...props} style={styles.textInputStyle} />;
};

export default Input;
