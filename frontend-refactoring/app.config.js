import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
});
