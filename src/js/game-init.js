/**
*   Functions to call on document ready
*   Date: 02/01/2016
*   Author: Ioannis Kottis
*/
$(document).ready(function () {
    Game.Rules.getUserOption();
    Game.Rules.btnSelect();
    Game.Rules.btnStart();
    Game.Rules.resetGame();
});
