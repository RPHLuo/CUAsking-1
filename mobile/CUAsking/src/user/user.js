import React , {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import {Container,Header, Content, Text, Button, Icon, Left, Thumbnail, Card, CardItem, Right } from 'native-base';

export default class User extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <View style={styles.imageContainer}>
            <Thumbnail large source={{uri: 'https://www.gettyimages.ca/img/chimp.jpg'}} />
            <Text>Segmentation Fault Chimp</Text>
          </View>
          <View>
            <Card>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
           </Card>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    margin: 25
  },
  imageContainer: {
    alignItems: 'center',
  },
  cardContainer: {
  }
});
