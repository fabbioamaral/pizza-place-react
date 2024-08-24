import { Button } from '@mui/material';
import PaymentMethods from '../../PaymentMethods/components/payment-methods';
import { SummaryOrderTyoe } from '../types/summary-order';
import SummaryOrder from './summary-order';

function PaymentOrder(props: SummaryOrderTyoe) {
  return (
    <>
      <SummaryOrder
        address={props.address}
        numberOfProduct={props.numberOfProduct}
        totalProducts={props.totalProducts}
        deliveryFee={0}
        total={props.total}
      />
      <PaymentMethods />
      <div className="px-6 mt-8">
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          type="submit"
          color="success"
        >
          Order
        </Button>
        <Button variant="contained" type="submit" color="error">
          Cancel
        </Button>
      </div>
    </>
  );
}

export default PaymentOrder;
