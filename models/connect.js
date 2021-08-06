const mongoose = require ('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}


mongoose.connect('mongodb+srv://admin:capsule@cluster0.3imin.mongodb.net/movizapp?retryWrites=true&w=majority',

options,
function(err) {
    if(err) {
        console.log('Failed to connect', err);
    } else {
        console.log('Connection Successful to movies BDD');
    }
})