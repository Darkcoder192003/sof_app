/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
const {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} = require('react-native');
import LottieView from 'lottie-react-native';
import Component from '../../components';
import {useState} from 'react';
import { CommonActions} from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { strings } from '../../localization';

export const VehicleIdScreen = ({navigation}) => {
  const [vehicleId, setVehicleId] = useState('');
  const getVehicleId = value => {
    setVehicleId(value);
  };
  const handleVehicleIdModal = () => {
    if (vehicleId.length)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home', params: {initial_vehicleId: vehicleId}}],
        }),
      );
    else{
      showMessage({
        message: strings.warning, // Updated string localization key
        description: strings.enterVehicleId, // Updated string localization key
        type: "danger",
      })
    }  
  };
  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            backgroundColor: 'white',
            // justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 32,
            paddingTop: 16,
            flex: 1,
          }}>
          <LottieView
            source={require('../../assets/icons/trucks.json')} 
            autoPlay
            loop
            style={{width: 250, height: 250}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {strings.enterVehicleIdPrompt} 
          </Text>
          <Component.Spacer top={20} />
          <Component.AuthInputField
            placeholder={strings.vehicleIdPlaceholder} 
            paddingLeft={12}
            marginTopBottom={4}
            height={55}
            color={"black"}
            width={Component.DeviceWidth * 0.74}
            value={vehicleId}
            onChangeText={value => {
              getVehicleId(value);
            }}
            style={{
              color: 'black',
              borderWidth: 1, // Set border width
              borderColor: '#887E7E',
              alignItems: 'flex-start',
              borderRadius: 5,
            }}
          />
          <Component.Spacer top={20} />
          <Component.CustomButton
            onPress={() => {
              handleVehicleIdModal();
            }}
            title={strings.start}
            fontSize={26}
            color="white"
            bgColor="#159600"
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

