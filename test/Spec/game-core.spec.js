describe('counter', function () {
    it("it counts the number of times that each element is appearing in an array", function () {
        expect(Game.Rules.counter).not.toBeUndefined();
    });
});


describe('indexesOfValues', function () {
    it("it returns the multiple index of the array elements that match a specific value", function () {
        expect(Game.Rules.indexesOfValues).not.toBeUndefined();
    });
});

describe('winsStats', function () {
    it("it returns an object with absolute and percentage values of each players wins", function () {
        expect(Game.Rules.winsStats).not.toBeUndefined();
    });
});

describe('playerStats', function () {
    it("it returns an object with absolute and percentage values the player's moves", function () {
        expect(Game.Rules.playerStats).not.toBeUndefined();
    });
});

describe('insertDataRow', function () {
    it("it updates the results table", function () {
        expect(Game.Rules.insertDataRow).not.toBeUndefined();
    });
});

describe('btnSelect', function () {
    it("it registers events to select button", function () {
        expect(Game.Rules.btnSelect).not.toBeUndefined();
    });
});

describe('btnStart', function () {
    it("it registers events to start button", function () {
        expect(Game.Rules.btnStart).not.toBeUndefined();
    });
});

describe('mostCommon', function () {
    it("it predicts next move based on the most popular user's choice", function () {
        expect(Game.Rules.mostCommon).not.toBeUndefined();
    });
});

describe('getNextOfSame', function () {
    it("it returns most popular value of the elements after i same elements", function () {
        expect(Game.Rules.getNextOfSame).not.toBeUndefined();
    });
});

describe('getRandomInt', function () {
    it("it a random integer between min (inclusive) and max (inclusive)", function () {
        expect(Game.Rules.getRandomInt).not.toBeUndefined();
    });
});

describe('sortArrayOfResults', function () {
    it("it does descending sorting of an array of objects based on property", function () {
        expect(Game.Rules.sortArrayOfResults).not.toBeUndefined();
    });
});

describe('nextMove', function () {
    it("it predicts next move", function () {
        expect(Game.Rules.nextMove).not.toBeUndefined();
    });
});

describe('switchStrategy', function () {
    it("it changes strategy when opponent wins three straight games", function () {
        expect(Game.Rules.switchStrategy).not.toBeUndefined();
    });
});

describe('getUserOption', function () {
    it("it gets users option", function () {
        expect(Game.Rules.getUserOption).not.toBeUndefined();
    });
});

describe('updateHistory', function () {
    it("it updates history array", function () {
        expect(Game.Rules.updateHistory).not.toBeUndefined();
    });
});

describe('cpuSelectionLogic', function () {
    it("it selects new strategy", function () {
        expect(Game.Rules.cpuSelectionLogic).not.toBeUndefined();
    });
});

describe('userVsCpu', function () {
    it("it simulates a player vs cpu game", function () {
        expect(Game.Rules.userVsCpu).not.toBeUndefined();
    });
});

describe('cpuVsCpu', function () {
    it("it simulates a player vs cpu game", function () {
        expect(Game.Rules.cpuVsCpu).not.toBeUndefined();
    });
});

describe('showPreview', function () {
    it("it shows the preview", function () {
        expect(Game.Rules.showPreview).not.toBeUndefined();
    });
});

describe('updateEndPanel', function () {
    it("it update the final panel", function () {
        expect(Game.Rules.updateEndPanel).not.toBeUndefined();
    });
});

describe('defineWinner', function () {
    it("is defined", function () {
        expect(Game.Rules.defineWinner).not.toBeUndefined();
    });
    it('expects 1st argument to be a string', function () {
        var user1 = 'Rock';
        Game.Rules.defineWinner(user1);
        expect(typeof user1).toEqual('string');
    });
    it('expects 2nd argument to be a string', function () {
        var user2 = 'Paper';
        Game.Rules.defineWinner(user2);
        expect(typeof user2).toEqual('string');
    });
    it('expects to return a string', function () {
        var user1 = 'Rock',
            user2 = 'Paper';
        var gameWinner = Game.Rules.defineWinner(user1, user2);
        expect(typeof gameWinner).toEqual('string');
    });
});
