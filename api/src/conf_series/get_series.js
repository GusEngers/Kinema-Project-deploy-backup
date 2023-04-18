const axios = require('axios');
const { validateCards, validateVideos } = require('./validate');
require('dotenv').config();

const { API_KEY } = process.env;

async function getSeries(page) {
  const API = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`;
  console.log('Getting series from page', page);
  const response = await axios
    .get(API)
    .then((res) => res.data.results)
    .catch((err) => {
      throw new Error(err.message);
    });
  return await validateVideos(validateCards(response));
}

module.exports = getSeries;
