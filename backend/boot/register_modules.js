const app = require('../app')
const modules = require('../modules/routes')


function registerModules() {
    Object.keys(modules).forEach((mdl) => {
        modules[mdl](app);
    })
}

module.exports = registerModules;