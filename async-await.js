'use strict';

const superagent = require('superagent');


let fetchPeopleWithAsync = async () => {
  let peopleSet = await superagent.get('https://swapi.co/api/people');
  let people = (peopleSet.body && peopleSet.body.results) || [];
  let peopleRequests = people.map((person) => {
    return superagent.get(person.url);
  });
  let names = await Promise.all(peopleRequests)
    .then(people => {
      let names = [];
      for (let data of people) {
        names.push(data.body.name);
      }
      return names;
    });
  return names;
}

fetchPeopleWithAsync()
  .then(names => console.log({names}));