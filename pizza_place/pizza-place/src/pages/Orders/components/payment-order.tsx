import PaymentMethods from './payment-methods';
import SummaryOrder from './summary-order';

function PaymentOrder() {
  return (
    <>
      <SummaryOrder />
      <PaymentMethods />
    </>
  );
}

export default PaymentOrder;
