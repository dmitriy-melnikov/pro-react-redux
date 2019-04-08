const _apiBase = 'https://swapi.co/api';
const _url = 'https://swapi.co/api/people/1232323/';

/*
fetch(`${_apiBase}/people/1/`)
	.then((res) => {
	 return res.json();
	})
	.then((res) => console.log(res));*/

/*const getResource = async (url) => {
	const result = await fetch(url);
	if(!result.ok) {
		throw new Error(`Could not fetch ${_url} received ${result.status}`)
	}
	return await result.json();
};

getResource(_url)
	.then(body => console.log(body))
	.catch(err => console.error('Could not fetch', err));*/

class SwapiService {

	_apiBase = 'https://swapi.co/api';

	async getResource(url) {
		const result = await fetch(`${this._apiBase}${url}`);
		if (!result.ok) {
			throw new Error(`Could not fetch ${url} received ${result.status}`)
		}
		return await result.json();
	};

	async getAllPeople() {
		const res = await this.getResource('/people');
		return res.results;
	};

	async getPerson(id) {
		return await this.getResource(`/people/${id}`);

	}
}
const swapi = new SwapiService();
const people = swapi.getAllPeople()
	.then(people => people.forEach(
		el => console.log(el.name)
	));
const person = swapi.getPerson(1)
	.then(person => console.log(person));