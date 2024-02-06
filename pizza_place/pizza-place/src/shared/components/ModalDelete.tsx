import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ModalPropsType } from '../types/modal';
import { STYLE_MODAL } from '../constants/style-modal-css';

function ModalDelete(props: ModalPropsType) {
  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={STYLE_MODAL}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.description}
        </Typography>
        <div className="mt-4">
          <Button
            sx={{ mr: 2 }}
            color="error"
            variant="outlined"
            onClick={props.onAction}
          >
            Delete
          </Button>
          <Button variant="outlined" onClick={props.onDismiss}>
            Dismiss
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalDelete;
