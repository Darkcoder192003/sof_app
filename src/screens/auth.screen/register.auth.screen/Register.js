/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Component from '../../../components';
import useViewmodel from './RegisterViewModal';
import {color} from 'react-native-elements/dist/helpers';
import {strings} from '../../../localization';
const Register = ({navigation}) => {
  const {
    id,
    name,
    email,
    password,
    dropdownOptions,
    dropDownValue,
    setDropDownValue,
    loading,
    isFormValid,
    updateProfile,
    handleFformData,
  } = useViewmodel();
  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Component.Spacer top={8} />
          <Component.CustomText
            fontSize={24}
            color={'#000000'}
            text={strings.register}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 30,
          }}>
          <View>
            <Component.AuthInputField
              paddingLeft={12}
              style={styles.inputField}
              placeholder={strings.companyIdPlaceholder}
              color={'black'}
              onChangeText={value => handleFformData({name: 'id', value})}
              value={id}
              marginTopBottom={4}
              height={55}
              width={Component.DeviceWidth * 0.84}
            />
            {isFormValid.id && (
              <Component.CustomText
                color="red"
                fontSize={14}
                text={strings.companyIdErrorMessage}
              />
            )}
          </View>
          <Component.AuthInputField
            paddingLeft={12}
            style={styles.inputField}
            placeholder={strings.namePlaceholder}
            color={'black'}
            marginTopBottom={4}
            height={55}
            width={Component.DeviceWidth * 0.84}
            onChangeText={value => handleFformData({name: 'name', value})}
            value={name}
          />
          {isFormValid.name && (
            <Component.CustomText
              color="red"
              fontSize={14}
              text={strings.nameErrorMessage}
            />
          )}

          <Component.AuthInputField
            paddingLeft={12}
            style={styles.inputField}
            color={'black'}
            placeholder={strings.emailPlaceholder}
            marginTopBottom={4}
            height={55}
            width={Component.DeviceWidth * 0.84}
            onChangeText={value => handleFformData({name: 'email', value})}
            value={email}
          />
          {isFormValid.email && (
            <Component.CustomText
              color="red"
              fontSize={14}
              text={strings.emailErrorMessage}
            />
          )}

          <Component.AuthInputField
            paddingLeft={12}
            style={styles.inputField}
            placeholder={strings.passwordPlaceholder}
            color={'black'}
            marginTopBottom={4}
            height={55}
            width={Component.DeviceWidth * 0.84}
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

          <Component.Spacer top={10} />
          <Dropdown
            style={styles.dropdown}
            data={dropdownOptions}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={strings.selectGender}
            color={'black'}
            itemTextStyle={{color: 'black'}}
            selectedTextStyle={{color: 'black'}}
            placeholderStyle={{color: 'black'}}
            value={dropDownValue}
            onChange={item => {
              setDropDownValue(item.value);
            }}
            renderRow={(option, index, isSelected) => (
              <Text
                style={{
                  color: 'black',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#887E7E',
                }}>
                {option.label}
              </Text>
            )}
          />
          {isFormValid.dropDownValue && (
            <Component.CustomText
              color="red"
              fontSize={14}
              text={strings.emailErrorMessage}
            />
          )}
        </View>
        <Component.Spacer top={20} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Component.CustomButton
            height={55}
            width={Component.DeviceWidth * 0.84}
            title={strings.registerButton}
            fontSize={22}
            color={' #fff'}
            bgColor={'#159600'}
            loading={loading}
            onPress={updateProfile}
          />
        </View>
        <Pressable
          style={{
            justifyContent: 'center',
            marginVertical: 10,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Login')}>
          <Component.CustomText text={strings.haveAccount} />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 31,
  },
  dropdown: {
    height: 55,
    width: Component.DeviceWidth * 0.84,
    borderColor: '#887E7E',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: 6,
  },
  inputField: {
    color: 'black',
    borderWidth: 1, // Set border width
    borderColor: '#887E7E',
    alignSelf: 'flex-start',
    borderRadius: 5, // Set border color
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
