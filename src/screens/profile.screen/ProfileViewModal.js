import {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {Alert} from 'react-native';
import {FileUploadRepository} from '../../repository/fileUpload.repository';
import {AuthRepository} from '../../repository/auth.repository';
import { strings } from '../../localization';

const useProfileViewModel = () => {
  const authReopsitory = new AuthRepository();
  const uploadRepository = new FileUploadRepository();
  const [profile, setProfile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();
  const deleteAlert = () =>
  Alert.alert(strings.alert_delete, strings.alert_delete_account_confirmation, [
    { text: strings.alert_button_cancel, onPress: () => null },
    { text: strings.alert_button_delete, onPress: deleteAccount },
  ]);
  const logOutAlert = () =>
  Alert.alert(strings.alert_warning, strings.alert_logout_confirmation, [
    { text: strings.alert_button_cancel, onPress: () => null },
    { text: strings.alert_button_yes, onPress: logout },
  ]);

const createTwoButtonAlert = (title = strings.alert_error, message) =>
  Alert.alert(title, message, [{ text: strings.alert_button_okay, onPress: () => null }]);

  const uploadProfile = async image => {
    try {
      const response = await uploadRepository.uploadImage(image);
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      await authReopsitory.updateProfile(user.companyId, {
        profileImage: response.imgurl,
      });
      user.profileImage = response.imgurl;

      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      createTwoButtonAlert('एरर', err.message);
    }
  };
  const handleCloseModal = () => setOpenModal(false);

  //select from gallery.
  const imagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
      });
      const formData = new FormData();
      formData.append('image', {
        uri: image.path,
        type: image.mime,
        name: 'image.jpg',
      });
      await uploadProfile(formData);
      setProfile(image.path);
      handleCloseModal();
    } catch (err) {}
  };

  // open camera.
  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
      });
      const formData = new FormData();
      formData.append('image', {
        uri: image.path,
        type: image.mime,
        name: 'image.jpg',
      });
      await uploadProfile(formData);
      setProfile(image.path);
      handleCloseModal();
    } catch (err) {}
  };
  const changeLanguageModal = ()=>{
    
  }
  const changeLanguage = async (value )=>{
    try{

    }catch(error ){
      console.log(error);
    }
  }

  //request open camera perimission.
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: strings.camera_permission_title,
            message: strings.camera_permission_message,
            buttonPositive: strings.camera_permission_allow,
            buttonNegative: strings.camera_permission_cancel,
          },          
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openCamera();
        }
      } catch (error) {}
    } else {
      openCamera();
    }
  };

  //request storage perimission.
  const requestStoragePermission = async () => {
    imagePick();
  };
  const deleteAccount = async () => {
    try {
      await authReopsitory.deleteAccount();
      logout();
    } catch (err) {}
  };
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    } catch (err) {}
  };
  const addProfile = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    setProfile(user.profileImage);
  };
  useEffect(() => {
    addProfile();
  }, []);
  const goBack= ()=>{
    navigation.dispatch(CommonActions.goBack());
  }
  return {
    logout,
    goBack,
    imagePick,
    requestCameraPermission,
    requestStoragePermission,
    profile,
    openModal,
    setOpenModal,
    handleCloseModal,
    deleteAlert,
    logOutAlert,
  };
};
export default useProfileViewModel;
