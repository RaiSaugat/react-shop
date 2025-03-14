import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import './productList.scss';

import { Product } from '../../types/types';
import { getProductsByPage } from '../../api/product.api';
import Loader from '../Loader';
import ProductItem from '../ProductItem';
import { LIMIT } from '../../utils/constants';
import Filter from '../Filter';

const ProductList: FC = () => {
  const { pathname } = useLocation();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filterBy, setFilterBy] = useState('');
  const [filterOptions, setFilterOptions] = useState([
    { label: 'All', value: 'all' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getProductsByPage(itemOffset);
      if (data.products.length > 0) {
        const categoryArray = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        const options = categoryArray.map((category) => ({
          label: category,
          value: category,
        }));
        setFilterOptions((s) => [{ label: 'All', value: 'all' }, ...options]);
        setProducts(data.products);
        setFilteredProducts(data.products);
        setTotal(data.total);
        setFilteredTotal(data.total);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [itemOffset]);

  useEffect(() => {
    const updatedProducts = products;

    if (filterBy === 'all') {
      setFilteredProducts(updatedProducts);
      setFilteredTotal(total);
    } else {
      const filteredProducts = updatedProducts.filter(
        (product) => product.category === filterBy
      );
      setFilteredProducts(filteredProducts);
      setFilteredTotal(filteredProducts.length);
    }
  }, [filterBy]);

  const pageCount = Math.ceil(filteredTotal / LIMIT);

  const handlePageClick = (event: any) => {
    setItemOffset(event.selected * LIMIT);
  };

  const renderProducts = () => {
    if (filteredProducts.length === 0) return <Loader />;

    if (isLoading) {
      return (
        <div className="loader__wrapper">
          <Loader />
        </div>
      );
    }

    return filteredProducts.map((product) => {
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
      <Filter
        options={filterOptions}
        onChange={(data) => setFilterBy(data.value)}
        loading={isLoading}
      />
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
