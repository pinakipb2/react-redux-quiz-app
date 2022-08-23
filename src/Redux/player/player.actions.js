import PlayerActionTypes from './player.types';

export const setPlayerName = (playerName) => ({
  type: PlayerActionTypes.SET_PLAYER,
  payload: playerName,
});

export const setQuestions = (ques) => ({
  type: PlayerActionTypes.SET_QUESTION,
  payload: ques,
});

export const initQuizOptions = () => ({
  type: PlayerActionTypes.INIT_QUIZ_OPTIONS,
});

export const navigateNext = () => ({
  type: PlayerActionTypes.NAVIGATE_NEXT,
});

export const navigatePrev = () => ({
  type: PlayerActionTypes.NAVIGATE_PREV,
});

export const lockQuestion = (questionNumber) => ({
  type: PlayerActionTypes.LOCK_QUESTION,
  payload: questionNumber,
});

export const saveOption = (option, page) => ({
  type: PlayerActionTypes.SAVE_OPTION,
  payload: { option, page },
});

export const clearCurrentPage = () => ({
  type: PlayerActionTypes.CLEAR_CURRENT_PAGE,
});

export const resetAll = () => ({
  type: PlayerActionTypes.RESET_ALL,
});
