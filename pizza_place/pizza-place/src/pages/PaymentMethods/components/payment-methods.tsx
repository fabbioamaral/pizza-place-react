import { useQuery } from '@apollo/client';
import { Chip } from '@mui/material';
import { useState } from 'react';
import { GET_PAYMENT_METHODS } from '../../PaymentMethods/gql/get-payment-methods';
import { PaymentMethod } from '../../PaymentMethods/type/payment-method';

function PaymentMethods() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');
  const paymentMethods = useQuery(GET_PAYMENT_METHODS).data?.paymentMethods;
  return (
    <>
      <div className="px-6">
        <h2 className="font-bold text-xl">Payment Methods</h2>
        <div
          className="flex flex-wrap w-8/12 mt-2"
          style={{ overflow: 'hidden' }}
        >
          {paymentMethods?.length &&
            paymentMethods.map((paymentMethod: PaymentMethod) => (
              <Chip
                key={paymentMethod.id}
                label={paymentMethod.name}
                sx={{ margin: 0.5 }}
                variant={
                  selectedPaymentMethod === paymentMethod.name
                    ? 'filled'
                    : 'outlined'
                }
                clickable
                onClick={() => setSelectedPaymentMethod(paymentMethod.name)}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default PaymentMethods;
