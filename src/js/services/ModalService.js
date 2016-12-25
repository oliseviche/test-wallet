import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'utils/bootstrap-native';
import * as DOMUtils from 'utils/dom';

const wrapperTemplate = {
	render: function() {
		return (
			<div id="modal-wrapper" className="modal fade" tabIndex="-1" role="dialog">
				{this.props.children}
			</div>
		);
	}
}

export class BaseDialogController {
	constructor(modal) {
		this.modal = modal;
	}
	init() {}
	open() {}
	dispose() {}
}

function openModal(properties, data) {
	return new Promise((resolve, reject) => {
		let bootstrapModal;
		let resultAction = null;
		let {template, controller, options} = properties;
		let modal = {
			data,
			submit: function(action) {
				close(action);
			},
			cancel: function() {
				close();
			}
		};
		let modalController = new controller(modal);
		let componentDefinition = {
			componentDidMount() {
				modalController.init(this.rootElement);
				bootstrapModal = new Modal(DOMUtils.query('#modal-wrapper'), this.options);
				this.unsubscribeOpen = bootstrapModal.addEventListener('open', () => {
					this.unsubscribeOpen();
					modalController.open();
				});
				this.unsubscribeClose = bootstrapModal.addEventListener('close', () => {
					this.unsubscribeClose();
					modalController.dispose();
					ReactDOM.unmountComponentAtNode(DOMUtils.query('#modal-portal'));
					resolve(resultAction);
				});
				bootstrapModal.open();
			},
			componentWillUnmount() {
				modalController.dispose();
			},
			render: template
		};
		let close = (action) => {
			resultAction = action;
			bootstrapModal.close();
		};
		let component = React.createElement(React.createClass(componentDefinition), { controller: modalController, data: data });
		let wrapperComponent = React.createElement(React.createClass(wrapperTemplate), null, component);

		ReactDOM.render(wrapperComponent, DOMUtils.query('#modal-portal'));
	});
}

class ModalService {
	constructor() {
		this.storage = {};
		this.middleware = null;
	}
	register(properties) {
		if (!this.storage[properties.id]) {
			let { id, template } = properties;
			if (!id || 'String' !== id.constructor.name) {
				throw new Error(`Modal 'id' attribute must be of string type`);
			}
			if (!template || 'function' !== typeof template) {
				throw new Error(`Modal 'template' attribute must be a function`);
			}
			this.storage[properties.id] = properties;
		}
	}
	open(identifier, data = {}) {
		if (!this.storage[identifier]) {
			throw new Error(`Modal '${identifier}' is not registered`);
		}
		return openModal(this.storage[identifier], data);
	}
}

export default new ModalService();