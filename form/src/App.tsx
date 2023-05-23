import ProcudtForm from './pages/create-product/ProcudtForm';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductList from './pages/product-list/ProductList';

const queryClient = new QueryClient();
function App() {
  return (
    <>

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route path='new' element={<ProcudtForm />} ></Route>
              <Route path='list' element={<ProductList />} ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
