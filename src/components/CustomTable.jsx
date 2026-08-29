import { useState, useEffect } from "react";
import { RecordModal } from "./RecordModal";
import { Button, Table, Pagination, Form } from "react-bootstrap";
import {
  BsPlusCircleFill,
  BsFillPencilFill,
  BsFillTrashFill,
} from "react-icons/bs";
import "../assets/css/table.css";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

function formatHeader(propertyName) {
  return propertyName
    .replace(/([a-z])([A-Z])/g, "$1 $2") // firstName → first Name
    .replace(/^./, (letter) => letter.toUpperCase()); // first Name → First Name
}

export function CustomTable({ data = [], onCreate, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const [sortConfig, setSortConfig] = useState(null);

  const headers =
    data.length > 0
      ? Object.keys(data[0]).filter((field) => field != "id")
      : [];

  function handleSort(header) {
    setSortConfig((currentSort) => {
      // First click on a column: ascending
      if (!currentSort || currentSort.key !== header) {
        return { key: header, direction: "ascending" };
      }

      // Second click: descending
      if (currentSort.direction === "ascending") {
        return { key: header, direction: "descending" };
      }

      // Third click: remove sorting
      return null;
    });
  }

  function getSortIcon(header) {
    if (sortConfig?.key !== header) {
      return "↕";
    }

    return sortConfig.direction === "ascending" ? "↑" : "↓";
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const filteredData = data.filter((row) => {
    const search = debouncedSearchText.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return headers.some((header) =>
      String(row[header] ?? "")
        .toLowerCase()
        .includes(search),
    );
  });

  const sortedData = [...filteredData].sort((firstRow, secondRow) => {
    if (!sortConfig) {
      return 0;
    }

    const firstValue = String(firstRow[sortConfig.key] ?? "");
    const secondValue = String(secondRow[sortConfig.key] ?? "");

    const comparison = firstValue.localeCompare(secondValue, undefined, {
      numeric: true,
      sensitivity: "base",
    });

    return sortConfig.direction === "ascending" ? comparison : -comparison;
  });

  function openCreateModal() {
    setModalMode("create");
    setSelectedRecord(null);
    setShowModal(true);
  }

  function openEditModal(row) {
    setModalMode("edit");
    setSelectedRecord(row);
    setShowModal(true);
  }

  function openDeleteModal(row) {
    setSelectedRecord(row);
    setShowDeleteModal(true);
  }

  function handleModalSubmit(formData) {
    if (modalMode === "create") {
      onCreate?.(formData);
      return;
    }

    onUpdate?.({
      ...selectedRecord,
      ...formData,
    });
  }

  function handleDelete() {
    console.log("Delete has been pressed");
  }

  return (
    <>
      <section>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Control
            type="search"
            placeholder="Search records..."
            aria-label="Search records"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={{ maxWidth: "280px" }}
          />

          <Button
            variant="success"
            size="sm"
            className="d-inline-flex align-items-center gap-1"
            onClick={openCreateModal}
          >
            <BsPlusCircleFill />
            <span>Create</span>
          </Button>
        </div>

        <Table bordered hover responsive className="mt-1">
          <thead className="table-dark">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  role="button"
                  tabIndex={0}
                  className="sortable-header"
                  onClick={() => handleSort(header)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      handleSort(header);
                    }
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{formatHeader(header)}</span>
                    <span>{getSortIcon(header)}</span>
                  </div>
                </th>
              ))}
              <th className="actions-column">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={headers.length + 1} className="text-center">
                  No records found
                </td>
              </tr>
            ) : filteredData.length == 0 ? (
              <tr>
                <td colSpan={headers.length + 1} className="text-center">
                  {searchText
                    ? "No matching records found"
                    : "No records found"}
                </td>
              </tr>
            ) : (
              sortedData.map((row) => (
                <tr key={row.id}>
                  {headers.map((header) => (
                    <td key={header}>{row[header]}</td>
                  ))}
                  <td className="actions-column text-nowrap text-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="shadow me-2"
                      onClick={() => openEditModal(row)}
                    >
                      <BsFillPencilFill size={15} />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="shadow"
                      onClick={() => openDeleteModal(row)}
                    >
                      <BsFillTrashFill size={15} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </section>

      <RecordModal
        show={showModal}
        onHide={() => setShowModal(false)}
        fields={headers}
        record={selectedRecord}
        mode={modalMode}
        onSubmit={handleModalSubmit}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        record={selectedRecord}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />

      <Pagination
        size="sm"
        className="d-flex justify-content-end custom-pagination"
      >
        <Pagination.Prev />
        <Pagination.Item>1</Pagination.Item>
        <Pagination.Item active>2</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </>
  );
}
