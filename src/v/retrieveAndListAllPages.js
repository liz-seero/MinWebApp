//this is the event listener function for the retrieve and list tab
pl.v.retreiveAndListAllPages= {
    setupUserInterface: function() {
        var tableBodyE1 = document.querySelector("table#pages>tbody");
        var keys= [], key="", row ={}, i =0;
        Page.retreiveAll();
        keys = Object.keys(Page.instances);
        //var helpDate = new Date();
        //console.log("helpDate is" + helpDate);
        for(i=0; i < keys.length;i++){
            key = keys[i];
            startString = "", endString = "";
            var sdate = new Date(Page.instances[key].startDate);
            var edate = new Date(Page.instances[key].endDate);
            //console.log(sdate.getDate()+"day,  "+sdate.getMonth()+" month, year "+edate.getFullYear());
            //include offset
            //https://stackoverflow.com/questions/36206260/how-to-set-date-always-to-eastern-time-regardless-of-users-time-zone
            
            if(Page.instances[key].startDate == null){
                //startString = helpDate.toLocaleString('default', { month: 'long' }) + " "+helpDate.getDate()+", "+ helpDate.getFullYear();
                startString = "";

            }else {
                startString = sdate.toLocaleString('default', { month: 'long' }) + " "+sdate.getDate()+", "+ sdate.getFullYear();

            }
            
            //console.log(startString);
            if(Page.instances[key].endDate == null){
                endString = "";
            }else{
                endString = edate.toLocaleString('default', { month: 'long' }) + " "+edate.getDate()+", "+ edate.getFullYear();

            }
            //include time offset
            //the random end has been taken off in order to display the name the user knows it as
            
            row= tableBodyE1.insertRow();
            row.insertCell(-1).textContent = Page.instances[key].title.substring(0,Page.instances[key].title.length-10 );
            row.insertCell(-1).textContent = Page.instances[key].desc;
            row.insertCell(-1).textContent = Page.instances[key].people;
            row.insertCell(-1).textContent = Page.instances[key].emoRate;
            //row.insertCell(-1).textContent = Page.instances[key].startDate;
            //row.insertCell(-1).textContent = Page.instances[key].endDate;
            row.insertCell(-1).textContent = startString;
            row.insertCell(-1).textContent = endString;

        }
    }
};