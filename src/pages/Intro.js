import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'
import {useDispatch} from 'react-redux';
import {introPage} from './styles';
import Axios from 'axios';
import {CategorySelectModal} from '../components';

const Intro = (props) => {

  const [counterFlag, setCounterFlag] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  const dispatch = useDispatch();

  const startGame = (selectedCategory) => {

    Axios.get(`https://opentdb.com/api.php?` , {
      params: {
        amount: 10,
        category: selectedCategory.id,
        type: "boolean",
        encode: "base64"
      }
     })
     .then((response) => {
        const { data: {results: questions} } = response;
        dispatch({ type: "SET_QUESTIONS", payload: { questions }});
     });

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
        <View style={{backgroundColor: '#3949ab', alignItems:'center', margin: 30  }}>
            <CountdownCircleTimer
                isPlaying={counterFlag}
                duration={5}
                onComplete={() => props.navigation.navigate("Questions")}
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