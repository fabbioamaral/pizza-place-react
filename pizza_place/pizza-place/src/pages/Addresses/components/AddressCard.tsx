// example of an address sumary: Rua da Bahia, 1537, Centro - Belo Horizonte

export default function AddressCard({
  addressSummaryText,
  selected,
}: {
  addressSummaryText: string;
  selected: boolean;
}) {
  return (
    <>
      <div
        className={
          'p-2 mb-2 bg-gray-200 rounded cursor-pointer ' +
          (selected ? 'border-2 border-gray-500' : '')
        }
      >
        <p>{addressSummaryText}</p>
      </div>
    </>
  );
}
