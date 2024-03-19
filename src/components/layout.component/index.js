import React from 'react';
import {Pressable, Dimensions, View, ActivityIndicator} from 'react-native';
import styled from 'styled-components';

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const ChildContainer = styled.View`
  display: flex;
  flex-direction: ${({flexDirection}) => flexDirection};
  justify-content: ${({justifyContent}) => justifyContent};
  align-items: ${({alignItems}) => alignItems};
  flex-wrap: ${({flexWrap}) => flexWrap};
`;
const Row = ({
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  children,
  style,
  flexWrap = 'nowrap',
}) => {
  return (
    <ChildContainer
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexWrap={flexWrap}
      flexDirection={'row'}
      style={style}>
      {children}
    </ChildContainer>
  );
};
const Column = ({
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  children,
  style,
  flexWrap = 'nowrap',
}) => {
  return (
    <ChildContainer
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexWrap={flexWrap}
      flexDirection={'column'}
      style={style}>
      {children}
    </ChildContainer>
  );
};
const Space = styled.View`
  width: 1px;
  margin-top: ${({top = 0}) => top}px;
  margin-right: ${({right = 0}) => right}px;
  margin-bottom: ${({bottom = 0}) => bottom}px;
  margin-left: ${({left = 0}) => left}px;
`;

const Spacer = ({top, left, bottom, right}) => {
  return <Space top={top} left={left} right={right} bottom={bottom} />;
};

const StyleText = styled.Text`
  color: ${({color = '#4C5863'}) => color};
  font-size: ${({fontSize = 16}) => fontSize}px;
`;

const CustomText = ({fontSize, text, color}) => {
  return (
    <StyleText fontSize={fontSize} color={color}>
      {text}
    </StyleText>
  );
};

const Container = styled.View`
  flex: ${({flex}) => flex};
  flex-direction: ${({flexDirection = 'row'}) => flexDirection};
  justify-content: ${({justifyContent = 'center'}) => justifyContent};
  align-items: ${({alignItems = 'center'}) => alignItems};
  flex-wrap: ${({flexWrap = 'nowrap'}) => flexWrap};
  max-width: ${({width = 250}) => width}px;
  max-height: ${({height = 50}) => height}px;
  ${'' /* height:${({height = 50}) => height}px; */}
  padding: ${({padding = 0}) => padding}px;
  margin: ${({margin = 12}) => margin}px;
  border: ${({border = 0}) => border}px solid
    ${({borderColor = '#fff'}) => borderColor};

  border-radius: ${({borderRadius = 0}) => borderRadius}px;
  background-color: ${({bgColor}) => bgColor};
`;

const CustomContainer = ({
  style,
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  flexWrap,
  width,
  height = 'fit-content',
  padding,
  margin,
  children,
  border,
  borderRadius,
  borderColor,
  bgColor,
}) => {
  return (
    <Container
      flex={flex}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexWrap={flexWrap}
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      border={border}
      borderRadius={borderRadius}
      borderColor={borderColor}
      bgColor={bgColor}
      style={style}>
      {children}
    </Container>
  );
};

const Input = styled.TextInput`
  width: ${({width = 250}) => width}px;
  height: ${({height = 50}) => height}px;
  color: blue;
  padding: ${({paddingTop = 0}) => paddingTop}px
    ${({paddingRight = 10}) => paddingRight}px
    ${({paddingBottom = 0}) => paddingBottom}px
    ${({paddingLeft = 10}) => paddingLeft}px;

  margin: ${({marginTopBottom = 10}) => marginTopBottom}px
    ${({marginLeftRight = 0}) => marginLeftRight}px;

  font-size: 16px;
  border: 2px solid #00c1a3;
  border-radius: 6px;
  background-color: #fff;
`;
const AuthInputField = ({
  onChangeText,
  value,
  type,
  style,
  placeholder,
  marginTopBottom,
  marginLeftRight,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  width,
  height,
  color,
  placeholderTextColor = "black",
}) => {
  return (
    <Input
      style={style}
      width={width}
      height={height}
      color={color}
      type={type}
      placeholderTextColor={placeholderTextColor}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      marginTopBottom={marginTopBottom}
      marginLeftRight={marginLeftRight}
      paddingBottom={paddingBottom}
      paddingRight={paddingRight}
      paddingLeft={paddingLeft}
      paddingTop={paddingTop}
    />
  );
};

const AuthButton = styled.View`
  display: flex;
  width: ${({width = 250}) => width}px;
  height: ${({height = 50}) => height}px;

  justify-content: center;
  align-items: center;
  border-radius: 25px;
  border: 2px solid #159600;
  ${'' /* background: #ecfffc; */}
  background-color: ${({bgColor}) => bgColor};
`;
const CustomButton = ({
  width,
  height,
  color,
  bgColor,
  fontSize,
  title,
  style,
  onPress,
  loading,
}) => {
  return (
    <Pressable onPress={onPress}>
      <AuthButton width={width} height={height} bgColor={bgColor}style={style}>
        <Row
          justifyContent="center"
          alignItems="center"
          style={{height: '100%'}}>
          {loading ? (
            <>
              <Spacer left={20} />

              <StyleText fontSize={fontSize} color={color}>
                {title}
              </StyleText>
              <Spacer left={10} />
              <ActivityIndicator size="small" color="#fff" />
            </>
          ) : (
            <StyleText fontSize={fontSize} color={color} >
              {title}
            </StyleText>
          )}
        </Row>
      </AuthButton>
    </Pressable>
  );
};
const Loader = () => {
  <CustomContainer>
    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      <Text>Loaded!</Text>
    )}
  </CustomContainer>;
};
<ActivityIndicator size="large" color="#0000ff" />;

const CustomLayout = {
  Row,
  Column,
  Spacer,
  Loader,
  CustomText,
  CustomContainer,
  DeviceHeight,
  DeviceWidth,
  AuthInputField,
  CustomButton,
};
export default CustomLayout;
