import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/teamStatisticsActions";

const HomePage = (props) => {
  useEffect(() => {
    console.log("Home page mounted ------------------>");

    props.actions.getLeagueLeaders();
  }, []);

  useEffect(() => {
    console.log("Props-->", props.teamStatistics);
  }, [props.teamStatistics]);

  return (
    <div>
      <h1>NFL Stats Scraper</h1>
      {props.teamStatistics.isLoading ? (
        <p>Loading data...</p>
      ) : (
        props.teamStatistics.leagueLeadersOffense.map((x) => (
          <p>{x.statisticTitle} loaded</p>
        ))
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
