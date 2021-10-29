const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

// const postsRouter = require('./posts/posts-router')
// const { logger, validatePost, validateUser, validateUserId } = require('./middleware/middleware')
// const usersRouter = require('./users/users-router')

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());
// server.use(logger)
// server.use('/api/users', usersRouter)

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>This is Sprint Challenge!</h2>`);
});


module.exports = server;
