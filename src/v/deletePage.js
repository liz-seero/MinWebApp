/***********************************************
***  Methods for the use case "delete Page"  ***
************************************************/
pl.v.deletePage = {
    setupUserInterface: function () {
      var deleteButton = document.forms['Page'].commit;
      var selectEl = document.forms['Page'].selectPage;
      var key="", keys=[], page=null, optionEl=null, i=0;
      // load all book objects
      Page.retreiveAll();
      keys = Object.keys( Page.instances);
      // populate the selection list with books
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        page = Page.instances[key];
        optionEl = document.createElement("option");
        var text_length = page.title.length;
        optionEl.text = page.title.substring(0,text_length-10 );

        optionEl.value = page.title;
        selectEl.add( optionEl, null);
      }
      // Set an event handler for the submit/delete button
      deleteButton.addEventListener("click",
          pl.v.deletePage.handleDeleteButtonClickEvent);
      // Set a handler for the event when the browser window/tab is closed
      window.addEventListener("beforeunload", Page.saveAll);
    },
    // Event handler for deleting a book
    handleDeleteButtonClickEvent: function () {
      var selectEl = document.forms['Page'].selectPage;
      var isbn = selectEl.value;
      if (isbn) {
        Page.destroy( isbn);
        // remove deleted book from select options
        selectEl.remove( selectEl.selectedIndex);
      }
    }
  };