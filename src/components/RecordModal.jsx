import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { getLookupOptions } from "../mock/lookupData";

function formatHeader(propertyName) {
  return propertyName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (letter) => letter.toUpperCase());
}

export function RecordModal({
  show,
  onHide,
  fields,
  record,
  mode = "create",
  onSubmit,
}) {
  const isEdit = mode === "edit";
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialForm = fields.reduce((form, field) => {
      form[field] = record?.[field] ?? "";
      return form;
    }, {});

    setFormData(initialForm);
  }, [record, fields, show]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? "Update Record" : "Create Record"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {fields.map((field) => (
            <Form.Group className="mb-3" controlId={field} key={field}>
              <Form.Label>{formatHeader(field)}</Form.Label>
              <Form.Control
                type="text"
                name={field}
                value={formData[field]}
                placeholder={formatHeader(field)}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>

          <Button type="submit" variant={isEdit ? "primary" : "success"}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
