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
    // if (element.awayTeamId === id) {
    //   goalsFavor += element.awayTeamGoals;
    //   goalsOwn += element.homeTeamGoals;
    // }
  });
  const obj = { goalsFavor, goalsOwn };
  return obj;
};

const countHomeGames = (id: number, matches: IMatches[]) => {
  const games = matches.filter((element) => element.homeTeamId === id);
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

// const awayPoint = (id: number, matches: IMatches[]) => {
//   let getPoint = 0;
//   let getWin = 0;
//   matches.map((element) => {
//     if (element.awayTeamId === id && element.awayTeamGoals > element.homeTeamGoals) {
//       getPoint += 3;
//       getWin += 1;
//     }
//     return { getPoint, getWin };
//   });
//   return { getPoint, getWin };
// };

// const drawsPoint = (id: number, matches: IMatches[]) => {
//   let getPoint = 0;
//   let getDraws = 0;
//   matches.map((element) => {
//     if ((element.awayTeamId === id || element.homeTeamId === id)
//       && element.awayTeamGoals === element.homeTeamGoals) {
//       getPoint += 1;
//       getDraws += 1;
//     }
//     return { getPoint, getDraws };
//   });
//   return { getPoint, getDraws };
// };

// const getLoses = (id: number, matches: IMatches[]) => {
//   let getLose = 0;
//   matches.map((element) => {
//     if (element.awayTeamId === id && element.awayTeamGoals < element.homeTeamGoals) {
//       getLose += 1;
//     }
//     return getLose;
//   });
//   return getLose;
// };

// const countPoints = (id: number, matches: IMatches[]) => {
//   const homePoints = homePoint(id, matches);
//   const awayPoints = awayPoint(id, matches);
//   const drawsPoints = drawsPoint(id, matches);
//   const totalPoints = homePoints.getPoint;
//   const totalVictories = homePoints.getWin;
//   const totalDraws = drawsPoints.getDraws;
//   const totalLosses = getLoses(id, matches);
//   return { totalPoints, totalVictories, totalDraws, totalLosses, awayPoints };
// };

const getTeamStatus = (id: number, matches: IMatches[]) => {
  const getGoals = calcGoals(id, matches);
  const getGames = countHomeGames(id, matches);
  const getPoints = homePoint(id, matches);
  const goalsBalance = getGoals.goalsFavor - getGoals.goalsOwn;
  const getEfficiency = (getPoints.getPoint / (getGames * 3)) * 100;
  const obj = {
    totalPoints: getPoints.getPoint,
    totalGames: getGames,
    totalVictories: getPoints.getWin,
    totalDraws: getPoints.getDraws,
    totalLosses: getPoints.getLose,
    goalsFavor: getGoals.goalsFavor,
    goalsOwn: getGoals.goalsOwn,
    goalsBalance,
    efficiency: Number(getEfficiency.toFixed(2)),
  };
  return obj;
};

export default getTeamStatus;
