import axios from 'axios';
import Toast from 'react-native-toast-message';

const instance = axios.create();

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    Toast.show({ type: 'error', text1: error.message });
    return Promise.resolve(error);
  },
);

export default instance;
