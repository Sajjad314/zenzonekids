import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'mon-b',
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 20,
    textAlign: "center"
  },
  profileContainer: {
    backgroundColor: Colors.cardBg,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  label: {
    fontSize: 16,
    color: Colors.labelText,
    marginBottom: 5,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    color: Colors.valueText,
    marginBottom: 15,
  },
});