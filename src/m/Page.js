/**
 *SPECIAL NOTE: Page.retreiveAll = function() is spelled incorectly
 but it was used correctly with the incorrect spelling so its going to sytay that way for now
*/

//import {readFileSync, promises as fsPromises} from 'fs';


/*
 *  this is the primary data structure that will be used in the project
 * @param {{title: string,  desc: string, people: string, emoRate: number, startDate: string, endDate:string}} slots 
 */
function Page(slots){
        this.title = slots.title;
        this.desc = slots.desc;
        //this.entryDate = slots.entryDate; // maybe put in later
        this.people = slots.people;
        this.emoRate = slots.emoRate;
        this.startDate = slots.startDate;
        this.endDate = slots.endDate;
};


Page.instances={};


Page.convertRow2Obj = function(pageRow){
    var p = new Page(pageRow);
    return p;
}

//load pages from localStorage
Page.retreiveAll = function(){
    var key="", keys=[], pageString="", pages={}, i=0;
    try{
        if(localStorage.getItem("pages")){
            pageString= localStorage.getItem("pages");
        }
    } catch (e){
        alert("Error when reading from localStorage\n"+e);
    }
    if(pageString){
        pages=JSON.parse( pageString);
        keys= Object.keys(pages);
        console.log( keys.length + " books loaded.");
        for (i=0; i<keys.length; i++){
            key = keys[i];
            Page.instances[key] = Page.convertRow2Obj(pages[key]);
        }
    }
};

//saveall books to localStorage
Page.saveAll= function(){
    var pageString="", error = false,
        numPages= Object.keys(Page.instances).length;
    try{
        pageString= JSON.stringify(Page.instances);
        localStorage.setItem("pages", pageString);
    }
    catch (e){
        alert("Error when writing to localStorage\n"+e);
        error= true;
    }
    if (!error) console.log(numPages+ "pages saved.");
};

//create a new page row 
Page.add= function(slots){
    var page= new Page(slots);
    Page.instances[slots.title]= page;
    console.log("page" + slots.title + "created");
};

//update
Page.update = function (slots){
    var page = Page.instances[slots.title];
    var emoRate = parseInt(slots.emoRate);
    var startDate = slots.startDate;
    var endDate = slots.endDate;
    //if (page.desc !== slots.desc) page.desc = page.desc + " . "+slots.desc;
    if (page.desc !== slots.desc) page.desc = page.desc +" . "+slots.desc;

    if (page.emoRate !== emoRate && emoRate!==null) page.emoRate= emoRate;
    if(page.startDate !==startDate &&startDate!==null) page.startDate = startDate;
    if(page.endDate !==endDate ) page.endDate = endDate;
    console.log("Page "+ slots.title + "modified");
};


//destroy
Page.destroy= function(title){
    if(Page.instances[title]){
        console.log("Page " + title + "deleted");
        delete Page.instances[title];
    } else{
        console.log("There is no book with " + title + " in the database!");
    }
};


//generates test data
Page.generateTestData = function(){
    //Page.instances["happy maybe"] = new Page({title:"happy maybe", desc: "wonder lust", people: "Jason, emma, cole", emoRate: "5"});
    const date = new Date();
    var result = Math.random().toString(36).substring(2,12);

    Page.instances["Day 1"+result] = new Page({title:"Day 1"+result, desc: "good overall, didn't finish as much as we had hoped", people: "Emily, Jason, Nash", emoRate: 4, startDate: "2022-12-12", endDate: date.toString()});
    result = Math.random().toString(36).substring(2,12);

    Page.instances["Day 2"+result] = new Page({title:"Day 2"+result, desc: "counting down the minutes until I had to leave but it wasn't so bad", people: "Ross, Rachel", emoRate: 3, startDate: "2023-12-12", endDate: date.toString()});
    result = Math.random().toString(36).substring(2,12);

    Page.instances["Day 3"+result] = new Page({title:"Day 3"+result, desc: "wasn't in the mood for this today", people: "Rebecca, Nash", emoRate: 2, startDate: "2023-12-12", endDate: "2023-12-12"});
    result = Math.random().toString(36).substring(2,12);

    Page.instances["Day 4"+result] = new Page({title:"Day 4"+result, desc: "time flies when you're having fun!", people: "Jackson, Emily, Rebecca", emoRate: 5, startDate: "2023-12-12", endDate: "2023-12-12"});

    Page.saveAll();

    //Page.mostPopWord();
};

//clear data
Page.clearData= function(){
    if (confirm("Do you want to delete all page data")){
        Page.instances= {};
        localStorage.setItem("pages", "{}");
    }
};

Page.mostPopWord = function(){
   //see what I can do with import
   //fs.readFile('stop_words.txt');
    //asynchReadFile(stop_words.txt);

};





