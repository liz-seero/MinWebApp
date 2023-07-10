//methods for the use case createBook
pl.v.createPage= {
    setupUserInterface: function(){
        var saveButton = document.forms['Page'].commit;

        Page.retreiveAll();
        saveButton.addEventListener("click",
            pl.v.createPage.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", Page.saveAll);

        

        
    },
    handleSaveButtonClickEvent: function(){
        var formE1= document.forms['Page'];

        var output = document.getElementById("emoRate");
        console.log(output);

        var sDate = new Date();
        //console.log(sDate.toString());
        var eDate= new Date();

        //trying to error handle, not working
        if(formE1.startDate.value !== null){
           
            sDate = new Date(formE1.startDate.value);
        }

        if(formE1.endDate.value !== null){
            
            eDate = new Date(formE1.endDate.value);
        }

       // if(document.getElementById('userInput').clicked == true){

        // }else{

        //change to make the unique code
            const result = Math.random().toString(36).substring(2,12);
            var name = formE1.title.value + result;


            //var slots = {title: formE1.title.value,
            var slots = {title: name,
                desc: formE1.desc.value, 
                people: formE1.people.value,
                emoRate: formE1.emoRate.value,
                startDate: sDate,
                endDate: eDate
            };
//        }
        Page.add(slots);
        
        formE1.reset();

    }
    
};