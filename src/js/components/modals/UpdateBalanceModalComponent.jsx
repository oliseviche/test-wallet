import React from 'react';
import NumericInput from 'react-numeric-input';
import ModalService from 'services/ModalService'
import UpdateBalanceModalController from 'controllers/modals/UpdateBalanceModalController';

const template = function() {
	return (
		<div className="modal-dialog" ref={(element) => this.rootElement = element}>
			<div className="modal-content">
				<div className="modal-header">
  					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
  					<h4 className="modal-title" id="gridModalLabel">Update Balance</h4>
 				</div>
				<form>
					<div className="modal-body">
						<div className="form-group">
							<label htmlFor="input-user-balance">Balance</label>
							<NumericInput name='input-amount' className="form-control" precision={2} value={this.props.data.balance} style={ false }/>
						</div>
						<div className="form-group">
							<label htmlFor="input-user-balance">Reason<span className="label label-warning">Required</span></label>
							<input name='input-comment' className="form-control" type="text" placeholder="Reason"/>
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
	id: 'UPDATE_BALANCE', 
	template: template, 
	controller: UpdateBalanceModalController, 
	options: {}
});

/**/