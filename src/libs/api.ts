import axios from 'axios';

let TOKEN =
  typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

// 해당 url의 server로 전달될 token
const instance = axios.create({
  baseURL: 'http://api-liferary.duckdns.org',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + TOKEN,
  },
});

// instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
instance.defaults.withCredentials = true;

export default instance;

// https://thinkforthink.tistory.com/372
// access toke->refresh token
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 401) {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('REFRESH_TOKEN');

      try {
        const { data } = await axios({
          method: 'post',
          url: `/login`,
          data: { accessToken, refreshToken },
        });

        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;

        originalRequest.headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + newAccessToken,
        };

        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('REFRESH_TOKEN', newRefreshToken);

        return await axios(originalRequest);
      } catch (err) {
        new Error(error);
      }
    }
    return Promise.reject(error);
  }
);
