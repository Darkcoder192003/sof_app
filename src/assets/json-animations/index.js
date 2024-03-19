import Check from "./check.json"
import LottieView from 'lottie-react-native';

export const CheckAnimation = (props)=>{
    const {onAnimationFinish} = props
    return <LottieView 
     style={{height:"100%" , width : "100%" ,
     position:"absolute",
     top: -100,
      zIndex: 999,
     backgroundColor:"reed"} }
    source={require("./check.json")} autoPlay 
    loop={false}
    onAnimationFinish={onAnimationFinish}
    />
}