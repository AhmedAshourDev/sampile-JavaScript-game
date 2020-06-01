"use strict";

const { $, on } = require("./element");
const { MediaPlayer } = require("./audio");
const { startGameTable } = require("./game");
const {
    _exitGame,
    _storageVolumeGame,
    _getVolumeGame,
    _storageUserNameAsPlayerInGame,
    _getUserNameAsPlayerInGame
} = require("./internal");


// element show name player in screen
var showNameOnScreen = $("showNameOnScreen");
var storageElementMakeAnimationInBackground = $("storageElementMakeAnimationInBackground");
setNameUserOnScreen(_getUserNameAsPlayerInGame());


function getRandomNumberByLength(length) {
    return Math.floor(Math.random() * length);
}


function getRandomColor____RBG() {
    let r = getRandomNumberByLength(255),
        b = getRandomNumberByLength(255),
        g = getRandomNumberByLength(255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

const ALL_CLASSES_STYLE_ELEMENT_____TO_MAKE_ANIMATION_IN_BACKGROUND_OF_USER = [
    "____a-1", "____a-2", "____a-3", "____a-4", "____a-5"
];

const SPEED____ANIMATION_BACKGROUND_USER = 50;

var _animtionInBackground = null;
function startAnimationInMainBackgroundUser() {
    _animtionInBackground = setInterval(function() {
        let _random_number_class_element = ALL_CLASSES_STYLE_ELEMENT_____TO_MAKE_ANIMATION_IN_BACKGROUND_OF_USER[
            getRandomNumberByLength(ALL_CLASSES_STYLE_ELEMENT_____TO_MAKE_ANIMATION_IN_BACKGROUND_OF_USER.length)
        ];

        // style new color
        let _random_number_position____left = getRandomNumberByLength(100);
        let _random_number_position____top = getRandomNumberByLength(100);
        let _random_number_trasnfrorm_scale = getRandomNumberByLength(4);
    
        // add element animation after edit style attribute
        storageElementMakeAnimationInBackground.innerHTML
        += '<div style="background-color:' + getRandomColor____RBG() + ';transform:scale(' + _random_number_trasnfrorm_scale
        + ');position:fixed;top:' + _random_number_position____top + '%;left:' + _random_number_position____left
        + '%" class="' + _random_number_class_element + '"></div>';

        // start new promise to remove element color
        setTimeout(function() {
            let _elements = storageElementMakeAnimationInBackground.getElementsByTagName("*");
            let __numberOfAnyChildElement = getRandomNumberByLength(_elements.length);
            let ___element = _elements[ __numberOfAnyChildElement ];
            storageElementMakeAnimationInBackground.removeChild(___element);

            // print count of color on screen
            //console.log(_elements.length);
        }, 10000);

    }, SPEED____ANIMATION_BACKGROUND_USER);
}

function stopStartAnimationInMainBackgroundUser() {
    if (!!_animtionInBackground) clearInterval(_animtionInBackground);
}

// start animtion _____________
startAnimationInMainBackgroundUser();

function setNameUserOnScreen(name) {
    let __array_name = name.split(" ");
    let __html_span = "";
    for (var name of __array_name) __html_span += "<span>" + name + " </span>";
    showNameOnScreen.innerHTML = __html_span;
}

function hideNameUserOnScreen() { showNameOnScreen.style.display = "none"; }
function showNameUserOnScreen() { showNameOnScreen.style.display = "block"; }


// menu game options
var buttonStartGame = $("buttonStartGame");
var buttonStartGameAsMultiplayer = $("buttonStartGameAsMultiplayer");
var buttonOpenOptionsGamePlay = $("buttonOpenOptionsGamePlay");
var buttonExitGame = $("buttonExitGame");

// add event exit game
on(buttonExitGame, "click",  function() {
    stopStartAnimationInMainBackgroundUser();
    _exitGame();
});

//hard-popup-menu-settings-game
var toolsForEditingGame = $("toolsForEditingGame");
var fieldChangeYourNameAsPlayer = $("fieldChangeYourNameAsPlayer");
var volumeGame = $("volumeGame");


// audio to assert voulme of game
const audioBackgroundForSettingsGame = new MediaPlayer("./doc/audio/background_assert_audio_settings.mp3");
const audioMouseHoverMainButton = new MediaPlayer("./doc/audio/mouse_hover_main_button.mp3");
const audioBackgroundForUser = new MediaPlayer("./doc/audio/audio_in_background_for_user.mp3");
audioMouseHoverMainButton.setVolume(1.0);
audioBackgroundForUser.setVolume(0.1);
//audioBackgroundForUser.start();


on(buttonOpenOptionsGamePlay, "click", function() {
    stopStartAnimationInMainBackgroundUser();
    restartValueOfOptionsToShow();
    showOptionsToolsForEditGame();
    setTimeout(function() {
        toolsForEditingGame.classList.remove("hard-popup-menu-settings-game");
    }, 500);
    toolsForEditingGame.classList.add("hard-popup-menu-settings-game");
    audioBackgroundForSettingsGame.setVolume(_getVolumeGame() / 10);
    audioBackgroundForUser.stop();
    audioBackgroundForSettingsGame.start();
});

function showOptionsToolsForEditGame() { toolsForEditingGame.style.display = "block"; }
function hideOptionsToolsForEditGame() { toolsForEditingGame.style.display = "none"; }

function restartValueOfOptionsToShow() {
    fieldChangeYourNameAsPlayer.value = _getUserNameAsPlayerInGame();
    volumeGame.value = _getVolumeGame();
}

// change volume of game from slider game
on(volumeGame, "input", function() {
    let volume = parseInt(volumeGame.value);
    volumeGame.style.backgroundColor = "rgb(255,55," + (volume * 20) + ")";
    audioBackgroundForSettingsGame.setVolume(volume / 10);
});


var buttonApplyChangeSettings = $("buttonApplyChangeSettings");
var buttonCancelChangeSettings = $("buttonCancelChangeSettings");

// apply changing
on(buttonApplyChangeSettings, "click", function() {
    startAnimationInMainBackgroundUser();
    hideOptionsToolsForEditGame();
    _storageVolumeGame(volumeGame.value);
    let name = fieldChangeYourNameAsPlayer.value;
    if (!!name && name != "\t") {
        setNameUserOnScreen(name);
        _storageUserNameAsPlayerInGame(name);
    }
    audioBackgroundForSettingsGame.stop();
    audioBackgroundForUser.start();
});

// cancel changing
on(buttonCancelChangeSettings, "click", function() {
    startAnimationInMainBackgroundUser();
    hideOptionsToolsForEditGame();
    restartValueOfOptionsToShow();
    audioBackgroundForSettingsGame.stop();
    audioBackgroundForUser.start();
});

// start animation buttons
startAnimationMainGameButtons();
setInterval(function() {
    startAnimationMainGameButtons();
}, 6000);



function startAudioAnimationWhenMouseHoverMainButton() { audioMouseHoverMainButton.start(); }
function stopAudioAnimationWhenMouseHoverMainButton() { audioMouseHoverMainButton.stop(); }


// start music effect when mouse enter button
on(buttonApplyChangeSettings, "mouseenter", startAudioAnimationWhenMouseHoverMainButton);
on(buttonCancelChangeSettings, "mouseenter", startAudioAnimationWhenMouseHoverMainButton);
on(buttonStartGame, "mouseenter", startAudioAnimationWhenMouseHoverMainButton);
on(buttonStartGameAsMultiplayer, "mouseenter", startAudioAnimationWhenMouseHoverMainButton);
on(buttonOpenOptionsGamePlay, "mouseenter", startAudioAnimationWhenMouseHoverMainButton);
on(buttonExitGame, "mouseenter", startAudioAnimationWhenMouseHoverMainButton);


// stop music effect when mouse out button
on(buttonApplyChangeSettings, "mouseout", stopAudioAnimationWhenMouseHoverMainButton);
on(buttonCancelChangeSettings, "mouseout", stopAudioAnimationWhenMouseHoverMainButton);
on(buttonStartGame, "mouseout", stopAudioAnimationWhenMouseHoverMainButton);
on(buttonStartGameAsMultiplayer, "mouseout", stopAudioAnimationWhenMouseHoverMainButton);
on(buttonOpenOptionsGamePlay, "mouseout", stopAudioAnimationWhenMouseHoverMainButton);
on(buttonExitGame, "mouseout", stopAudioAnimationWhenMouseHoverMainButton);


//effact-light-on-button
function setAnimationLighting(element) {
    let _element_make_animation_light = element.getElementsByClassName("p-effact-light-on-button")[ 0 ];
    _element_make_animation_light.style.display = "block";
    _element_make_animation_light.classList.add("effact-light-on-button");
    setTimeout(() => {
        _element_make_animation_light.classList.remove("effact-light-on-button");
    }, 1000);
}

function startAnimationMainGameButtons() {
    buttonStartGame.classList.remove("animation-scale-button-loop_1");
    buttonStartGameAsMultiplayer.classList.remove("animation-scale-button-loop_1");
    buttonOpenOptionsGamePlay.classList.remove("animation-scale-button-loop_1");
    buttonExitGame.classList.remove("animation-scale-button-loop_1");

    setTimeout(() => { setAnimationLighting(buttonStartGame); buttonStartGame.classList.add("animation-scale-button-loop_1"); }, 100);
    setTimeout(() => { setAnimationLighting(buttonStartGameAsMultiplayer); buttonStartGameAsMultiplayer.classList.add("animation-scale-button-loop_1"); }, 200);
    setTimeout(() => { setAnimationLighting(buttonOpenOptionsGamePlay); buttonOpenOptionsGamePlay.classList.add("animation-scale-button-loop_1"); }, 300);
    setTimeout(() => { setAnimationLighting(buttonExitGame); buttonExitGame.classList.add("animation-scale-button-loop_1"); }, 400);
}

function showTableGame() {
    let _tableGame = $("tableGame");
    let _desktopcontrollGame = $("desktopcontrollGame");
    tableGame.style.display = "block";
    desktopcontrollGame.style.display = "none";
}

function hideTableGame() {
    let _tableGame = $("tableGame");
    let _desktopcontrollGame = $("desktopcontrollGame");
    tableGame.style.display = "none";
    desktopcontrollGame.style.display = "block";
}

var windowLoadStartNewGame = $("windowLoadStartNewGame");
var button_back_windowLoading = $("button_back_windowLoading");
var ____Anim = null;
var ____size_circle_color = 17;
var ___increase = true;

on(button_back_windowLoading, "click", function() {
    stopAnimationLoadWindowPlayerToStartGame();
    hideTableGame();
});

function startAnimationLoadWindowPlayerToStartGame() {
    stopStartAnimationInMainBackgroundUser();
    ____Anim = setInterval(function() {
        if (____size_circle_color == 100)  ___increase = false; else if (____size_circle_color === 1) ___increase = true;
        if (___increase === true) ____size_circle_color++; else ____size_circle_color--;
        windowLoadStartNewGame.style.backgroundImage = 'radial-gradient(#700606, red ' + ____size_circle_color + '%, orange)';
    });
    windowLoadStartNewGame.style.display = "block";
}
function stopAnimationLoadWindowPlayerToStartGame() {
    startAnimationInMainBackgroundUser();
    windowLoadStartNewGame.style.display = "none";
    if (!!____Anim) clearTimeout(____Anim);
}

on(buttonStartGame, "click", function() {
    hideNameUserOnScreen();
    stopStartAnimationInMainBackgroundUser();
    startAnimationLoadWindowPlayerToStartGame();
    setTimeout(() => {
        stopAnimationLoadWindowPlayerToStartGame();
    }, 2000);
    showTableGame();
    startGameTable();
});

on(buttonStartGameAsMultiplayer, "click", function() {
    hideNameUserOnScreen();
    stopStartAnimationInMainBackgroundUser();
    startAnimationLoadWindowPlayerToStartGame();
    showTableGame();
    startGameTable();
});

animationUserStillOnButtonPayPay();
function animationUserStillOnButtonPayPay() {
    let __doAnimtion = null;

    // bide button after
    on(buttonExitGame, "mouseenter", () => {
        __doAnimtion = setTimeout(() => {
            buttonExitGame.style.display = "none";
            __doAnimtion = setTimeout(() => {
                buttonExitGame.style.display = "block";
            }, 3000);
        }, 3000);
    });
    on(buttonExitGame, "mouseout", () => {
        if (!!__doAnimtion) {
            clearTimeout(__doAnimtion);
            __doAnimtion = null;
        }
    });
}

// some tools here to controll there :) hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
exports.hideNameUserOnScreen = hideNameUserOnScreen;
exports.showNameOnScreen = showNameOnScreen;
exports.showOptionsToolsForEditGame = showOptionsToolsForEditGame;
exports.getRandomColor____RBG = getRandomColor____RBG;