const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const SECRET_SIGNING_KEY = 'f1c81533098ee359576bb24a9df5fbd06c4dfe93e3a23900323c05f66445bb5d';
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  OK, CREATED, BAD_REQUEST, NOT_FOUND, SERVER_ERROR, SECRET_SIGNING_KEY, URL_REGEX
};
