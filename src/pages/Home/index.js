import React, { Component } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { bindActionCreators } from 'redux';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  ProductList,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  ProductButton,
  ProductButtonLeftView,
  ProductButtonText,
  ProductButtonAddText,
} from './styles';
import { formatPrice } from '../../util/format';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;
    console.log(`Adding ${id}`);
    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;

    const { amount } = this.props;
    return (
      <Container>
        <ProductList
          data={products}
          keyExtractor={product => String(product.id)}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image }} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{item.priceFormatted}</ProductPrice>
              <ProductButton onPress={() => this.handleAddProduct(item.id)}>
                <ProductButtonLeftView>
                  <Icon name="add-shopping-cart" size={24} color="#FFF" />
                  <ProductButtonText>{amount[item.id] || 0}</ProductButtonText>
                </ProductButtonLeftView>
                <ProductButtonAddText>
                  {'Adicionar'.toUpperCase()}
                </ProductButtonAddText>
              </ProductButton>
            </Product>
          )}
          horizontal
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
