
import {Image, Modal, Pressable, View} from 'react-native';
import React from 'react';
import useProfileViewModel from './ProfileViewModal';
import Component from '../../components';
import Avatar from '../../assets/icons/avatar.png';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcom from 'react-native-vector-icons/Entypo';
import {strings} from '../../localization';
import ChangeLanguageDialogBox from './components';

const Profile = ({navigation}) => {
  const {
    goBack,
    logOutAlert,
    requestCameraPermission,
    requestStoragePermission,
    profile,
    openModal,
    deleteAlert,
    setOpenModal,
    handleCloseModal,
  } = useProfileViewModel();
  return (
    <Component.CustomContainer
      flexDirection={'column'}
      width={Component.DeviceWidth}
      height={Component.DeviceHeight}
      justifyContent={'flex-start'}
      margin={0}
      padding={16}
      bgColor={'#fff'}>
      <Component.Row
        style={{
          paddingHorizontal: 0,
          width: Component.DeviceWidth,
        }}
        justifyContent="flex-start"
        width={Component.DeviceWidth}>
        <Pressable style={{paddingHorizontal: 20}} onPress={goBack}>
          <Icon name="left" size={40} color="black" />
        </Pressable>
        <Component.CustomContainer></Component.CustomContainer>
      </Component.Row>
      <Component.CustomText text={strings.profile} fontSize={24} />
      <Component.Spacer top={20} />

      <Pressable onPress={() => setOpenModal(true)}>
        <View>
          <Component.CustomContainer
            height={150}
            width={150}
            border={4}
            borderColor={'rgba(76, 88, 99, 1)'}
            borderRadius={75}
            alignItems={'flex-end'}
            justifyContent={'flex-end'}>
            <Image
              style={{width: 140, height: 140, borderRadius: 70}}
              source={profile ? {uri: profile} : Avatar}
            />
            <Icon
              style={{
                width: 90,
                height: 60,
                borderRadius: 15,
                position: 'absolute',
                right: -56,
                bottom: 10,
              }}
              color="black"
              size={50}
              name={'camera'}
            />
          </Component.CustomContainer>
        </View>
      </Pressable>
      <Pressable onPress={handleCloseModal}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={openModal}
          onRequestClose={() => handleCloseModal}>
          <Component.CustomContainer
            bgColor={'rgba(243, 246, 248, 0.5)'}
            alignItems={'flex-end'}
            width={Component.DeviceWidth - 24}>
            <Component.CustomContainer
              bgColor={'rgba(76, 88, 99, 1)'}
              padding={16}
              flexDirection={'colum'}
              borderRadius={6}
              width={Component.DeviceWidth}>
              <Component.CustomButton
                title={strings.takePhoto}
                height={48}
                color={'#ffffff'}
                width={Component.DeviceWidth - 70}
                onPress={requestCameraPermission}
              />
              <Component.Spacer top={10} />
              <Component.CustomButton
                title={strings.chooseFromGallery}
                height={48}
                color={'#ffffff'}
                width={Component.DeviceWidth - 70}
                onPress={requestStoragePermission}
              />
              <Component.Spacer top={10} />
              <Component.CustomButton
                title={strings.cancel}
                height={48}
                color={'#ffffff'}
                width={Component.DeviceWidth - 70}
                onPress={handleCloseModal}
              />
            </Component.CustomContainer>
          </Component.CustomContainer>
        </Modal>
      </Pressable>
      <Component.Spacer top={20} />
      <Component.CustomContainer
        bgColor={'#F3F6F8'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={Component.DeviceWidth - 36}
        borderRadius={6}
        padding={10}
        margin={0}
        border={2}
        borderColor={'#D1D5DB'}
        height={Component.DeviceHeight * 0.1}>
        <Component.CustomContainer
          height={Component.DeviceHeight * 0.1}
          justifyContent={'flex-start'}>
          <Icon name="contacts" size={25} color="black" />
          <Component.Spacer right={10} />
          <Component.CustomText text={strings.contact} />
        </Component.CustomContainer>
        <Icon name="right" size={25} color="black" />
      </Component.CustomContainer>

      {/* Terms & Conditions */}
      <Component.Spacer top={10} />
      <Component.CustomContainer
        bgColor={'#F3F6F8'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={Component.DeviceWidth - 36}
        borderRadius={6}
        padding={10}
        margin={0}
        border={2}
        borderColor={'#D1D5DB'}
        height={Component.DeviceHeight * 0.1}>
        <Component.CustomContainer
          height={Component.DeviceHeight * 0.1}
          justifyContent={'flex-start'}>
          <EntypoIcom color="black" name="text-document" size={25} />
          <Component.Spacer right={10} />
          <Component.CustomText text={strings.termsAndConditions} />
        </Component.CustomContainer>
        <Icon name="right" size={25} color="black" />
      </Component.CustomContainer>

      {/* Privacy Policy */}
      <Component.Spacer top={10} />
      <Component.CustomContainer
        bgColor={'#F3F6F8'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={Component.DeviceWidth - 36}
        borderRadius={6}
        padding={10}
        margin={0}
        border={2}
        borderColor={'#D1D5DB'}
        height={Component.DeviceHeight * 0.1}>
        <Component.CustomContainer
          height={Component.DeviceHeight * 0.1}
          justifyContent={'flex-start'}>
          <Icon name="lock1" size={25} color="black" />
          <Component.Spacer right={10} />
          <Component.CustomText text={strings.privacyPolicy} />
        </Component.CustomContainer>
        <Icon name="right" size={25} color="black" />
      </Component.CustomContainer>

  {/* Change Language  */}
  <Component.Spacer top={10} />
      <Pressable onPress={deleteAlert}>
        <Component.CustomContainer
          bgColor={'#F3F6F8'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={Component.DeviceWidth - 36}
          borderRadius={6}
          padding={10}
          margin={0}
          border={2}
          borderColor={'#D1D5DB'}
          height={Component.DeviceHeight * 0.1}>
          <Component.CustomContainer
            height={Component.DeviceHeight * 0.1}
            justifyContent={'flex-start'}>
            <Icon name="delete" size={25} color="black" />
            <Component.Spacer right={10} />
            <Component.CustomText text={strings.change_language} />
          </Component.CustomContainer>
          <Icon name="right" size={25} color="black" />
        </Component.CustomContainer>
      </Pressable>


      {/* Delete Account */}
      <Component.Spacer top={10} />
      <Pressable onPress={deleteAlert}>
        <Component.CustomContainer
          bgColor={'#F3F6F8'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={Component.DeviceWidth - 36}
          borderRadius={6}
          padding={10}
          margin={0}
          border={2}
          borderColor={'#D1D5DB'}
          height={Component.DeviceHeight * 0.1}>
          <Component.CustomContainer
            height={Component.DeviceHeight * 0.1}
            justifyContent={'flex-start'}>
            <Icon name="delete" size={25} color="black" />
            <Component.Spacer right={10} />
            <Component.CustomText text={strings.deleteAccount} />
          </Component.CustomContainer>
          <Icon name="right" size={25} color="black" />
        </Component.CustomContainer>
      </Pressable>

      {/* Spacer */}
      <Component.Spacer top={10} />
      <Component.Spacer top={20} />

      {/* Logout Button */}
      <Component.CustomButton
        height={Component.DeviceHeight * 0.1}
        border={0}
        width={Component.DeviceWidth - 36}
        title={strings.logout}
        onPress={logOutAlert}
        fontSize={22}
        color={' #fff'}
        bgColor={'#159600'}
      />
      <ChangeLanguageDialogBox 
      visible={true}
      onCancel={()=>{}}
      onConfirm={()=>{}}
      />
    </Component.CustomContainer>
  );
};

export default Profile;
