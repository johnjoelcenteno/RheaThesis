import { Button, Modal } from "react-bootstrap";
// TODO: obtained the record render it in the modal body mwehe
export function DeleteConfirmModal({ show, record, onHide, onConfirm }) {
  function handleDelete() {
    onConfirm(record);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Record</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to delete this record? This action cannot be
        undone.
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>

        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
