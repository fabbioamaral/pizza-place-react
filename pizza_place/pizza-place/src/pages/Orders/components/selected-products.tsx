import { Button } from '@mui/material';
import {
  SelectedProduct,
  SelectedProductsProps,
} from '../types/selected-products';
import DeleteIcon from '@mui/icons-material/Delete';

function SelectedProducts(
  props: SelectedProductsProps & {
    onAction: (product: SelectedProduct) => void;
  }
) {
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
        {props?.products &&
          props.products.map((product: SelectedProduct) => (
            <>
              <div className="border-b-2 p-1">
                <div key={product.id} className="flex text-sm">
                  <p className="w-1/6 text-center">{product?.amount}</p>
                  <p className="w-3/6">{product?.name}</p>
                  <p className="w-1/6 text-center">R$ {product?.price}</p>
                  <p className="w-1/6 text-center">
                    <DeleteIcon
                      className="cursor-pointer"
                      onClick={() => props.onAction(product)}
                    ></DeleteIcon>
                  </p>
                </div>
                {/* info about pizza flavours and crust */}
                {product?.pizzaFlavour1 ? (
                  <div className="flex flex-col">
                    <small className="ml-20">
                      {product?.pizzaCrust[0]?.name} crust
                    </small>
                    <small className="ml-20">
                      {product.pizzaFlavour1.name}
                    </small>
                    {product?.pizzaFlavour2 ? (
                      <small className="ml-20">
                        {product.pizzaFlavour2.name}
                      </small>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </>
          ))}
        {/* footer */}
        <div className="mt-20">
          <div className="flex mb-1 pt-2 pl-2">
            <p className="font-bold">Operator:</p>
            <p className="ml-1">{'Joao da Silva'}</p>
          </div>
          <div className="flex mb-1 pl-2">
            <p className="font-bold">Total:</p>
            <p className="ml-1">R${props?.sumPrice}</p>
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
