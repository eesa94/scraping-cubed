import { GET_LEAGUE_LEADERS } from "../actions/teamStatisticsActions";
import objectAssign from "object-assign";

const initialState = {
  leagueLeadersOffense: "",
};

export default function teamStatisticsReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_LEAGUE_LEADERS:
      newState = objectAssign({}, state);
      newState.leagueLeadersOffense = action.payload;

      return newState;

    default:
      return state;
  }
}
