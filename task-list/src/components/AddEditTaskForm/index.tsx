import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import { useEffect, useState } from "react"
import { TaskList } from "../../interfaces/TaskList"
import { AddEditTaskFormProps } from "../../interfaces/AddEditTaskFormProps"

const AddEditTaskForm: React.FC<AddEditTaskFormProps> = ({ handleClose, handleAddTask, handleUpdateTask, taskToUpdate }) => {
  const [task, setTask] = useState<TaskList>({
    id: `${new Date().getTime()}`,
    title: "",
    priority: "",
    status: "To Do",
    progress: 0,
  });

  useEffect(() => {
    if(taskToUpdate) {
      setTask(taskToUpdate);
    }
  }, [taskToUpdate]);

  const handlePriority = (priority: string) => {
    setTask({
      ...task, priority: priority
    })
  }

  const handleSubmit = () => {
    if(taskToUpdate) {
      console.log(taskToUpdate);
      handleUpdateTask(task);
    } else {
      handleAddTask(task);
    }
    handleClose();
  }

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">Add Task </span>
            <Close className="cp" onClick={() => handleClose()} />
          </div>
          <Input label="Task" placeholder="Type your task here..." onChange={(e) => setTask({ ...task, title: e.target.value })} name="title" value={task.title} />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => (
                <li key={priority} className={classNames({ [`${priority}-selected`]: task.priority === priority, })}
                  onClick={() => handlePriority(priority)} >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title="Add" disabled={task.title.length === 0 || task.priority === ""} onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
