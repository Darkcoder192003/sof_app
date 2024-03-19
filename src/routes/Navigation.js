import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import Register from '../screens/auth.screen/register.auth.screen/Register';
import Login from '../screens/auth.screen/login.auth.screen/Login';
import Home from '../screens/home.screen/home';
import Profile from '../screens/profile.screen/Profile';
import Splash from '../screens/splash.screen/splash';
import {VehicleIdScreen} from '../screens/vehicleId.screen';
import { changeLanguage } from '../localization';
const Stack = createStackNavigator();

const Navigation = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      checkUserToken();
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const navigation = useNavigation();

  const checkUserToken = async () => {
    changeLanguage("en")
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'VehicleId'}],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splash"
        options={{headerShown: false}}
        component={Splash}
      />
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{headerShown: false}}
        component={Register}
      />
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={Home}
      />
      <Stack.Screen
        name="VehicleId"
        options={{headerShown: false}}
        component={VehicleIdScreen}
      />
      <Stack.Screen
        name="Profile"
        options={{headerShown: false}}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
