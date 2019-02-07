'use strict';

const superagent = require('superagent');

let fetchPeopleWithAsync = async () => {
  try {
    let peopleSet = await superagent.get('https://swapi.co/api/people');
    let people = (peopleSet.body && peopleSet.body.results) || [];
    let peopleRequests = people.map((person) => {
      return superagent.get(person.url);
    });
    
    let swapiNames = await Promise.all(peopleRequests)
      .then (people => {
        let names = [];
        for (let data of people) {
          names.push(data.body.name);
        }
        console.log(names);
        return names;
      });
      return swapiNames;
  }
  catch (e) {console.error(e);}
}

fetchPeopleWithAsync();
