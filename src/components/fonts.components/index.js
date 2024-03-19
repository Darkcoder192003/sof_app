// import React from 'react';
// import styled from 'styled-components';
// const Light = styled.Text`
//   display: flex;
//   padding: ${({padding}) => padding} px;
//   margin: 0;
//   color: ${({color = '#4F6D7A'}) => color};
//   font-family: Poppins;
//   font-style: normal;
//   font-weight: 200;
//   font-size: ${({fontSize}) => fontSize}px;
//   line-height: ${({lineHeight}) => lineHeight}px;
// `;
// const Regular = styled.Text`
//   display: flex;
//   padding: ${({padding}) => padding} px;
//   margin: 0;
//   color: ${({color = '#4F6D7A'}) => color};
//   font-family: Poppins;
//   font-style: normal;
//   font-weight: 400;
//   font-size: ${({fontSize}) => fontSize}px;
//   line-height: ${({lineHeight}) => lineHeight}px;
// `;
// const Medium = styled.Text`
//   display: flex;
//   padding: ${({padding}) => padding} px;
//   margin: 0;
//   color: ${({color = '#4F6D7A'}) => color};
//   font-family: Poppins;
//   font-style: normal;
//   font-weight: 500;
//   font-size: ${({fontSize}) => fontSize}px;
//   line-height: ${({lineHeight}) => lineHeight}px;
// `;

// const LightFont = ({
//   fontSize = 16,
//   children,
//   color,
//   lineHeight = 30,
//   padding = 0,
// }) => {
//   return (
//     <Light
//       color={color}
//       fontSize={fontSize}
//       lineHeight={lineHeight}
//       padding={padding}>
//       {children}
//     </Light>
//   );
// };
// const RegularFont = ({
//   fontSize = 16,
//   children,
//   lineHeight = 30,
//   padding = 0,
//   color,
// }) => {
//   return (
//     <Regular
//       fontSize={fontSize}
//       lineHeight={lineHeight}
//       color={color}
//       padding={padding}>
//       {children}
//     </Regular>
//   );
// };
// const MediumFont = ({
//   fontSize = 16,
//   children,
//   lineHeight = 30,
//   color,
//   padding = 0,
// }) => {
//   return (
//     <Medium
//       fontSize={fontSize}
//       lineHeight={lineHeight}
//       color={color}
//       padding={padding}>
//       {children}
//     </Medium>
//   );
// };

// const Fonts = {
//   LightFont,
//   RegularFont,
//   MediumFont,
// };
// export default Fonts;
