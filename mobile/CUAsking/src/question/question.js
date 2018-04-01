import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  FlatList,
  View
} from 'react-native';
import prompt from 'react-native-prompt-android';
import {AnswerItem} from '../answerItem/answerItem';

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    height:50,
    flex:0
  },
});

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  update() {
    this.state.isLoading = true;
    fetch('https://wiggles.stdlib.com/cuasking/answer/get/?questionId='+this.props.navigation.state.params.question.QuestionId)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){

      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  componentDidMount() {
    this.update();
  }
  render() {
    var data = [];
    if (this.state && this.state.dataSource) {
      data = this.state.dataSource;
    }
    return (
      <View style={styles.container}>
        <Text>
          { this.props.navigation.state.params.question.QuestionText }
        </Text>
        <FlatList
          refreshing={ this.state.isLoading }
          onRefresh={ this.update.bind(this) }
          data={ data }
          renderItem={ this.renderAnswer }
          keyExtractor={ (answerItem) => answerItem.AnswerId.toString() }
        />
        <Button
          style={styles.button}
          title="Answer"
          color="#e91e63"
          onPress={this.answer.bind(this)}
        />
      </View>
    )
  }

  answer() {
    prompt(
        'Answer','',
        [
         {text: 'Cancel', onPress: () => {}, style: 'cancel'},
         {text: 'Submit', onPress: answerInput => {

             fetch('https://wiggles.stdlib.com/cuasking/answer/post/',{
               method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                questionId: this.props.navigation.state.params.question.QuestionId,
                answer: answerInput,
                username: this.props.navigation.state.params.name,
              }),
            });
             this.update();
         }},
        ],
        {
            type: 'text',
            cancelable: false,
            defaultValue: '',
            placeholder: ''
        }
    );
  }

  renderAnswer(answerItem) {
    const answer = answerItem.item;
    return (
      <AnswerItem
        answer={ answer.AnswerText }
        rating={ answer.Rating }
      />
    );
  }
}

export default Question;
