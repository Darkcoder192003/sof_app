import Component from '../../../components';
import {Pressable, Text, Image, StyleSheet, TextInput} from 'react-native';
import { strings } from '../../../localization';

export const Header = props => {
  const {vehicleId, getVehicleId, navigation} = props;
  return (
    <Component.CustomContainer
      margin={0}
      padding={10}
      flexDirection={'row'}
      width={Component.DeviceWidth}
      height={100}
      alignItems="center"
      justifyContent="space-between"
      style={styles.headerContainer}>
      <Component.CustomContainer
        margin={0}
        padding={0}
        flexDirection={'row'}
        width={Component.DeviceWidth - 100}
        alignItems="center"
        justifyContent="flex-start">
        <Pressable
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image source={require('../../../res/assets/User.png')} />
        </Pressable>
      </Component.CustomContainer>
      <Component.Column alignItems="center">
        <Text style={{color: 'white', fontSize: 24}}>
          {' '}
          {strings.vehicleIdHeader}{' '}
        </Text>
        <TextInput
          value={vehicleId}
          placeholder={strings.vehicleIdPlaceholder}
          placeholderTextColor="black"
          onChangeText={value => {
            getVehicleId(value);
          }}
          textAlign="center"
          style={{
            color: 'black',
            fontSize: 19,
            borderRadius: 7,
            minWidth: 180,
            maxWidth: 'auto',
            backgroundColor: 'white',
          }}
        />
      </Component.Column>
    </Component.CustomContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: Component.DeviceWidth,
    backgroundColor: 'black',
    height: 300,
  },
});
