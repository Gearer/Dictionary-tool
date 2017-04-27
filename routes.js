var express = require('express');
var app = express();
var Wordnik = require('wordnik');

var wn = new Wordnik({
api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'});

app.get('/getRandomWord', function(req, res){
    wn.randomWord(function(e,word){
        console.log(word);
        console.log(word.word);
	    res.send(word.word);
    });
})

app.get('/getDefinitions/:word',function(req,res){
    var definitions=[];
    wn.definitions(req.word, function(e, defs) {
        for(var i=0;i<defs.length;i++){
          console.log("meaning:",i+1,":")
          console.log(defs[i].text)
          definitions.push(defs[i].text)
        }
        res.send(definitions);
    })
})

app.get('/getSynonyms/:word',function(req,res){
    var synonmys=[];
    wn.related(req.word, function(e, defs) {
        for(var i=0;i<defs.length;i++){
          if(defs[i].relationshipType=="synonym")
            for(var j=0;j<defs[i].words.length;j++){
              console.log("Synonyms:",j+1,":")
              console.log(defs[i].words[j])
              synonmys.push(defs[i].words[j])
            }
        }
        res.send(synonmys);
      })
})

app.get('/getAntonyms/:word',function(req,res){
    var antonyms=[];
    wn.related(req.word, function(e, defs) {
        for(var i=0;i<defs.length;i++){
          if(defs[i].relationshipType=="Antonym")
            for(var j=0;j<defs[i].words.length;j++){
              console.log("Antonyms:",j+1,":")
              console.log(defs[i].words[j])
              antonyms.push(defs[i].words[j])
            }
        }
        res.send(antonyms);
      })
})

app.get('/getExamples/:word',function(req,res){
    var examples=[];
    wn.examples(req.word, function(e, defs) {
        for(var i=0;i<defs.examples.length;i++){
            console.log("Example:",i+1,":")
            console.log("Title",defs.examples[i].title)
            console.log("Text",defs.examples[i].text)
            var example={
                "Title":defs.examples[i].title,
                "Text":defs.examples[i].text
            }
            examples.push(example)
        }
        res.send(examples);
    })
})



app.param('word',function(req,res,next,word){
    req.word=word;
    next();
})

app.listen(3000);