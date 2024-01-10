import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ModalDeleteCategoryProps } from '../types/modal-delete-category-props';

function ModalDeleteCategory(props: ModalDeleteCategoryProps) {
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
          Delete Category
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this category?
        </Typography>
        <div className="mt-4">
          <Button
            sx={{ mr: 2 }}
            color="error"
            variant="outlined"
            onClick={props.onDeleteClick}
          >
            Delete
          </Button>
          <Button variant="outlined" onClick={props.onDismissClick}>
            Dismiss
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalDeleteCategory;
