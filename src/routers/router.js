import React from 'react';
import {Routes} from './routes';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {hot} from 'react-hot-loader';

export const RouteWithSubRoutes = (route) => {
    return (
        <Route
            exact={!!route.exact}
            path={route.path}
            render={(props) => {
                return (
                    <route.component {...props} routes={route.routes}/>
                );
            }}
        />
    );
};

// key=Math.random() 解决 react-hot-loader 异步组件更新的问题
let App = () => (
    <Router
        key={module.hot ? Math.random() : undefined}>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/topics">Props v. State</Link>
                </li>
            </ul>
            <hr/>
            {
                Routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route}/>))
            }
        </div>
    </Router>
);

// react-hot-loader react热更新
if (module.hot) {
    App = hot(module)(App);
}

export default App;
