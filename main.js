//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){

/** Get Form Values */
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

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

    //prevent form from submitting
    e.preventDefault();
}

//Get Bookmarks
function fetchBookmarks() {
    //get data
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    //get id
    var bookmarkResults = document.getElementById('bookmarkResults')
    bookmarkResults.innerHTML = '';
    for(var i = 0; i < bookmarkResults.length; i++) {
        var name  = bookmarks[i].name;
        var url = bookmarks[i].url;
    }
}