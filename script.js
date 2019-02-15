VK.init({
	apiId: 6862683
});

function auth() {
	return new Promise((resolve, reject) =>  {
		VK.Auth.login(data => {
			if (data.session) {
				resolve();
			} else {
				reject(new Error('Не удалось авторизоваться'));
			}
		}, 2 | 4);		
	});
}

function callAPI(method, params) {
	params.v = 5.69;
	return new Promise((resolve, reject) => {
		VK.api(method, params, (data) => {
			if (data.error) {
				reject(data.error)
			} else {
				resolve(data.response)
			}
		});
	});
} 

(async () => {
	try {
	

		await auth();	
		var [me] = await callAPI('users.get', {fields: 'photo_100, is_closed, deactivated', name_case: 'gen'});			

		var friends = await callAPI('friends.get', {fields: 'photo_100, city, country, bdate, education, relations'});
		
		var headerInfo = document.getElementById('header-info');
		headerInfo.textContent = `Друзья на странице ${me.first_name} ${me.last_name}:  ${friends.count}`;	
		
		var template = document.getElementById('user-template').innerHTML;
		var render = Handlebars.compile(template);
		var html = render(friends);

		var result = document.getElementById('results');
		result.innerHTML = html;

	} catch(e) {
		console.error(e);
	}

})();









