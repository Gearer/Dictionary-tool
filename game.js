'use strict';
var inquirer = require('inquirer');
var request = require('request');
var Wordnik = require('wordnik');
 
var wn = new Wordnik({
    api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
});

var quit=function(word){
    var output={};
    output.word=word;
    request('http://localhost:3000/getDefinitions/'+word , function (error, response, defs) {
        output.definitions=defs;
    })   
    request('http://localhost:3000/getSynonyms/'+word , function (error, response, syns) {
        output.synonyms=syns;
    })  
    request('http://localhost:3000/getAntonyms/'+word , function (error, response, antns) {
        output.antonyms=antns;
    })       
    console.log("thanks for playing,your word information is :",output)
}

var definition =function(word){
    // console.log("in definition",word)
    var url='http://localhost:3000/getDefinitions/'+word;
        request(url , function (error, response, defs) {
        console.log('definitions:', defs); 
            var question2 = [
                {type:'input',
                name:'userValue',
                message:"word"
                }]
            inquirer.prompt(question2).then(function (answer2){
                // console.log(answer2.userValue)
                // console.log(word)
                if(answer2.userValue==word){
                    console.log("correct")
                }
                else{
                    options(word,'definition');
                }
            })
        });
}

var synonym= function(word){
     var url='http://localhost:3000/getSynonyms/'+word;
        request(url , function (error, response, defs) {
        console.log('synonyms:', defs); 
            var question2 = [
                {type:'input',
                name:'userValue',
                message:"word"
                }]
            inquirer.prompt(question2).then(function (answer2){
                // console.log(answer2.userValue)
                // console.log(word)
                if(answer2.userValue==word){
                    console.log("correct")
                }
                else{
                    options(word,'synonym');
                }
            })
        });
}

var antonym= function(word){
    var url='http://localhost:3000/getAntonyms/'+word;
            request(url , function (error, response, defs) {
            console.log('antonyms:', defs); 
                var question2 = [
                    {type:'input',
                    name:'userValue',
                    message:"word"
                    }]
                inquirer.prompt(question2).then(function (answer2){
                    // console.log(answer2.userValue)
                    // console.log(word)
                    if(answer2.userValue==word){
                        console.log("correct")
                    }
                    else{
                        options(word,'antonym');
                    }
                })
            });
}


var select = function(){
    var question = [
        {type: 'list',
            name: 'type',
            message: 'select one from list to start game :',  
            choices: ['Defination', 'Synonyms', 'Antonyms'],
        }]  
    inquirer.prompt(question).then(function (answer1) {
        request('http://localhost:3000/getRandomWord', function (error, response, word) {
        // console.log(word)
            if(answer1.type=='Defination'){
                definition(word);
            }
            if(answer1.type=='Synonyms'){
                synonym(word);
            }
            if(answer1.type=='Antonyms'){
                antonym(word);
            }
        });
    })
}

var options= function(word,optionWord){
    var question3=[{
        type:'list',
        name:'options',
        message:'wrong answer,select one',
        choices:['hint','tryagain','quit']
    }]
    inquirer.prompt(question3).then(function(answer3){
        if(answer3.options=='hint'){
                var question = [
                    {type: 'list',
                        name: 'type',
                        message: 'select hint :',  
                        choices: ['Defination', 'Synonyms', 'Antonyms'],
                    }]  
                inquirer.prompt(question).then(function (answer1) {
                    // console.log(word)
                        if(answer1.type=='Defination'){
                            definition(word);
                        }
                        if(answer1.type=='Synonyms'){
                            synonym(word);
                        }
                        if(answer1.type=='Antonyms'){
                            antonym(word);
                        }
                })
        }
        if(answer3.options=='tryagain'){
            if(optionWord=='definition'){
                definition(word);
            }
            if(optionWord=='synonym'){
                synonym(word);
            }
            if(optionWord=='antonym'){
                antonym(word);
            }  
        }
        if(answer3.options=='quit'){
            quit(word);
        }
    })
}

select();

