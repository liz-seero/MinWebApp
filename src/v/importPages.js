pl.v.importPages= {

    _handleImport: function (text) {
        console.log("here");
        var keys= [], key="", row ={}, i =0;

    
        pages={};
        pages=JSON.parse(text);
        keys=Object.keys(pages);
        console.log( keys.length + " books loaded.");
        for (i=0; i<keys.length; i++){
            key = keys[i];
            Page.instances[key] = Page.convertRow2Obj(pages[key]);
        }
//gets title/id, desc, people, emorate (int), start date, end date

        Page.saveAll();
        //need to make slots
        //then use the update/ save all

    },

    createSlots: function(line){
        const rand = Math.random().toString(36).substring(2,12);

        // var slots = {title: 
        // desc: ,
        // people: ,
        // emoRate: ,
        // startDate: ,
        // endDate: 
        // };
    },


    createData: function(){
        //take everything
        //save it to the file
        var keys= [], key="", result ="", i =0;
        Page.retreiveAll();
        var str = "";
        str= JSON.stringify(Page.instances);
        // keys = Object.keys(Page.instances);
        // for(i=0; i< keys.length;i++){
        //     key = keys[i];
        //     result=result+key;
  
        // }
        console.log(str);
        return str;

    },

    createSearchData: function(title){
        title=title.toLowerCase();
        var keys= [], key="", result ="", i =0;
        Page.retreiveAll();
        var includes=[];

        keys = Object.keys( Page.instances);
        for(i=0; i<keys.length; i++){
         key = keys[i];
         page = Page.instances[key];
         if(page.title.toLowerCase().trim().includes(title)
            || page.desc.toLowerCase().trim().includes(title)
            ||page.people.toLowerCase().trim().includes(title)
         ){
            includes.push(Page.instances[key]);

         }


        }

        var str = "";
        str= JSON.stringify(includes);
        // keys = Object.keys(Page.instances);
        // for(i=0; i< keys.length;i++){
        //     key = keys[i];
        //     result=result+key;
  
        // }
        console.log(str);
        return str;
    },

    handleSearchAndSave: function(){
        console.log("saved");
        var title="";
        title=document.getElementById('userInput').value;
        //console.log(title);

        let data = pl.v.importPages.createSearchData(title);

        const textToBLOB = new Blob([data], { type: 'text/plain' });
            const sFileName = 'myPageData.txt';	   // The file to save the data.
    
            let newLink = document.createElement("a");
            newLink.download = sFileName;
    
            if (window.webkitURL != null) {
                newLink.href = window.webkitURL.createObjectURL(textToBLOB);
            }
            else {
                newLink.href = window.URL.createObjectURL(textToBLOB);
                newLink.style.display = "none";
                document.body.appendChild(newLink);
            }
    
            newLink.click(); 
    
    
    },



};