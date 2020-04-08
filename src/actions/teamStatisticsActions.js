export const IS_LOADING_LEAGUE_LEADERS = "IS_LOADING_LEAGUE_LEADERS";
export const IS_LOADING_TEAM_PASSING = "IS_LOADING_TEAM_PASSING";
export const GET_TEAM_PASSING = "GET_TEAM_PASSING";
export const GET_LEAGUE_LEADERS = "GET_LEAGUE_LEADERS";

const axios = require("axios");
const cheerio = require("cheerio");
const proxyurl = "https://cors-anywhere.herokuapp.com/";

export function getTeamPassingStatistics() {
  const url =
    "http://www.nfl.com/stats/categorystats?archive=false&conference=null&role=TM&offensiveStatisticCategory=TEAM_PASSING&defensiveStatisticCategory=null&season=2019&seasonType=REG&tabSeq=2&qualified=false&Submit=Go";

  return function (dispatch) {
    dispatch(isLoadingTeamPassing(true));

    return axios
      .get(proxyurl + url)
      .then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        const table = $("#result");

        // Get a list of all the metrics at the top of the table
        const metricTitlesRow = $(table).find("tbody:nth-child(2) tr");
        const individualMetricsNames = $(metricTitlesRow).find("th");
        const metricTitlesArr = [];

        individualMetricsNames.each(function () {
          let th;
          if ($(this).children().length === 0) {
            th = $(this).text().toLowerCase();
          } else {
            th = $(this).find("a").text().toLowerCase();
          }
          metricTitlesArr.push(th);
        });

        // Traverse the rows for each team and grab the statistics
        const allTeamRows = $(table).find("tbody:nth-child(3) tr");
        let allTeamsArray = [];

        allTeamRows.each(function () {
          const td = $(this).find("td");
          let tdArray = [];

          td.each(function () {
            const text = $(this).text().trim();
            tdArray.push(text);
          });

          // Now have two arrays - one contains the names of the metrics, and one contains the data for each row
          // Code below uses reduce to combine two arrays into a single object where the key is the value from the first array and the value is value from the second array
          // https://riptutorial.com/javascript/example/8628/merge-two-array-as-key-value-pair
          const result = tdArray.reduce(function (result, field, index) {
            result[metricTitlesArr[index]] = field;
            return result;
          }, {});

          allTeamsArray.push(result);
        });

        return allTeamsArray;
      })
      .then((arr) =>
        dispatch({
          type: GET_TEAM_PASSING,
          payload: arr,
        })
      )
      .then(() => dispatch(isLoadingTeamPassing(false)))
      .catch((err) => console.error(err));
  };
}

export function getLeagueLeaders() {
  const url =
    "http://www.nfl.com/stats/team?seasonId=2019&seasonType=REG&Submit=Go";

  return function (dispatch) {
    dispatch(isLoadingLeagueLeaders(true));

    return axios
      .get(proxyurl + url)
      .then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        const leagueLeadersOffense = $(".col:nth-child(1) > .data-table1");

        const leagueLeadersOffenseObject = {};

        leagueLeadersOffense.each(function () {
          const statisticTitle = $(this)
            .find("thead td:nth-child(1)")
            .text()
            .split("(YPG)")[0]
            .replace(/\s/g, "")
            .toLowerCase();
          const fiveTeamsRows = $(this).find("tbody tr");

          const fiveTeamsArray = [];
          fiveTeamsRows.each(function () {
            const teamName = $(this).find("td[scope='row'] a").text();
            const teamStat = $(this).find("td[align='right']").text();

            fiveTeamsArray.push({ teamName, teamStat });
          });

          leagueLeadersOffenseObject[statisticTitle] = fiveTeamsArray;
        });
        return leagueLeadersOffenseObject;
      })
      .then((obj) =>
        dispatch({
          type: GET_LEAGUE_LEADERS,
          payload: obj,
        })
      )
      .then(() => dispatch(isLoadingLeagueLeaders(false)))
      .catch((err) => console.error(err));
  };
}

const isLoadingLeagueLeaders = (bool) => {
  return {
    type: IS_LOADING_LEAGUE_LEADERS,
    payload: {
      isLoadingLeagueLeaders: bool,
    },
  };
};

const isLoadingTeamPassing = (bool) => {
  return {
    type: IS_LOADING_TEAM_PASSING,
    payload: {
      isLoadingTeamPassing: bool,
    },
  };
};
