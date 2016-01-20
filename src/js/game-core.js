/**
 *   Game's core JavaScript Functions
 *   Date: 10/01/2016
 *   Author: Ioannis Kottis
 */
var Game = Game || {};

Game.Rules = (function () {

    var currentOptionHuman = 0,
        winsHistory = [],
        currentStrategy1 = 'getRandomInt',
        currentStrategy2 = 'getRandomInt',
        historyUser = [],
        historyCpu1 = [],
        historyCpu2 = [],
        vsMode = "user",
        resultsWin = [0, 1, 2],
        resultsOptions = [0, 1, 2],
        startClickTimes = 0;


    /**
    * Counts the number of times that each element is appearing in an array
    * Returns an array with the results
    *
    * @arrayToCheck {Array} array with results
    * @arrayOfPossibleResults {Array} array with possible results
    */
    function counter(arrayToCheck, arrayOfPossibleResults) {
        var count = [];

        for (var j = 0; j < arrayOfPossibleResults.length; j++) {
            count[j] = 0;
            for (var i = 0; i < arrayToCheck.length; ++i) {
                if (arrayToCheck[i] === arrayOfPossibleResults[j]) {
                    count[j]++;
                }
            }
        }
        return count;
    }


    /**
    * Returns the multiple index of the array elements that match a specific value
    * Returns an array
    *
    * @arrayToCheck {Array} array to check for value
    * @valueToCheck {Number} value we are looking for
    */
    function indexesOfValues(valueToCheck, arrayToCheck) {
        var indexes = [];
        for (var i = arrayToCheck.length - 1; i >= 0; i--) {
            if (arrayToCheck[i] === valueToCheck) {
                indexes.unshift(i);
            }
        }
        return indexes;
    }


    /**
    * Returns an object with absolute and percentage values of each players wins
    * @history {Array} array of wins results
    */
    function winsStats(history, possibilities) {
        var totalWins = counter(history, possibilities);

        var wins1 = totalWins[1] || 0,
            wins2 = totalWins[2] || 0;
        var wins1Pc = Math.round((wins1 / history.length) * 100);
        var wins2Pc = Math.round((wins1 / history.length) * 100);

        return {
            'wins1': wins1,
            'wins1Pc': wins1Pc,
            'wins2': wins2,
            'wins2Pc': wins2Pc
        };
    }


    /**
     * Returns an object with absolute and percentage values the player's moves
     *
     * @history {Array} Array of moves
     */
    function playerStats(history, possibilities) {
        var moves = counter(history, possibilities);

        var rocks = moves[0] || 0,
            papers = moves[1] || 0,
            scissors = moves[2] || 0;

        var rocksPc = Math.round((rocks / history.length) * 100) || 0,
            papersPc = Math.round((papers / history.length) * 100) || 0;
        var scissorsPc = 100 - rocksPc - papersPc;

        return {
            'rocks': rocks,
            'rocksPc': rocksPc,
            'papers': papers,
            'papersPc': papersPc,
            'scissors': scissors,
            'scissorsPc': scissorsPc
        };
    }


    /**
     * Updates the results table
     *
     * @player1History {Array} Array of moves for player1
     * @player2History {Array} Array of moves for player2
     */
    function insertDataRow(player1History, player2History) {
        var player1Stats = playerStats(player1History, resultsOptions),
            player2Stats = playerStats(player2History, resultsOptions),
            wins = winsStats(winsHistory, resultsWin);

        $('#gameResults tbody tr').remove('.user-data');
        $('<tr class="user-data"><td>User 1</td><td>' + wins.wins1 + ' | ' + wins.wins1Pc + '</td><td>' + player1Stats.rocks + ' | ' + player1Stats.rocksPc + '</td><td>' + player1Stats.papers + ' | ' + player1Stats.papersPc + '</td><td>' + player1Stats.scissors + ' | ' + player1Stats.scissorsPc + '</td></tr>').appendTo('#gameResults tbody');
        $('<tr class="user-data"><td>User 2</td><td>' + wins.wins2 + ' | ' + wins.wins2Pc + '</td><td>' + player2Stats.rocks + ' | ' + player2Stats.rocksPc + '</td><td>' + player2Stats.papers + ' | ' + player2Stats.papersPc + '</td><td>' + player2Stats.scissors + ' | ' + player2Stats.scissorsPc + '</td></tr>').insertAfter('#gameResults tbody tr');
    }


    /**
     * Registers events to select button
     */
    function btnSelect() {
        $('#btnSelect').on('click', function (e) {
            e.preventDefault();
            $('#gameModes').find('a').each(function () {
                $(this).toggleClass('active');
            });
            $('.mode').text($('.active').text());
        });
    }


    /**
     * Registers events to Start button
     */
    function btnStart() {
        $('#btnStart').on('click', function (e) {
            e.preventDefault();
            $('#user1, #user2').attr('class','');
            $('.times').removeClass('fg-red');

            if (startClickTimes === 0) {
                vsMode = $('.active').attr('data-mode');
                $('#gameOptions').hide();
                $('#gameScreen, #gameResults').show();
                startClickTimes++;
            }

            else {

                if (vsMode === "user") {
                    gameTimer(5, userVsCpu);
                }
                else {
                    gameTimer(5, cpuVsCpu);
                }

            }
        });
    }


    /**
     * Predicts next move based on the most popular user's choice
     *
     * @history {Array} User's history LIFO Sequence
     */
    function mostCommon(history, possibilities) {

        var totals = counter(history, possibilities);
        var maximumValue = Math.max(totals[0], totals[1], totals[2]);
        var maximumValueIndexes = indexesOfValues(maximumValue, totals);

        if (maximumValueIndexes.length === 1) {
            return totals[maximumValueIndexes[0]];
        }

        else if (maximumValueIndexes.length === 3) {
            return totals[getRandomInt(0, 2)];
        }

        else {
            return totals[maximumValueIndexes[getRandomInt(0, 1)]];
        }
    }


    /**
     * Returns most popular value of the elements after i same elements
     * @sequenceOf {Number} Number of same items in sequence
     * @history {Array} array of results
     */
    function getNextOfSame(history, sequenceOf) {
        var nextOfsame = [];

        for (var i = 0; i < history.length - sequenceOf; i++) {
            var seq = 0;

            for (var j = 1; j < sequenceOf; j++) {
                if (history[i] === history[i + j]) {
                    seq++;
                }
                else {
                    seq--;
                }
                if (seq === sequenceOf - 1) {
                    nextOfsame.push(history[i + sequenceOf]);
                }
            }
        }

        mostCommon(nextOfsame, resultsOptions);
    }


    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     * @min {Number} lower limit
     * @max {Number} upper limit
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /**
     * Descending sorting of an array of objects based on property
     * @a {Object} prev element of array
     * @b {Object} next element of array
     */
    function sortArrayOfResults(a, b) {
        var countA = a.total,
            countB = b.total;
        // Compare the 2 dates
        if (countA < countB) {
            return 1;
        }
        else if (countA > countB) {
            return -1;
        }
        else {
            return 0;
        }
    }


    /**
     * Defines the winner of the game
     *
     * @inputUser1 {Number} User1's choice.
     * @inputUser2 {Number} User2's choice.
     */
    function defineWinner(inputUser1, inputUser2) {

        if (inputUser1 === inputUser2) {
            return 0;
        }
        else {
            if ((inputUser1 === 0 && inputUser2 === 2) || (inputUser1 === 1 && inputUser2 === 0) || (inputUser1 === 2 && inputUser2 === 1)) {
                return 1;
            }
            else {
                return 2;
            }
        }
    }


    /**
     * Selects move based on prediction
     * @prediction {Number} index of element
     */
    function nextMove(prediction) {
        var move;
        switch (prediction) {
            case 0:
                move = 1;
                break;
            case 1:
                move = 2;
                break;
            case 2:
                move = 1;
                break;
        }

        return move;
    }


    /**
     * Changes strategy after opponent's three straight wins
     * Returns functions name
     * @strategy {String} Strategy to change
     * @opponentId {Int} Opponent that play against
     */
    function switchStrategy(strategy, opponentId) {
        var gamesPlayed = winsHistory.length;

        if (gamesPlayed > 2) {
            if (winsHistory[gamesPlayed - 1] === winsHistory[gamesPlayed - 2] && winsHistory[gamesPlayed - 1] === winsHistory[gamesPlayed - 3] && winsHistory[gamesPlayed - 1] === opponentId) {
                var strategyId = getRandomInt(0, 2);

                if (strategyId === 0) {
                    strategy = 'mostCommon';
                }
                else if (strategyId === 1) {
                    strategy = 'getNextOfSame';
                }
                else {
                    strategy = 'getRandomInt';
                }
            }
        }

        else {
            strategy = 'getRandomInt';
        }
    }


    /**
     * Gets users option from click event
     */
    function getUserOption() {
        $('#userOptions').find('a').on('click', function (e) {
            e.preventDefault();
            currentOptionHuman = parseInt($(this).attr('data-option'));
            $('#userOptions').find('li').removeClass('sel');
            $(this).parent().addClass('sel');
        });
    }


    /**
     * Keeps history of the users actions
     * Returns array with history
     * @userHistory {Array} userHistory to update
     * @userOption {Number} id of user 1 or 2
     */
    function updateHistory(userHistory, userOption) {
        userHistory.unshift(userOption);
    }


    /**
     * Countdown timer
     * @duration {Number} duration of time for option selection (seconds)
     * @callback {String} function to be called at the end of time
     */
    function gameTimer(duration, callback) {
        var count = duration;

        setInterval(function () {
            count--;
            if (count >= 0) {
                $('.times').text(count);
            }

            if (count === 0) {
                $('.times').addClass('fg-red');
                callback();
                clearInterval(count);
            }

        }, 1000);

    }


    /**
     * Keeps history of the users wins
     * Returns array with wins history
     * @winner {Number} user who won the last game
     */
    function updateWins(winner) {
        winsHistory.unshift(winner);
    }



    /**
     * Logic behind new strategy
     * @currentStrategy {String} current strategy
     * @cpuOpponentHistory {Array} opponents moves
     */
    function cpuSelectionLogic(currentStrategy, cpuOpponentHistory) {
        var cpuPredictionForOpponent;

        if (currentStrategy === 'getRandomInt') {
            cpuPredictionForOpponent = getRandomInt(0, 2);
        }
        else if (currentStrategy === 'mostCommon') {
            cpuPredictionForOpponent = mostCommon(cpuOpponentHistory, resultsOptions);
        }
        else {
            cpuPredictionForOpponent = getNextOfSame(cpuOpponentHistory, 2);
        }

        // cpu selects option
        var currentOptionCpu = nextMove(cpuPredictionForOpponent);
        return currentOptionCpu;
    }


    /**
     * Function to be called on user vs cpu mode
     */
    function userVsCpu() {

        // Cpu selection based on prediction for user's move
        var currentOptionCpu = cpuSelectionLogic(currentStrategy1, historyUser);

        //show card user
        showPreview('user1', currentOptionHuman);
        //show card cpu
        showPreview('user2', currentOptionCpu);

        // define winner
        var currentWinner = defineWinner(currentOptionHuman, currentOptionCpu);

        // Update Winner message on popup
        updateEndPanel(currentWinner);


        // update user history
        updateHistory(historyUser, currentOptionHuman);

        // update CPU history
        updateHistory(historyCpu1, currentOptionCpu);

        //updateWins history
        updateWins(currentWinner);

        // update cpy strategy
        switchStrategy(currentStrategy1, historyUser);

        //update panel
        insertDataRow(historyUser, historyCpu1);

        // Clears Panel
        clearPanel();
    }


    /**
     * Function to be called on cpu vs cpu mode
     */
    function cpuVsCpu() {
        // Cpu selection based on prediction for user's move
        var currentOptionCpu1 = cpuSelectionLogic(currentStrategy1, historyCpu2);
        // Cpu selection based on prediction for user's move
        var currentOptionCpu2 = cpuSelectionLogic(currentStrategy2, historyCpu1);

        //show card user
        showPreview('user1', currentOptionCpu1);
        //show card cpu
        showPreview('user2', currentOptionCpu2);

        // define winner
        var currentWinner = defineWinner(currentOptionCpu1, currentOptionCpu2);

        // Update Winner message on popup
        updateEndPanel(currentWinner);

        // update user history
        updateHistory(historyCpu1, currentOptionCpu1);
        updateHistory(historyCpu2, currentOptionCpu2);

        //updateWins history
        updateWins(currentWinner);

        // update cpy strategy
        switchStrategy(currentStrategy1, historyCpu2);
        switchStrategy(currentStrategy2, historyCpu1);

        //update panel
        insertDataRow(historyCpu1, historyCpu2);

        // Clears Panel
        clearPanel();
    }

    /**
     * shows Preview
     */
    function showPreview(userId, userMove) {
        var moveClass = 'rps' + userMove;
        $('#' + userId).addClass(moveClass);
    }

    /**
     * updates End Panel
     */
    function updateEndPanel(whoWon) {
        var $winnerPanel = $('#winner');
        if (whoWon === 0) {
            $winnerPanel.text('It is a tie!');
        }
        else {
            $winnerPanel.text('Player ' + whoWon + ' won!');
        }
        $winnerPanel.show();

        setTimeout(function () {
            $winnerPanel.hide();
        }, 2000);
    }

    /**Clear the panel and promots the user to play again
     */
    function clearPanel() {
        setTimeout(function () {
            $('#user1, #user2').attr('class','');
            $('.times').removeClass('fg-red').text(5);
            $('#userOptions li').removeClass('sel');
        }, 2000);
    }

    /**
     * Restores initial settings
     */
    function resetGame() {
        $('#mainFooter a').on('click', function(e) {
            e.preventDefault();

            currentOptionHuman = 0;
            winsHistory = [];
            currentStrategy1 = 'getRandomInt';
            currentStrategy2 = 'getRandomInt';
            historyUser = [];
            historyCpu1 = [];
            historyCpu2 = [];
            vsMode = "user";
            startClickTimes = 0;
            $('#gameResults tbody tr').remove('.user-data');
            $('<tr class="user-data"><td>N/A</td><td>N/A</td><td>N/A</td><td>N/A</td><td>N/A</td></tr>').appendTo('#gameResults tbody');
            $('.times').text(5);
            $('#gameOptions').show();
            $('#gameScreen, #gameResults').hide();
        });
    }


    return {
        counter: counter,
        indexesOfValues: indexesOfValues,
        winsStats: winsStats,
        playerStats: playerStats,
        insertDataRow: insertDataRow,
        btnSelect: btnSelect,
        btnStart: btnStart,
        mostCommon: mostCommon,
        getNextOfSame: getNextOfSame,
        getRandomInt: getRandomInt,
        sortArrayOfResults: sortArrayOfResults,
        nextMove: nextMove,
        switchStrategy: switchStrategy,
        updateHistory: updateHistory,
        getUserOption: getUserOption,
        cpuSelectionLogic: cpuSelectionLogic,
        showPreview: showPreview,
        updateEndPanel: updateEndPanel,
        cpuVsCpu: cpuVsCpu,
        userVsCpu: userVsCpu,
        defineWinner: defineWinner,
        clearPanel: clearPanel,
        resetGame: resetGame
    };

})();
