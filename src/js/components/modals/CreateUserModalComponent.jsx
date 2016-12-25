import React from 'react';
import ModalService from 'services/ModalService'
import CreateUserModalController from 'controllers/modals/CreateUserModalController';

const template = function() {
	return (
		<div className="modal-dialog" ref={(element) => this.rootElement = element}>
			<div className="modal-content">
				<div className="modal-header">
  					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
  					<h4 className="modal-title" id="gridModalLabel">Create User</h4>
 				</div>
				<form>
					<div className="modal-body">
						<div className="form-group">
							<label className="control-label" htmlFor="input-user-id"><span>ID</span><span className="label label-warning">Required</span></label>
							<input name="input-user_id" type="text" className="form-control" placeholder="ID user" required="true" />
						</div>
						<div className="form-group">
							<label htmlFor="input-user-id">Name</label>
							<input name="input-user_name" type="text" className="form-control" placeholder="Name of the user" />
						</div>
						<div className="form-group">
							<label htmlFor="input-user-custom">Custom</label>
							<input name="input-user_custom" type="text" className="form-control" placeholder="Custom parameter for user identification" />
						</div>
						<div className="form-group">
							<label htmlFor="input-user-email">Email</label>
							<input name="input-email" type="text" className="form-control" placeholder="Email" />
						</div>
  					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={this.props.controller.submitHandler}>Create</button>
						<button type="button" className="btn btn-default" onClick={this.props.controller.cancelHandler}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

ModalService.register({
	id: 'CREATE_USER', 
	template: template, 
	controller: CreateUserModalController, 
	options: {}
});