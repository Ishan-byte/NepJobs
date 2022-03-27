import React, {lazy, Suspense, useEffect} from "react";
import { pagePath } from "./path";
import {Switch, Route} from 'react-router-dom';
import Routes from "./routes";
import Home from '../Views/Home/Home';
import DefaultAuth from "../Global/defaultAuth";
import { makeStyles } from '@material-ui/core/styles';
import NProgress from 'nprogress';

const routes = [
    {
        exact: true,
        path: pagePath.app.login,
        component: lazy(() => import('../Views/Authorization/Login'))
    },
    {
        exact: true,
        path: pagePath.app.register,
        component: lazy(() => import('../Views/Authorization/Register'))
    },
    {
        exact: true,
        path: '/404',
        component: lazy(() => import('../Views/Error/page404'))
    },
    {
        exact: true,
        path: pagePath.app.waitForApproval,
        component: lazy(() => import('../Views/Error/Waitforapprove')) 
    }, 
    Routes,
];
const nprogressStyle = makeStyles((theme) => ({
    '@global': {
      '#nprogress': {
        pointerEvents: 'none',
        '& .bar': {
          top: 0,
          left: 0,
          height: 2,
          width: '100%',
          position: 'fixed',
          zIndex: theme.zIndex.snackbar,
          backgroundColor: theme.palette.primary.main,
          boxShadow: `0 0 2px ${theme.palette.primary.main}`
        },
        '& .peg': {
          right: 0,
          opacity: 1,
          width: 100,
          height: '100%',
          display: 'block',
          position: 'absolute',
          transform: 'rotate(3deg) translate(0px, -4px)',
          boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
        }
      }
    }
  }));

function RouteProgress (props) {
    nprogressStyle();

    NProgress.configure({
      speed: 500,
      showSpinner: false
    });
  
    useEffect(() => {
      NProgress.done();
      return () => {
        NProgress.start();
      };
    }, []);
  
    return <Route {...props}/>
}


export const renderRoutes = (routes = []) => {
    return (
        <Suspense fallback= {<Home />}>
            <Switch>
                {routes.map((route, i) => {
                    const Component = route.component;
                    const Guard = route.guard || DefaultAuth;
                    const authUsers = route.roles || [];

                    return (
                        <RouteProgress 
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            render = {(props) => (
                                <Guard authUsers = {authUsers}>
                                    <>
                                    {route.routes ? (
                                        renderRoutes(route.routes)
                                    ):(
                                        <Component {...props}/>
                                    )}
                                    </>
                                    
                                </Guard>
                            )}/>
                    )
                })}
            </Switch>
        </Suspense> 
    )
} 

export default routes;