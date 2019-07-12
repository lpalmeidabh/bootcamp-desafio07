import React from 'react';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  SafeAreaContainer,
  Container,
  Logo,
  CartContainer,
  ItemCount,
} from './styles';

function Header({ navigation, cart }) {
  return (
    <SafeAreaContainer>
      <Container>
        <Logo />
        <CartContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" size={24} color="#FFF" />
          <ItemCount>{cart || 0}</ItemCount>
        </CartContainer>
      </Container>
    </SafeAreaContainer>
  );
}

export default connect(
  state => ({
    cart: state.cart.length,
  }),
  null
)(Header);
