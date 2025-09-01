const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');

async function addUser(req , res) {
    try{
        // console.log(req.body , ' req.body ');
        let user = new User(req.body);
        // user.userType = 'Admin';
        let encryptedPassword = bcrypt.hashSync(req.body.password , 10);  // 10 - salty password
        // console.log(encryptedPassword , 'encryptedPassword ');
        user.password = encryptedPassword;
        await user.save();
        // console.log("data saved successfully!");
        res.redirect('/');
    }catch(err){
        console.log(err);
    }
}
async function doLogin(req , res) {
    try{
        // console.log(req.body , ' req.body ');
        let user = await User.findOne({ email : req.body.email});
        // console.log(user);
        if(user){
            let validPassword = await bcrypt.compare(req.body.password , user.password); // user.password is encryped first it decrypt then match with req.body.password
            if(validPassword){
                if(user.userType === 'Admin'){
                    let students = await Student.find({});
                    res.render('welcomeadmin' , {
                        students : students
                    });
                }
                else{
                    res.render('welcomestudent');
                }
            }       
                // let students = await Student.find({});
                // res.render('welcomeadmin' , {
                //     students : students
                // });
            
            else{
                res.end('<h1> Invalid email/password');
            }
        }
        else{
            res.end("<h1> User does not exist...");
        }
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    addUser,
    doLogin
}