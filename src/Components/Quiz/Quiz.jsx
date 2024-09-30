import React, { useRef, useState } from 'react'
import { data } from '../../assets/data';
import logoWhite from '../../assets/logowhite.png'

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false)

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4]

    const checkAns = (e, ans) => {

        if(lock === false){
            if(question.ans === ans){
                e.target.classList.add("correct");
                setLock(true)
                setScore(prev => prev+1);
            }
            else{
                e.target.classList.add("wrong");
                setLock(true)
                option_array[question.ans-1].current.classList.add("correct");
            }
        }
    }

    const next = () => {
        if (lock === true) {
            if (index === data.length -1) {
                setResult(true)
                return 0;
            }
            setIndex(++index)
            setQuestion(data[index])
            setLock(false)
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const previous = () => {
        if (lock === true) {
            if (index === data.length -1) {
                setResult(true)
                return 0;
            }
            setIndex(--index)
            setQuestion(data[index])
            setLock(false)
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

  return (
    <>

        {/* Logo */}
        <img src={logoWhite} alt="logo" className='h-6 w-42 m-5' />

        {/* Quiz */}
        <div className="container w-[580px] m-auto mt-32  bg-white text-[#32323a] flex flex-col gap-5 rounded-lg p-8">
            <h1 className="font-bold text-3xl m-auto">Quiz App</h1>
            <hr className="h-[2px] border-none bg-[#707070]" />
            {result?<></>:<>
                <h2 className="font-semibold text-xl">{index+1}. {question.question}</h2>
                <ul>
                    <li ref={Option1} onClick={(e) => {checkAns(e,1)}}>{question.option1}</li>
                    <li ref={Option2} onClick={(e) => {checkAns(e,2)}}>{question.option2}</li>
                    <li ref={Option3} onClick={(e) => {checkAns(e,3)}}>{question.option3}</li>
                    <li ref={Option4} onClick={(e) => {checkAns(e,4)}}>{question.option4}</li>    
                </ul>
                <button onClick={next} className='m-auto w-[250px] h-12 bg-[#31708d] hover:bg-[#295f79] duration-300 text-white text-xl rounded-lg cursor-pointer'>Next</button>
                <div className="index text-md text-gray-400">{index+1} of {data.length} questions </div>
            </>}
            {result?<>
                <h2 className="font-semibold text-xl">You Scored {score} out of {data.length}</h2>
                <button onClick={reset} className='m-auto w-[250px] h-12 bg-[#31708d] hover:bg-[#295f79] duration-300 text-white text-xl rounded-lg cursor-pointer'>Reset</button>
                
            </>: <></>}
        </div>
    </>
  )
}

export default Quiz