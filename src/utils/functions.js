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

function replaceUrl(template, params) {
    let url = template;
    for (const key in params) {
        url = url.replace(`:${key}`, params[key]);
    }
    return url;
}

const functions = { replaceParams, checkRouteMatch, replaceUrl };

export default functions;
