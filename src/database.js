const mongoose = require('mongoose');

const URI ='mongodb+srv://alejanaabellaf:K1mhyunj@canawa.cftly8n.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect (URI)

.then(db => console.log('Db is connected'))
.catch(error => console.error(error));

module.exports = mongoose;
