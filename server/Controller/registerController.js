import userSchema from "../Models/User.js";

export const registerController=async(req,res ,next)=>{
    try{
        const {name , email, password , role} = req.body;
        if(!name)next("please provide name");

        if(!email)next("please provide email");

        if(!password) next("please provide password");

        if(!role) next("please define your role");

        const existingUser = await userSchema.findOne({email});
        if(existingUser)next("User already exists");
        const user = await userSchema.create({name , email ,password ,role});

        const token = user.createJWT();

         res.status(201).send({success : true , message:"User created successfully" , user:{
            name : user.name,
            lastname : user.lastname,
            email : user.email,
            location : user.location,
            role : user.role,
         },
         token,
        });

    }
    catch(error){
        next(error);
    }
};