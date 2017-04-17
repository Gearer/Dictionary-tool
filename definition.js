
'use strict';
var inquirer = require('inquirer')

var Wordnik = require('wordnik');
 
var wn = new Wordnik({
    api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
});

console.log("hello")
var questions = [
   {
    type: 'input',
    name: 'word',
    message: 'Defination of ',
  }]

inquirer.prompt(questions).then(function (answer) {
  console.log(answer)
  wn.definitions(answer.word, function(e, defs) {
        // console.log(e, defs);
        for(var i=0;i<defs.length;i++){
          console.log("meaning:",i+1,":")
          console.log(defs[i].text)
        }
  })
});
