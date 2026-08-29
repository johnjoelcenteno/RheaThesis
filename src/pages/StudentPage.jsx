import { useState } from "react";
import { Container } from "react-bootstrap";
import { CustomTable } from "../components/CustomTable";
import { studentWardFieldMetadata } from "../models/StudentWardField";

export function StudentPage() {
  const [studentWards, setStudentWards] = useState([
    {
      id: 1,
      FirstName: "Joel John Centeno",
      ward: "Ward 1",
      in: "01:30",
      out: "17:00",
    },
    {
      id: 2,
      FirstName: "Mary Anne Centeno",
      ward: "Ward 2",
      in: "07:30",
      out: "18:00",
    },
  ]);

  function handleCreate(student) {
    setStudentWards((currentStudents) => [
      ...currentStudents,
      {
        ...student,
        id: crypto.randomUUID(),
      },
    ]);
  }

  function handleUpdate(updatedStudent) {
    setStudentWards((currentStudents) =>
      currentStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    );
  }

  return (
    <Container className="mt-3">
      <h1 className="h3 mb-3">Students</h1>

      <CustomTable
        data={studentWards}
        fieldMetadata={studentWardFieldMetadata}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />
    </Container>
  );
}
