import { Product } from '../../Products/types/product';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function ProductCard(props: Product) {
  return (
    <>
      <div className="flex flex-col items-center pt-2 px-4 cursor-pointer rounded border w-36 h-32 m-5">
        <p className="font-bold mt-2">{props?.name}</p>
        <AddCircleIcon sx={{ my: 3 }} />
      </div>
    </>
  );
}

export default ProductCard;
