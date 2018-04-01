import React , {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import { Card, CardItem, Button, Icon, Left } from 'native-base';
class AnswerItem extends React.Component {
  render() {
    const { answer, rating } = this.props;
    return(
      <Card>
        <CardItem>
          <Left>
            <Text>{ rating }</Text>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Left>
            <Text>
              { answer }
            </Text>
          </Left>
        </CardItem>
      </Card>
    );
  }
}

export { AnswerItem };
