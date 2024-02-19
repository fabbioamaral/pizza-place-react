import Header from '../../shared/components/header';
import ClientDetails from './components/client-details';
import SelectedProducts from './components/selected-products';

function CreateOrder() {
  return (
    <>
      <Header></Header>
      <div className="pt-8 pl-4">
        {/* left section, client information, selected products, etc */}
        <div className="w-4/12 border-2 border-gray-600">
          <ClientDetails></ClientDetails>
          <SelectedProducts></SelectedProducts>
        </div>

        {/* search bar, categories, products */}
        <div></div>
      </div>
    </>
  );
}

export default CreateOrder;
