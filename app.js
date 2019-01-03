'use strict';

const superagent = require('superagent');

function fetchPeopleWithPromises(){

  let urlArr = [];
  let promiseArr = [];


  superagent.get('https://swapi.co/api/people/')
    .then((result) => {
      result.body.results.map(people => urlArr.push(people.url));
      // console.log(urlArr);

      urlArr.map(url => promiseArr.push(superagent.get(url)));
      // console.log(promiseArr);
    })
    .catch(error => console.error('error'))


    .then(() => {
      Promise.all(promiseArr)
      .then((values) => console.log(values[0].ReadableState))
    })
    .catch(error => console.error('error'));

    ;
};

fetchPeopleWithPromises();


