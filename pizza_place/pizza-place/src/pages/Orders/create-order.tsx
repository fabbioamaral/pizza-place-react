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
import ModalSelectPizza from './components/modal-select-pizza-flavour';
import { PizzaFlavour } from '../PizzaFlavours/type/pizza-flavour';
import { PizzaCrust } from '../PizzaCrusts/types/pizza-crust';
import { Button } from '@mui/material';

function CreateOrder() {
  const [isSelectPizzaFlavourModalOpen, setIsSelectPizzaFlavourModalOpen] =
    useState(false);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [productSelected, setProductSelected] = useState<Product>();
  const [selectedProductsProps, setSelectedProductsProps] =
    useState<SelectedProductsProps>({
      products: [],
      sumPrice: 0,
    });

  const location = useLocation();
  const client = location.state.client;

  const categories: Category[] = useQuery(GET_CATEGORIES)?.data?.categories;
  const products = useQuery(GET_PRODUCTS)?.data?.products;
  const pizzaCategoryId = categories?.find(
    (category: Category) => category.name.toLowerCase() === 'pizza'
  )?.id;

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

    // if product happens to be pizza, the addition to the selected product list will be done after the ModalSelectPizza modal is closed
    if (productSelected.categoryId === pizzaCategoryId) {
      setIsSelectPizzaFlavourModalOpen(true);
      setProductSelected(productSelected);
    } else {
      // add the cost of the product that has been just added to the sum price
      selectedProductPropsList.sumPrice += productSelected.price;
      setSelectedProductsProps(selectedProductPropsList);
    }
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

  const addPizzaAttributes = (
    pizza: Product,
    flavours: PizzaFlavour[],
    crust: PizzaCrust
  ) => {
    const pizzaToBeAdded = {
      ...pizza,
      pizzaFlavour1: flavours[0],
      pizzaFlavour2: flavours[1],
      pizzaCrust: crust,
      amount: 1,
    };

    const selectedProductPropsList: SelectedProductsProps = JSON.parse(
      JSON.stringify(selectedProductsProps)
    );
    selectedProductPropsList.products.push(pizzaToBeAdded);
    selectedProductPropsList.sumPrice += pizzaToBeAdded.price;
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
          <div className="flex mb-1 pt-2 pl-2">
            <p className="font-bold">Operator:</p>
            <p className="ml-1">{'Joao da Silva'}</p>
          </div>
          <div className="flex flex-col flex-wrap py-4 px-1">
            <Button
              variant="contained"
              sx={{ mb: 1 }}
              type="submit"
              color="success"
            >
              Payment & Delivery
            </Button>
            <Button variant="contained" type="submit" color="error">
              Cancel
            </Button>
          </div>
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
                <div key={product.id}>
                  <ProductCard
                    id={product.id}
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    categoryId={product.categoryId}
                    size={product.size}
                    onAction={addProduct}
                  ></ProductCard>
                </div>
              ))
            ) : (
              <p className="mt-10 font-bold">No products to display.</p>
            )}
          </div>
        </div>
      </div>

      {isSelectPizzaFlavourModalOpen && (
        <ModalSelectPizza
          isOpen={isSelectPizzaFlavourModalOpen}
          onClose={() => setIsSelectPizzaFlavourModalOpen(false)}
          onAction={addPizzaAttributes}
          onDismiss={() => setIsSelectPizzaFlavourModalOpen(false)}
          data={{ client: client, pizzaToBeAdded: productSelected }}
        ></ModalSelectPizza>
      )}
    </>
  );
}

export default CreateOrder;
