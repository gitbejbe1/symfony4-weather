
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import DashboardPage from './pages/Dashboard'
import HistoryPage from './pages/History'

class App extends React.Component {
	
  constructor(props) {
    super(props);
  }

  render() {
    return (
		<BrowserRouter>
            <div>
              <Navbar />
              <Switch>
                <Route exact path='/' component={DashboardPage} />
                <Route exact path='/history' component={HistoryPage} />
              </Switch>
            </div>
          </BrowserRouter>
	)
  }
}

render(<App />, document.getElementById("root"));

