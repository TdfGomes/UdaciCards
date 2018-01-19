import { StyleSheet, Platform, Dimensions } from "react-native";

export const teal      = '#009688'
export const gray      = '#78909C'
export const lightGray = '#FAFAFA'
export const white     = '#ffffff'
export const limeGreen = '#8BC34A'
export const red       = '#F44336'
export const black     = '#212121'
export const lime      = '#CDDC39'

const { width } = Dimensions.get('window')

export const mainStyles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  label: {
    paddingHorizontal: 35,
    marginBottom: 10,
    fontSize: 18,
    textAlign: "center"
  },
  input: {
    flex: 0.8,
    height: 40,
    borderWidth: Platform.OS === "ios" ? 1 : null,
    borderColor: teal,
    borderRadius: Platform.OS === "ios" ? 2 : null,
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  button: {
    position: "absolute",
    top: 45,
    left: Math.ceil(width - 90),
    flexDirection: "row",
    alignItems: "center"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
});



