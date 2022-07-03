import axios from 'axios';

const BACKEND_URL = 'https://my-yame.firebaseio.com/';

export const createPage = async (payload) => {
  const { data } = await axios.post(`${BACKEND_URL}pages.json`, payload);
  return data.name;
};

export const fetchPages = async () => {
  const { data } = await axios.get(`${BACKEND_URL}pages.json`);
  return Object.keys(data || {}).map((key) => ({
    ...data[key],
    id: key,
  }));
};

export const updatePageToStore = async (id, payload) => {
  await axios.put(`${BACKEND_URL}pages/${id}.json`, payload);
};

export const deletePage = async (id) => {
  await axios.delete(`${BACKEND_URL}pages/${id}.json`);
};

export const uploadImageCallBack = async (file) => {
  const { data } = axios.post('https://freeimage.host/api/1/upload', {
    key: '6d207e02198a847aa98d0a2a901485a5',
  });
};
