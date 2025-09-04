const Student = require('../models/Student');
const cloudinary = require('cloudinary').v2;


async function addStudent(req , res)  {
    try{
        // console.log(req.body , ' req.body ');
        // console.log(req.file , ' req.file... ');
        let result;
        if(req.file){
            cloudinary.config({
                cloud_name : 'donh5jwfg',
                api_key :'238278623811188',
                api_secret :'NPBSB3qmlPYHd81gLvAziwh9x5w'
            })
            result = await cloudinary.uploader.upload(req.file.path);
            // console.log(result);
        }
        let student = new Student(req.body);
        if(req.file){
            student.studentImage = result.secure_url;
            student.imagePublicId = result.public_id; // <-- Added this line to save public id of image
        }
        await student.save();
        // console.log("data base updated...");
        let students = await Student.find({});
        res.render('studentList' , {
            students : students
        });
    }catch(err){
        console.log(err);
    }
}
async function deleteStudent(req , res) {
    try{
        let studentId = req.params._id;
        // console.log(studentId , ' deleteStudent ');
        // Find the student first to get the image public_id
        const student = await Student.findById(studentId);

        if (student?.imagePublicId) {
            cloudinary.config({
                cloud_name: 'donh5jwfg',
                api_key: '238278623811188',
                api_secret: 'NPBSB3qmlPYHd81gLvAziwh9x5w'
            });

            // Delete the image from Cloudinary
            await cloudinary.uploader.destroy(student.imagePublicId);
        }
        await Student.deleteOne({ _id : studentId });
        let students = await Student.find({});
        res.render('welcomeadmin' , {
            students : students
        })
    }catch(err){
        console.log(err);
    }
}
async function openEditPage(req , res) {
    try{
        let studentId = req.params._id;
        let student = await Student.findOne({ _id : studentId });
        if(student){
            res.render('studenteditpage' , {
                student : student
            })
        }
        else{
            res.render('/');
        }
    }catch(err){
        console.log(err);
    }
}
async function editStudent(req , res) {
    try{
        const studentId = req.params._id;
        // console.log(studentId , ' studentId ');
        let student = await Student.findOne( {_id : studentId });
        if(student){
            console.log(req.body , ' req.body ');
            student.rollNo = req.body.rollNo;
            student.name = req.body.name;
            student.fatherName = req.body.fatherName;
            student.branch = req.body.branch;
            student.course = req.body.course;
            student.yearOfAdmission = req.body.yearOfAdmission;
            await student.save();
            let students = await Student.find({});
            res.render('welcomeadmin' , {
                students : students
            });
        }
        else{
            res.end("Student not found...");
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    addStudent,
    deleteStudent,
    openEditPage,
    editStudent
}