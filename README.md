# Getting Started with a MERN Stack E-Commerce App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run serve`

Starts the server on http://localhost:5000

## Project Setup:

### `*` = `required for the core application logic to work`

### `?` = `optional, some of the features will not work`

1. Create a `.env` file in the root level of "server" folder.
2. Add following entries to the created file:\
   MONGO_URI\*: your mongodb connection url.\
   JWT_SECRET\*: any string value (e.g: mysecret).\
   PORT?: the port you want the server to run on, falls back to `5000`.\
   FROM_EMAIL?: E-mail address, that messages will be sent from,\
   requires setup https://www.youtube.com/watch?v=lBRnLXwjLw0.\
   USER_PASS?: password for the `FROM_EMAIL` field.
3. Open a new terminal window, and run `npm run serve`.
4. Open another terminal window, and run `npm start`.
5. Enjoy the application.
