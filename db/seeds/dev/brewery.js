const path = require('path');
const breweryData = require(path.join(__dirname, '../../../data.js'));

const createBrewery = (knex, brewery) => {
	return knex('brewery').insert({
		name: brewery.name
	}, 'id')
		.then(breweryId => {
			let beerPromises = [];

			brewery.beers.forEach(beer => {
				beerPromises.push(
					createBeer(knex, {
						name: beer.name,
						style: beer.style,
						size: beer.size,
						abv: beer.abv,
						brewery_id: beer.brewery_id
					})
				);
			});
			return Promise.all(beerPromises);
		});
};

const createBeer = (knex, beer) => {
	return knex('beer').insert(beer);
};

exports.seed = (knex, Promise) => {
	return knex('beer').del()
		.then(() => knex('brewery').del())
		.then(() => {
			let breweryPromises = [];

			breweryData.forEach(brewery => {
				breweryPromises.push(createBrewery(knex, brewery));
			});

			return Promise.all(breweryPromises);
		})
		.catch(error => console.log(`Error seeding data: ${error}`));
};