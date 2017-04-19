
'use strict';
var inquirer = require('inquirer')

var Wordnik = require('wordnik');
 
var wn = new Wordnik({
    api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
});

console.log("hello")
var question1 = [
   {
    type: 'list',
    name: 'type',
    message: 'select :',  
    choices: ['Defination', 'Synonyms', 'Antonyms','Examples','Word of the Day Full Dict','Full Dict'],
  }]

inquirer.prompt(question1).then(function (answer1) {
  console.log(question1)
  console.log(answer1)
  var question2 = [
    {
      type:'input',
      name:'word',
      message:answer1.type,
    }]

  if(answer1.type=='Defination' || answer1.type=='Full Dict'){
    inquirer.prompt(question2).then(function (answer2) {
      wn.definitions(answer2.word, function(e, defs) {
        for(var i=0;i<defs.length;i++){
          console.log("meaning:",i+1,":")
          console.log(defs[i].text)
        }
      })
    })
  };
  if(answer1.type=='Synonyms'|| answer1.type=='Full Dict'){
    inquirer.prompt(question2).then(function (answer2) {
      wn.related(answer2.word, function(e, defs) {
        for(var i=0;i<defs.length;i++){
          console.log("meaning:",i+1,":")
          console.log(defs[i])
        }
      })
    })
  };
  if(answer1.type=='Antonyms'|| answer1.type=='Full Dict'){
      inquirer.prompt(question2).then(function (answer2) {
        wn.related(answer2.word, function(e, defs) {
          for(var i=0;i<defs.length;i++){
            console.log("meaning:",i+1,":")
            console.log(defs[i])
          }
        })
      })
    };
  if(answer1.type=='Examples'|| answer1.type=='Full Dict'){
      inquirer.prompt(question2).then(function (answer2) {
        wn.examples(answer2.word, function(e, defs) {
          for(var i=0;i<defs.examples.length;i++){
            console.log("meaning:",i+1,":")
            console.log(defs.examples[i])
          }
        })
      })
    };
  if(answer1.type=='Word of the Day Full Dict'){
      // inquirer.prompt(question2).then(function (answer2) {
        wn.wordOfTheDay( function(e, defs) {
          console.log(defs)
        })
      // })
    };
});

