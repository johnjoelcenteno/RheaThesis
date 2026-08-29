import { useState } from "react";
import { CustomTable } from "./components/CustomTable";
import { studentWardFieldMetadata } from "./models/StudentWardField.js";

function App() {
  const [studentWards] = useState([
    {
      id: 1,
      FullName: "Joel John Centeno",
      ward: "Ward 1",
      in: "1:30 AM",
      out: "5:00 PM",
    },
    {
      id: 2,
      FullName: "Mary Anne Centeno",
      ward: "Ward 2",
      schedule: "1:30 AM - 3:00 PM",
      in: "7:30 AM",
      out: "6:00 PM",
    },
  ]);

  return (
    <div className="mt-3">
      <CustomTable
        data={studentWards}
        fieldMetadata={studentWardFieldMetadata}
        onCreate={(student) => console.log("Create:", student)}
        onUpdate={(student) => console.log("Update:", student)}
      />
    </div>
  );
}

export default App;
