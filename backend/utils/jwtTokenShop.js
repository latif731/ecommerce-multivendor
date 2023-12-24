// create token and saving that in cookies
const sendShopToken = async (seller, statusCode, res) => {
  try{
    const token = seller.getJwtToken();
    // console.log("ini tokeeeenn", token)
  
        // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

  
  
    await res
    .status(statusCode)
    .cookie("seller_token", token, options)
    .json({
      success: true,
      seller,
      token,
    });

  }catch(error){
    console.error("Error in sendToken", error)
    throw error
  }
  };
  
  module.exports = sendShopToken;
  