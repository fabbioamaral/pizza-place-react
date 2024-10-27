import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Link to="/">
        <Button variant="contained" type="button" sx={{ mt: 2, ml: 4 }}>
          Home
        </Button>
      </Link>
    </>
  );
}

export default Header;
