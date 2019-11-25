import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Search from './components/user/Search';
import UserPage from "./components/user/UserPage";
import UserWallet from "./components/user/UserWallet";
import NotFound from './components/NotFound';
import Header from "./components/Header";
import UserConversations from "./components/user/UserConversations";
import Messages from "./components/user/Messages";
import StatisticPage from "./components/statistic/StatisticPage";
import TopStatistic from "./components/statistic/TopStatistic";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>

                <BrowserRouter>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/search' component={Search}/>
                    <Route
                        exact
                        path='/user/:userId'
                        render={
                            routeProps =>
                                <UserPage {...routeProps} userId={routeProps.match.params.userId}/>
                        }
                    />
                    <Route
                        exact
                        path='/user/:userId/wallet'
                        render={
                            routeProps =>
                                <UserWallet
                                    {...routeProps}
                                    userId={routeProps.match.params.userId}
                                />
                        }
                    />
                    <Route
                        exact
                        path='/user/:userId/conversations'
                        render={
                            routeProps =>
                                <UserConversations
                                    {...routeProps}
                                    userId={routeProps.match.params.userId}
                                />
                        }
                    />
                    <Route
                        exact
                        path='/user/:userId/:conversationId/messages'
                        render={
                            routeProps =>
                                <Messages
                                    {...routeProps}
                                    userId={routeProps.match.params.userId}
                                    conversationId={routeProps.match.params.conversationId}
                                />
                        }
                    />
                    <Route
                        exact
                        path='/statistics'
                        component={StatisticPage}
                    />
                    <Route
                        exact
                        path='/statistics/top'
                        component={TopStatistic}
                    />
                    <Route
                        path='/not_found'
                        render={
                            routeProps => <NotFound {...routeProps}/>
                        }
                    />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
