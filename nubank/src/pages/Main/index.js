import React from 'react';
import {Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';
import Menu from '~/components/Menu';
import Tabs from '~/components/Tabs';

import {
  Container,
  Content,
  Card,
  CardHeader,
  Title,
  CardContent,
  CardFooter,
  Description,
  Annotation,
} from './styles';

export default function Main() {
  const translateY = new Animated.Value(0);
  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  function onHandlerStateChange(event) {}

  return (
    <Container>
      <Header />

      <Content>
        <Menu />

        <PanGestureHandler
          onGestureEvent={() => {}}
          onHandlerStateChange={onHandlerStateChange}>
          <Card>
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <Icon name="visibility-off" size={28} color="#666" />
            </CardHeader>
            <CardContent>
              <Title>Saldo disponível</Title>
              <Description>R$ 1.923,01</Description>
            </CardContent>
            <CardFooter>
              <Annotation>Depósito de R$ 100,00 hoje à tarde.</Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>

      <Tabs />
    </Container>
  );
}
