import {
  IS_LOADING,
  GET_LEAGUE_LEADERS,
} from "../actions/teamStatisticsActions";
import objectAssign from "object-assign";

const initialState = {
  isLoading: true,
  leagueLeadersOffense: {},
};

export default function teamStatisticsReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case IS_LOADING:
      newState = objectAssign({}, state);
      newState.isLoading = action.payload.isLoading;
      return newState;

    case GET_LEAGUE_LEADERS:
      newState = objectAssign({}, state);
      newState.leagueLeadersOffense = action.payload;
      return newState;
    default:
      return state;
  }
}
