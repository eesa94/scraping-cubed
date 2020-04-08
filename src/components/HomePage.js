import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/teamStatisticsActions";
import BarChart from "./BarChart";

const HomePage = (props) => {
  const { getTeamPassingStatistics, getLeagueLeaders } = props.actions;
  const { isLoading, passing, leagueLeadersOffense } = props.teamStatistics;

  useEffect(() => {
    // if fetching multiple data sets, you need to use separate isLoading booleans for each, otherwise, only load one while in development
    // getTeamPassingStatistics();
    getLeagueLeaders();
  }, []);

  return (
    <div>
      <h1>NFL Stats Scraper</h1>

      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <BarChart leagueLeadersOffense={leagueLeadersOffense} />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    teamStatistics: state.teamStatistics,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

HomePage.propTypes = {
  actions: PropTypes.object,
  teamStatistics: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
