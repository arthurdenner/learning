import React from 'react';
import PropTypes from 'prop-types';

const ProductList = ({ onProductSelect, products }) => (
  <div>
    <h1>PRODUCT LIST</h1>
    <ul>
      {products.map(product => (
        <li key={product.id} onClick={() => onProductSelect(product)}>
          {product.name} - {product.brand}
        </li>
      ))}
    </ul>
  </div>
);

ProductList.propTypes = {
  onProductSelect: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;
