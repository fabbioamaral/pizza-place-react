// example of an address sumary: Rua da Bahia, 1537, Centro - Belo Horizonte

export default function AddressCard({
  addressSummaryText,
}: {
  addressSummaryText: string;
}) {
  return (
    <>
      <div className="p-2 mb-2 bg-gray-200 rounded">
        <p>{addressSummaryText}</p>
      </div>
    </>
  );
}
