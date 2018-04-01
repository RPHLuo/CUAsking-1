import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import prompt from 'react-native-prompt-android';
import { QuestionItem } from '../questionItem/questionItem';
import { Question } from '../question/question';

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

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      name: ''
    }
  }
  update() {
    this.state.isLoading = true;
    fetch('https://wiggles.stdlib.com/cuasking/questions/get/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          name: this.state.name,
          dataSource: responseJson,
        }, function(){

        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  componentDidMount() {
    prompt(
        'Enter your username','',
        [
         {text: 'Submit', onPress: nameInput => {
            fetch('https://wiggles.stdlib.com/cuasking/user/add/?username='+nameInput,{
              method: 'POST'
            });
            this.setState({
              isLoading: true,
              name: nameInput
            })
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

  render() {
    var data = [];
    if (this.state && this.state.dataSource) {
      data = this.state.dataSource;
    }
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={ this.state.isLoading }
          onRefresh={ this.update.bind(this) }
          data={ data }
          renderItem={ this.renderQuestion.bind(this) }
          keyExtractor={ (questionItem) => questionItem.QuestionId.toString() }
        />
        <Button
          style={styles.button}
          title="Ask a question"
          color="#e91e63"
          onPress={this.askQuestion.bind(this)}
        />
      </View>
    )
  }

  askQuestion() {
    prompt(
        'Ask a Question','',
        [
         {text: 'Cancel', onPress: () => {}, style: 'cancel'},
         {text: 'Submit', onPress: questionInput => {

            fetch('https://wiggles.stdlib.com/cuasking/question/post/',{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                question: questionInput,
                username: this.state.name,
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

  renderQuestion(questionItem) {
    const question = questionItem.item;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Question', {question: question, name: this.state.name});
        }
      }>
        <QuestionItem
          question={ question.QuestionText }
          category={ question.Category }
          username={ question.username }
          />
      </TouchableOpacity>
    );
  }
}

export default Home;
