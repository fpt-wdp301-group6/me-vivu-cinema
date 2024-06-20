const replaceParams = (route, params) => {
    let url = route;
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            url = url.replace(`:${key}`, params[key]);
        }
    }
    return url;
};

const checkRouteMatch = (pattern, url) => {
    const regexPattern = pattern.replace(/:[^\s/]+/g, '([^/]+)');
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(url);
};

const functions = { replaceParams, checkRouteMatch };

export default functions;
