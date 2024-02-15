import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ModalPropsType } from '../../../shared/types/modal';
import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { STYLE_MODAL } from '../../../shared/constants/style-modal-css';
import { SIZES } from '../../../shared/constants/sizes';
import { Category } from '../../Categories/types/category';

function ModalUpdateProduct(props: ModalPropsType) {
  const [productName, setProductName] = useState(props.data.product?.name);
  const [productPrice, setProductPrice] = useState(props.data.product?.price);
  const [productCategory, setProductCategory] = useState(
    props.data.product?.categoryId
  );
  const [productSize, setProductSize] = useState(props.data.product?.size);
  const categories: Category[] = props.data?.categories;

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={STYLE_MODAL}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Product
        </Typography>
        <div>
          <form onSubmit={props.onAction}>
            <FormControl className="w-80">
              <FormLabel sx={{ mb: 1, mt: 2 }}>Product name</FormLabel>
              <TextField
                value={productName}
                variant="outlined"
                required
                sx={{ mb: 2 }}
                onChange={(e) => setProductName(e.target.value)}
              ></TextField>
              <FormLabel sx={{ mb: 1 }}>Size</FormLabel>
              <Select
                id="demo-simple-select"
                value={productSize}
                required
                sx={{ mb: 2 }}
                onChange={(e) => setProductSize(e.target.value)}
              >
                {SIZES.map((size: { name: string; value: string }) => (
                  <MenuItem key={size.value} value={size.value}>
                    {size.name}
                  </MenuItem>
                ))}
              </Select>
              <FormLabel sx={{ mb: 1 }}>Price</FormLabel>
              <TextField
                variant="outlined"
                value={productPrice}
                required
                sx={{ mb: 2 }}
                onChange={(e) => setProductPrice(e.target.value)}
              ></TextField>
              <FormLabel sx={{ mb: 1 }}>Category</FormLabel>
              <FormControl>
                <Select
                  id="demo-simple-select"
                  value={productCategory}
                  required
                  sx={{ mb: 2 }}
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                  }}
                >
                  {categories?.map((category: Category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormControl>
          </form>
        </div>
        <div className="mt-4">
          <Button
            sx={{ mr: 2 }}
            variant="outlined"
            onClick={() =>
              props.onAction({
                id: props.data.product?.id,
                name: productName,
                price: productPrice,
                categoryId: productCategory,
                size: productSize,
              })
            }
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

export default ModalUpdateProduct;
