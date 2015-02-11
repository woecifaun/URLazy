var rawEnv;
var defaultEnvironments = [
    ['dev/app_dev.php', 'dev'],
    ['org', 'demo'],
    ['com', 'prod']
];
var URLTimer;


function addEnvironment(slice, buttonName) {
    slice = (typeof slice === "undefined") ? '' : slice;
    buttonName = (typeof buttonName === "undefined") ? '' : buttonName;

    var newEnv = rawEnv.cloneNode(true);
    newEnv.className += ' environment';

    newEnv.slice = newEnv.querySelector('.url-slice');
    newEnv.slice.value = slice;
    newEnv.slice.onkeyup = updateBookmarklets;

    newEnv.btnName = newEnv.querySelector('.button-name');
    newEnv.btnName.value = buttonName;
    newEnv.btnName.onkeyup = updateBookmarklets;

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
    var envNodes = document.querySelectorAll('.environment');
    var environments = [];
    var slices = [];

    [].forEach.call(envNodes, function(environment) {
        var slice = environment.slice.value.replace('/', '\\/');

        if (slice) slices.push(slice);
        environments.push([environment.slice.value, environment.btnName.value]);
    });

    [].forEach.call(envNodes, function(environment) {
        updateBookmarklet(environment, slices);
    });

    history.replaceState({}, '', '?' + JSON.stringify(environments));
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

    try {
        initEnvs = JSON.parse(decodeURI(window.location.search.substring(1)));
    } catch (variable) {
        initEnvs = defaultEnvironments;
    }

    [].forEach.call(initEnvs, function(env){
        addEnvironment(env[0], env[1]);
    });

    document.querySelector('#env-creator').onclick = function(){
        addEnvironment();
    }
})();
