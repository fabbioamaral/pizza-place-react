import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ModalPropsType } from '../../../shared/types/modal';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { useState } from 'react';

function ModalUpdateCategory(props: ModalPropsType) {
  const [categoryName, setCategoryName] = useState(props.data);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Category
        </Typography>
        <div>
          <form onSubmit={props.onAction}>
            <FormControl className="w-80">
              <FormLabel sx={{ mb: 1, mt: 2 }}>Category name</FormLabel>
              <TextField
                variant="outlined"
                required
                sx={{ mb: 2 }}
                onChange={(e) => setCategoryName(e.target.value)}
                defaultValue={props.data}
              ></TextField>
            </FormControl>
          </form>
        </div>
        <div className="mt-4">
          <Button
            sx={{ mr: 2 }}
            variant="outlined"
            onClick={() => props.onAction(categoryName)}
          >
            Update
          </Button>
          <Button variant="outlined" onClick={props.onDismiss}>
            Dismiss
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalUpdateCategory;
