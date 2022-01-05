import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { uid, checking } = useSelector( state => state.auth );

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [ dispatch ]);

    if ( checking ) {
        return (
            <div className="spinner-container">
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ CalendarScreen }
                        isAuthenticated={ !!uid }
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};