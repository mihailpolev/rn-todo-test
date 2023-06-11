import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

export type Style = {
  screen: ViewStyle;
  input: ViewStyle;
  error: ViewStyle;
  errorText: TextStyle;
};

export const style: Style = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    marginBottom: 8,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    padding: 8,
  },
  error: {
    borderBottomColor: 'red',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    paddingLeft: 8,
    marginBottom: 4,
  },
});
