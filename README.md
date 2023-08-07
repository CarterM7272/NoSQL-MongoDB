# Social Network API with NoSQL MongoDB

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributions](#contributions)
- [License](#license)

## Features

- Robust API built with Express.js.
- Integration with MongoDB for efficient data management.
- Utilization of Mongoose ODM for structured object modeling.
- Ability to format timestamps with a choice of JavaScript date libraries.
- Detailed error handling and validations for data integrity.

## Usage

1. Start the server by running:
   ```bash
   npm start
   ```
2. Access API routes through a tool like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).

## API Routes

### Users

- GET all users: `/api/users`
- GET a single user (by ID): `/api/users/:id`
- POST a new user: `/api/users`
- PUT update a user (by ID): `/api/users/:id`
- DELETE a user (by ID): `/api/users/:id`
- POST to add a friend: `/api/users/:userId/friends/:friendId`
- DELETE to remove a friend: `/api/users/:userId/friends/:friendId`

### Thoughts

- GET all thoughts: `/api/thoughts`
- GET a single thought (by ID): `/api/thoughts/:id`
- POST a new thought: `/api/thoughts`
- PUT update a thought (by ID): `/api/thoughts/:id`
- DELETE a thought (by ID): `/api/thoughts/:id`
- POST to add a reaction to a thought: `/api/thoughts/:thoughtId/reactions`
- DELETE to remove a reaction: `/api/thoughts/:thoughtId/reactions/:reactionId`


## Contributions

N/A

## License

N/A

---

Made with ❤️ by [Your Name](your-github-link)

© 2023 Your Name. All Rights Reserved.