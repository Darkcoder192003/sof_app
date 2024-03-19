/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';
import {VehicleRepository} from '../../repository/VehicleRepository.repository';
import {Alert, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import { strings } from '../../localization';

const useHomeViewModel = () => {
  const comments = useRef([]);
  const [vehicleId, setVehicleId] = useState('');

  const [isAnimation , setIsAnimation] = useState(false)
  const [isVehicleIdModalOpen, setIsVehicleIdModalOpen] = useState(true);
  const [visible, setVisible] = useState(false);
  const [uncheckedJobArray, setUncheckJobArray] = useState([]);
  const vehicleRepository = new VehicleRepository();
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);
  const createTwoButtonAlert = message =>
  Alert.alert(strings.alert_warning, message, [
    {text: strings.alert_button_okay, onPress: () => null},
  ]);
  const AddCommentWorning = () =>
  Alert.alert(
    strings.alert_warning,
    strings.alert_add_comment_description,
    [
      {text: strings.alert_button_cancel, onPress: null},
      {text: strings.alert_button_add_comment, onPress: () => toggleCommentModel()},
    ],
  );
  const getVehicleId = value => {
    setVehicleId(value);
  };
  const getTasks = async () => {
    try {
      setIsLoading(true);
      let data = await AsyncStorage.getItem('jobs');
      data = JSON.parse(data);
      setTask([...data.tasks]);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      createTwoButtonAlert(err.message);
    }
  };
 const toggleAllSubTask = (subtaskId , value)=>{
  try {
    if (vehicleId === '') {
      const err = new Error(' कृपया पहले वाहन आईडी दर्ज करें।');
      err.statusCode = 400;
      throw err;
    }
    const updatedTask = task.map(taskItem => {
      const updatedSubTasks = taskItem.subTasks.map(subTaskItem => {
        if (subTaskItem._id.toString() === subtaskId) {
        const updatedJobs = subTaskItem.jobs.map(jobItem => {
            return {...jobItem, done: value};
        });
        return {...subTaskItem, jobs: updatedJobs};
      }
      return subTaskItem
      });
      return {...taskItem, subTasks: updatedSubTasks};
    });

    setTask(updatedTask);
  } catch (err) {
    createTwoButtonAlert(err.message);
  }
 }

  const handleCheckBoxToggle = jobId => {
    try {
      if (vehicleId === '') {
        const err = new Error(' कृपया पहले वाहन आईडी दर्ज करें।');
        err.statusCode = 400;
        throw err;
      }
      const updatedTask = task.map(taskItem => {
        const updatedSubTasks = taskItem.subTasks.map(subTaskItem => {
          const updatedJobs = subTaskItem.jobs.map(jobItem => {
            if (jobItem._id.toString() === jobId) {
              return {...jobItem, done: !jobItem.done};
            }
            return jobItem;
          });
          return {...subTaskItem, jobs: updatedJobs};
        });
        return {...taskItem, subTasks: updatedSubTasks};
      });

      setTask(updatedTask);
    } catch (err) {
      createTwoButtonAlert(err.message);
    }
  };
  const toggleCommentModel = () => {
    try {
      if (visible && comments.current !== uncheckedJobArray) {
        return;
      }
      setVisible(!visible);
    } catch (err) {}
  };
  const commentOnUncheckJob = (jobId, value) => {
    try {
      let trimmedValue = value.trim();
      if (trimmedValue !== '') {
        const existingCommentIndex = comments.current.findIndex(
          comment => comment.jobId === jobId,
        );
        if (existingCommentIndex !== -1) {
          const updatedComments = [...comments.current];
          updatedComments[existingCommentIndex].comment = trimmedValue;
          comments.current = updatedComments;
        } else {
          comments.current = [
            ...comments.current,
            {comment: trimmedValue, jobId},
          ];
        }
      }
    } catch (err) {
      createTwoButtonAlert(err.message);
    }
  };
  const commentOnJobs = async unCheckedJobs => {
    if (unCheckedJobs.length !== comments.current.length) {
      const err = new Error('आपने सभी कार्यों के लिए कारण नहीं दिया है।');
      err.statusCode = 400;
      throw err;
    }
    const emptyComment = comments.current.find(data => data.comment === '');
    if (emptyComment) {
      const err = new Error('आपने सभी कार्यों के लिए कारण नहीं दिया है।');
      err.statusCode = 400;
      throw err;
    }
    setIsLoading(true);
    const jobComments = await Promise.all(
      comments.current.map(async item => {
        const response = await vehicleRepository.comment({...item});
        return response.jobComment._id;
      }),
    );
    return jobComments;
  };
  const submitWithComment = async () => {
    try {
      const allJobs = task.flatMap(taskItem =>
        taskItem.subTasks.flatMap(subTaskItem => subTaskItem.jobs),
      );
      const unCheckedJobs = allJobs.filter(job => !job.done);
      const commentOnUncheckJob = await commentOnJobs(unCheckedJobs);
      const payload = {
        vehicleId,
        commentOnUncheckJob,
      };
      await vehicleRepository.submit(payload);
      Alert.alert(strings.alert_success, strings.alert_submit_success, [
        {text: strings.alert_button_okay, onPress: () => null},
      ]);
      setVisible(false);
      setIsLoading(false);
      setVehicleId('');
      comments.current = [];
      getTasks();
    } catch (err) {
      createTwoButtonAlert(err.message);
    }
  };
  const handleANimation = ()=>{
    setIsAnimation(prev=>!prev)
  }
  const submit = async () => {
    try {
      if (vehicleId === '') {
        const err = new Error(strings.alert_enter_vehicle_id);
        err.statusCode = 400;
        throw err;
      }
      const allJobs = task.flatMap(taskItem =>
        taskItem.subTasks.flatMap(subTaskItem => subTaskItem.jobs),
      );
      const unCheckedJobs = allJobs.filter(job => !job.done);
      if (unCheckedJobs.length > 0) {
        setUncheckJobArray([...unCheckedJobs]);
        AddCommentWorning();
        return;
      }
      const payload = {
        vehicleId,
      };
      setIsLoading(true);
      await vehicleRepository.submit(payload);
      handleANimation()
      setIsLoading(false);
      setVehicleId('');
      getTasks();
    } catch (err) {
      createTwoButtonAlert(err.message);
    }
  };
  const handleVehicleIdModal = () => {
    if(vehicleId.length)
    setIsVehicleIdModalOpen(prev => !prev);
  else{
    showMessage({
      message: strings.alert_enter_vehicle_id,
      type: "danger",
    });
  }
  };

  return {
    task,
    toggleAllSubTask ,
    handleCheckBoxToggle,
    submit,
    vehicleId,
    setVehicleId,
    uncheckedJobArray,
    visible,
    commentOnUncheckJob,
    getVehicleId,
    setVisible,
    isLoading,
    isAnimation,
    submitWithComment,
    isVehicleIdModalOpen,
    handleVehicleIdModal,
    handleANimation
  };
};
export default useHomeViewModel;
