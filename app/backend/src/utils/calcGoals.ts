interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

const calcGoals = (id: number, matches: IMatches[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;
  matches.forEach((element) => {
    if (element.homeTeamId === id) {
      goalsFavor += element.homeTeamGoals;
      goalsOwn += element.awayTeamGoals;
    }
    if (element.awayTeamId === id) {
      goalsFavor += element.awayTeamGoals;
      goalsOwn += element.homeTeamGoals;
    }
  });
  const obj = { goalsFavor, goalsOwn };
  return obj;
};

const countGames = (id: number, matches: IMatches[]) => {
  let games = 0;
  matches.forEach((element) => {
    if (element.homeTeamId === id || element.awayTeamId === id) {
      games += 1;
    }
  });
  return games;
};

const countPoints = (id: number, matches: IMatches[]) => {
  let totalPoints = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  matches.forEach((element) => {
    if (element.homeTeamId === id && element.homeTeamGoals > element.awayTeamGoals) {
      totalPoints += 3; totalVictories += 1;
    } else if (element.homeTeamId === id && element.homeTeamGoals === element.awayTeamGoals) {
      totalPoints += 1; totalDraws += 1;
    } else if (element.awayTeamGoals === id && element.awayTeamGoals > element.homeTeamGoals) {
      totalPoints += 3; totalVictories += 1;
    } else if (element.awayTeamGoals === id && element.awayTeamGoals === element.homeTeamGoals) {
      totalPoints += 1; totalDraws += 1;
    } else totalLosses += 1;
  });
  return { totalPoints, totalVictories, totalDraws, totalLosses };
};

const getTeamStatus = (id: number, matches: IMatches[]) => {
  const getGoals = calcGoals(id, matches);
  const getGames = countGames(id, matches);
  const getPoints = countPoints(id, matches);
  const obj = {
    totalPoints: getPoints.totalPoints,
    totalGames: getGames,
    totalVictories: getPoints.totalVictories,
    totalDraws: getPoints.totalDraws,
    totalLosses: getPoints.totalLosses,
    goalsFavor: getGoals.goalsFavor,
    goalsOwn: getGoals.goalsOwn,
  };
  return obj;
};

export default getTeamStatus;
