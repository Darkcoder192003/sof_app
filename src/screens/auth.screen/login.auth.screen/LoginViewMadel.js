/* eslint-disable prettier/prettier */
import {useState} from 'react';
import {AuthRepository} from '../../../repository/auth.repository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Alert} from 'react-native';
import {JobRepository} from '../../../repository/job.repository';
import { showMessage } from 'react-native-flash-message';
import { strings } from '../../../localization';
function LoginViewMadel() {
  const authReopsitory = new AuthRepository();
  const jobRepository = new JobRepository();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [isFormValid, setIsFormValid] = useState({
    email: false,
    password: false,
  });
  const navigation = useNavigation();
  const handleFformData = event => {
    if (event.name === 'email') setEmail(event.value);
    else if (event.name === 'password') setPassword(event.value);
    else if (event.name === 'companyId') setCompanyId(event.value);
  };
  const createTwoButtonAlert = message =>
    Alert.alert('Error', message, [
      {text: 'Okay', onPress: () => {}},
    ]);
  const handleSubmit = async () => {
    try {
      let oldValues = isFormValid;

      if (!companyId) {
        oldValues = {...oldValues, companyId: true};
      } else if (companyId.length < 1) {
        oldValues = {...oldValues, companyId: true};
      } else {
        oldValues = {...oldValues, companyId: false};
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
      setIsFormValid(oldValues);
      if (oldValues.email || oldValues.password || oldValues.companyId) {
        showMessage({
          message: strings.alert_warning,
          description: strings.alert_description,
          type:"danger"
        })
        return;
      }
      setIsLoading(true);
      const data = await authReopsitory.login({email, password, companyId});
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem('userToken', data.token);
      const jobs = await jobRepository.getJobs();
      await AsyncStorage.setItem('jobs', JSON.stringify(jobs.tasks));
      setIsLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'VehicleId'}],
        }),
      );
    } catch (err) {
      showMessage(err.message);
      createTwoButtonAlert(err.message)
      setIsLoading(false);
    }
  };
  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    isFormValid,
    handleFformData,
    loading,
  };
}

export default LoginViewMadel;
