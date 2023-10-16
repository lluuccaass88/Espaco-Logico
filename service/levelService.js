const express = require('express');
const levelRepository = require('../repository/levelRepository')
const userRepository = require('../models/User.js')
const jwt = require("jsonwebtoken");


async function save(instructionList){
   await levelRepository.save(instructionList)
}

async function getByUserId(user_id){
    let userId = jwt.decode(user_id).id
    const user = await userRepository.findOne({ _id : userId })
    return await levelRepository.getById(user.current_level)
}

module.exports = {
    save,
    getByUserId
  };