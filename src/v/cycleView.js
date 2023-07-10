//this is the event listener function for the retrieve and list tab
pl.v.cycleView= {
    setupUserInterface: function() {
        var tableBodyE1 = document.querySelector("table#pages>tbody");
        var keys= [], key="", row ={}, i =0;
        Page.retreiveAll();
        keys = Object.keys(Page.instances);
        //var helpDate = new Date();
        //console.log("helpDate is" + helpDate);
        var isGoingUp = true;

        if (keys.length>=2){
            if( Page.instances[keys[0]].emoRate >= Page.instances[keys[1]].emoRate){
                isGoingUp = false;
                console.log("going down");

            }

        }
        var temp=parseInt(keys[0]);

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
            var test = document.getElementById("pages");
            row= tableBodyE1.insertRow();
            row.insertCell(-1).textContent = Page.instances[key].title.substring(0,Page.instances[key].title.length-10 );
            row.insertCell(-1).textContent = Page.instances[key].desc;
            //want to change the color here

            row.insertCell(-1).textContent = Page.instances[key].people;
            row.insertCell(-1).textContent = Page.instances[key].emoRate;

            //row.insertCell(-1).textContent = Page.instances[key].startDate;
            //row.insertCell(-1).textContent = Page.instances[key].endDate;
            row.insertCell(-1).textContent = startString;
            row.insertCell(-1).textContent = endString;
            // if (parseInt(Page.instances[key].emoRate) >=3){
            //     console.log("emorate is" + parseInt(Page.instances[key].emoRate));
            //     document.getElementById("pages").rows[i+1].style.color = "blue";
            // }

            if(isGoingUp && (i<=keys.length-2)){
                console.log("peak high");
                var temp = "", t="",j=0;
                j=i+1;
                temp=keys[j];
                console.log(temp);
                
                t = Page.instances[temp].emoRate;
                if(parseInt(Page.instances[key].emoRate) > parseInt(t)){
                    console.log("peak high");
                    document.getElementById("pages").rows[i+1].style.color = "green";
                    isGoingUp=false;

                }
            }
            else if(!isGoingUp && i<=(keys.length-1)){
                var temp = "", t = "";
                temp=keys[i+1];
                t= Page.instances[temp].emoRate;
                
                if(parseInt(Page.instances[key].emoRate) < parseInt(t)){
                    document.getElementById("pages").rows[i+1].style.color = "red";
                    isGoingUp=true;
                    console.log("peak high");
                }
            }


        }
    },

};