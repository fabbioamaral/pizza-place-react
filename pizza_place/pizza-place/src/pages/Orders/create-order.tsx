import { useQuery } from '@apollo/client';
import Header from '../../shared/components/header';
import SearchBar from '../../shared/components/search-bar';
import Slider from '../../shared/components/slider/slider';
import { GET_CATEGORIES } from '../Categories/graphql/get-categories';
import SelectedProducts from './components/selected-products';
import { Category } from '../Categories/types/category';
import ProductCard from './components/product-card';
import { GET_PRODUCTS } from '../Products/graphql/get-products';
import { Product } from '../Products/types/product';
import { useState } from 'react';
import { SelectedProductsProps } from './types/selected-products';
import ClientInfo from '../Clients/components/client-info';
import { useLocation } from 'react-router-dom';

function CreateOrder() {
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [selectedProductsProps, setSelectedProductsProps] =
    useState<SelectedProductsProps>({
      products: [],
      operatorName: 'Clebao',
      sumPrice: 0,
    });

  const location = useLocation();
  const client = location.state.client;

  const categories = useQuery(GET_CATEGORIES)?.data?.categories;
  const products = useQuery(GET_PRODUCTS)?.data?.products;

  const setProductToDisplay = (category: Category) => {
    setProductsToShow(
      products?.filter((product: Product) => product.categoryId === category.id)
    );
  };

  const addProduct = (productSelected: Product) => {
    const selectedProductPropsList: SelectedProductsProps = JSON.parse(
      JSON.stringify(selectedProductsProps)
    );
    if (
      selectedProductPropsList.products &&
      selectedProductPropsList.products.length > 0
    ) {
      const isProductPresentInTheListAlready =
        selectedProductPropsList.products.some(
          (p) => p.id === productSelected.id
        );

      if (isProductPresentInTheListAlready) {
        const productIndex = selectedProductPropsList.products.findIndex(
          (p) => p.id === productSelected.id
        );
        selectedProductPropsList.products[productIndex].amount += 1;
      } else {
        selectedProductPropsList.products.push({
          id: productSelected!.id,
          name: productSelected!.name,
          price: productSelected!.price,
          categoryId: productSelected!.categoryId,
          size: productSelected!.size,
          amount: 1,
        });
      }
    } else {
      selectedProductPropsList.products.push({
        id: productSelected!.id,
        name: productSelected!.name,
        price: productSelected!.price,
        categoryId: productSelected!.categoryId,
        size: productSelected!.size,
        amount: 1,
      });
    }

    console.log('executei!');
    // add the cost of the product that has been just added to the sum price
    selectedProductPropsList.sumPrice += productSelected.price;
    setSelectedProductsProps(selectedProductPropsList);
  };

  const deleteProduct = (productSelected: Product) => {
    const selectedProductPropsList: SelectedProductsProps = JSON.parse(
      JSON.stringify(selectedProductsProps)
    );

    const productIndex = selectedProductPropsList.products.findIndex(
      (p) => p.id === productSelected.id
    );
    selectedProductPropsList.products[productIndex].amount -= 1;

    if (selectedProductPropsList.products[productIndex].amount === 0) {
      selectedProductPropsList.products.splice(productIndex, 1);
    }

    selectedProductPropsList.sumPrice -= productSelected.price;
    setSelectedProductsProps(selectedProductPropsList);
  };

  return (
    <>
      <Header></Header>
      <div className="pt-8 pl-4 flex">
        {/* left section, client information, selected products, etc */}
        <div className="w-4/12 border-2 border-gray-600">
          <ClientInfo client={client} />
          <SelectedProducts
            products={selectedProductsProps.products}
            sumPrice={selectedProductsProps.sumPrice}
            onAction={deleteProduct}
          ></SelectedProducts>
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
              onAction={setProductToDisplay}
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
                  onAction={addProduct}
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
