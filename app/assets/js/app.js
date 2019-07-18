
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import Navbar from './components/Navbar'
import DashboardPage from './pages/Dashboard'
import HistoryPage from './pages/History'

const theme = createMuiTheme({

});

class App extends React.Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <CssBaseline />

                    <Navbar />
                    <Container style={{paddingTop: "35px"}}>
                        <Switch>
                        <Route exact path='/' component={DashboardPage} />
                        <Route path='/history' component={HistoryPage} />
                        </Switch>
                    </Container>

                </BrowserRouter>
            </ThemeProvider>
        )
    }
}

render(<App />, document.getElementById("root"));
