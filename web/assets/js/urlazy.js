var environments = document.querySelectorAll('.environment');

function updateBookmarklets(){
    var slices = [];
    [].forEach.call(environments, function(environment) {
        var slice = environment.querySelector('.url-slice').value.replace('/', '\\/');
        if (slice) slices.push(slice);
    });

    [].forEach.call(environments, function(environment) {
        updateBookmarklet(environment, slices);
    });

}

function updateBookmarklet(environment, slices){
    var bookmarklet = environment.querySelector('.bookmarklet');

    bookmarklet.href =
        "javascript:"
        +"(function(){location.assign(document.URL.replace(/"
        +slices.join("|")
        +"/,'"
        +environment.querySelector('.url-slice').value
        +"'))})();"
    ;
    bookmarklet.innerHTML = environment.querySelector('.button-name').value || '?';
}

(function(){
    updateBookmarklets();

    var inputs = document.querySelectorAll('.url-slice, .button-name');

    [].forEach.call(inputs, function(input) {
        input.onkeyup = updateBookmarklets;
    });
})();
