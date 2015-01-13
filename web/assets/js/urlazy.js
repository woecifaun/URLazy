var environments = document.querySelectorAll('.environment');

function updateBookmarklets(){
    var chunks = [];
    [].forEach.call(environments, function(environment) {
        chunks.push(environment.querySelector('.url-chunk').value.replace('/', '\\/'));
    });
console.log(chunks);
    [].forEach.call(environments, function(environment) {
        updateBookmarklet(environment, chunks);
    });

}

function updateBookmarklet(environment, chunks){
    var bookmarklet = environment.querySelector('.bookmarklet');
    bookmarklet.href = 
        "javascript:"
        +"(function(){location.assign(document.URL.replace(/"
        +chunks.join("|")
        +"/,'"
        +environment.querySelector('.url-chunk').value
        +"'))})();"
    ;
    bookmarklet.innerHTML = environment.querySelector('.button-name').value;
}

(function(){
    updateBookmarklets();

    var inputs = document.querySelectorAll('.url-chunk, .button-name');

    [].forEach.call(inputs, function(input) {
        input.onkeyup = updateBookmarklets;
    });
})();
