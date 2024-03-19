import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import Component from '../../../components';
import Check from '../../../assets/icons/check.png';
import Icon from 'react-native-vector-icons/AntDesign';
import { strings } from '../../../localization';

const SubTaskDropDown = ({
  items,
  handleCheckBoxToggle,
  toggleAllSubTask,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  const [isAllSubTaskDone, setIsAllSubTaskDone] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setVisible(prev => !prev);
  };
  useEffect(() => {
    const checkAllTaskDone = () => {
      const isDone = items.jobs.every(item => item.done);
      setIsAllSubTaskDone(isDone);
    };
    checkAllTaskDone();
  }, [items]);

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => handleCheckBoxToggle(item._id)}
          style={styles.item}>
          <Component.Row justifyContent="space-between" alignItems="center">
            <View style={{width: '86%'}}>
              <Text style={styles.itemText}>{strings.getLanguage() === "hi" ?   item.job: item.job_en}</Text>
            </View>
            <View style={styles.checkBoxContainer}>
              {item.done ? (
                <Image style={{width: 30, height: 30}} source={Check} />
              ) : null}
            </View>
          </Component.Row>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View ref={dropdownRef} style={styles.dropdownContainer}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Component.Row alignItems="center" justifyContent="space-between">
          <View
            style={{
              width: '80%',
            }}>
            <Text style={styles.dropdownButtonText}>{strings.getLanguage() === "hi" ?  items.subTask : items.subTask_en} </Text>
          </View>
          <Component.Row alignItems="center">
            <Pressable
              onPress={() => {
                toggleAllSubTask(items._id, !isAllSubTaskDone);
              }}>
              <View style={styles.smallCheckbox}>
                {isAllSubTaskDone ? (
                  <Image style={{width: 30, height: 30}} source={Check} />
                ) : null}
              </View>
            </Pressable>
            <Component.Spacer left={20} />
            <Icon name={visible ? 'down' : 'right'} color="black" size={20} />
          </Component.Row>
        </Component.Row>
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={items.jobs}
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
    width: '100%',
  },
  dropdownButton: {
    backgroundColor: 'white',
    margin: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 13,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    elevation: 1.6,
  },
  dropdownButtonText: {
    color: '#151313',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'Helvetica Neue',
  },
  dropdownList: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  item: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallCheckbox: {
    padding: 0,
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#D9D9D9',

    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxContainer: {
    padding: 0,
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: '#000000',
    textTransform: 'capitalize',
    fontSize: 16,
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

export default SubTaskDropDown;
