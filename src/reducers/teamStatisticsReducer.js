import {
  IS_LOADING_LEAGUE_LEADERS,
  IS_LOADING_TEAM_PASSING,
  GET_TEAM_PASSING,
  GET_LEAGUE_LEADERS,
} from "../actions/teamStatisticsActions";
import objectAssign from "object-assign";

const initialState = {
  isLoadingLeagueLeaders: true,
  isLoadingTeamPassing: true,
  teamPassing: [],
  leagueLeadersOffense: {},
};

export default function teamStatisticsReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case IS_LOADING_LEAGUE_LEADERS:
      newState = objectAssign({}, state);
      newState.isLoadingLeagueLeaders = action.payload.isLoadingLeagueLeaders;
      return newState;

    case IS_LOADING_TEAM_PASSING:
      newState = objectAssign({}, state);
      newState.isLoadingTeamPassing = action.payload.isLoadingTeamPassing;
      return newState;

    case GET_TEAM_PASSING:
      newState = objectAssign({}, state);
      newState.teamPassing = action.payload;
      return newState;

    case GET_LEAGUE_LEADERS:
      newState = objectAssign({}, state);
      newState.leagueLeadersOffense = action.payload;
      return newState;

    default:
      return state;
  }
}
