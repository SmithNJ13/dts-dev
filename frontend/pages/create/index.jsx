import React from 'react'
import { useNavigate } from "react-router"


const CreatePage = () => {
  const nav = useNavigate()
    async function createTask(e) {
        e.preventDefault()
        const Form = new FormData(e.target)
        const title = Form.get("title")
        const description = Form.get("description")
        const dueDate = Form.get("dueDate")
        const date = new Date()
        const postDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        try {
            const response = await fetch("http://localhost:5433/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task_id: 1,
                    title: title,
                    description: description,
                    postDate: postDate,
                    dueDate: dueDate,
                    status: "incomplete",
                })
                })
            if(!response.ok) {
            console.log("Failed to create task.")
            } else {
            console.log(title, description, postDate, dueDate, "incomplete")
            console.log("Task created successfully.")
            e.target.reset()
            nav("/")
            }
            } catch (error) {
            return new Error({message: error})
            }
        }

  return (
    <>
    <div className="flex flex-col items-center">
        <div className="bg-white w-[400px] h-max p-8 rounded">
        <h1 className="text-black text-4xl underline text-center m-8">Create a Task</h1>
        <form className="max-w-sm mx-auto" onSubmit={createTask}>
        <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Title:
            </label>
            <input type="text" name="title" id="title" placeholder="Update database" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        <div className="mb-5">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Description:
        </label>
        <textarea name="description" id="description" placeholder="Enter task details..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-[150px] p-2.5 resize-none">
        </textarea>
        </div>
        <div className="mb-5">
        <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Due Date:
        </label>
        <input type="date" name="dueDate" id="dueDate" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
    <button type="submit" className="text-white bg-green-700 hover:bg-green-600 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"> Submit
    </button>
    </form>
    </div>
    </div>
    </>
  )
}

export default CreatePage
