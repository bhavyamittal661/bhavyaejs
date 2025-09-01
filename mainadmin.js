const User = require('./models/User');
const bcrypt = require('bcrypt');

async function makeAdmin() {
    try{
        let user = await User.findOne({email : 'bhavyajava626@gmail.com'});
        if(user){
            // console.log('user updated...');
        }
        else{
            let user = new User();
            user.firstName = 'Bhavya';
            user.lastName = 'Mittal';
            user.email = 'bhavyajava626@gmail.com';
            let encryptedPassword = bcrypt.hashSync('12346', 10);  // 10 - salty password
            user.password = encryptedPassword;
            user.userType = 'Admin';
            await user.save();
            // console.log("user saved successfully!");
        }
    }catch(err){
        console.log(err);
    }
}


module.exports = makeAdmin;