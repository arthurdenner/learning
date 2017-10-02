import React, { PureComponent } from 'react';
import ProductList from './components/product-list';

class App extends PureComponent {
  state = {
    products: [
      { id: 1, name: 'AirMax 90', brand: 'Nike' },
      { id: 2, name: 'Yeezy', brand: 'Adidas' },
      { id: 3, name: 'Classic', brand: 'Reebok' },
    ],
    selectedProducts: [],
  };

  handleProductSelect = product => {
    this.setState(({ selectedProducts }) => ({
      selectedProducts: selectedProducts.concat(product),
    }));
  };

  render() {
    const { products, selectedProducts } = this.state;

    return (
      <div>
        <h1>My Product Store</h1>
        <p>You have selected {selectedProducts.length} products.</p>
        <ProductList
          onProductSelect={this.handleProductSelect}
          products={products}
        />
      </div>
    );
  }
}

export default App;
