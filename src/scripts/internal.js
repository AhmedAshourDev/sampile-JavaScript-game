"use strict";
// this lib to make API functions to controll system
// we can change way to wrok but cannot change name of fucntion
const fs = require("fs");
const net = require("net");
const url = require("url");
const path = require("path");
const process = require("process");
const electron = require("electron");
const http = require("http");

const DIR_STORAGE_DATA_GAME = path.resolve(__dirname, "./storage.json");

// export
// finish of game
//>>>>>>>>>>>>>>>>>>>>>>>>>> we will change this function to work in the another platforms
function _exitGame() {
    electron.remote.process.exit(0);
    process.exit(0);
}

// set data storage in for pc or phone device
//>>>>>>>>>>>>>>>>>>>>>>>>>> we will change this function to work in the another platforms
function setDataStorage(nameDataJson, value) {
    let dataJson = require("./storage.json");
    dataJson[ nameDataJson ] = value;
    let data = JSON.stringify(dataJson, null, 4);
    fs.writeFileSync(DIR_STORAGE_DATA_GAME, data);
}

// get data you was storage it befor
// storage on => {Database || normale file Like JSON}
//>>>>>>>>>>>>>>>>>>>>>>>>>> we will change this function to work in the another platforms
function getDataStorage(nameDataJson) {
    return require(DIR_STORAGE_DATA_GAME)[ nameDataJson ];
}

// export
// change volume game
function _storageVolumeGame(value) { setDataStorage("volume", value); }
function _getVolumeGame() { return parseInt(getDataStorage("volume")); }

// export
// change name player in game
function _storageUserNameAsPlayerInGame(name) { setDataStorage("name", name); }
function _getUserNameAsPlayerInGame() { return getDataStorage("name"); }


const PORT_CONNECTION_BETWEEN_DEVIDES_PLAYERS = 4340;

// what players will change on their devices will storage in this variable
// and i will change here also
var __data_from_devices_players = "";
var __data_sendto_devices_players = "";


/*
// assert your server on desktop with browser like chrome
_createServerForMultiPlayer();
setInterval(() => {
    // get data from another device
    console.log(_getDataFromClientDevice());
    // set your data for this another device
    _sendDataForPlayers("Sdjsjkdlskdlsd 39483h43u");
}, 1000);
*/


// we will called this function once only and not call it again
function _createServerForMultiPlayer() {
    let _server = http.createServer(function(request, reponse) {
        reponse.writeHead(200, { "Content-Type": "text/plain" });
        let __query_data = (url.parse(request.url).query || "");
        let __array_quer_data = __query_data.split("&");
        if (__array_quer_data.length === 1) {
            console.log(__array_quer_data);
            __data_from_devices_players = __array_quer_data[ 0 ].split("=")[ 1 ];
        }
        reponse.write(__data_sendto_devices_players);
        reponse.end();
    });
    _server.listen(PORT_CONNECTION_BETWEEN_DEVIDES_PLAYERS);
}


function _createConnectionToServerAnotherPlayer() {
}

// send data for device players (all players)
function _sendDataForPlayers(data) {
    __data_sendto_devices_players = data;
}

// get data from another device
function _getDataFromClientDevice() {
    return __data_from_devices_players;
}

// exports all functions to work as `Nodejs`
exports._exitGame = _exitGame;
exports._storageVolumeGame = _storageVolumeGame;
exports._getVolumeGame = _getVolumeGame;
exports._storageUserNameAsPlayerInGame = _storageUserNameAsPlayerInGame;
exports._getUserNameAsPlayerInGame = _getUserNameAsPlayerInGame;
exports._createServerForMultiPlayer = _createServerForMultiPlayer;
exports._createConnectionToServerAnotherPlayer = _createConnectionToServerAnotherPlayer;
exports._sendDataForPlayers = _sendDataForPlayers;
exports._getDataFromClientDevice = _getDataFromClientDevice;