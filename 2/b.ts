// first I'm given order for what the player2 move should be.
// take the input and convert it from xyz meaning actual things to being the win objective
// then you can recalculate with the actual player2 moves

export const convertPlayer2ObjectiveToMove = (elfMove: "A" | "B" | "C", move: "X" | "Y" | "Z"): "X" | "Y" | "Z" => {
    const objective = convertToObjective(move);
    console.log(`objective: ${objective}`);
    const adjustedMove = chooseMoveBasedOnObjective(elfMove, objective);
    return adjustedMove;
}


export const calculateScoresForAllMatches = (games: { player1Move: "A" | "B" | "C", player2Move: "X" | "Y" | "Z" }[]) => {
    const gameScores = games.map((game) => {
        return calculateScoreForSingleGamev2({ firstMove: game.player1Move, objective: game.player2Move })
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
export const calculateScoreForSingleGamev2 = ({ firstMove, objective }: { firstMove: "A" | "B" | "C", objective: "X" | "Y" | "Z" }) => {
    // console.log(`firstMove: ${firstMove}, objective: ${objective}`);
    const firstScore = replacewithScore(firstMove);
    // console.log(`firstScore: ${firstScore}`);
    const secondMove = convertPlayer2ObjectiveToMove(firstMove, objective);
    // console.log(`secondMove: ${secondMove}`);
    const secondScore = replacewithScore(secondMove);
    // console.log(`secondScore: ${secondScore}`);
    const winner = calculateWinner({ score1: firstScore, score2: secondScore });
    // console.log(`winner: ${winner}`);

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

    // console.log(`totalRoundScore: ${totalRoundScore}`);
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

    if (objective === "draw") {
        if (elfMove === "A") return "X";
        if (elfMove === "B") return "Y";
        if (elfMove === "C") return "Z";
    }

    if (objective === "lose") {
        if (elfMove === "A") return "Z";
        if (elfMove === "B") return "X";
        if (elfMove === "C") return "Y";
    }

    if (objective === "win") {
        if (elfMove === "A") return "Y";
        if (elfMove === "B") return "Z";
        if (elfMove === "C") return "X";
    }
    console.log(`error, returning x`);
    return "X";
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