import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Button variant="contained" type="button" sx={{ mt: 2, ml: 4 }}>
        <Link to="/">Home</Link>
      </Button>
    </>
  );
}

export default Header;
