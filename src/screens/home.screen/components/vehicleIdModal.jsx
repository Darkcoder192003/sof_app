/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import Component from '../../../components';
const {Modal, View, Text,TouchableWithoutFeedback, Keyboard} = require('react-native');
const {TextInput} = require('react-native-gesture-handler');
import LottieView from 'lottie-react-native';
import FlashMessage from 'react-native-flash-message';

export const VehicleIdModal = props => {
  const {isVehicleIdModalOpen, vehicleId, getVehicleId, handleVehicleIdModal} =
    props;
  return (
    <Modal animationType="slide" visible={isVehicleIdModalOpen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          backgroundColor: 'white',
          // justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal:32,
          paddingTop:16,
          flex: 1,
        }}>
          <LottieView
          source={require('../../../assets/icons/trucks.json')} // Replace with the correct path
          autoPlay
          loop
          style={{ width: 250, height: 250 }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          कृपया अपने वाहन आईडी दर्ज करें।
        </Text>
        <Component.Spacer top={20} />
        <Component.AuthInputField
          placeholder="वाहन आईडी"
          paddingLeft={12}
          marginTopBottom={4}
          height={55}
          color={'black'}
          width={Component.DeviceWidth * 0.74}
          value={vehicleId}
          onChangeText={value => {
            getVehicleId(value);
          }}
          style={{
            color:'black',
            borderWidth: 1, // Set border width
            borderColor: '#887E7E',
            alignItems: 'flex-start',
            borderRadius: 5,
          }}
        />
        <Component.Spacer top={20} />
        <Component.CustomButton
          disable={true}
          onPress={() => {
            handleVehicleIdModal();
          }}
          title="शुरू करें"
          fontSize={26}
          color="white"
          bgColor="#159600"
        />
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
