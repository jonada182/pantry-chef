# Chatbot UI

This Chatbot app built with React TypeScript, using the [OpenAI Chat API](https://platform.openai.com/docs/guides/chat)

## Getting Started

1.  Clone this repository
2.  Install dependencies using `npm install`
3.  (Optional) Create a `.env.local` file in the root directory with the following content:
```
    APP_API_BASE_URL="http://localhost:5000"
    APP_MOCK_API=false
```
4.  Start the development server using `npm run dev`
5.  Open your browser and go to `http://localhost:3000`

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br /> Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.<br /> It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is ready to be deployed!

### `npm start`

Runs the app in production mode. Make sure to build the app before running this command.

### `npm run lint`

Runs the ES linter to check for syntax errors and coding standards. The linter will report any issues in the console.

## Environment Variables

This project uses the following environment variables:

### `APP_API_BASE_URL`

The base URL for the API. Default value is `http://localhost:5000`.

### `APP_MOCK_API`

A boolean value that determines whether to use a mock API response. Default value is `false`.

## Learn More

You can learn more about the Chat API in the [OpenAI documentation](https://platform.openai.com/docs/guides/chat)

You can learn more about Vite in the [Vite documentation](https://vitejs.dev/).

You can learn more about Typescript in the [Typescript documentation](https://www.typescriptlang.org/docs/home.html).

To learn React, check out the [React documentation](https://reactjs.org/docs/getting-started.html).
