import { Product } from '../../Products/types/product';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function ProductCard(
  props: Product & { onAction: (product: Product) => void }
) {
  return (
    <>
      <div
        className="flex flex-col items-center pt-2 px-4 cursor-pointer rounded border w-40 h-40 m-5"
        onClick={() => props.onAction(props)}
      >
        <p className="font-bold mt-2">{props?.name}</p>
        <p className="mt-1">R$ {props?.price}</p>
        <AddCircleIcon sx={{ my: 3 }} />
      </div>
    </>
  );
}

export default ProductCard;
