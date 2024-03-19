/* eslint-disable prettier/prettier */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import Component from '../../../components';
import SubTaskDropDown from './subTaskDropDown';
import Step1 from "../../../res/assets/step1.png"
import Step2 from "../../../res/assets/step2.png"
import Step3 from "../../../res/assets/step3.png"
import Step4 from "../../../res/assets/step4.png"
import Step5 from "../../../res/assets/step5.png"
import Step6 from "../../../res/assets/step6.png"
import { strings } from '../../../localization';
const DropdownWithCheckboxes = ({
  items,
  index,
  toggleAllSubTask,
  handleCheckBoxToggle,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setVisible(prev => !prev);
  };
  const renderItem = ({item}) => {
    return (
      <View>
        <SubTaskDropDown
          toggleAllSubTask={toggleAllSubTask}
          handleCheckBoxToggle={handleCheckBoxToggle}
          items={item}
          onSelect={() => {}}
          placeholder={'hello'}
        />
      </View>
    );
  };
  const source = index == 0 ? Step1 : index == 1 ? Step2 
  : index == 2 ? Step3 : index == 3 ? Step4 : index == 4 ? Step5
  : Step6

  return (
    <View ref={dropdownRef} style={styles.dropdownContainer}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
       <Component.Row style={{
        width: Component.DeviceWidth*.87
       }} justifyContent='space-between' alignItems='center'>
       <Component.Row
         style={{
          width: "70%"
         }}
          padding={10}
          alignItems="center"
          justifyContent="flex-start">
          <Image
            style={{
              height: 90,
              width: 90,
            }}
            resizeMode='contain'
            source={source}
          />
          <Component.Spacer left={10} />
          <Text style={styles.dropdownButtonText}>{   strings.getLanguage() === "hi" ? items.task :  items.task_en} </Text>
        </Component.Row>
        <Icon name= {visible ? "down" : 'right' } size={40} color="black"/>
       </Component.Row>
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={items.subTasks}
            renderItem={renderItem}
            keyExtractor={item => item._id || item.value}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'relative',
    justifyContent: 'center',
    width: Component.DeviceWidth*.97,
   borderRadius: 20,
    marginVertical: 5
  },
  dropdownButton: {
    backgroundColor: 'white',
    margin: 10,
    width:"100%",
    shadowColor: '#171717',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 13,
    paddingVertical: 14,
  paddingHorizontal: 14,
    marginVertical: 6,
    elevation: 1.6,
  },
  dropdownButtonText: {
    color: '#151313',
    fontSize: 24,
    textAlign: 'left',
    fontFamily: 'Helvetica Neue',
  },
  dropdownList: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 15,
  
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'red',
    textTransform: 'capitalize',
    fontFamily: '',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DropdownWithCheckboxes;
