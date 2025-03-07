import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import './productItem.scss';

import { Product } from '../../types/types';
import { formatPrice, formatPriceToCurrency } from '../../utils/helper';

function ProductItem({ product }: { product: Product }) {
  let navigate = useNavigate();

  return (
    <div
      className="product__item"
      onClick={() => navigate('/product/' + product.id)}
    >
      <div
        className={`stock__wrapper ${
          product.availabilityStatus === 'Low Stock' && 'low'
        }`}
      >
        <p className="stock">
          {product.availabilityStatus} ({product.stock})
        </p>
      </div>

      <div className="image__wrapper">
        <img src={product.thumbnail} alt={product.thumbnail} />
      </div>

      <h3 className="title">{product.title}</h3>

      <div className="reviews">
        <Rating initialValue={product.rating} readonly />
        <span className="reviews__count">{product.reviews.length}</span>
      </div>

      {product.brand && <p>Brand - {product.brand}</p>}
      {product.category && <p>Category - {product.category}</p>}

      <div className="price">
        <p className="price--discount">
          {formatPriceToCurrency(product.price)}
        </p>

        <p className="price--main">
          {formatPriceToCurrency(
            formatPrice(product.price, product.discountPercentage)
          )}
        </p>
      </div>

      <p className="discount">({product.discountPercentage}% off)</p>

      <p>Min. order: {product.minimumOrderQuantity}</p>
    </div>
  );
}

export default ProductItem;
