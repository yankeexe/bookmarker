//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
    console.log('it works')

    //prevent form from submitting
    e.preventDefault();
}