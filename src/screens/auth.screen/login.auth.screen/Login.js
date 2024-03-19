/* eslint-disable prettier/prettier */
import {StyleSheet, View, ScrollView, Pressable, Image} from 'react-native';
import React from 'react';
import LocalizedStrings from 'react-native-localization';
import {strings} from '../../../localization'; 

import Component from '../../../components';
import useViewmodal from './LoginViewMadel';

const Login = ({navigation}) => {
  const {
    email,
    password,
    handleSubmit,
    isFormValid,
    companyId,
    loading,
    handleFformData,
  } = useViewmodal();

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ScrollView style={{flex: 1}}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 32,
          paddingTop: 16,
          flex: 1,
        }}>
          <View style={styles.container}>
            <Component.Spacer top={8} />
            <Component.CustomText
              fontSize={24}
              color={'#000000'}
              text={strings.login}
            />
          </View>
          <Component.Spacer top={12} />
          <View
            style={{
              flex: 1,
              paddingLeft: '5%',
            }}>
            <Component.AuthInputField
              style={styles.inputField}
              paddingLeft={12}
              marginTopBottom={4}
              height={55}
              color={'black'}
              width={Component.DeviceWidth * 0.84}
              onChangeText={value =>
                handleFformData({name: 'companyId', value})
              }
              placeholder={strings.companyIdPlaceholder}
              value={companyId}
            />
            {isFormValid.companyId && (
                <Component.CustomText
                  color="red"
                  height="50"
                  fontSize={14}
                  text={strings.companyIdErrorMessage}
                />
            )}

            <Component.AuthInputField
              paddingLeft={12}
              style={styles.inputField}
              marginTopBottom={4}
              height={55}
              color={'black'}
              width={Component.DeviceWidth * 0.84}
              onChangeText={value => handleFformData({name: 'email', value})}
              placeholder={strings.emailPlaceholder}
              value={email}
            />
            {isFormValid.email && (
              <Component.CustomText
                color="red"
                marginTopBottom={30}
                fontSize={14}
                text={strings.emailErrorMessage}
              />
            )}

            <Component.AuthInputField
              paddingLeft={12}
              style={styles.inputField}
              marginTopBottom={4}
              height={55}
              color={'black'}
              width={Component.DeviceWidth * 0.84}
              placeholder={strings.passwordPlaceholder}
              onChangeText={value => handleFformData({name: 'password', value})}
              value={password}
            />
            {isFormValid.password && (
              <Component.CustomText
                color="red"
                fontSize={14}
                text={strings.passwordErrorMessage}
              />
            )}
          </View>
          <Component.Spacer top={12} />
          <Component.CustomButton
            height={55}
            width={Component.DeviceWidth * 0.84}
            title={strings.login}
            fontSize={22}
            color={' #fff'}
            bgColor={'#159600'}
            loading={loading}
            onPress={handleSubmit}
          />
          <Component.Spacer top={12} />
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Component.CustomText text={strings.accountNotRegistered} />
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.bottomImageContainer}>
        <Image
          style={{
            width: Component.DeviceWidth,
            height: Component.DeviceHeight * 0.4,
          }}
          source={require('../../../assets/icons/splash_screen.png')}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 31,
  },
  inputField: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#887E7E',
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  bottomImageContainer: {
    zIndex: 1,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'flex-end',
  },
});
