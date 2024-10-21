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
  onClickDelete,
}: {
  headerTitles: string[];
  data: Object[];
  ariaLabel: string;
  onClickDelete: (id: string) => void;
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
                    <DeleteIcon
                      className="mr-4 cursor-pointer"
                      onClick={() => onClickDelete(dataRow.id)}
                    ></DeleteIcon>
                    <EditIcon className="cursor-pointer"></EditIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default TableComponent;
