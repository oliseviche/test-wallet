import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers/RootReducer';
import ApplicationComponent from 'components/ApplicationComponent';
import ApplicationController from 'controllers/ApplicationController';
import ModalWrapperComponent from 'components/ModalWrapperComponent';
import ModalWrapperController from 'controllers/ModalWrapperController';
import * as DOMUtils from 'utils/dom';

(function main() {
	let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
	let applicationController = new ApplicationController(store);
	let modalWrapperController = new ModalWrapperController(store);
	
	ReactDOM.render(
		<ApplicationComponent controller={applicationController} store={store} />,
		DOMUtils.query('.root')
	);
	ReactDOM.render(
		<ModalWrapperComponent controller={modalWrapperController} store={store} />,
		DOMUtils.query('.modals')
	)
})();