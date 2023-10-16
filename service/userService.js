const express = require('express');
const userRepository = require('../models/User.js')

async function nextLevel(user_id){
    try{
        let level = 0;
        let user = await userRepository.findOne({ _id : user_id })
    
        level = user.current_level + 1;
        user._id
    
        await userRepository.updateOne(
            { _id: user_id },
            { $set: { current_level: level } }
         )
    
        return true
    }catch(error){
        console.log("userService: Error when updating user level = " + error)
        return false;
    }

}

module.exports = {
    nextLevel
  };