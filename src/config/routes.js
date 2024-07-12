const prefix = '/cinema';

const routes = {
    login: '/',
    cinema: prefix,
    theater: {
        base: `${prefix}/theater`,
        food: `${prefix}/theater/food`,
    },
    room: {
        base: `${prefix}/room`,
        seat: `${prefix}/room/:roomId/seat`,
    },
    food: `${prefix}/food`,
    showtime: `${prefix}/showtime`,
};

export default routes;
