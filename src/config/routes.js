const prefix = '/cinema';

const routes = {
    login: '/',
    cinema: prefix,
    theater: `${prefix}/theater`,
    room: `${prefix}/room`,
    food: `${prefix}/food`,
    showtime: `${prefix}/showtime`,
};

export default routes;
