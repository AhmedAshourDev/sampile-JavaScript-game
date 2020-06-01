"use strict";

const ALL_CARD_PLAY = [
    // 6                      // 5
    { top: 6, bottom: 6 },    { top: 5, bottom: 5 },
    { top: 6, bottom: 5 },    { top: 5, bottom: 4 },
    { top: 6, bottom: 4 },    { top: 5, bottom: 3 },
    { top: 6, bottom: 3 },    { top: 5, bottom: 2 },
    { top: 6, bottom: 2 },    { top: 5, bottom: 1 },
    { top: 6, bottom: 1 },    { top: 5, bottom: 0 },
    { top: 6, bottom: 0 },

    // 4                      // 3
    { top: 4, bottom: 4 },    { top: 3, bottom: 3 },
    { top: 4, bottom: 3 },    { top: 3, bottom: 2 },
    { top: 4, bottom: 2 },    { top: 3, bottom: 1 },
    { top: 4, bottom: 1 },    { top: 3, bottom: 0 },
    { top: 4, bottom: 0 },

    // 2                      // 1
    { top: 2, bottom: 2 },    { top: 1, bottom: 1 },
    { top: 2, bottom: 1 },    { top: 1, bottom: 0 },
    { top: 2, bottom: 0 },

    // 0
    { top: 0, bottom: 0 },
];

function createRandomCard() {
    return ALL_CARD_PLAY[Math.floor(Math.random() * ALL_CARD_PLAY.length)];
}

function createCardHTML(centerTop, centerBottom, boxShadow=true, onTable=false) {
    let _card = "";
    function createCenterOfCard(number) {
        function createPointsCard(numberPoints) {
            let points = "";
            for (var i = 0; i < numberPoints; i++) {
                points += '<div class="point-at-card"></div>';
            }
            return points;
        }

        function _createCenterOfCard(start, center, last) {
            let _html = '';
            let _styleLastColumn = '';
            if (last > 1) _styleLastColumn = "justify-content: space-between;";
            _html += '<div class="column-card-start">' + createPointsCard(start) + '</div>';
            _html += '<div class="column-card-center">' + createPointsCard(center) + '</div>';
            _html += '<div class="column-card-last" style="' + _styleLastColumn + '">' + createPointsCard(last) + '</div>';
            return _html;
        }

        let _html = '';
        switch (number) {
            case 1:
                _html = _createCenterOfCard(0, 1, 0);
                break;
            case 2:
                _html = _createCenterOfCard(1, 0, 1);
                break;
            case 3:
                _html = _createCenterOfCard(1, 1, 1);
                break;
            case 4:
                _html = _createCenterOfCard(2, 0, 2);
                break;
            case 5:
                _html = _createCenterOfCard(2, 1, 2);
                break;
            case 6:
                _html = _createCenterOfCard(3, 0, 3);
                break;
            default:
                _html = _createCenterOfCard(0, 0, 0);
        }
        return _html;
    }


    // shadow
    if (boxShadow === false) boxShadow = "box-shadow:none;"; else boxShadow = "";

    let __style_classes = "card-play mouse_hover_private_card cursor-pointer";
    let __style_resize = "";
    if (onTable === true) {
        __style_classes = "card-play";
        __style_resize = "width:100%;height:100%;";
    }

    return '<div class="' + __style_classes + '" style="' + __style_resize + boxShadow + '" data-infocard="'
            + (centerTop || 0) + ',' + (centerBottom || 0) + '" draggable="false">'
            + '<div class="t-card-play">' + createCenterOfCard(centerTop) + '</div>'
            + '<div class="center-line-of-card center"></div>'
            + '<div class="b-card-play">' + createCenterOfCard(centerBottom) + '</div>'
        + '</div>';
}


exports.ALL_CARD_PLAY = ALL_CARD_PLAY;
exports.createRandomCard = createRandomCard;
exports.createCardHTML = createCardHTML;