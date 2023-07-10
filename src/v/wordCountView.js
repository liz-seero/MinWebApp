/**
 * this program wil collect and show clustered groups - finding the highest mentioned word between them and 
 * creating a report of that data
 */

 pl.v.wordCountView = {

    //var stringSimilarity = require("string-similarity");

    
   setupUserInterface : function(){
    var button = document.getElementById('mainButton');
    button.addEventListener("click", pl.v.wordCountView.handleCreateButtonClickEvent);
    //var data = new google.visualization.DataTable();
    //var localStorage[popWords] = new Array();
    var popWords = pl.v.wordCountView.generatePopularWord();
    localStorage.setItem('popWords', JSON.stringify(popWords));


    },

    handleCreateButtonClickEvent: function(){
     
       
            document.getElementById('demo').innerHTML=
            pl.v.wordCountView.generatePopularWord();
            //
       // }
     
        //console.log("you did something");
       //pl.v.readFiles(stop_words.txt);
    },

    //generates a list of all of the instances/ a way to access them
    //now all there is left to insert a for loop to get them al
    //make a list of words with no duplicates
    //print that
    //then start with some tallies
    generatePopularWord: function(){
   
       var desc="",key ="", keys = [],total_words = [], desc_words=[], all_words=[], occurances = [], page = null, i = 0, j = 0, k=0;
       Page.retreiveAll();
       keys = Object.keys( Page.instances);
       for(i=0; i<keys.length; i++){
        key = keys[i];
        page = Page.instances[key];
        desc=page.desc;
        desc_words = desc.split(" ");
        total_words = total_words.concat(desc_words);
    

        let array3 = desc_words.concat(all_words);
        array3 = [...new Set([...desc_words,...all_words])]
        all_words = array3;

       }
       //get rid of stop words
       //console.log(pl.v.wordCountView.deleteStopWords(all_words));
       all_words = pl.v.wordCountView.deleteStopWords(all_words);


       occurances= new Array(all_words.length).fill(0);
       console.log("total_wo "+ total_words.length);
       console.log("all_wo "+ all_words.length);
      for (j = 0; j< all_words.length; j++){

        occurances[j] = pl.v.wordCountView.findOccurances(total_words, all_words[j]);
      }
   
        return pl.v.wordCountView.analyzeResults(all_words,occurances);
    },

    deleteStopWords: function(word_list){
        var stop_words = ["a",	"about",	"above",	"after",	"again",	"against",	"all",	"am",	"an",	"and",	"any",	"are",	"aren't",	"as",	"at",	"be",	"because",	"been",	"before",	"being",	"below",	"between",	"both",	"but",	"by",	"can't",	"cannot",	"could",	"couldn't",	"did",	"didn't",	"do",	"does",	"doesn't",	"doing",	"don't",	"down",	"during",	"each",	"few",	"for",	"from",	"further",	"had",	"hadn't",	"has",	"hasn't",	"have",	"haven't",	"having",	"he",	"he'd",	"he'll",	"he's",	"her",	"here",	"here's",	"hers",	"herself",	"him",	"himself",	"his",	"how",	"how's",	"i",	"i'd",	"i'll",	"i'm",	"i've",	"if",	"in",	"into",	"is",	"isn't",	"it",	"it's",	"its",	"itself",	"let's",	"me",	"more",	"most",	"mustn't",	"my",	"myself",	"no",	"nor",	"not",	"of",	"off",	"on",	"once",	"only",	"or",	"other",	"ought",	"our",	"ours",	"out",	"over",	"own",	"same",	"shan't",	"she",	"she'd",	"she'll",	"she's",	"should",	"shouldn't",	"so",	"some",	"such",	"than",	"that",	"that's",	"the",	"their",	"theirs",	"them",	"themselves",	"then",	"there",	"there's",	"these",	"they",	"they'd",	"they'll",	"they're",	"they've",	"this",	"those",	"through",	"to",	"too",	"under",	"until",	"up",	"very",	"was",	"wasn't",	"we",	"we'd",	"we'll",	"we're",	"we've",	"were",	"weren't",	"what",	"what's",	"when",	"when's",	"where",	"where's",	"which",	"while",	"who",	"who's",	"whom",	"why",	"why's",	"with",	"won't",	"would",	"wouldn't",	"you",	"you'd",	"you'll",	"you're",	"you've",	"your",	"yours",	"yourself",	"yourselves",	"ourselves"];
        var new_words =[], i=0, w="";
        for(i=0;i<word_list.length;i++){
            //if the words isn't in stop words
            w = word_list[i];
            if(!stop_words.includes(w)){
                //console.log("found" + w);
                new_words.push(w);
            }  
            
        }
        // if(stop_words.includes("wasn't")){
        //     return "includes";
        // }
        return new_words;
    },

    findOccurances: function(list, word){
//finds the number of times it occurs in the overall set
        i=0, o=0;
        for (i = 0; i<list.length; i++){
            if (list[i] == word){
                o++;
            }
        }              
        return o;
    },

    analyzeResults: function(list, occurances){
        var i =0, j= 0, result =0;
        top_five = new Array(5).fill("");
        //get max five times, after adding to the list, delete both entries in the other lists
        
        for(i = 0; i<5; i++){
            result = occurances.indexOf(Math.max(...occurances));
            top_five[i] = list[result];
            occurances.splice(result, 1);
            list.splice(result, 1);
        }
        Page.popWords=top_five;
        return top_five;
    },

    createChartData: function(word){
        var wordData = [];
        //wordData.push(['x','emoRate']);
        var exists = false;
       var desc="",emoRate=0,key ="", keys = [], page = null, i = 0, j = 0, k=0;
       Page.retreiveAll();

       keys = Object.keys( Page.instances);

       for(i=0; i<keys.length; i++){
        key = keys[i];
        page = Page.instances[key];
        desc=page.desc.toLowerCase().trim();
        var t ="";
        t = key.substring(0,key.length-10);
        
        t=t.toLowerCase().trim();
        
        if(desc.includes(word.toLowerCase().trim()) || t.includes(word.toLowerCase().trim())){
            console.log(word + "emorate" + emoRate);
            exists = true;
            emoRate = page.emoRate;

            wordData.push([parseInt(i),parseInt(emoRate)]);
        }

       }
       //occurances= new Array(all_words.length).fill(0);
       //console.log("total_wo "+ total_words.length);
       //console.log("all_wo "+ all_words.length);
     // for (j = 0; j< all_words.length; j++){

    //     occurances[j] = pl.v.wordCountView.findOccurances(total_words, all_words[j]);
    //   }
   
    //     return pl.v.wordCountView.analyzeResults(all_words,occurances);
        if (exists){
            //console.log(word+"\n"+wordData);
            return wordData;
        }else{
            wordData.push([0,0]);
            return wordData;
        }
    },
    getWord: function(index_for_cycle){
        var top_word = {};
        top_word =  JSON.parse(localStorage.getItem('popWords'));
       
        return top_word[index_for_cycle];
    }

     

 };