import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

export type Style = {
  screen: ViewStyle;
  sort: ViewStyle;
  sortBlock: ViewStyle;
  sortTitle: TextStyle;
  sortBlockLink: TextStyle;
  active: TextStyle;
  paginator: ViewStyle;
  paginatorItem: ViewStyle;
  paginatorTitle: TextStyle;
  paginatorSeparator: TextStyle;
  paginatorActive: ViewStyle;
  paginatorActiveText: TextStyle;
  tasksCount: TextStyle;
};

export const style: Style = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 8,
  },
  sort: {
    flex: 1, 
    alignItems: 'stretch', 
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  sortBlock: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sortTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sortBlockLink: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
  },
  active: {
    fontWeight: '700',
  },
  paginator: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 32,
    paddingLeft: 0,
    paddingRight: 0,
    flexWrap: 'wrap'
  },
  paginatorItem: {
    backgroundColor: '#ffffff',
    padding: 4,
    margin: 4,
    borderRadius: 8,
    minWidth: 32,
  },
  paginatorTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  paginatorSeparator: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500'
  },
  paginatorActive: {
    backgroundColor: 'gray',
  },
  paginatorActiveText: {
    color: 'white',
  },
  tasksCount: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
    color: 'gray',
    textAlign: 'center',
    marginTop: 8,
  }
});
