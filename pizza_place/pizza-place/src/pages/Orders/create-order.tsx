import { useQuery } from '@apollo/client';
import Header from '../../shared/components/header';
import SearchBar from '../../shared/components/search-bar';
import Slider from '../../shared/components/slider/slider';
import { GET_CATEGORIES } from '../Categories/graphql/get-categories';
import ClientDetails from './components/client-details';
import SelectedProducts from './components/selected-products';
import { client } from '../..';
import { Category } from '../Categories/types/category';

function CreateOrder() {
  const categoriesData = useQuery(GET_CATEGORIES);
  // reading cache
  const categories: Category[] = client.readQuery({
    query: GET_CATEGORIES,
  })?.categories;

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
              slides={categories?.map((category: Category) => category.name)}
              numberOfSlidesPerView={4}
            ></Slider>
          </div>

          {/* products */}
          <div></div>
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
