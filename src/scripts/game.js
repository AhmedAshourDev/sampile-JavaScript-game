"use strict";

const { $, on } = require("./element");
//const { hideNameUserOnScreen } = require("./desk");
const { _getUserNameAsPlayerInGame } = require("./internal");
const {
    ALL_CARD_PLAY,
    createRandomCard,
    createCardHTML
} = require("./card");


// in this array we will but all card which was played
// and cannot play it again
const ALL_CARD_ON_TABLE = [];

///// to restart data in software of game
function ___restartGame() {
    ALL_CARD_ON_TABLE = [];
}

// check if card was played
function isCardOnTable(top, bottom) {
    for (let _card of ALL_CARD_ON_TABLE) {
        if (_card.top === top && _card.bottom === bottom) return true;
    }
    return false;
}

function getDataInfoCard(element) {
    let data = element.getAttribute("data-infocard").split(",");
    return {
        ___centerTop: parseInt(data[0]),
        ___centerBottom: parseInt(data[1])
    };
}

var myPrivateCards = $("myPrivateCards");

// add private card
function addElementPrivateCard(stringElement) {
    myPrivateCards.innerHTML += stringElement;
}
// remove private card
function removeElementPrivateCard(centerTop = 0, centerBottom = 0) {
    var elements = myPrivateCards.getElementsByClassName("card-play");
    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        let dataCard = getDataInfoCard(element);
        if (dataCard.___centerTop === centerTop && dataCard.___centerBottom === centerBottom) {
            element.parentNode.removeChild(element);
        }
    }
}
function loopOnPrivateCards(callbackFunc) {
    let elements = myPrivateCards.getElementsByClassName("card-play");
    for (var i = 0; i < elements.length; i++) {
        if (callbackFunc(elements[ i ]) === true) break;
    }
}

var elementTimer = $("_timer");
function startNewTimerOnScreen(callbackFuncOnEndTimer) {
    let time = 30;
    let __timerFunc = setInterval(function() {
        // change color for dang number
        if (time === 3 || time === 2 || time === 1) elementTimer.style.color = "red";
        else elementTimer.style.color = "black";
        
        if (time === 0) {
            if (typeof callbackFuncOnEndTimer === "function") callbackFuncOnEndTimer();
            clearInterval(__timerFunc);
        } else {
            time -= 1;
            elementTimer.innerHTML = time;
        }
    }, 1000);
}


// function stopNewTimerOnScreen() {
//     if (!!__timerFunc) clearTimeout(__timerFunc);
// }

function __getRandomNumberByLength(length) {
    if (typeof length !== "number") length = length.length;
    return Math.floor(Math.random() * length);
}


function __getRandomColor____RBG() {
    let r = __getRandomNumberByLength(255),
        b = __getRandomNumberByLength(255),
        g = __getRandomNumberByLength(255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

const CONST_NAME_IN_CENTER_TABLE = "Oooh";
const TIME_HIDE_NAME_PLAYER_AFTER_SHOW_ON_SCREEN = 4 * 1000;
function doAnimationStartRoleAnotherPlayer(namePlayer) {
    let centerNamePlayer = $("centerNamePlayer");
    let parentShowNamePlayer = $("parentShowNamePlayer");
    let ___parentElementsColors = $("___parentElementsColors");

    // show animation
    parentShowNamePlayer.style.display = "block";
    centerNamePlayer.innerHTML = namePlayer || CONST_NAME_IN_CENTER_TABLE;
    
    let __left = true;
    for (let i = 0; i < 20; i++) {
        __left = !__left;
        if (__left) ___parentElementsColors.innerHTML += '<div style="background-color:' + __getRandomColor____RBG() + ';top:' + (i * 5) + '%;" class="come_from_left">';
        else ___parentElementsColors.innerHTML += '<div style="background-color:' + __getRandomColor____RBG() + ';top:' + (i * 5) + '%;" class="come_from_right">';
    }
    // hide element show name player
    setTimeout(() => {
        parentShowNamePlayer.style.display = "none";
        centerNamePlayer.innerHTML = "";
        while (___parentElementsColors.firstChild)
            ___parentElementsColors.removeChild(___parentElementsColors.firstChild);
    }, TIME_HIDE_NAME_PLAYER_AFTER_SHOW_ON_SCREEN);
}


function getRandomCardNotPlayed() {
    var card = createRandomCard();
    while (isCardOnTable(card)) {
        card = createRandomCard();
    }
    return card;
}

let _____func = null;
function onAddCardFromMe(callbackFunc) {
    if (typeof callbackFunc === "function") _____func = callbackFunc;
    else if (_____func != null) _____func();
}


////////////////////////////////////////////////////////////////////////// data card to play 
var dataCardWasSelectedToPlay = {top: null, bottom: null};
var _______card_left_number = null;
var _______card_right_number = null;
function __addCardInLeft(cardNumber) { _______card_left = cardNumber; }
function __addCardInRight(cardNumber) { _______card_right = cardNumber; }


var iCanPlay = true;
function callIfCanPlay(callbackFunc) {
    if (iCanPlay === true) {
        callbackFunc();
    }
}

var startGame = true;
const MESSAGES____ = [
    "انا احبك", "من انت ايها الحميل",
    "لماذا انت رائع هكذا", "انا هخلبالى من جهازك", "متقلقش انت بامان", "بص وراك كده", "قلى ما هو سرك انا اراقبك"
];


// add events what happend when the main player select his private card
function setEventMouseDownForAllPrivateCard() {
    loopOnPrivateCards(function(elementPrivateCard) {
        elementPrivateCard.onclick = function() {

            let msg = MESSAGES____[ __getRandomNumberByLength(MESSAGES____) ];
            console.log(msg);
            doAnimationStartRoleAnotherPlayer(msg);

            ___removeAllAssertCards();

            // change `backgroundColor` style in private cards
            loopOnPrivateCards(function(_elementPrivateCard) {
                if (_elementPrivateCard !== elementPrivateCard) {
                    _elementPrivateCard.style.backgroundColor = "white";
                }
            });
            elementPrivateCard.style.backgroundColor = "red";

            // animations select private card
            endAnimationSelectPrivateCard();
            addAnimationSelectPrivateCard(elementPrivateCard);

            // get data of numbers in the top and bottom in private card
            let data = getDataInfoCard(elementPrivateCard);
            dataCardWasSelectedToPlay.top = data.___centerTop;
            dataCardWasSelectedToPlay.bottom = data.___centerBottom;

            if (dataCardWasSelectedToPlay.top === dataCardWasSelectedToPlay.bottom)
                addAssertCardOnTablePlayers();
            else
                addAssertCardOnTablePlayers(true);
        };
    });
}


function ___removeAllAssertCards(nt_check_if_have_element_child=false) {
    let elements = tablePutCards.getElementsByClassName("assert-card-on-table-players");
    for (let i = 0; i < elements.length; i++) {
        let __as = elements[i];
        if (__as.style.borderRadius !== "50%") {
            if (nt_check_if_have_element_child === true) return __as.parentNode.removeChild(elements[i]);
            else if (!__as.firstChild) __as.parentNode.removeChild(elements[i]);
        }
    }
}
let ____where_add_card_on_table = "START";
var tablePutCards = $("tablePutCards");
function setEventsForAssertCardsOnTablePlayers() {
    let elements = tablePutCards.getElementsByClassName("assert-card-on-table-players");
    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.onclick = function() {
            if (startGame === true) startGame = false;
            if (!element.firstChild) {
                element.style.backgroundColor = "red";
                callIfCanPlay(function() {
                    removeElementPrivateCard(
                        dataCardWasSelectedToPlay.top, 
                        dataCardWasSelectedToPlay.bottom
                    );
                    element.innerHTML += createCardHTML(
                        dataCardWasSelectedToPlay.top, 
                        dataCardWasSelectedToPlay.bottom,
                        false,
                        true
                    );
                    onAddCardFromMe();
                    ___removeAllAssertCards();
                    let _elements = tablePutCards.getElementsByClassName("assert-card-on-table-players");
                    if (_elements.length === 4) {
                        let nextElement = tablePutCards.firstChild.nextElementSibling;
                        nextElement.parentNode.removeChild(nextElement);
                        tablePutCards.firstChild.nextElementSibling.innerHTML = "";
                        //tablePutCards.firstChild.nextElementSibling.style.transofrm = "scale(0.5)";
                        tablePutCards.firstChild.nextElementSibling.style.borderRadius = "50%";
                        tablePutCards.firstChild.nextElementSibling.style.backgroundColor = "white";
                        tablePutCards.firstChild.nextElementSibling.onclick = null;
                    }
                });
            }
        };
    }
}


function addNewPrivateCard(centerTop, centerBottom) {
    addElementPrivateCard(createCardHTML(centerTop, centerBottom));
    setEventMouseDownForAllPrivateCard();
}


function addAssertCardOnTablePlayers(rotate=false) {
    let _html = '';
    function add_atStart() {
        if (rotate === false) tablePutCards.innerHTML
            = '<div class="card-on-table-players assert-card-on-table-players"></div>' + tablePutCards.innerHTML;
        if (rotate === true) tablePutCards.innerHTML
            = '<div style="transform:rotate(90deg);margin-left:18px;margin-right:18px;"'
            + 'class="card-on-table-players assert-card-on-table-players"></div>' + tablePutCards.innerHTML;
    }
    function add_atEnd() {
        if (rotate === false) tablePutCards.innerHTML
            += '<div class="card-on-table-players assert-card-on-table-players"></div>';
        if (rotate === true) tablePutCards.innerHTML
            += '<div style="transform:rotate(90deg);margin-left:18px;margin-right:18px;"'
            + 'class="card-on-table-players assert-card-on-table-players"></div>';
    }
    
    //console.log(dataCardWasSelectedToPlay)
    if (startGame === true) {
        _______card_left_number = dataCardWasSelectedToPlay.top;
        _______card_right_number = dataCardWasSelectedToPlay.bottom;

        add_atStart();
        ____where_add_card_on_table = "START";
    } else if (dataCardWasSelectedToPlay.top === _______card_left_number
     || dataCardWasSelectedToPlay.bottom === _______card_left_number) {
        add_atEnd();
        ____where_add_card_on_table = "END";
    }
    else if (dataCardWasSelectedToPlay.top === _______card_right_number
     || dataCardWasSelectedToPlay.bottom === _______card_right_number) {
        add_atStart();
        ____where_add_card_on_table = "START";
        
    } else {
        console.log("you cannot play")
    }
    
    setEventsForAssertCardsOnTablePlayers();
}

function addNewCardToTablePlayers(top=0, bottom=0) {
    if (!isCardOnTable(top, bottom)) {
        ALL_CARD_ON_TABLE.push({ top: top, bottom: bottom });
    }
}

function endAnimationSelectPrivateCard() {
    loopOnPrivateCards(function(elementPrivateCard) {
        elementPrivateCard.classList.remove("animation-light-card");
    });
}

function addAnimationSelectPrivateCard(cardElement) {
    cardElement.classList.add("animation-light-card");
}


let __name_player_toshow = "";

function startGameTable() {
    const CARDS_PC = [];

    let count_cards = 0;
    let _setForMyPc = false;
    while (count_cards < 28) {
        let __card = getRandomCardNotPlayed();
        if (_setForMyPc === false) addNewPrivateCard(__card.top, __card.bottom); else CARDS_PC.push(__card);
        if (count_cards === 6) _setForMyPc = true; else if (count_cards === 13) break;
        count_cards++;
    }
    

    let __my_game_role = true;    
    const NAME_PC = "computer";
    
/////////////////////////////////////////////////////////////////////////////////////////////////
    let _____func_computer = null;                                                            ///
    let _____func_my = null;                                                                  ///
    function _____whenStartRoleComputer(callbackFunction) {                                   ///
        if (typeof callbackFunction === "function") {                                         ///
            _____func_computer = callbackFunction;                                            ///
        } else if (!!_____func_computer) _____func_computer();                                ///
    }                                                                                         ///
    function _____whenStartMyRole(callbackFunction) {                                         ///
        if (typeof callbackFunction === "function") {                                         ///
            _____func_my = callbackFunction;                                                  ///
        } else if (!!_____func_my) _____func_my();                                            ///
    }                                                                                         ///
/////////////////////////////////////////////////////////////////////////////////////////////////

    _____whenStartRoleComputer(function() {
        console.log("cccccccccccccc")
    });
    _____whenStartMyRole(function() {
        console.log("mmmmmmmmmmmmmmmmmmmm")
    });


    // loop between player { PC VS ME }
    function loopTimerPlayers() {
        startNewTimerOnScreen(function() {
            if (__my_game_role) {
                loopTimerPlayers();
                _____whenStartMyRole();
                doAnimationStartRoleAnotherPlayer(_getUserNameAsPlayerInGame());
                __my_game_role = false;
            } else {
                _____whenStartRoleComputer();
                doAnimationStartRoleAnotherPlayer(NAME_PC);
                __my_game_role = true;
            }
        });
    }

    doAnimationStartRoleAnotherPlayer(_getUserNameAsPlayerInGame());
    loopTimerPlayers();
}


exports.startGameTable = startGameTable;