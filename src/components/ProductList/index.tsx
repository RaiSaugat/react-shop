import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import './productList.scss';

import { Product } from '../../types/types';
import { getProductsByPage } from '../../api/product.api';
import Loader from '../Loader';
import ProductItem from '../ProductItem';
import { LIMIT } from '../../utils/constants';

const ProductList: FC = () => {
  const { pathname } = useLocation();

  const [products, setProducts] = useState<Product[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getProductsByPage(itemOffset);
      setProducts(data.products);
      setTotal(data.total);
      setIsLoading(false);
    };
    fetchData();
  }, [itemOffset]);

  const pageCount = Math.ceil(total / LIMIT);

  const handlePageClick = (event: any) => {
    setItemOffset(event.selected * LIMIT);
  };

  const renderProducts = () => {
    if (products.length === 0) return <Loader />;

    if (isLoading) {
      return (
        <div className="loader__wrapper">
          <Loader />
        </div>
      );
    }

    return products.map((product) => {
      return <ProductItem product={product} key={product.id} />;
    });
  };

  return (
    <div
      className={`product__list__side ${
        pathname === '/' ? 'show' : 'hide-in-mobile'
      }`}
    >
      <h2>Product List</h2>
      {renderProducts()}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default ProductList;
