//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){

/** Get Form Values */
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!siteName || !siteURL){
        alert('Please enter proper values')
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Insert valid URL')
        return false
    }

    var bookmark = {
        name: siteName, 
        url: siteURL
    }

    /** Local Storage 
     * note: Local storage only stores JSON
    */
   //Test if bookmark is null


    if(localStorage.getItem('bookmarks') === null){
        //init array
        var bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else {
        //get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //re-set back to the local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
}

function deleteBookmark(url) {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //refetch bookmark 
    fetchBookmarks();
    
}

//Get Bookmarks
function fetchBookmarks() {
    //get data
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    //get id
    var bookmarkResults = document.getElementById('bookmarkResults')
    bookmarkResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++) {
        var name  = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarkResults.innerHTML += '<div class="well">'+
                                    '<h3>'+name+
                                    ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> '+
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a> '
                                    '</h3>'+
                                    '</div>';
    }
}