import React, {FC, useEffect} from 'react';
import './style/app.scss'
import FieldComponent from './components/Field';
import fieldState from './store/FieldState';
import { Field } from './model/Field';
import {  BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const App: FC = () => {
	useEffect(() => {
		const field = new Field();
        fieldState.initPerformance(field);
    }, [])
	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					<Route path='/:id'>
						<div className="app_content">
							<FieldComponent/>
						</div>
					</Route>
					<Redirect to={`f${(+new Date()).toString(16)}`}/>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
