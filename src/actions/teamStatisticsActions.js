export const IS_LOADING = "IS_LOADING";
export const GET_LEAGUE_LEADERS = "GET_LEAGUE_LEADERS";

const axios = require("axios");
const cheerio = require("cheerio");
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url =
  "http://www.nfl.com/stats/team?seasonId=2019&seasonType=REG&Submit=Go";

export function getLeagueLeaders() {
  return function (dispatch) {
    dispatch({
      type: IS_LOADING,
      payload: {
        isLoading: true,
      },
    });

    return axios
      .get(proxyurl + url)
      .then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        const leagueLeadersOffense = $(".col:nth-child(1) > .data-table1");

        const leagueLeadersOffenseObject = {};

        leagueLeadersOffense.each(function () {
          const statisticTitle = $(this).find("thead td:nth-child(1)").text();
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
      .then((leagueLeadersOffenseObject) =>
        dispatch({
          type: GET_LEAGUE_LEADERS,
          payload: leagueLeadersOffenseObject,
        })
      )
      .then(() =>
        dispatch({
          type: IS_LOADING,
          payload: {
            isLoading: false,
          },
        })
      )
      .catch((err) => console.error(err));
  };
}
