pl.v.peopleCountView = {


    
    setupUserInterface : function(){
        var button = document.getElementById('mainButton');
        button.addEventListener("click", pl.v.peopleCountView.handleCreateButtonClickEvent);
        var popPeople = pl.v.peopleCountView.generatePopularWord();
        localStorage.setItem('popPeople', JSON.stringify(popPeople));
    
        },
    
        handleCreateButtonClickEvent: function(){
         
            //if(confirm("Temporary confirmation?")){
              //  console.log("ok");
               // keys =[];
                //Page.retreiveAll();
                //keys = Object.keys(Page.instances);
    
               //this line is what whanges the content of the p in the html page
                document.getElementById('demo').innerHTML=
                pl.v.peopleCountView.generatePopularWord();
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
       
           var people="",key ="", keys = [],total_people = [], people_words=[], all_people=[], occurances = [], page = null, i = 0, j = 0, k=0;
           Page.retreiveAll();
           keys = Object.keys( Page.instances);
           for(i=0; i<keys.length; i++){
            key = keys[i];
            page = Page.instances[key];
            people=page.people.toLowerCase();
            people = people.split(" ").join("")

            people_words = people.split(",");
            total_people = total_people.concat(people_words);
        
    
            let array3 = people_words.concat(all_people);
            array3 = [...new Set([...people_words,...all_people])]
            all_people = array3;
    
           }
           occurances= new Array(all_people.length).fill(0);
           console.log("total_wo "+ total_people.length);
           console.log("all_wo "+ all_people.length);
          for (j = 0; j< all_people.length; j++){
    
            occurances[j] = pl.v.peopleCountView.findOccurances(total_people, all_people[j]);
          }
       
            return pl.v.peopleCountView.analyzeResults(all_people,occurances);
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
            //Page.popPeople=top_five;
            return top_five;
        },
        createChartData: function(person){
            var peopleData = [], exists = false;
        peopleData.push(['x','emoRate']);
       var people="",emoRate=0,key ="", keys = [], page = null, i = 0, j = 0, k=0;
       Page.retreiveAll();
       keys = Object.keys( Page.instances);
       for(i=0; i<keys.length; i++){
        key = keys[i];
        page = Page.instances[key];
        people=page.people;
        people = people.toLowerCase()
        
        if(people.includes(person.toLowerCase())){
            emoRate = page.emoRate;
            peopleData.push([parseInt(i),parseInt(emoRate)]);
            exists = true;
        }
    

       }
       //occurances= new Array(all_words.length).fill(0);
       //console.log("total_wo "+ total_words.length);
       //console.log("all_wo "+ all_words.length);
     // for (j = 0; j< all_words.length; j++){

    //     occurances[j] = pl.v.wordCountView.findOccurances(total_words, all_words[j]);
    //   }
   
    //     return pl.v.wordCountView.analyzeResults(all_words,occurances);
        if(exists){
            return peopleData;
        }
        else{
            peopleData.push([0,0]);
            return peopleData;
        }
    
    },
    getPerson: function(index_for_cycle){
        var top_person = {};
        top_person =  JSON.parse(localStorage.getItem('popPeople'));
       
        return top_person[index_for_cycle];
    }
        
         
    
};