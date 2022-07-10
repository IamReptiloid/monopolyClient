import React, {FC} from 'react';
import './style/app.scss'
import {  BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Monopoly from './components/Monopoly';



const App: FC = () => {
	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					<Route path='/:id'>
						<Monopoly/>
					</Route>
					<Redirect to={`f${(+new Date()).toString(16)}`}/>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
