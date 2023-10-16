const express = require('express');
const instructionRepository = require('../repository/instructionRepository')
const leverService = require('../service/levelService')

async function save(data){
    const instructionList = data.instruction;
    const user_id = data.user_id

    await deletInstructionByUserId(user_id)
   await instructionRepository.save(instructionList)
}

function deletInstructionByUserId(user_id){
        instructionRepository.deleteByUserId(user_id)
}

async function getInstructionsByUserId(userId){
    const registros = await instructionRepository.getRegistrosByUserId(userId);
    return registros
}

function processingInstruction(instructionList){
    let response = []
    let variableHashMap = {}

    for(const currentInstruction of instructionList){
        if(currentInstruction.type == 'variable' || currentInstruction.type == 'paint' || currentInstruction.type == 'manipulatorVariable'){
            ComandProcessor(currentInstruction, variableHashMap, response)
        }else if(currentInstruction.type == 'if'){
            ifProcessor(currentInstruction, variableHashMap, response)
        }else if(currentInstruction.type == 'for'){
            forProcessor(currentInstruction, variableHashMap, response)
        }
    }

    return response;
}

function ComandProcessor(currentInstruction, variableHashMap, response){
    switch(currentInstruction.type){
        case 'variable':
            variableHashMap[currentInstruction.newVariable.name] = currentInstruction.newVariable.value;
        break;
        case 'paint':
            // response.push([currentInstruction.paint.valX , currentInstruction.paint.valY])
            paintProcessor(currentInstruction, variableHashMap, response)
        break;
        case 'manipulatorVariable':
            manipulateVariable(variableHashMap, currentInstruction)
        break;
    }
}

function paintProcessor(paintCurrentInstruction, variableHashMap, response){
    let valA 
    let valB;

    if(variableHashMap[paintCurrentInstruction.paint.valX]){
        //Busca o valor da variável no hashmap e atrbui ao valB
        valA = parseInt(variableHashMap[paintCurrentInstruction.paint.valX])
    }else{
        //atribui o segundo valor a ser comparado na variável valB
        valA = parseInt(paintCurrentInstruction.paint.valX)
    }

    if(variableHashMap[paintCurrentInstruction.paint.valY]){
        //Busca o valor da variável no hashmap e atrbui ao valB
        valB = parseInt(variableHashMap[paintCurrentInstruction.paint.valY])
    }else{
        //atribui o segundo valor a ser comparado na variável valB
        valB = parseInt(paintCurrentInstruction.paint.valY)
    }

    response.push([valA , valB])

}

function forProcessor(forCurrentInstruction, variableHashMap, response){ 
    //Atribui a variável valA o valor da variável buscada no hashmap
    let valA = parseInt(variableHashMap[forCurrentInstruction.forC.valX])
    let valB;
    let cont = 0

    //Varifica se o segundo valor a ser comparado também é variável
    if(variableHashMap[forCurrentInstruction.forC.valY]){
        //Busca o valor da variável no hashmap e atrbui ao valB
        valB = parseInt(variableHashMap[forCurrentInstruction.forC.valY])
    }else{
        //atribui o segundo valor a ser comparado na variável valB
        valB = parseInt(forCurrentInstruction.forC.valY)
    }

    //Executa enquanto o método checkCondidion não retornar true
    while(checkCondidion(valA, valB, forCurrentInstruction.forC.condition) || cont > 30){
        //foreach par processar as instruções atreladas a instrução do tipo "if"
        for(const currentInstruction of forCurrentInstruction.forC.instructions){
            ComandProcessor(currentInstruction, variableHashMap, response)
        }

        /*Verifica se o valor da variável salva no hashmap foi alterado caso tenha sido é atribuido a variável 
        valA, para que assim a condição do while possa ser atingida.*/
        if(valA != parseInt(variableHashMap[forCurrentInstruction.forC.valX])){
            valA = variableHashMap[forCurrentInstruction.forC.valX]
        }

        cont++;
    }
}

function ifProcessor(ifCurrentInstruction, variableHashMap, response){
    //Atribui a variável valA o valor da variável buscada no hashmap
    let valA = parseInt(variableHashMap[ifCurrentInstruction.ifC.valX])
    let valB

    //Varifica se o segundo valor a ser comparado também é variável
    if(variableHashMap[ifCurrentInstruction.ifC.valY]){
        //Busca o valor da variável no hashmap e atrbui ao valB
        valB = parseInt(variableHashMap[ifCurrentInstruction.ifC.valY])
   }else{
        //atribui o segundo valor a ser comparado na variável valB
       valB = parseInt(ifCurrentInstruction.ifC.valY)
   }

   // método checkCondidion checa a condição e retorna true ou false
    let responseCheckIf = checkCondidion(valA, valB, ifCurrentInstruction.ifC.condition)

    //Verifica se o retorno é true
    if(responseCheckIf){
        //foreach par processar as instruções atreladas a instrução do tipo "if"
        for(const currentInstruction of ifCurrentInstruction.ifC.instructions){
            ComandProcessor(currentInstruction, variableHashMap, response)
        }
    }
}

function checkCondidion(valA, valB, condition){
    switch(condition){
        case '<=':
            if(valA <= valB)
                return true;
        break;
        case '>=':
            if(valA >= valB)
                return true;    
        break;
        case '<':
            if(valA < valB)
                return true
        break;
        case '>':
            if(valA > valB)
                return true
        break;
        case '==':
            if(valA == valB)
                return true
        break;
        case '!=':
            if(valA != valB)
                return true
        break;
    }
    return false
}

function manipulateVariable(variableHashMap, currentInstruction){
    let variableValue = 0
    //Verifica qual o manipulador escolhido pelo usuário
    switch(currentInstruction.variableHandler.manipulation){
        case '+':
            //atribui o para a variável variableValue o valor váriavel a ser manipulada + o valor que o usuário escoheu para a instrução
            variableValue = parseInt(variableHashMap[currentInstruction.variableHandler.name]) + parseInt(currentInstruction.variableHandler.value);
        break;
        case '-':
            //atribui o para a variável variableValue o valor váriavel a ser manipulada + o valor que o usuário escoheu para a instrução
            variableValue = variableHashMap[currentInstruction.variableHandler.name] - currentInstruction.variableHandler.value;
        break;
    }
    //Altera o valor da variável salva no hashmap para o novo valor manipulado
    variableHashMap[currentInstruction.variableHandler.name] = variableValue
}

async function checkAlgorithm(user_id, user_algorithm){
    const response = await leverService.getByUserId(user_id)

    return areArraysEqual(response[0].answer, user_algorithm)
}

function areArraysEqual(arrayA, arrayB) {
    //Verifica se as matrizes possuem o mesmo tamanho
    if (arrayA.length !== arrayB.length || arrayA[0].length !== arrayB[0].length) {
      return false; 
    }

    let contEquals = 0;
    for (let i = 0; i < arrayA.length; i++) {
        for(let j = 0; j < arrayB.length; j++){
            if(arrayA[i][0] == arrayB[j][0] && arrayA[i][1] == arrayB[j][1]){
               contEquals++; 
            }
        }

        }

        if(contEquals == arrayA.length){
            return true
        } else{
            return false
        }
    }

module.exports = {
    save,
    getInstructionsByUserId,
    processingInstruction,
    checkAlgorithm
  };