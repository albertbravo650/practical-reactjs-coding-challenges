import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"
import { useState } from "react"
import DeleteModal from "../DeleteModal"

const TaskCard = ({ task, onDelete, onUpdate }: any) => {
  const { id, title, priority, status, progress } = task;
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusToggle, setStatusToggle] = useState(status);

  const handleShowDelete = () => {
    setDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setDeleteModal(false);
  };

  const handleStatus = () => {
    if(task.progress===0) {
      setStatusToggle("In Progress");
      task.status = "In Progress";
      task.progress = 50;
    } else if(progress===50) {
      setStatusToggle("Done");
      task.status = "Done";
      task.progress = 100;
    } else {
      setStatusToggle("To Do");
      task.status = "To Do";
      task.progress = 0;
    }
  }

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status" onClick={handleStatus}>{status}</button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={() => {
          onUpdate(task);
        }}/>
        <DeleteIcon className="cp" onClick={handleShowDelete}/>
      </div>
      {deleteModal && (
        <DeleteModal task={task} handleClose={handleCloseDelete} handleDelete={() => {
          onDelete(task.id); 
          handleCloseDelete();
        }}/>
      )}
    </div>
  )
}

export default TaskCard
