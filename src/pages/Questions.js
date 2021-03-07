import React from 'react';
import {View, 
        Flatlist, 
        SafeAreaView, 
        Text
        } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const Questions = (props) => {

    const questionList = useSelector( global => global.questions );

    console.log(questionList)

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
              <Text>ques</Text>
                {/* <FlatList
                    ref= {listRef}
                    horizontal
                    scrollEnabled={false}
                    keyExtractor={(_,i) => i.toString()}
                    data={questions}
                    renderItem={renderQuestions}
                /> */}
            </View>
        </SafeAreaView>
    );
};

export {Questions}