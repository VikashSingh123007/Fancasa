class FootballMatchModel {
  constructor(id, matchDate,stadium, homeTeamId, awayTeamId, homeScore, awayScore) {
    this.id = id;
    this.matchDate = matchDate;   
    this.stadium = stadium;
    this.homeTeamId = homeTeamId;
    this.awayTeamId = awayTeamId;
    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }
  static fromJson(json) {
  return new FootballMatchModel(
    json.id,
    json.matchDate,
    json.stadium,
    json.homeTeam,
    json.awayTeam,
     json.homeScore,
    json.awayScore
  );
}

}

export default FootballMatchModel;
