/***********************************************
***  Methods for the use case updatePage  ******
************************************************/
pl.v.updatePage = {
    setupUserInterface: function () {
      var formEl = document.forms['Page'],
          saveButton = formEl.commit,
          selectPageEl = formEl.selectPage;
      var key="", keys=[], page=null, optionEl=null, i=0;
      // load all book objects
      Page.retreiveAll();
      // populate the selection list with books
      keys = Object.keys( Page.instances);
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        page = Page.instances[key];
        optionEl = document.createElement("option");
        
        optionEl.text = page.title.substring(0, page.title.length-10);
        optionEl.value = page.title;
        selectPageEl.add( optionEl, null);
      }
      // when a book is selected, fill the form with its data
      selectPageEl.addEventListener("change", 
          pl.v.updatePage.handlePageSelectionEvent);
      // set an event handler for the submit/save button
      saveButton.addEventListener("click",
          pl.v.updatePage.handleSaveButtonClickEvent);
      // handle the event when the browser window/tab is closed
      window.addEventListener("beforeunload", Page.saveAll);
    },
    handlePageSelectionEvent: function () {
      sDate = new Date();
      eDate = null;
      var formEl = document.forms['Page'];
      var selectPageEl = formEl.selectPage,
          page=null, key = selectPageEl.value;

      sDate = new Date(formEl.startDate.value);
 
      //var start_value= document.getElementById('formE1.startDate');
      // if(!formEl.startDate.value){
      //   console.log("empty");
      // }

      eDate = new Date(formEl.endDate.value);



      if (key) {
        page = Page.instances[key];
         
        //formEl.title.value = page.title.substring(0,page.title.length-10 );
        formEl.title.text = page.title.substring(0,page.title.length-10 );
        formEl.title.value = page.title;
        formEl.emoRate.value = page.emoRate;
        //formEl.startDate.value = page.startDate;
        //formEl.endDate.value = page.endDate;


        sDate = page.startDate;
        eDate = page.endDate;
      } else {
        formEl.reset();
      }
    },
    // save data
    handleSaveButtonClickEvent: function () {
      var formEl = document.forms['Page'],
          selectPageEl = formEl.selectPage;

      var sDate = new Date(), eDate=new Date(), slots = {};


      if(( !formEl.startDate.value)|| (!formEl.endDate.value)){
        if(!formEl.startDate.value){
          console.log("empty start ");
          var temp_name = formEl.title.value;
          sDate = Page.instances[temp_name].startDate;

        }else{
          sDate=new Date(formEl.startDate.value);
        }
  
        if(!formEl.endDate.value){
          console.log("empty end");
          //eDate=new Date(formEl.endDate.value);

          var temp_name = formEl.title.value;
          eDate = Page.instances[temp_name].endDate;

          
        }else{
          eDate=new Date(formEl.endDate.value);
        }

        slots = { title: formEl.title.value, 
          desc: formEl.desc.value, 
          emoRate: formEl.emoRate.value,
          startDate: sDate,
          endDate: eDate
        };
      }
      else{
        slots = { title: formEl.title.value, 
          desc: formEl.desc.value, 
          emoRate: formEl.emoRate.value,
          startDate: new Date(formEl.startDate.value),
          endDate: new Date(formEl.endDate.value)
        };
      }



      console.log("print slots: " + slots);
      Page.update( slots);
      // update the selection list option
      selectPageEl.options[selectPageEl.selectedIndex].text = slots.title;
      formEl.reset();
    }
  };