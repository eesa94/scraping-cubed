import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const axios = require("axios");
const cheerio = require("cheerio");
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url =
  "http://www.nfl.com/stats/team?seasonId=2019&seasonType=REG&Submit=Go";

const HomePage = () => {
  useEffect(() => {
    console.log("Home page mounted ------------------>");

    axios
      .get(proxyurl + url)
      .then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        const leagueLeadersOffense = $(".col:nth-child(1) > .data-table1");

        const leagueLeadersOffenseArray = [];

        leagueLeadersOffense.each(function () {
          const statisticTitle = $(this).find("thead td:nth-child(1)").text();
          const fiveTeamsRows = $(this).find("tbody tr");

          const fiveTeamsArray = [];
          fiveTeamsRows.each(function () {
            const teamName = $(this).find("td[scope='row'] a").text();
            const teamStat = $(this).find("td[align='right']").text();

            fiveTeamsArray.push({ teamName, teamStat });
          });

          leagueLeadersOffenseArray.push({ statisticTitle, fiveTeamsArray });
        });

        console.log(leagueLeadersOffenseArray);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>NFL Stats Scraper</h1>
    </div>
  );
};

export default HomePage;
