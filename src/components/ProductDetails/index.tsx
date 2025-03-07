import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import './productDetails.scss';

import { Product } from '../../types/types';
import { getProductById } from '../../api/product.api';
import {
  formatPrice,
  formatPriceToCurrency,
  savePrice,
} from '../../utils/helper';
import Reviews from '../Reviews';
import Divider from '../Divider';
import Loader from '../Loader';
import InformationView from '../InformationView';

const ProductDetails: FC = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getProductById(parseInt(id as string));
      setProduct(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading || !product) {
    return (
      <div className="product__details">
        <Loader />
      </div>
    );
  }

  return (
    <div className="product__details">
      <button className="back__button" onClick={() => navigate('/')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          viewBox="0 0 32 32"
        >
          <path
            d="M10.1 23a1 1 0 0 0 0-1.41L5.5 17h23.55a1 1 0 0 0 0-2H5.53l4.57-4.57A1 1 0 0 0 8.68 9l-6.36 6.37a.9.9 0 0 0 0 1.27L8.68 23a1 1 0 0 0 1.42 0Z"
            data-name="Layer 2"
          />
        </svg>
        Back
      </button>

      <div className="general__details">
        <div className="image__wrapper">
          <img src={product.images[0]} alt={product.title} />
        </div>

        <h1 className="title">{product.title}</h1>

        <div className="reviews">
          {product.rating}
          <Rating initialValue={product.rating} readonly />
          <a href="#reviews" className="reviews__count">
            {product.reviews.length} ratings
          </a>
        </div>

        <p className="stock">
          {product.availabilityStatus} ({product.stock})
        </p>
        <p>Min. order: {product.minimumOrderQuantity}</p>

        <Divider />

        <div className="price">
          <p className="price--main">
            Original Price:
            <span className="price--main__value">
              {formatPriceToCurrency(product.price)}
            </span>
          </p>
          <p className="price--discount">
            Price:
            <span className="price--discount__value">
              {formatPriceToCurrency(
                formatPrice(product.price, product.discountPercentage)
              )}
            </span>
          </p>
          <p className="price--save">
            You Save:
            <span className="price--save__value">
              {formatPriceToCurrency(
                parseFloat(savePrice(product.price, product.discountPercentage))
              )}
              <span>({product.discountPercentage}%)</span>
            </span>
          </p>
        </div>
      </div>

      <div>
        <h3>About this item</h3>
        <p>{product.description}</p>
      </div>

      <Divider />

      <div className="technical__details">
        <div className="product__information">
          <h3>Product Information</h3>

          <InformationView label="Brand" value={product.brand || '-'} />
          <InformationView label="Category" value={product.category} />
          <InformationView label="Weight" value={product.weight} />
          <InformationView
            label="Package Dimensions"
            value={`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`}
          />
          <InformationView label="Sku" value={product.sku} />
          <InformationView label="Tags" value={product.tags.join(', ')} />
        </div>

        <Divider />

        <div className="shipping__information">
          <h3>Shipping and Warranty</h3>

          <InformationView
            label="Warranty Information"
            value={product.warrantyInformation}
          />
          <InformationView
            label="Shipping Information"
            value={product.shippingInformation}
          />
          <InformationView label="Return Policy" value={product.returnPolicy} />
        </div>
      </div>

      <Divider />

      <Reviews reviews={product.reviews} />
    </div>
  );
};

export default ProductDetails;
