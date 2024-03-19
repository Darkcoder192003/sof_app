import {useState} from 'react';
import {AuthRepository} from '../../../repository/auth.repository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {JobRepository} from '../../../repository/job.repository';
import {Alert} from 'react-native';
import { strings } from '../../../localization';

export default function RegisterViewModel() {
  const [loading, setLoading] = useState(false);
  const jobRepository = new JobRepository();
  const authReopsitory = new AuthRepository();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(null);
  const [isFormValid, setIsFormValid] = useState({
    id: false,
    name: false,
    email: false,
    password: false,
    dropDownValue: false,
  });
  const createTwoButtonAlert = message =>
    Alert.alert('त्रुटि', message, [
      {text: 'ठीक है', onPress: () => {}},
    ]);
    const dropdownOptions = [
      {label: strings.gender_male, value: 'Male'},
      {label: strings.gender_female, value: 'Female'},
      {label: strings.gender_other, value: 'Other'},
    ];
  const navigation = useNavigation();
  const handleFformData = event => {
    if (event.name === 'name') setName(event.value);
    if (event.name === 'email') setEmail(event.value);
    if (event.name === 'id') setId(event.value);
    if (event.name === 'password') setPassword(event.value);
    if (event.name === 'dropDownValue') setDropDownValue(event.value);
  };
  const updateProfile = async () => {
    try {
      setLoading(true);
      let oldValues = isFormValid;
      if (id === '' || id === null || id === undefined || id.length < 3) {
        oldValues = {...oldValues, id: true};
      } else {
        oldValues = {...oldValues, id: false};
      }
      if (
        name === '' ||
        name === null ||
        name === undefined ||
        name.length < 3
      ) {
        oldValues = {...oldValues, name: true};
      } else {
        oldValues = {...oldValues, name: false};
      }
      if (!email) {
        oldValues = {...oldValues, email: true};
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        oldValues = {...oldValues, email: true};
      } else {
        oldValues = {...oldValues, email: false};
      }
      if (!password) {
        oldValues = {...oldValues, password: true};
      } else if (password.length < 8) {
        oldValues = {...oldValues, password: true};
      } else {
        oldValues = {...oldValues, password: false};
      }
      if (!dropDownValue === null) {
        oldValues = {...oldValues, dropDownValue: true};
      } else {
        oldValues = {...oldValues, dropDownValue: false};
      }
      setLoading(false);
      setIsFormValid(oldValues);
      if (
        oldValues.email ||
        oldValues.name ||
        oldValues.password ||
        oldValues.id ||
        oldValues.dropDownValue
      )
       
      return;
      const payload = {
        updateType: 'register',
        email,
        name,
        password,
        dropDownValue,
      };
      const data = await authReopsitory.updateProfile(id, payload);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem('userToken', data.token);
      const jobs = await jobRepository.getJobs();
      await AsyncStorage.setItem('jobs', JSON.stringify(jobs.tasks));
      setLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'VehicleId'}],
        }),
      );
    } catch (error) {
      createTwoButtonAlert(error.message);
      setLoading(false);
    }
  };
  return {
    id,
    name,
    email,
    password,
    setId,
    setEmail,
    setName,
    setPassword,
    dropdownOptions,
    dropDownValue,
    setDropDownValue,
    loading,
    show,
    handleFformData,
    isFormValid,
    updateProfile,
  };
}
