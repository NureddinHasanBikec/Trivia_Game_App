import React, {useState, useRef} from 'react';
import {View, 
        FlatList,  
        SafeAreaView, 
        Text
        } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { QuestionItem } from '../components';

const Questions = (props) => {

    const listRef = useRef(null)
    const[currentIndex, setCurrentIndex] = useState(0);
    const questionList = useSelector( global => global.questions );

    const renderQuestion = ({item}) => (
         <QuestionItem 
            questionObject={item}
            onAnswer={answer}   
         />
    )

    const answer = (result) => {
        const newIndex = currentIndex + 1;
        
        if(newIndex === questionList.length)
        return props.navigation.navigate("Finish")

        listRef.current.scrollToIndex({ index: newIndex })
        setCurrentIndex(newIndex)
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
              
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