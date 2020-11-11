import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import LoginContextProvider from './Contexts/LoginContext';
import SearchContextProvider from './Contexts/SearchContext';
import User from './pages/User';
import ForgottenPassword from './pages/ForgottenPassword';
import ProductPage from './pages/ProductPage';
import Testefrete from './pages/testefrete';
import Addresses from './pages/Addresses';
import TermsandConditions from './pages/TermsandConditions'
import NotFound from './components/NotFound'
import About from './pages/About'

function Routes() {
    return (
        <BrowserRouter>
            <LoginContextProvider>
                <SearchContextProvider>
                    <Switch> 
                        <Route path='/' exact component={Dashboard} />
                        <Route path='/search' component={Search} />
                        <Route path='/login' exact component={Login} />
                        <Route path='/forgottenPassword' exact component={ForgottenPassword} />
                        <Route path='/register' exact component={Register} />
                        <Route path='/admin' component={Admin} />
                        <Route path='/cart' exact component={Cart} />
                        <Route path='/user' component={User} />
                        <Route path='/product/:id' component={ProductPage} />
                        <Route path='/testefrete' component={Testefrete} />
                        <Route path='/addresses' component={Addresses} />
                        <Route path='/about' component={About} />
                        <Route path='/conditions' component={TermsandConditions} />
                        <Route exact={true} component={NotFound} />
                    </Switch>
                </SearchContextProvider>
            </LoginContextProvider>
        </BrowserRouter>
    );
}

export default Routes; 