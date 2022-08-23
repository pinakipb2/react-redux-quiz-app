import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { resetAll } from '../Redux/player/player.actions';
import { noOfQues } from '../utils/questions';

function Results() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page = useSelector((state) => state.player.currentPage);
  const playerName = useSelector((state) => state.player.playerName);
  const shuffledQuestions = useSelector((state) => state.player.questions);
  const chosenOptions = useSelector((state) => state.player.chosenOptions);

  const [totalScore, setTotalScore] = useState(Array(noOfQues).fill(0));

  useEffect(() => {
    if (playerName !== null) {
      if (page !== null) navigate(`/quiz/${page}`);
      else {
        const newScore = Array(noOfQues).fill(0);
        for (let i = 0; i < noOfQues; i++) {
          if (shuffledQuestions[i].correctAnswer === chosenOptions[i].selectedOption) {
            newScore[i] = 1;
          }
        }
        setTotalScore(newScore);
      }
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearAll = () => {
    dispatch(resetAll());
    navigate('/');
  };

  return (
    <div className="bg-neutral-800 flex flex-col text-white h-full pt-20 pb-10 justify-center items-center space-y-4">
      <div className="text-6xl mb-6 font-bold">Hi {playerName}!</div>
      <div className="text-4xl pb-6">
        Your Final Score is {totalScore.reduce((a, b) => a + b, 0)} out of {noOfQues}
      </div>
      <>
        {shuffledQuestions.map((ques, idx) => (
          <div key={idx}>
            <div className="flex">
              <div className="font-medium text-xl mb-2 mr-10">
                Q{idx + 1} of 5 : {ques.question}
              </div>
              <div className="font-medium text-xl justify-end">{totalScore[idx]}/1</div>
            </div>
            <div className="flex flex-col w-full items-center">
              <div className="text-lg space-y-2 pb-6">
                {ques.options.map((option, index) => (
                  <div key={index}>
                    {shuffledQuestions[idx].correctAnswer === option && (
                      <div className="flex flex-row text-green-400">
                        <span>
                          {index + 1}. {option}
                        </span>
                        <div className="ml-2 my-1">
                          <BsFillCheckCircleFill />
                        </div>
                      </div>
                    )}
                    {shuffledQuestions[idx].correctAnswer !== option && chosenOptions[idx].selectedOption !== option && (
                      <div>
                        <span>
                          {index + 1}. {option}
                        </span>
                      </div>
                    )}
                    {chosenOptions[idx].selectedOption === option && shuffledQuestions[idx].correctAnswer !== option && (
                      <div className="flex flex-row text-red-400">
                        <span>
                          {index + 1}. {option}
                        </span>
                        <div className="ml-2 my-1">
                          <BsFillXCircleFill />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </>
      <>
        <div className="flex flex-col w-full items-center">
          <button
            className="mt-10 mb-4 bg-blue-500 p-2 rounded-lg text-white w-1/12 hover:bg-green-800 text-base font-medium"
            onClick={() => {
              clearAll();
            }}
          >
            Home
          </button>
        </div>
      </>
    </div>
  );
}

export default Results;
