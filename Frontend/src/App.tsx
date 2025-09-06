import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { MoviesProvider } from './context/MoviesContext.jsx';
import MainLayout from './MainLayout.tsx';

import HomePage from './pages/HomePage.tsx';
import CategoriesPage from './pages/CategoriesPage.tsx';
import HelpPage from './pages/HelpPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import BasketPage from './pages/BasketPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import Confirmation from './pages/ConfirmationPage.tsx';
import MoviePage from './pages/MoviePage.tsx';

export default function App() {
  return (
    <MoviesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/categories' element={<CategoriesPage />} />
              <Route path='/help' element={<HelpPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/basket' element={<BasketPage />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/order-confirmation' element={<Confirmation />} />
              <Route path='/movie/:id' element={<MoviePage />} />
              <Route path='*' element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </MoviesProvider>
  );
}
