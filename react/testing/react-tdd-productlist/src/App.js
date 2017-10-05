import React, { PureComponent } from 'react';
import ProductList from './components/product-list';
import filterItems from './helpers/filter-items';

class App extends PureComponent {
  state = {
    filterString: '',
    products: [
      { id: 1, name: 'AirMax 90', brand: 'Nike' },
      { id: 2, name: 'Yeezy', brand: 'Adidas' },
      { id: 3, name: 'Classic', brand: 'Reebok' },
    ],
    selectedProducts: [],
  };

  handleFilter = ({ target: { value } }) => {
    this.setState({
      filterString: value,
    });
  };

  handleProductSelect = product => {
    this.setState(({ selectedProducts }) => ({
      selectedProducts: selectedProducts.concat(product),
    }));
  };

  render() {
    const { filterString, products, selectedProducts } = this.state;

    const productsToRender = filterItems(filterString, products);

    return (
      <div>
        <h1>My Product Store</h1>
        <p>You have selected {selectedProducts.length} products.</p>
        <input onChange={this.handleFilter} value={filterString} />
        <ProductList
          onProductSelect={this.handleProductSelect}
          products={productsToRender}
        />
      </div>
    );
  }
}

export default App;
