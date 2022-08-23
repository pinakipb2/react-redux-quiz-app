import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { noOfQues } from '../utils/questions';
import { navigatePrev, navigateNext, lockQuestion, saveOption, clearCurrentPage } from '../Redux/player/player.actions';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Options = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const shuffledQuestions = useSelector((state) => state.player.questions);
  const page = useSelector((state) => state.player.currentPage);
  const chosenOptions = useSelector((state) => state.player.chosenOptions);
  const quesNo = parseInt(location.pathname.slice(6), 10);

  const goPrev = () => {
    const goToPage = page > 1 ? page - 1 : page;
    dispatch(navigatePrev());
    return navigate(`/quiz/${goToPage}`);
  };

  const goNext = () => {
    const goToPage = page < 5 ? page + 1 : page;
    dispatch(navigateNext());
    return navigate(`/quiz/${goToPage}`);
  };

  const lock = () => {
    if (chosenOptions[quesNo - 1]?.selectedOption !== null) {
      dispatch(lockQuestion(page - 1));
      toast.success('Option Locked !');
    } else {
      toast.error('Save a Option First !');
    }
  };

  const saveQuestion = (option) => {
    dispatch(saveOption(option, page));
    toast.success('Option Saved !');
    setChange(false);
    setSelected(-1);
  };

  const submitQuiz = () => {
    navigate('/result');
    dispatch(clearCurrentPage());
  };
  const buttonClassName = 'bg-blue-600 p-2 rounded-lg text-white w-1/12 hover:bg-blue-500 text-base font-medium disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-red-700';

  const [answer, setAnswer] = useState('');

  const [selected, setSelected] = useState(-1);
  const [change, setChange] = useState(false);
  const select = (value, idx) => {
    console.log(value);
    setSelected(idx);
    setAnswer(value);
    setChange(true);
  };
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="text-lg space-y-2 pb-6">
          {(chosenOptions[quesNo - 1]?.selectedOption === null || change === true) && (
            <>
              <div className="space-x-8">
                {shuffledQuestions[quesNo - 1]?.options?.map((value, idx) => {
                  return (
                    <button
                      key={idx}
                      className={`${
                        selected === idx ? 'bg-blue-500' : 'bg-transparent'
                      } hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded`}
                      onClick={() => select(value, idx)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {chosenOptions[quesNo - 1]?.selectedOption !== null && chosenOptions[quesNo - 1]?.isLocked === false && change === false && (
            <>
              <div className="space-x-8">
                {shuffledQuestions[quesNo - 1]?.options?.map((value, idx) => {
                  return (
                    <button
                      key={idx}
                      className={`${
                        selected === idx || chosenOptions[quesNo - 1]?.selectedOption === value ? 'bg-blue-500' : 'bg-transparent'
                      } hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded`}
                      onClick={() => select(value, idx)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {chosenOptions[quesNo - 1]?.isLocked === true && (
            <>
              <div className="space-x-8">
                {shuffledQuestions[quesNo - 1]?.options?.map((value, idx) => {
                  return (
                    <button
                      key={idx}
                      className={`${
                        chosenOptions[quesNo - 1]?.selectedOption === value ? 'bg-blue-500' : 'bg-transparent'
                      } hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded disabled:cursor-not-allowed disabled:opacity-70`}
                      disabled
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="flex w-full items-center justify-center space-x-5 pt-6">
          <button className={buttonClassName} onClick={() => goPrev()} disabled={quesNo === 1}>
            Previous
          </button>
          <button
            className={buttonClassName}
            onClick={() => {
              lock();
            }}
            disabled={chosenOptions[quesNo - 1]?.isLocked}
          >
            Lock
          </button>
          <button
            className={buttonClassName}
            onClick={() => {
              if (answer !== '') {
                saveQuestion(answer);
                setAnswer('');
              } else {
                toast.error('Select an option to save !');
              }
            }}
            disabled={chosenOptions[quesNo - 1]?.isLocked}
          >
            Save
          </button>
          {quesNo === noOfQues ? (
            <>
              <button className={buttonClassName} onClick={() => submitQuiz()} disabled={chosenOptions[quesNo - 1]?.selectedOption === null}>
                Submit
              </button>
            </>
          ) : (
            <>
              <button className={buttonClassName} onClick={() => goNext()} disabled={chosenOptions[quesNo - 1]?.selectedOption === null}>
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Options;
