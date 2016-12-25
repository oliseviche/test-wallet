//https://livedemo.xsolla.com/fe/test-task/baev/users?offset=0&limit=10
export default {
	route: 'https://livedemo.xsolla.com/fe',
	resources: {
		route: 'test-task',
		resources: {
			route: 'users',
			resources: [{
				route: 'transactions'
			}, { 
				route: 'recharge' 
			}]
		}
	}
}