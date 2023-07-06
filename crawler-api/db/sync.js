const seq = require('../db/connections/mysql_connect');
require('./models')
seq.authenticate().then(() => {
    console.log('MySQL server is connected completely.');
}).catch(err => {
    console.log('MySQL server is failed to be connected. Error information is below: ' + err);
})
seq.sync({
    force: true
}).then(() => {
    console.log('The table has been synchronised into database successfully');
    process.exit();
});

