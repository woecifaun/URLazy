var environments;
var rawEnv;

function addEnvironment() {
    var newEnv = rawEnv.cloneNode(true);
    newEnv.querySelector('.url-slice').onkeyup = updateBookmarklets;
    newEnv.querySelector('.button-name').onkeyup = updateBookmarklets;
    newEnv.querySelector('.env-remover').onclick = (function(){
        var thisEnv = newEnv;
        return function(){
            removeEnvironment(thisEnv);
        }
    })();
    document.getElementById('env-container').appendChild(newEnv);

    updateBookmarklets();
}

function removeEnvironment(env) {
    document.getElementById('env-container').removeChild(env);
}

function updateBookmarklets(){
    environments = document.querySelectorAll('.environment');
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

    rawEnv = document.querySelector('#raw-env').cloneNode(true);
    rawEnv.removeAttribute('id');

    [].forEach.call(inputs, function(input) {
        input.onkeyup = updateBookmarklets;
    });

    document.querySelector('#env-creator').onclick = addEnvironment;
})();
