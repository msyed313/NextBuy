import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import CheckOut from './pages/CheckOut'
import OrderHistory from './pages/OrderHistory'
import Header from './components/Header'
import Footer from './components/Footer'
import Categories from './pages/Categories'
import About from './pages/About'
import Contact from './pages/Contact'
import CartPage from './pages/CartPage'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/CheckOut'
import AddProduct from './pages/admin/AddProduct'
import CategoryManagement from './pages/admin/CategoryManagement'
import AddCategory from './pages/admin/AddCategory'
import ProductCategory from './pages/admin/ProductCategory'
import UserManagement from './pages/admin/UserManagement'
import AddUser from './pages/admin/AddUser'

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  )
}

function MainApp() {
  const location = useLocation();
  const hideHeaderFooterRoutes = ['/login', '/signup','/admin','/admin/addproduct/:categoryId','/admin/addcategory','/admin/:categoryId/products','/admin/adduser','/admin/usermanagement'];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path='/admin/usermanagement' Component={UserManagement} />
        <Route path='/admin/adduser' Component={AddUser} />
        <Route path='/signup' Component={Signup} />
        <Route path='/login' Component={Login} />
        <Route path='/admin' Component={CategoryManagement} />
        <Route path='/admin/addproduct/:categoryId' Component={AddProduct} />
        <Route path='/admin/addcategory' Component={AddCategory} />
        <Route path='/admin/:categoryId/products' Component={ProductCategory} />
        <Route path='/' Component={Home} />
        <Route path='/category/:id' Component={Product} />
        <Route path='/cart' Component={CartPage} />
        <Route path='/checkout' Component={CheckOut} />
        <Route path='/orderhistory' Component={OrderHistory} />
        <Route path='/categories' Component={Categories} />
        <Route path='/aboutus' Component={About} />
        <Route path='/contactus' Component={Contact} />
        <Route path='/product/:id' Component={ProductDetail} />
        <Route path='/checkout' Component={Checkout} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  )
}

export default App;
