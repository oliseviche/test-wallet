import React from 'react';
import HeadbarComponent from 'components/HeadbarComponent';
import UsersListComponent from 'components/UsersListComponent';
import FilterComponent from 'components/FilterComponent';
import PaginatorComponent from 'components/PaginatorComponent';
import CreateUserModalComponent from 'components/modals/CreateUserModalComponent';
import UserInfoComponent from 'components/UserInfoComponent';
import UpdateUserModalComponent from 'components/modals/UpdateUserModalComponent';
import UpdateBalanceModalComponent from 'components/modals/UpdateBalanceModalComponent';
import WorkspaceNavbarComponent from 'components/WorkspaceNavbarComponent';
import OperationsComponent from 'components/OperationsComponent';
import WorkspaceComponent from 'components/WorkspaceComponent';
import NewUserStoreComponent from 'components/NewUserStoreComponent';
import ErrorsStackComponent from 'components/ErrorsStackComponent'
import UsersListController from 'controllers/UsersListController';
import PaginatorController from 'controllers/PaginatorController';
import FilterController from 'controllers/FilterController';
import HeadbarController from 'controllers/HeadbarController';
import UserInfoController from 'controllers/UserInfoController';
import OperationsController from 'controllers/OperationsController';
import WorkspaceNavbarController from 'controllers/WorkspaceNavbarController';
import NewUserStoreController from 'controllers/NewUserStoreController';
import ErrorsStackController from 'controllers/ErrorsStackController';

export default React.createClass({
	componentWillMount() {
		let applicationController = this.props.controller;

		this.headbarController = new HeadbarController(this.props.store);
		this.filterController = new FilterController(this.props.store);
		this.paginatorController = new PaginatorController(this.props.store);
		this.usersListController = new UsersListController(this.props.store);
		this.workspaceNavbarController = new WorkspaceNavbarController(this.props.store);
		this.userInfoController = new UserInfoController(this.props.store);
		this.operationsController = new OperationsController(this.props.store);
		this.newUserStoreController = new NewUserStoreController(this.props.store);
		this.errorsStackController = new ErrorsStackController(this.props.store);
	},
	componentDidMount() {
		this.props.controller.fetchUsers();
	},
	render: function () {
		return (
			<div className='viewspace'>
				<HeadbarComponent  controller={this.headbarController} />
				<section className='contents'>
					<section className="sidebar">
						<FilterComponent controller={this.filterController} />
						<UsersListComponent className="users-list" controller={this.usersListController} />
						<div className="users-created">
							<NewUserStoreComponent controller={this.newUserStoreController} />
						</div>
						<PaginatorComponent controller={this.paginatorController} />
					</section>
					<section className="workspace">
						<WorkspaceNavbarComponent controller={this.workspaceNavbarController}/>
						<section className='panels'>
							<WorkspaceComponent
								store={this.props.store}
								userInfo={<UserInfoComponent controller={this.userInfoController} />}
								operationsInfo={<OperationsComponent controller={this.operationsController} />}
							/>
						</section>
					</section>
				</section>
				<ErrorsStackComponent controller={this.errorsStackController} />
			</div>
		);
	}
});