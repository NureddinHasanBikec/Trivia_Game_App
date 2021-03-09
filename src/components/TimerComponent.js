import React from 'react';
import { View, Animated } from 'react-native';

import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Modal from 'react-native-modal';

const TimerComponent = (props) => {
    return(
        <Modal
            isVisible = {props.visibility}
            backdropOpacity = {0.2}
        >
          <View style={{backgroundColor: '#3949ab', alignItems:'center', margin: 30 , padding: 20, borderRadius: 40, }}>
            <CountdownCircleTimer
                isPlaying={props.counterFlag}
                duration={5}
                onComplete={() => props.onTimerCompleted()}
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

        </Modal>
    )
}

export {TimerComponent};