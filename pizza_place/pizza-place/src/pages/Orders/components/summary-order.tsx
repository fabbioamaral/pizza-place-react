import { SummaryOrderTyoe } from '../types/summary-order';

function SummaryOrder(props: SummaryOrderTyoe) {
  return (
    <>
      <div className="px-6">
        <h2 className="font-bold text-xl">Payment</h2>
        <div className="flex justify-between my-2 w-60">
          <p className="font-bold">Number of Products</p>
          <p>{props.numberOfProduct}</p>
        </div>
        <div className="flex justify-between my-5 w-60">
          <p className="font-bold">Total Products</p>
          <p>{props.totalProducts}</p>
        </div>
        <div className="flex justify-between my-5 w-60">
          <p className="font-bold">Delivery Fee</p>
          <p>{props.deliveryFee}</p>
        </div>
        <div className="flex justify-between my-5 w-60">
          <p className="font-bold">TOTAL</p>
          <p>{props.total}</p>
        </div>
        <h2 className="font-bold text-xl">Address</h2>
        <p className="my-2">{props.address}</p>
      </div>
    </>
  );
}

export default SummaryOrder;
