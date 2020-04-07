import {
  IS_LOADING,
  GET_PASSING_RANKINGS_BY_TEAM,
  GET_LEAGUE_LEADERS,
} from "../actions/teamStatisticsActions";
import objectAssign from "object-assign";

const initialState = {
  isLoading: true,
  passing: [],
  leagueLeadersOffense: {},
};

export default function teamStatisticsReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case IS_LOADING:
      newState = objectAssign({}, state);
      newState.isLoading = action.payload.isLoading;
      return newState;

    case GET_PASSING_RANKINGS_BY_TEAM:
      newState = objectAssign({}, state);
      newState.passing = action.payload;
      return newState;

    case GET_LEAGUE_LEADERS:
      newState = objectAssign({}, state);
      newState.leagueLeadersOffense = action.payload;
      return newState;

    default:
      return state;
  }
}
