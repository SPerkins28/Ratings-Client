let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    case 'reviewit-client.herokuapp.com':
        APIURL = 'https://re-view-it.herokuapp.com'
}

export default APIURL;