import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import ProductList from './components/product-list';
import App from './App';

const mockProducts = [
  { id: 1, name: 'Mock Product 1', brand: 'MockBrandA' },
  { id: 2, name: 'Mock Product 2', brand: 'MockBrandB' },
  { id: 3, name: 'Mock Product 3', brand: 'MockBrandC' },
];

let wrapper;

describe('app container', () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('should start with an empty array in the selectedProducts state', () => {
    expect(wrapper.state('selectedProducts')).toEqual([]);
  });

  it('should contain the same items added by the handleProductSelect function in the selectedProducts state', () => {
    expect(wrapper.state('selectedProducts')).toEqual([]);

    mockProducts.forEach(product => {
      wrapper.instance().handleProductSelect(product);
    });

    expect(wrapper.state('selectedProducts')).toEqual(mockProducts);
  });

  it('should contain the same amount of items added by the handleProduct function in the selectedProducts state', () => {
    expect(wrapper.state('selectedProducts')).toEqual([]);

    mockProducts.forEach(product => {
      wrapper.instance().handleProductSelect(product);
    });

    expect(wrapper.state('selectedProducts').length).toEqual(
      mockProducts.length,
    );
  });

  it('should start with an empty string as the filterString state', () => {
    expect(wrapper.state('filterString')).toEqual('');
  });

  it('should contain only a input tag', () => {
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('should have the same value as the input in the filterString state', () => {
    wrapper.find('input').simulate('change', { target: { value: 'abc' } });

    expect(wrapper.state('filterString')).toEqual('abc');
  });

  it('should filter the products correctly', () => {
    let productList;

    wrapper.setState({ products: mockProducts, filterString: 'abc' });

    productList = wrapper.find(ProductList);

    expect(productList.prop('products')).toEqual([]);

    wrapper.setState({ filterString: 'branda' });

    productList = wrapper.find(ProductList);

    expect(productList.prop('products')).toEqual([mockProducts[0]]);
  });
});
