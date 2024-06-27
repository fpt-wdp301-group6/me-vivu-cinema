import { compile } from 'path-to-regexp';

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

const compileUrl = (pattern, options) => {
    return compile(pattern).toPath(options);
};

const functions = { replaceParams, checkRouteMatch, compileUrl };

export default functions;
