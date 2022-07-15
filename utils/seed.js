const connection = require('../config/connection');
const {
    Thought,
    User
} = require('../models');
const {
    getRandomUser,
    getPost
} = require('./data');

connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('connected');

    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = [];
    const thoughts = [];

    for (let i = 0; i < 15; i++) {
        const user = getRandomUser();
        users.push(user);
    }

    users.forEach((user) => {
        const text = getPost();
        const thought = {
            thoughtText: text,
            userName: user.userName,
            reactions: [
                {
                    reactionBody: getPost(),
                    userName: users[Math.floor(Math.random() * users.length)].userName,
                },
                {
                    reactionBody: getPost(),
                    userName: users[Math.floor(Math.random() * users.length)].userName,
                },
                {
                    reactionBody: getPost(),
                    userName: users[Math.floor(Math.random() * users.length)].userName,
                },
            ]
        }
        thoughts.push(thought);
    });

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
    console.table(users);
    console.table(thoughts);
    process.exit(0);
});