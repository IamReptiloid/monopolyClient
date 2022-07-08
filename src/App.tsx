import React, {FC, useEffect} from 'react';
import './style/app.scss'
import FieldComponent from './components/Field';
import fieldState from './store/FieldState';
import { Field } from './model/Field'

const App: FC = () => {
	useEffect(() => {
		const field = new Field();
        fieldState.initPerformance(field);
    }, [])
	return (
		<div className="app">
			<div className="app_content">
				<FieldComponent/>
			</div>
		</div>
	);
}

export default App;
