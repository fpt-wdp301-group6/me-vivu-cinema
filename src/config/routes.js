const prefix = '/cinema';

const routes = {
    login: '/',
    cinema: prefix,
    theater: `${prefix}/theater`,
    room: {
        base: `${prefix}/room`,
        seat: `${prefix}/room/:roomId/seat`,
    },
    food: `${prefix}/food`,
    showtime: `${prefix}/showtime`,
};

export default routes;
