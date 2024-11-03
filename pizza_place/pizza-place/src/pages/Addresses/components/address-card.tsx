// example of an address sumary: Rua da Bahia, 1537, Centro - Belo Horizonte
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalDelete from '../../../shared/components/ModalDelete';
import { useState } from 'react';

export default function AddressCard({
  addressSummaryText,
  selected,
  deleteAddress,
  updateAddress,
}: {
  addressSummaryText: string;
  selected?: boolean;
  deleteAddress?: (addressId: string) => Promise<void>;
  updateAddress?: () => void;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div
        className={
          'flex justify-between p-2 mb-2 bg-gray-200 rounded cursor-pointer ' +
          (selected ? 'border-2 border-gray-500' : '')
        }
      >
        <p>{addressSummaryText}</p>
        <div>
          <DeleteIcon
            className="cursor-pointer mr-1"
            fontSize="small"
            onClick={() => setIsDeleteModalOpen(true)}
          ></DeleteIcon>
          {isDeleteModalOpen && (
            <ModalDelete
              title="Delete Client"
              description="Are you sure you want to delete this client?"
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onDismiss={() => setIsDeleteModalOpen(false)}
              onAction={deleteAddress}
            ></ModalDelete>
          )}
          <EditIcon
            className="cursor-pointer"
            fontSize="small"
            onClick={() => {}}
          ></EditIcon>
        </div>
      </div>
    </>
  );
}
