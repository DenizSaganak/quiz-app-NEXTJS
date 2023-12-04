'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from "../../../components/Button/Button";
import { QuestionsState } from '../../../types/quiz';

type Props = {
    questions: QuestionsState;
    totalQuestions: number;
};

const Quiz = ({ questions, totalQuestions }: Props) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [userAnswers, setUserAnswers] = React.useState<Record<number, string>>({});

    const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false;

    const router = useRouter();
    
    console.log(questions);

    const handleOnAnswerClick = (answer: string, currentQuestionIndex: number) => {
        if(isQuestionAnswered) return;

        const isCorrect = questions[currentQuestionIndex].correct_answer === answer;

        if(isCorrect) setScore(prev => prev + 1);

        setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }))
    };
     
    const handleChangeQuestion = (step: number) => {
        const newQuestionIndex = currentQuestionIndex + step;

        if(newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) return;

        setCurrentQuestionIndex(newQuestionIndex);
    }

    return (
        <div className='text-white text-center'>
        <p className='p-8 font-bold text-[20px]'>Score: {score}</p>
        <p className='text-[#9F50AC] font-bold pb-2 text-[14px]'>
          Question {currentQuestionIndex + 1} out of {totalQuestions}
        </p>
        Question Card
        <div className='flex justify-between mt-16'>
        <Button text='Prev' onClick={() => handleChangeQuestion(-1)} />
        <Button
          text={currentQuestionIndex === totalQuestions - 1 ? 'End' : 'Next'}
          onClick={currentQuestionIndex === totalQuestions - 1 ? () => router.push('/') : () => handleChangeQuestion(1)}
        />
      </div>
    </div>
    )
}

export default Quiz;