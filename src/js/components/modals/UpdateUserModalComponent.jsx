import React from 'react';
import NumericInput from 'react-numeric-input';
import ModalService from 'services/ModalService'
import UpdateUserModalController from 'controllers/modals/UpdateUserModalController';

const template = function() {
	return (
		<div className="modal-dialog" ref={(element) => this.rootElement = element}>
			<div className="modal-content">
				<div className="modal-header">
  					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
  					<h4 className="modal-title" id="gridModalLabel">Update User</h4>
 				</div>
				<form>
					<div className="modal-body">
						<div className="form-group">
							<label htmlFor="input-user-id">Name</label>
							<input name="input-user_name" type="text" className="form-control" 
									placeholder="Name of the user" 
									defaultValue={this.props.data.name}/>
						</div>
						<div className="form-group">
							<label htmlFor="input-user-custom">Custom</label>
							<input name="input-user_custom" type="text" className="form-control" 
									placeholder="Custom parameter for user identification"
									defaultValue={this.props.data.custom}/>
						</div>
						<div className="form-group">
							<label htmlFor="input-user-email">Email</label>
							<input name="input-email" type="text" className="form-control" placeholder="Email"
									defaultValue={this.props.data.email} />
						</div>
						<div className="checkbox">
							<label>
								<input type="checkbox" name="input-enabled" 
										defaultChecked={this.props.data.enabled}/> Enabled
							</label>
						</div>
  					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={this.props.controller.submitHandler}>Update</button>
						<button type="button" className="btn btn-default" onClick={this.props.controller.cancelHandler}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

ModalService.register({
	id: 'UPDATE_USER', 
	template: template, 
	controller: UpdateUserModalController, 
	options: {}
});

/**/