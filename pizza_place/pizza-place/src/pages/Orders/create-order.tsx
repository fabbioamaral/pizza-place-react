import { useQuery } from '@apollo/client';
import Header from '../../shared/components/header';
import SearchBar from '../../shared/components/search-bar';
import Slider from '../../shared/components/slider/slider';
import { GET_CATEGORIES } from '../Categories/graphql/get-categories';
import ClientDetails from './components/client-details';
import SelectedProducts from './components/selected-products';
import { Category } from '../Categories/types/category';
import ProductCard from './components/product-card';
import { GET_PRODUCTS } from '../Products/graphql/get-products';
import { Product } from '../Products/types/product';
import { useEffect, useState } from 'react';

function CreateOrder() {
  const [category, setCategory] = useState<Category>({ id: 1, name: 'Pizzas' });
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);

  const categories = useQuery(GET_CATEGORIES)?.data?.categories;
  const products = useQuery(GET_PRODUCTS)?.data?.products;

  useEffect(() => {
    setProductsToShow(
      products?.filter((product: Product) => product.categoryId === category.id)
    );
  }, [category, products]);

  return (
    <>
      <Header></Header>
      <div className="pt-8 pl-4 flex">
        {/* left section, client information, selected products, etc */}
        <div className="w-4/12 border-2 border-gray-600">
          <ClientDetails></ClientDetails>
          <SelectedProducts></SelectedProducts>
        </div>

        {/* search bar, categories, products */}
        <div className="w-8/12 pr-4">
          {/* search bar */}
          <div>
            <SearchBar></SearchBar>
          </div>
          {/* categories */}
          <div className="mt-6 ml-2">
            <Slider
              slides={categories}
              numberOfSlidesPerView={4}
              onAction={setCategory}
            ></Slider>
          </div>

          {/* products */}
          <div className="flex flex-wrap justify-center mt-5 mx-10">
            {productsToShow && productsToShow.length ? (
              productsToShow?.map((product: Product) => (
                <ProductCard
                  id={product.id}
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  categoryId={product.categoryId}
                  size={product.size}
                ></ProductCard>
              ))
            ) : (
              <p className="mt-10 font-bold">No products to display.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
