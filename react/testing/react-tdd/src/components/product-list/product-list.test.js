import React from 'react';
import { shallow } from 'enzyme';
import ProductList from './product-list';

let firstElement, mockProducts, productSelectFn, wrapper;

describe('product list', () => {
  beforeEach(() => {
    mockProducts = [
      { id: 1, name: 'Mock Product 1', brand: 'MockBrandA' },
      { id: 2, name: 'Mock Product 2', brand: 'MockBrandB' },
      { id: 3, name: 'Mock Product 3', brand: 'MockBrandC' },
    ];

    productSelectFn = productSelected =>
      console.log(`You've selected, ${productSelected}`);

    wrapper = shallow(<ProductList products={mockProducts} />);

    firstElement = wrapper.find('li').first();
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
    firstElement.simulate('click');
  });
});
