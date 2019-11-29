import React from 'react';
import "./App.css";
import {HashRouter as Router, Route, Switch, withRouter} from "react-router-dom";
import { initializeApp } from "./redux/app/app-reducer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import store from "./redux/redux-store";

import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import Preloader from "./common/Preloader/Preloader";
import { getAppInitialized } from "./redux/app/app_selectors";
import PageNotFound from "./components/PageNotFound/PageNotFound";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));



class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) return <Preloader />;

        return (
            <React.Suspense fallback={<Preloader />}>
                <div className="app-wrapper">
                    <HeaderContainer />
                    <Navbar />
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route path="/dialogs" render={() => <DialogsContainer />}/>
                            <Route path="/profile/:userId?" render={() => <ProfileContainer />}/>
                            <Route path="/users" render={() => <UsersContainer />}/>
                            <Route path="/login" component={ LoginPage }/>
                            <Route  render={() => <PageNotFound />}/>
                        </Switch>
                    </div>
                </div>
            </React.Suspense>
        );
    }
}

const mapStateToProps = state => ({
    initialized: getAppInitialized( state )
});

const AppWithRouter = compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)( App );

const AppContainer = () => {
    return (
        <Router>
            <Provider store={ store }>
                <AppWithRouter />
            </Provider>
        </Router>
    )
};

export default AppContainer;


