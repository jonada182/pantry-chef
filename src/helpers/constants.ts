/**
 * By exporting our app environment variables as constants, we solve the issue of importing vite env variables in test files
 * To add more constants just follow the format <ENV_FILE_VARIABLE_NAME>:<CONSTANT_NAME>
 */

const {
  APP_API_BASE_URL: API_BASE_URL,
  APP_MOCK_API: MOCK_API,
  APP_USER_ID: APP_USER_ID,
} = import.meta.env;

export {
  API_BASE_URL,
  MOCK_API,
  APP_USER_ID,
};
