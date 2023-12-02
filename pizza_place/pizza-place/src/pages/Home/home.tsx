import MenuItemCard from './components/MenuItemCard';
import { Outlet, Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div className='flex'>
                <Link to="/create-order"><MenuItemCard title='Orders'></MenuItemCard></Link>
                <Link to="list-orders"><MenuItemCard title='Orders History'></MenuItemCard></Link>
            </div>
            <div className="flex">
            <Link to="/create-product"><MenuItemCard title='Products'></MenuItemCard></Link>
                <Link to="/list-products"><MenuItemCard title='Products'></MenuItemCard></Link> 
            </div>
            <div className="flex">
                <Link to="/create-client"><MenuItemCard title='Add Client'></MenuItemCard></Link>
                <Link to="/list-clients"><MenuItemCard title='Clients'></MenuItemCard></Link>
            </div>
            <div className="flex">
                <Link to="/create-category"><MenuItemCard title='Create Category'></MenuItemCard></Link>
                <Link to="/list-categories"><MenuItemCard title='Categories'></MenuItemCard></Link>   
            </div>
            <Outlet />
        </>

    );
  }
  
  export default Home;
  