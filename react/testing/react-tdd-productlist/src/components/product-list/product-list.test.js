import React from 'react';
import { mount, shallow } from 'enzyme';
import ProductList from './product-list';
import App from '../../App';

let firstElement, mockProducts, productSelectFn, wrapper;

describe('product list', () => {
  beforeEach(() => {
    mockProducts = [
      { id: 1, name: 'Mock Product 1', brand: 'MockBrandA' },
      { id: 2, name: 'Mock Product 2', brand: 'MockBrandB' },
      { id: 3, name: 'Mock Product 3', brand: 'MockBrandC' },
    ];

    productSelectFn = jest.fn();

    wrapper = shallow(
      <ProductList onProductSelect={productSelectFn} products={mockProducts} />,
    );

    firstElement = wrapper.find('li').first();
  });

  afterEach(() => {
    productSelectFn.mockReset();
  });

  it('should render an `<li>` element for every product in `props.products`', () => {
    expect(wrapper.find('li').length).toEqual(mockProducts.length);
  });

  it('should display the product name in each `<li>` element', () => {
    expect(firstElement.contains(mockProducts[0].name)).toEqual(true);
  });

  it('should display the brand name in each `<li>` element', () => {
    expect(firstElement.contains(mockProducts[0].brand)).toEqual(true);
  });

  it('should call `props.onProductSelect` when an `<li>` is clicked', () => {
    expect(productSelectFn.mock.calls.length).toEqual(0);

    firstElement.simulate('click');

    expect(productSelectFn.mock.calls.length).toEqual(1);

    expect(productSelectFn.mock.calls[0][0]).toEqual(mockProducts[0]);
  });
});
