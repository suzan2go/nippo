import axios from 'axios';
import authenticityToken from './authenticityToken';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    config.headers['X-CSRF-TOKEN'] = authenticityToken();  // eslint-disable-line
    return config;
  },
  error => Promise.reject(error),
);

function sendDelete(url) {
  return axios.delete(url).then(response => response.data);
}

function sendPatch(url, data) {
  return axios.patch(url, data).then(response => response.data);
}

function sendPost(url, data) {
  return axios.post(url, data).then(response => response.data);
}

export function createDiaryEntry({ title, body }) {
  return sendPost('/api/diary_entries', { diary_entry: { title, body } });
}

export function updateDiaryEntry({ diaryId, title, body }) {
  return sendPatch(`/api/diary_entries/${diaryId}`, { title, body });
}
