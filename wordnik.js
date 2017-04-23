
'use strict';
var inquirer = require('inquirer')

var Wordnik = require('wordnik');
 
var wn = new Wordnik({
    api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
});

var question1 = [
   {
    type: 'list',
    name: 'type',
    message: 'select :',  
    choices: ['Defination', 'Synonyms', 'Antonyms','Examples','Word of the Day Full Dict','Full Dict'],
  }]

inquirer.prompt(question1).then(function (answer1) {
  // console.log(question1)
  // console.log(answer1)
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
          if(defs[i].relationshipType=="synonym")
            for(var j=0;j<defs[i].words.length;j++){
              console.log("Synonyms:",j+1,":")
              console.log(defs[i].words[j])
            }
        }
      })
    })
  };
  if(answer1.type=='Antonyms'|| answer1.type=='Full Dict'){
      inquirer.prompt(question2).then(function (answer2) {
        wn.related(answer2.word, function(e, defs) {
          for(var i=0;i<defs.length;i++){
          if(defs[i].relationshipType=="Antonym")
            for(var j=0;j<defs[i].words.length;j++){
              console.log("Antonyms:",j+1,":")              
              console.log(defs[i].words[j])
            }
        }
        })
      })
    };
  if(answer1.type=='Examples'|| answer1.type=='Full Dict'){
      inquirer.prompt(question2).then(function (answer2) {
        wn.examples(answer2.word, function(e, defs) {
          for(var i=0;i<defs.examples.length;i++){
            console.log("Example:",i+1,":")
            console.log("Title",defs.examples[i].title)
            console.log("Text",defs.examples[i].text)
          }
        })
      })
    };
  if(answer1.type=='Word of the Day Full Dict'){
        wn.wordOfTheDay( function(e, def) {
          console.log("word",def.word)
          console.log("definitions",def.definitions)
          console.log("examples",def.examples)
          console.log("synonms",def.synonms)
          console.log("antonms",def.antonms)
        })
    };
});

