import React, {FC} from 'react';
import './style/app.scss'
import {  BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Monopoly from './components/Monopoly';
import Registration from './components/Registration';


const App: FC = () => {
	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					<Route path='/:id'>
						<Monopoly/>
					</Route>
					<Route path='/'>
						<Registration/>
					</Route>
					<Redirect to={`/`}/>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
