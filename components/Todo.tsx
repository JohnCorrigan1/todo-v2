import { useState } from 'react';
import Image from 'next/image';


const Todo: React.FC<{ title: string, description: string, due: string, done: boolean}> = (props) => {
    
    const [isDone, setIsDone] = useState(props.done)
    const [isExpand, setIsExpand] = useState(false)

    const doneHandler = () => {
        setIsDone(!isDone)
    }

    const expandHandler = () => {
        setIsExpand(!isExpand)
    }
    
    return(
        <div className='bg-slate-400 flex justify-between p-3 items-center w-5/6 rounded-md shadow-lg sm:w-2/3'>
            <h1>{props.title}</h1>
            <div className='flex gap-5'>
                <div className={(isDone ? 'bg-emerald-500 ' : 'bg-slate-400 ') + 'border-2 border-white rounded-full w-8 h-8 cursor-pointer active:scale-90'}  onClick={doneHandler}></div>
                <div className='bg-slate-300 rounded-full flex items-center justify-center border-white border-2 active:scale-90' onClick={expandHandler}>
                    {!isExpand ? <Image src="/expand.svg" width={30} height={30} alt="expand" /> : <Image src="/close.svg" width={30} height={30} alt="close" />}
                    </div>

            </div>
        </div>
    )
}

export default Todo;