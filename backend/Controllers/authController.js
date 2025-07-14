const prisma = require("../models/user");

exports.create = async (req, res) => {
  try {
    const {spotifyId} =  req.body; 

    const existingUser = await prisma.user.findUnique({
        where: {spotifyId},

    })

    if(existingUser){
        return res.status(200).json(existingUser); 
    }

    const user = await prisma.user.create({
      data: req.body, 
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Failed to create user:", error);
    res.status(400).json(error);
  }
};
