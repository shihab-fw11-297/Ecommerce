import React from 'react'
import { useState } from "react";
import { Skeleton } from "../components/loader";
import Card from '../components/card'
import { useCategoriesQuery, useSearchProductsQuery } from '../redux/api/productAPI';
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const totalPage = 10;  
  
  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
    isFetching
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
    limit:12
  });
  const isPrevPage = page > 1;
  const isNextPage = page < Math.ceil(searchedData?.totalPage);

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error
  } = useCategoriesQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };


  if (isError) {
    toast.error(error.data.message);
  }
  if (productIsError) {
    toast.error(productError.data.message);
  }

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {productLoading || isFetching ? (
          <Skeleton width="80vw" length={12} home={false} />
        ) : (
          <div className="search-product-list">
            {searchedData?.products.map((i) => (
              <Card
                key={i.id}
                prodId={i.id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))}
          </div>
        )}

        {searchedData && searchedData.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  )
}

export default Search