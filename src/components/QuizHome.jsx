import React from 'react';
import { useEffect } from 'react';
import { noOfQues } from '../utils/questions';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Options from './Options';

function QuizHome() {
  const playerName = useSelector((state) => state.player.playerName);
  const shuffledQuestions = useSelector((state) => state.player.questions);
  const page = useSelector((state) => state.player.currentPage);

  const navigate = useNavigate();
  const location = useLocation();
  const quesNo = parseInt(location.pathname.slice(6), 10);

  useEffect(() => {
    if (playerName !== null) {
      if (page !== quesNo) navigate(`/quiz/${page}`);
      if (page === null) navigate('/result');
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full bg-neutral-800 h-screen text-white justify-center items-center space-y-10">
      <div className="font-bold text-6xl mb-6">Hi, {playerName}!</div>
      <div className="font-medium text-xl">
        Q{quesNo} of {noOfQues} : {shuffledQuestions[quesNo - 1]?.question}
      </div>
      <Options />
    </div>
  );
}

export default QuizHome;
