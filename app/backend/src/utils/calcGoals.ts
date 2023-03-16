interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

const calcGoals = (id: number, matches: IMatches[]) => {
  let goalsFavorHome = 0;
  let goalsOwnHome = 0;
  let goalsFavorAway = 0;
  let goalsOwnAway = 0;

  matches.forEach((element) => {
    if (element.homeTeamId === id) {
      goalsFavorHome += element.homeTeamGoals;
      goalsOwnHome += element.awayTeamGoals;
    } if (element.awayTeamId === id) {
      goalsFavorAway += element.awayTeamGoals;
      goalsOwnAway += element.homeTeamGoals;
    }
  });
  const obj = { goalsFavorHome, goalsOwnHome, goalsFavorAway, goalsOwnAway };
  return obj;
};

const countHomeGames = (id: number, matches: IMatches[]): number => {
  const games = matches.filter((element) => element.homeTeamId === id);
  return games.length;
};
const countAwayGames = (id: number, matches: IMatches[]): number => {
  const games = matches.filter((element) => element.awayTeamId === id);
  return games.length;
};

const homePoint = (id: number, matches: IMatches[]) => {
  let getPoint = 0;
  let getWin = 0;
  let getDraws = 0;
  let getLose = 0;
  matches.map((element) => {
    if (element.homeTeamId === id && element.homeTeamGoals > element.awayTeamGoals) {
      getPoint += 3;
      getWin += 1;
    } else if (element.homeTeamId === id && element.homeTeamGoals === element.awayTeamGoals) {
      getPoint += 1;
      getDraws += 1;
    } else if (element.homeTeamId === id && element.homeTeamGoals < element.awayTeamGoals) {
      getLose += 1;
    }
    return { getPoint, getWin };
  });
  return { getPoint, getWin, getDraws, getLose };
};

const awayPoint = (id: number, matches: IMatches[]) => {
  let getPoint = 0;
  let getWin = 0;
  let getDraws = 0;
  let getLose = 0;
  matches.map((element) => {
    if (element.awayTeamId === id && element.homeTeamGoals < element.awayTeamGoals) {
      getPoint += 3;
      getWin += 1;
    } else if (element.awayTeamId === id && element.homeTeamGoals === element.awayTeamGoals) {
      getPoint += 1;
      getDraws += 1;
    } else if (element.awayTeamId === id && element.homeTeamGoals > element.awayTeamGoals) {
      getLose += 1;
    }
    return { getPoint, getWin };
  });
  return { getPoint, getWin, getDraws, getLose };
};

const getTeamStatusHome = (id: number, matches: IMatches[]) => {
  const getGoals = calcGoals(id, matches);
  const getGames = countHomeGames(id, matches);
  const getPoints = homePoint(id, matches);
  const goalsBalance = getGoals.goalsFavorHome - getGoals.goalsOwnHome;
  const getEfficiency = (getPoints.getPoint / (getGames * 3)) * 100;
  const obj = {
    totalPoints: getPoints.getPoint,
    totalGames: getGames,
    totalVictories: getPoints.getWin,
    totalDraws: getPoints.getDraws,
    totalLosses: getPoints.getLose,
    goalsFavor: getGoals.goalsFavorHome,
    goalsOwn: getGoals.goalsOwnHome,
    goalsBalance,
    efficiency: Number(getEfficiency.toFixed(2)),
  };
  return obj;
};

const getTeamStatusAway = (id: number, matches: IMatches[]) => {
  const getGoals = calcGoals(id, matches);
  const getGames = countAwayGames(id, matches);
  const getPoints = awayPoint(id, matches);
  const goalsBalance = getGoals.goalsFavorAway - getGoals.goalsOwnAway;
  const getEfficiency = (getPoints.getPoint / (getGames * 3)) * 100;
  const obj = {
    totalPoints: getPoints.getPoint,
    totalGames: getGames,
    totalVictories: getPoints.getWin,
    totalDraws: getPoints.getDraws,
    totalLosses: getPoints.getLose,
    goalsFavor: getGoals.goalsFavorAway,
    goalsOwn: getGoals.goalsOwnAway,
    goalsBalance,
    efficiency: Number(getEfficiency.toFixed(2)),
  };
  return obj;
};

export {
  getTeamStatusHome,
  getTeamStatusAway,
};
