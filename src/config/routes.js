const prefix = '/cinema';

const routes = {
    login: '/',
    cinema: prefix,
    theater: {
        list: `${prefix}/theater`,
        create: `${prefix}/theater/create`,
        edit: `${prefix}/theater/edit/:id`,
    },
};

export default routes;
