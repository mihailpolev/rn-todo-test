import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

export type Style = {
  container: ViewStyle;
  number: TextStyle;
  userName: TextStyle;
  email: TextStyle;
  work: TextStyle;
  done: TextStyle;
  text: TextStyle;
};

export const style: Style = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 8,
    marginRight: 16,
    borderRadius: 8,
  },
  number: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 'bold',
    color: 'gray',
    position: 'absolute',
    right: 16,
    top: 16,
  },
  userName: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 10,
    fontWeight: '600',
    color: 'gray',
  },
  work: {
    fontSize: 12,
    fontWeight: '500',
    color: 'red',
    marginTop: 8,
    marginBottom: 16,
  },
  done: {
    fontSize: 12,
    fontWeight: '500',
    color: 'green',
    marginTop: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 11,
    fontWeight: '400',
  },
});
