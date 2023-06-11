import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

export type Style = {
  screen: ViewStyle;
  input: ViewStyle;
  textarea: ViewStyle;
  error: ViewStyle;
  errorText: TextStyle;
  number: TextStyle;
  userName: TextStyle;
  email: TextStyle;
  switch: ViewStyle;
  switchText: TextStyle;
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
  textarea: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    height: 120,
    padding: 8,
    marginBottom: 16,
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
  number: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 4,
    marginLeft: 8,
  },
  userName: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 8,
  },
  email: {
    fontSize: 12,
    fontWeight: '600',
    color: 'gray',
    marginBottom: 16,
    marginLeft: 8,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingLeft: 8,
    paddingRight: 8,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '600',
  }
});
