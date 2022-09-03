const sendToken = (req,res,statusCode,token,user) => {

    const option = {
        expires: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token',token,option).json({
        success: true,
        message: "User signed in successfully",
        user,
        token
    });

}

export default sendToken;