import PlayerActionTypes from './player.types';
import { noOfQues } from '../../utils/questions';

const INITIAL_STATE = {
  playerName: null,
  questions: [],
  currentPage: null,
  chosenOptions: [],
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.SET_PLAYER:
      return {
        ...state,
        playerName: action.payload,
      };
    case PlayerActionTypes.SET_QUESTION:
      return {
        ...state,
        questions: action.payload,
      };
    case PlayerActionTypes.INIT_QUIZ_OPTIONS:
      const filled = new Array(noOfQues).fill({ isLocked: false, selectedOption: null });
      return {
        ...state,
        chosenOptions: filled,
        currentPage: 1,
      };
    case PlayerActionTypes.NAVIGATE_NEXT:
      return {
        ...state,
        currentPage: state.currentPage < noOfQues ? state.currentPage + 1 : state.currentPage,
      };
    case PlayerActionTypes.NAVIGATE_PREV:
      return {
        ...state,
        currentPage: state.currentPage > 1 ? state.currentPage - 1 : state.currentPage,
      };
    case PlayerActionTypes.LOCK_QUESTION:
      const modifiedChosenOptions = state.chosenOptions.map((option, idx) => {
        var value = { ...option };
        if (idx === parseInt(action.payload, 10)) {
          value.isLocked = true;
        }
        return value;
      });
      return {
        ...state,
        chosenOptions: modifiedChosenOptions,
      };
    case PlayerActionTypes.SAVE_OPTION:
      const options = state.chosenOptions.map((option, idx) => {
        var value = { ...option };
        if (idx === parseInt(action.payload.page, 10) - 1) {
          value.selectedOption = action.payload.option;
        }
        return value;
      });
      return {
        ...state,
        chosenOptions: options,
      };
    case PlayerActionTypes.CLEAR_CURRENT_PAGE:
      return {
        ...state,
        currentPage: null,
      };
    case PlayerActionTypes.RESET_ALL:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default playerReducer;
