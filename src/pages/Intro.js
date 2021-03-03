import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ClippingRectangle, 
} from 'react-native';
import {CategorySelectModal} from '../components';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import {introPage} from './styles';
import Axios from 'axios';

const Intro = (props) => {

  const [counterFlag, setCounterFlag] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);

  const startGame = (selectedCategory) => {

    Axios.get(`https://opentdb.com/api.php?` , {
      params: {
        amount: 10,
        category: selectedCategory.id,
        type: "boolean"
      }
     })
     .then(res => {
        console.log(res)
     })

    setModalFlag(false)
    setCounterFlag(true)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={introPage.container}>
          <Text style={introPage.bannerText}>Trivia!</Text>
        </View>
        <View style={introPage.container}>
        <View style={{backgroundColor: '#3949ab', alignItems:'center', margin: 20 }}>
            <CountdownCircleTimer
                isPlaying={counterFlag}
                duration={5}
                colors={[
                  ['#fff176', 0.4],
                  ['#ba68c8', 0.4],
                  ['#ff8a65', 0.2],
                ]}
                >
                {({ remainingTime, animatedColor }) => (
                  <Animated.Text style={{fontSize: 60, color: animatedColor }}>
                    {remainingTime}
                  </Animated.Text>
                )}
            </CountdownCircleTimer> 
        </View>
          <TouchableOpacity 
              style={introPage.buttonContainer}
              onPress= {()=> setModalFlag(true)}    
          >
            <Text style={introPage.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
        <CategorySelectModal 
            visibility={modalFlag}
            onClose={()=> setModalFlag(false)}
            onCategorySelect= {startGame}
            />
      </View>
    </SafeAreaView>
  );
};
export {Intro};