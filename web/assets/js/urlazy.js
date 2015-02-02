var environments;
var rawEnv;
var defaultEnvironments = [
    ['dev/app_dev.php', 'dev'],
    ['org', 'demo'],
    ['com', 'prod']
];

function addEnvironment(slice, buttonName) {
    slice = (typeof slice === "undefined") ? '' : slice;
    buttonName = (typeof buttonName === "undefined") ? '' : buttonName;

    var newEnv = rawEnv.cloneNode(true);
    newEnv.querySelector('.url-slice').value = slice;
    newEnv.querySelector('.url-slice').onkeyup = updateBookmarklets;
    newEnv.querySelector('.button-name').value = buttonName;
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

    updateBookmarklets();
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
    rawEnv = document.querySelector('#raw-env').cloneNode(true);
    rawEnv.removeAttribute('id');

    for (var i = 0; i < defaultEnvironments.length; i++) {
        addEnvironment(defaultEnvironments[i][0], defaultEnvironments[i][1]);
    }

    document.querySelector('#env-creator').onclick = function(){
        addEnvironment();
    }
})();
