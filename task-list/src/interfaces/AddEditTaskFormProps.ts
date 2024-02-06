import { TaskList } from "./TaskList";

export interface AddEditTaskFormProps {
    handleClose: () => void;
    handleAddTask: (task?: TaskList) => void;
    handleUpdateTask: (updatedTask?: TaskList) => void;
    taskToUpdate?: TaskList | null; // Task to update, if available
}