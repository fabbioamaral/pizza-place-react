import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import CreateOrder from './pages/Orders/create-order';
import ListOrders from './pages/Orders/list-orders';
import CreateProduct from './pages/Products/create-product';
import ListProducts from './pages/Products/list-products';
import CreateClient from './pages/Clients/create-client';
import ListClients from './pages/Clients/list-clients';
import CreateCategory from './pages/Categories/create-category';
import ListCategories from './pages/Categories/list-categories';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

root.render(
    <ApolloProvider client={client}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={< Home />} />
      <Route path="/create-order" element={< CreateOrder />} />
      <Route path="/list-orders" element={< ListOrders />} />
      <Route path="/create-product" element={< CreateProduct />} />
      <Route path="/list-products" element={< ListProducts />} />
      <Route path="/create-client" element={< CreateClient />} />
      <Route path="/list-clients" element={< ListClients />} />
      <Route path="/create-category" element={< CreateCategory />} />
      <Route path="/list-category" element={< ListCategories />} />
    </Routes>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
      </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
