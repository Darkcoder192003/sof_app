import {StyleSheet, View, Image, Text} from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoImage}
        resizeMode="contain"
        source={require('../../assets/icons/logo.png')}
      />
      <Text style={styles.text}>Standard Operating Procedure</Text>
      <View style={styles.bottomImageContainer}>
        <Image source={require('../../assets/icons/splash_screen.png')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  logoImage: {
    width: 261,
    height: 186,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
    color: '#392525',
    fontFamily: 'Inter',
  },
  bottomImageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default Splash;
