import { useState } from "react"

const TodoForm: React.FC = () => {

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()

    }

    return(
        <div>
            <form onSubmit={submitHandler}>

            </form>
        </div>
    )
}

export default TodoForm;