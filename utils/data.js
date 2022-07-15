const lorem = `In ea pariatur ipsum incididunt consequat ipsum in pariatur culpa mollit enim. Consectetur ad amet tempor non et nisi anim sit Lorem cillum consequat eu ea. Adipisicing officia consectetur commodo labore pariatur anim. Dolore id excepteur ullamco consectetur ea do. Nulla sunt mollit nulla consectetur eu eiusmod consectetur incididunt consectetur dolor amet occaecat esse et. Deserunt duis veniam eu minim eu ullamco. Incididunt officia quis tempor sit consequat in eu aute labore ipsum enim duis exercitation.

Pariatur qui velit veniam officia reprehenderit est magna. Laborum commodo nostrud labore et reprehenderit nostrud voluptate quis eiusmod ex nisi. Anim qui labore dolor ullamco laboris consectetur et ipsum nostrud id nostrud officia labore ipsum.

Fugiat in est excepteur sit magna minim aliquip culpa exercitation eiusmod deserunt ea excepteur. Ullamco excepteur laboris tempor laborum eiusmod enim eu nisi aliqua ad fugiat commodo aliqua. Nisi deserunt exercitation eiusmod do incididunt. Nisi et anim aliquip ad occaecat et est sit sit.

Minim elit occaecat adipisicing ullamco officia et esse veniam eiusmod labore nisi proident. Id duis id mollit eiusmod excepteur proident incididunt laboris nulla. Ipsum ullamco aliquip qui ut nostrud dolor consectetur enim nisi ad aliquip incididunt ullamco Lorem. Est occaecat nostrud cillum dolore laboris nulla. Enim occaecat do anim laboris pariatur laboris esse. Deserunt qui ipsum enim enim consectetur sit.

Laboris dolore culpa exercitation tempor cillum labore proident duis eiusmod adipisicing. Ullamco veniam ex cillum officia fugiat non est laborum deserunt ipsum commodo. Duis elit et minim deserunt adipisicing laborum consectetur ut ipsum irure esse qui ipsum aliqua. Duis aliqua est ipsum mollit consequat dolor elit eu mollit anim officia. Elit incididunt minim tempor fugiat et quis eiusmod pariatur ullamco excepteur do laboris exercitation.

Duis laborum incididunt ut non veniam pariatur ut aliqua nostrud occaecat cillum minim. Cillum cupidatat voluptate quis culpa officia. Minim Lorem in labore occaecat pariatur consectetur sint ut Lorem eu enim fugiat. Velit consequat pariatur Lorem laborum aute excepteur commodo ad ullamco ea exercitation consectetur elit.`;

const usernames = [
    'westtosser',
    'anymorebuilder',
    'velvetywildcat',
    'deskpat',
    'economistberserk',
    'ominoussplit',
    'shortlyrhinoceros',
    'evolutionhut',
    'pilotformal',
    'catchermelodic',
    'voleacrobat',
    'skysailmonument',
    'flashysulky',
    'expensivesmiling',
    'mistydemocrat',
    'forecastlestork',
    'trackballdingdong',
    'minecraftsarcastic'
];

const domains = [
    '@hotmail.com',
    '@gmail.com',
    '@yahoo.com',
    '@charter.net',
    '@apple.com'
]

const emails = usernames.map((username) => {
    return username + domains[Math.floor(Math.random() * domains.length)];
});

const getRandomUser = () => {
    const index = Math.floor(Math.random() * usernames.length);
    const username = usernames.splice(index, 1);
    const email = emails.splice(index, 1);
    const user = {
        userName: username[0],
        email: email[0]
    }
    return user;
}

const getPost = () => {
    const maxIndex = lorem.length - 280;
    const index = Math.floor(Math.random() * maxIndex);
    const text = lorem.slice(index, index + (Math.floor(Math.random() * 280)));
    return text;
}

module.exports = {
    getRandomUser,
    getPost
}