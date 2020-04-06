import { combineReducers } from "redux";
import fuelSavings from "./fuelSavingsReducer";
import teamStatistics from "./teamStatisticsReducer";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    fuelSavings,
    teamStatistics,
  });

export default rootReducer;
