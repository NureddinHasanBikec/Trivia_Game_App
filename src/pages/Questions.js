import React, {useState, useRef} from 'react';
import {View, 
        FlatList,  
        SafeAreaView, 
        Animated
        } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { QuestionItem } from '../components';

const Questions = (props) => {

    const listRef = useRef(null)
    const[currentIndex, setCurrentIndex] = useState(0);
    const questionList = useSelector( global => global.questions );
    const dispatch = useDispatch();

    const renderQuestion = ({item}) => (
         <QuestionItem 
            questionObject={item}
            onAnswer={answer}   
         />
    )

    const answer = (result) => {

        dispatch({type: "SET_SCORE", payload: { isTrue: result }});

        const newIndex = currentIndex + 1;
        
        if(newIndex === questionList.length)
        return props.navigation.navigate("Finish")

        listRef.current.scrollToIndex({ index: newIndex })
        setCurrentIndex(newIndex)
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <View style={{backgroundColor: '#3949ab', alignItems:'center', padding: 30 }}>
                    
                    <CountdownCircleTimer
                        isPlaying 
                        duration={40}
                        onComplete={() => props.navigation.navigate("Finish")}
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
                <FlatList
                  ref= {listRef}
                  horizontal
                  scrollEnabled={false}
                  keyExtractor={(_,i) => i.toString()}
                  data={questionList}
                  renderItem={renderQuestion}
                />
            </View>
        </SafeAreaView>
    );
};

export {Questions}