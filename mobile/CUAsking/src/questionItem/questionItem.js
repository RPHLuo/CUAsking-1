import React , {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import { Card, CardItem, Button, Icon, Left } from 'native-base';
class QuestionItem extends React.Component {
  render() {
    const { question, category, username } = this.props;
    return(
      <Card>
        <CardItem>
          <Left>
            <Text>{ category }</Text>
            <Text>{ username }</Text>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Left>
            <Text>
              { question }
            </Text>
          </Left>
        </CardItem>
      </Card>
    );
  }
}

export { QuestionItem };
