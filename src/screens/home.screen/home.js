/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import Component from '../../components';
import {Dimensions} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import useHomeViewModel from './homeViewModal';
import DropdownWithCheckboxes from './components/MainDropDown';
import {Header} from './components/header';
import {CheckAnimation} from '../../assets/json-animations';
import {strings} from '../../localization';

const {width, height} = Dimensions.get('window');
const Home = ({navigation, route}) => {
  const borderRadius = 6;
  const border = 2;
  const borderColor = '#D1D5DB';
  const CheckBoxDefaultColor = '#FFEEEE';
  const checkedColor = '#00C1A338';
  const {initial_vehicleId} = route?.params;
  const {
    task,
    handleCheckBoxToggle,
    submit,
    visible,
    setVisible,
    toggleAllSubTask,
    uncheckedJobArray,
    commentOnUncheckJob,
    getVehicleId,
    isLoading,
    submitWithComment,
    vehicleId,
    isAnimation,
    handleANimation,
  } = useHomeViewModel();

  useEffect(() => {
    getVehicleId(initial_vehicleId);
  }, []);
  const RenderModel = ({item}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Component.CustomContainer
          flex={1}
          padding={5}
          justifyContent="space-between"
          alignItems="center"
          border={border}
          borderRadius={borderRadius}
          borderColor={borderColor}
          bgColor={item.done ? checkedColor : CheckBoxDefaultColor}
          width={Component.DeviceWidth * 0.9}>
          <ScrollView>
            <Text style={{color: 'black'}}>
              {strings.getLanguage() === 'hi' ? item.job : item.job_en}
            </Text>
            <View style={{flex: 1}}>
              <Component.AuthInputField
                onChangeText={value => {
                  commentOnUncheckJob(item._id, value);
                }}
                style={{width: '100%'}}
                type="text"
                paddingLeft={10}
                placeholder={strings.reasonPlaceholder}
                placeholderTextColor="black"
                color={'black'}
              />
            </View>
          </ScrollView>
        </Component.CustomContainer>
      </View>
    );
  };

  const renderMainList = ({item, index}) => {
    return (
      <>
        <DropdownWithCheckboxes
          handleCheckBoxToggle={handleCheckBoxToggle}
          items={item}
          index={index}
          toggleAllSubTask={toggleAllSubTask}
          onSelect={() => {}}
          placeholder={strings.selectDataPlaceholder}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {isAnimation && <CheckAnimation onAnimationFinish={handleANimation} />}
        <Header
          vehicleId={vehicleId}
          getVehicleId={getVehicleId}
          navigation={navigation}
        />
        {isLoading ? (
          <Component.CustomContainer
            height={Component.DeviceHeight - 170}
            width={Component.DeviceWidth}>
            <ActivityIndicator size="large" color="#00c1a3" />
          </Component.CustomContainer>
        ) : (
          <FlatList
            data={task}
            renderItem={renderMainList}
            keyExtractor={item => item._id.toString()}
          />
        )}
        <Component.Spacer top={90} />
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: Component.DeviceWidth,
          backgroundColor: 'white',
          height: 90,
          paddingLeft: '10%',
          paddingVertical: '10%',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Component.CustomButton
          title={strings.submit}
          bgColor="#159600"
          fontSize={23}
          color={'white'}
          height={62}
          onPress={submit}
          width={width * 0.8}
          loading={isLoading}
        />
      </View>
      <Modal
        animationType="slide"
        onRequestClose={() => setVisible(false)}
        visible={visible ? true : false}>
        <View style={{...styles.CommentModelContainer, height: height - 100}}>
          <Text style={styles.commentHeading}>{strings.reasonHeading}</Text>
          <ScrollView>
            {uncheckedJobArray.map((item, index) => {
              return <RenderModel key={index} item={item} />;
            })}
          </ScrollView>
        </View>
        <View style={{height: 100}}>
          <Component.Row alignItems="center" justifyContent="center">
            <Component.CustomButton
              title={strings.submitWithReason}
              bgColor="#159600"
              color={'white'}
              onPress={submitWithComment}
              width={width * 0.8}
              loading={isLoading}
            />
          </Component.Row>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  continerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    width: Component.DeviceWidth,
  },
  mainHeadingContainer: {
    width: width * 0.75,
    marginTop: 10,
  },
  mainHeadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    marginTop: 10,
    paddingBottom: 10,
    width: width * 0.7,
    borderBottomWidth: 2,
    borderBottomColor: '#D1D5DB',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    marginRight: 10,
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
  CommentModelContainer: {
    padding: 5,
  },
  commentHeading: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});
