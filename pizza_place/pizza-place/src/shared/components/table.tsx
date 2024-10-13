import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TableComponent({
  headerTitles,
  data,
  ariaLabel,
}: {
  headerTitles: string[];
  data: Object[];
  ariaLabel: string;
}) {
  return (
    <>
      <div className="p-8">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label={ariaLabel}>
            <TableHead>
              <TableRow>
                {headerTitles?.map((headerTitle: string) => {
                  if (headerTitle === 'id') return '';
                  return <TableCell key={headerTitle}>{headerTitle}</TableCell>;
                })}
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((dataRow: any) => (
                <TableRow
                  key={dataRow.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.keys(dataRow).map((key) => {
                    if (key === 'id') return '';
                    return (
                      <TableCell component="th" scope="row" key={dataRow[key]}>
                        {dataRow[key]}
                      </TableCell>
                    );
                  })}
                  <TableCell align="left">
                    <DeleteIcon className="mr-4 cursor-pointer"></DeleteIcon>
                    <EditIcon className="cursor-pointer"></EditIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {deleteModalData.isOpen && (
          <ModalDelete
            title="Delete Product"
            description="Are you sure you want to delete this prodct?"
            isOpen={deleteModalData.isOpen}
            onClose={() => handleCloseModal(true)}
            onAction={onDeleteCategory}
            onDismiss={() => handleCloseModal(true)}
          ></ModalDelete>
        )}
        {updateModalData.isOpen && (
          <ModalUpdateProduct
            isOpen={updateModalData.isOpen}
            onClose={() => handleCloseModal(false)}
            onAction={onUpdateProduct}
            onDismiss={() => handleCloseModal(false)}
            data={{ product: updateModalData.product, categories }}
          ></ModalUpdateProduct>
        )} */}
      </div>
    </>
  );
}

export default TableComponent;
