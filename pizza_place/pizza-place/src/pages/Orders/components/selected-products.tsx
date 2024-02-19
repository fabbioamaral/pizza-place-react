import { Button } from '@mui/material';
import { SelectedProductsProps } from '../types/selected-products';
import DeleteIcon from '@mui/icons-material/Delete';

function SelectedProducts(props?: SelectedProductsProps) {
  return (
    <>
      <div>
        {/* header */}
        <div className="flex bg-gray-200 p-3">
          <p className="w-1/6 mr-6">#</p>
          <p className="w-3/6">Item</p>
          <p className="w-1/6">Price</p>
          <p className="w-1/6"></p>
        </div>
        {/* body */}
        <div className="flex p-1 text-sm border-b-2">
          <p className="w-1/6 text-center">1</p>
          <p className="w-3/6">Pizza GG Frango Catupiry</p>
          <p className="w-1/6 text-center">R$ 32.90</p>
          <p className="w-1/6 text-center">
            <DeleteIcon
              className="cursor-pointer"
              onClick={() => console.log('delete clicked')}
            ></DeleteIcon>
          </p>
        </div>
        <div className="flex p-1 text-sm border-b-2">
          <p className="w-1/6 text-center">1</p>
          <p className="w-3/6">Pizza GG Frango Catupiry</p>
          <p className="w-1/6 text-center">R$ 32.90</p>
          <p className="w-1/6 text-center">
            <DeleteIcon
              className="cursor-pointer"
              onClick={() => console.log('delete clicked')}
            ></DeleteIcon>
          </p>
        </div>
        {/* footer */}
        <div className="mt-20">
          <div className="flex mb-1 pt-2 pl-2">
            <p className="font-bold">Operator:</p>
            <p className="ml-1">{'Joao da Silva'}</p>
          </div>
          <div className="flex mb-1 pl-2">
            <p className="font-bold">Total:</p>
            <p className="ml-1">R$100.45</p>
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
      </div>
    </>
  );
}

export default SelectedProducts;
