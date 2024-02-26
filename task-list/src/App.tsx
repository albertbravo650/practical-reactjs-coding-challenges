import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"
import React, { useEffect, useState } from 'react';
import { TaskList } from "./interfaces/TaskList"


const App = () => {
  // set state for showing tasks
  const [tasks, setTasks] = useState<TaskList[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<TaskList | null>(null);
  // set state for showing add form
  const [showForm, setShowForm] = useState(false);
  // console.log(taskToUpdate);

  useEffect(() => {
    setTasks(taskList)
  }, []);

  const handleShowForm = () => {
    console.log("Show form");
    setShowForm(true);
  };

  const handleAddTask = (task?: TaskList) => {
    console.log(task);
    if(task) {
      setTasks([task, ...tasks]);
    }
    setShowForm(false);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  const handleUpdateTask = (updatedTask?: TaskList) => {
    if(updatedTask) {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    }
  }

  const handleEditTask = (task: TaskList) => {
    console.log("Show edit")
    setTaskToUpdate(task);
    setShowForm(true);
    console.log(taskToUpdate);
  };

  const handleCloseEditForm = () => {
    setTaskToUpdate(null);
    setShowForm(false);
  }

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={handleShowForm} />
        </div>
        <div className="task-container">
          {tasks.map((task: TaskList) => (
            <TaskCard task={task} key={task.id} onDelete={handleDeleteTask} onUpdate={handleEditTask}  />
          ))}
        </div>
      </div>
      {showForm && <AddEditTaskForm 
        handleClose={handleCloseEditForm} 
        handleAddTask={handleAddTask} 
        handleUpdateTask={handleUpdateTask}
        taskToUpdate={taskToUpdate}/>}
      {/* {taskToUpdate != null && <AddEditTaskForm handleClose={handleCloseEditForm} />} */}
    </div>
  );
};

export default App;
