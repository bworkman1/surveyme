// CCHECK HEROKU ENV VAR FOR ENV SETTING
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}
