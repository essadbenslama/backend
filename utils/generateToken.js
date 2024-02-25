const jwt =require("jsonwebtoken");

const generateToken =(res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SEC, {
        expiresIn :"30d",
    })
    res.cookie("jwt",token);
};

module.exports = generateToken;