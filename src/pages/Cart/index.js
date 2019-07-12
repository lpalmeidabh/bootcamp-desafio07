import React from 'react';
// import {
//   MdRemoveCircleOutline,
//   MdAddCircleOutline,
//   MdDelete,
// } from 'react-icons/md';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatPrice } from '../../util/format';

import {
  Container,
  ProductList,
  Product,
  ProductInfo,
  ProductDetails,
  ProductImage,
  ProductTitle,
  ProductPrice,
  ProductDeleteButton,
  ProductActionBar,
  ProductActionButton,
  ProductCounter,
  ProductSubTotal,
  Checkout,
  CheckoutButton,
  CheckoutButtonText,
  TotalAmount,
  TotalText,
  EmptyCart,
  EmptyText,
} from './styles';

import * as CartActions from '../../store/modules/cart/actions';

function Cart({
  navigation,
  products,
  total,
  removeFromCart,
  updateAmountRequest,
}) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }
  return (
    <Container>
      {products.length ? (
        <>
          <ProductList
            data={products}
            keyExtractor={product => String(product.id)}
            renderItem={({ item }) => (
              <Product>
                <ProductInfo>
                  <ProductImage source={{ uri: item.image }} />
                  <ProductDetails>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductPrice>{item.priceFormatted}</ProductPrice>
                  </ProductDetails>
                  <ProductDeleteButton onPress={() => removeFromCart(item.id)}>
                    <Icon name="delete-forever" size={24} color="#7159c1" />
                  </ProductDeleteButton>
                </ProductInfo>
                <ProductActionBar>
                  <ProductActionButton onPress={() => decrement(item)}>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color="#7159c1"
                    />
                  </ProductActionButton>
                  <ProductCounter>{item.amount}</ProductCounter>
                  <ProductActionButton onPress={() => increment(item)}>
                    <Icon name="add-circle-outline" size={20} color="#7159c1" />
                  </ProductActionButton>
                  <ProductSubTotal>{item.subtotal}</ProductSubTotal>
                </ProductActionBar>
              </Product>
            )}
          />
          <Checkout>
            <TotalText>Total</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <CheckoutButton>
              <CheckoutButtonText>Finalizar Pedido</CheckoutButtonText>
            </CheckoutButton>
          </Checkout>
        </>
      ) : (
        <EmptyCart>
          <Icon name="remove-shopping-cart" size={20} color="#7159c1" />
          <EmptyText>Seu carrinho está vazio</EmptyText>
        </EmptyCart>
      )}
    </Container>
  );
}

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
