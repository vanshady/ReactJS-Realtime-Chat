# Fullstack Realtime Chat Application

Thanks to the below blog posts and documentations:

[ReactJS and Socket.IO Chat Application](http://danialk.github.io/blog/2013/06/16/reactjs-and-socket-dot-io-chat-application/)

[Real time data flow with Redux and Socket.io](http://spraso.com/real-time-data-flow-with-redux-and-socket-io/)

[Server Rendering](http://redux.js.org/docs/recipes/ServerRendering.html)

[A sample Docker workflow with Nginx, Node.js and Redis](http://anandmanisankar.com/posts/docker-container-nginx-node-redis-example/)

## Keywords

Docker, Nginx, redis, docker-compose
React, Redux, Socket.io, ES6, Babel, webpack, express,
server-side rendering, cookies

## Running it

Simply run `docker-compose build && docker-compose up` and go to `localhost:8080`

### To run the Node server, first, grab the dependencies:

`yarn` to install all the dependencies by yarn

### Then build and run the app like so:

`npm run dist` to build the frontend

`npm run build` to build the backend

`redis-server` to start a redis server

`npm run serve` to start the backend server

### And navigate to `localhost:3000` and chat!

### For development, run:

`redis-server` to start a redis server

`npm run dev` to start watching the frontend

`npm start` to start a backend nodemon server

