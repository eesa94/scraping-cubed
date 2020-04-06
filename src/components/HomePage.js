import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/teamStatisticsActions";

const HomePage = (props) => {
  const { getLeagueLeaders } = props.actions;
  const { isLoading, leagueLeadersOffense } = props.teamStatistics;

  useEffect(() => {
    getLeagueLeaders();
  }, []);

  return (
    <div>
      <h1>NFL Stats Scraper</h1>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        Object.keys(leagueLeadersOffense).map((x) => <p>{x} loaded</p>)
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
