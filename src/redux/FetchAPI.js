import axios from 'axios';
export const BASE_URL = 'https://tasty.p.rapidapi.com';

const options = {
  url: BASE_URL,
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a457bf9924mshd6cadbc92d20e64p1f822fjsned4132b0a22e',
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
  },
};

export const FetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};