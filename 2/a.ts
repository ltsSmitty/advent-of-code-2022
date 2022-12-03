


export const calculateScoresForAllMatches = (games: { player1Move: "A" | "B" | "C", player2Move: "X" | "Y" | "Z" }[]) => {
    const gameScores = games.map((game) => {
        return calculateScoreForSingleGame({ firstMove: game.player1Move, secondMove: game.player2Move })
    });
    return gameScores.reduce((acc, curr) => acc + curr, 0);
}


export const calculateScoreForSingleGame = ({ firstMove, secondMove }: { firstMove: "A" | "B" | "C", secondMove: "X" | "Y" | "Z" }) => {
    const firstScore = replacewithScore(firstMove);
    const secondScore = replacewithScore(secondMove);
    const winner = calculateWinner({ score1: firstScore, score2: secondScore });

    let totalRoundScore = secondScore;
    if (winner === "player1") {
        totalRoundScore += 0;
    }
    if (winner === "player2") {
        totalRoundScore += 6
    }
    if (winner === "draw") {
        totalRoundScore += 3;
    }

    return totalRoundScore;
}

const calculateWinner = ({ score1, score2 }: { score1: 1 | 2 | 3, score2: 1 | 2 | 3 }) => {
    if (score1 === score2) {
        return "draw";
    }
    if (score1 === 1 && score2 === 3) {
        return "player1";
    }
    if (score1 === 2 && score2 === 1) {
        return "player1";
    }
    if (score1 === 3 && score2 === 2) {
        return "player1";
    }
    return "player2";
}

const replacewithScore = (move: "A" | "B" | "C" | "X" | "Y" | "Z") => {
    switch (move) {
        case "A":
        case "X": {
            return 1;
        }
        case "B":
        case "Y": {
            return 2;
        }
        case "C":
        case "Z": {
            return 3;
        }

    }
}

const convertToObjective = (move: "X" | "Y" | "Z") => {
    switch (move) {
        case "X": {
            return "lose";
        }
        case "Y": {
            return "draw";
        }
        case "Z": {
            return "win";
        }
    }
}

const chooseMoveBasedOnObjective = (elfMove: "A" | "B" | "C", objective: "win" | "lose" | "draw") => {
    const moveScore = replacewithScore(elfMove);

    if (objective === "draw") {
        return moveScore;
    }

    if (objective === "win") {
        if (moveScore === 1) {
            return "Z";
        }
        if (moveScore === 2) {
            return "X";
        }
        if (moveScore === 3) {
            return "Y";
        }
    }

    if (objective === "lose") {
        if (moveScore === 1) {
            return "Y";
        }
        if (moveScore === 2) {
            return "Z";
        }
        if (moveScore === 3) {
            return "X";
        }
    }
}

//


const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");
console.log(lines);
const games = lines.map((game) => {
    const [player1Move, player2Move] = game.split(" ");
    return {
        player1Move: player1Move as "A" | "B" | "C",
        player2Move: player2Move as "X" | "Y" | "Z"
    }
});

const finalScore = calculateScoresForAllMatches(games);
console.log(finalScore);