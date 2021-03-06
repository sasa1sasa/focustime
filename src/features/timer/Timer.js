import  React,{useState} from 'react';
import { View, Text, StyleSheet,Vibration,Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import {colors} from '../../utils/colors';
import {paddingSizes,fontSizes} from '../../utils/sizes';
import{Countdown } from '../../components/Countdown';
import {RoundedButton} from '../../components/RoundedButton';
import {Timing} from  './Timing';
import {useKeepAwake} from 'expo-keep-awake';

const DEFAULT_TIME =0.1;

export const Timer = ({focusSubject,onTimerEnd,clearSubject}) =>{
  useKeepAwake();

  const interval = React.useRef(null);
  const [minutes,setMinutes] = useState(DEFAULT_TIME);
  const[isStarted,setIsStarted] = useState(false);
  const [progress,setProgress] = useState(1);

  const onProgress = (progress) =>{
    setProgress(progress);
  };
  const vibrate =() =>{
    if(Platform.OS === 'ios') {
      const interval = setInterval(()=> Vibration.vibrate(),1000);
      setTimeout(()=>clearInterval(interval),10000);
    }else{
      Vibration.vibrate(10000);
    }
  }
const onEnd = ()=>{
  vibrate();
 setMinutes(DEFAULT_TIME);
   setProgress(1);
   setIsStarted(false);
   onTimerEnd();
}

  const changeTime =(min) =>{
   setMinutes(min);
   setProgress(1);
   setIsStarted(false);
  }
  return(
    <View style={styles.container}>
    <View style={styles.countdown}>
    <Countdown minutes={minutes}  isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
    </View>
    <View style={{paddingTop:paddingSizes.xxl}}> 
    <Text style={styles.title}>Danasnji Zadatak Izaberi Vreme:</Text>
    <Text style={styles.task}>{focusSubject}</Text>
   
    </View>
    <View style={{paddingTop:paddingSizes.md}}>
    <ProgressBar progress={progress} color='#5E84E2' style={{height:10}} />
    </View>
    <Text style={styles.title}>Izaberi Vreme za Tajmer(Vibracija 10s) ?</Text>
    <View style={styles.buttonWrapper}>
    <Timing onChangeTime={changeTime} />

    </View>
    <View style={styles.buttonWrapper}>
    {isStarted ? (
      <RoundedButton title="pauza"  onPress={()=>setIsStarted(false)}/>
    ) : (<RoundedButton title="startuj"  onPress={()=>setIsStarted(true)}/>)
    }
  
    </View>
      <View style={styles.clearSubject}>
    <RoundedButton title="izadji" size={50} onPress={()=>clearSubject()}/>
    </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,

  },
  title:{
   color:colors.white,
   textAlign:'center',
  },
   task:{
   color:colors.white,
   fontWeight:'bold',
   textAlign:'center',
  },
  countdown:{
    flex:0.5,
    alignItems:'center',
    justifyContent:'center',

  },
  buttonWrapper:{
    flex:0.3,
    flexDirection:'row',
    padding:15,
    alignItems:'center',
    justifyContent:'center'
  },
  clearSubject:{
    paddingBottom:25,
    paddingLeft:25,

  }
})