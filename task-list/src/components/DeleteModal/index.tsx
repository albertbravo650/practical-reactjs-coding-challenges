import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"

interface AddTaskDeleteProps {
  handleClose: () => void;
  handleDelete: () => void;
  task: any;
}

const DeleteModal: React.FC<AddTaskDeleteProps> = ({ handleClose, handleDelete, task }) => {

  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={() => {handleDelete()}} />
          <Button title="Cancel" outline onClick={() => {handleClose()} }/>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
