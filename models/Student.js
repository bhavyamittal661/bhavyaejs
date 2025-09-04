const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    rollNo : {type: String , required : true},
    name : {type: String },
    fatherName : {type: String , required : true},
    motherName : {type : String},
    course : {type: String , required : true},
    branch : {type :String },
    yearOfAdmission : {type: Number},
    studentImage : {type : String},
    imagePublicId : {type : String},
    createAt : Date,
    updateAt : Date
})

studentSchema.plugin(timestamps , {index : true});
module.exports = mongoose.model('Student' , studentSchema);