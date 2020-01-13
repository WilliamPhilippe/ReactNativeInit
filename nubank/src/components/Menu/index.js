import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  SignOutButton,
  NavItem,
  NavText,
  Nav,
  SignOutButtonText,
} from './styles';

export default function Menu() {
  return (
    <Container>
      <Nav>
        <NavItem>
          <Icon name="help-outline" size={20} color="#FFF" />
          <NavText>Me ajuda</NavText>
        </NavItem>
        <NavItem>
          <Icon name="person-outline" size={20} color="#FFF" />
          <NavText>Perfil</NavText>
        </NavItem>
        <NavItem>
          <Icon name="credit-card" size={20} color="#FFF" />
          <NavText>Configurar cartão</NavText>
        </NavItem>
        <NavItem>
          <Icon name="smartphone" size={20} color="#FFF" />
          <NavText>Configurações do app</NavText>
        </NavItem>
      </Nav>

      <SignOutButton onPres={() => {}}>
        <SignOutButtonText>SAIR</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
}
