import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    
    email : {
        type : String,
        require : true
    },
    authId : {
        type : String,
        require : true,
        unique : true
    },
    applyJob : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Job'
    }],
    saveJob : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Job'
    }],
    role : {
        type : String,
        enum : ['jobseeker' , 'recruiter']
    },

})

const userModel = mongoose.model('User' , userSchema);

export default userModel;