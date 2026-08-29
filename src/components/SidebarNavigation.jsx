import { useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import {
  BsBarChartFill,
  BsBuildingFill,
  BsCalendar3Fill,
  BsChevronDown,
  BsFileEarmarkExcelFill,
  BsGearFill,
  BsHospitalFill,
  BsPeopleFill,
  BsPersonBadgeFill,
} from "react-icons/bs";
import "../assets/css/sidebar.css";

const navigationGroups = [
  {
    label: "People & Groups",
    icon: <BsPeopleFill />,
    items: [
      { label: "Students", path: "/students", icon: <BsPeopleFill /> },
      {
        label: "Clinical Instructors",
        path: "/clinical-instructors",
        icon: <BsPersonBadgeFill />,
      },
      {
        label: "Student Groups",
        path: "/student-groups",
        icon: <BsPeopleFill />,
      },
    ],
  },
  {
    label: "Clinical Setup",
    icon: <BsHospitalFill />,
    items: [
      {
        label: "Affiliated Hospitals",
        path: "/hospitals",
        icon: <BsBuildingFill />,
      },
      {
        label: "Wards & Clinical Areas",
        path: "/clinical-areas",
        icon: <BsHospitalFill />,
      },
      {
        label: "Duty Shifts",
        path: "/duty-shifts",
        icon: <BsCalendar3Fill />,
      },
    ],
  },
  {
    label: "Scheduling",
    icon: <BsCalendar3Fill />,
    items: [
      {
        label: "Rotation Slots",
        path: "/rotation-slots",
        icon: <BsCalendar3Fill />,
      },
      {
        label: "Generate Schedule",
        path: "/generate-schedule",
        icon: <BsCalendar3Fill />,
      },
      {
        label: "Schedule Review",
        path: "/schedule-review",
        icon: <BsCalendar3Fill />,
      },
    ],
  },
  {
    label: "Reports",
    icon: <BsBarChartFill />,
    items: [
      {
        label: "Export Schedule",
        path: "/export-schedule",
        icon: <BsFileEarmarkExcelFill />,
      },
      {
        label: "Rotation History",
        path: "/rotation-history",
        icon: <BsBarChartFill />,
      },
    ],
  },
  {
    label: "Administration",
    icon: <BsGearFill />,
    items: [
      {
        label: "Terms & Sections",
        path: "/terms-and-sections",
        icon: <BsGearFill />,
      },
    ],
  },
];

export function SidebarNavigation() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const location = useLocation();

  function closeSidebar() {
    setShowSidebar(false);
  }

  return (
    <>
      <header className="app-header bg-dark">
        <Button
          variant="dark"
          className="border-0"
          onClick={() => setShowSidebar(true)}
          aria-label="Open navigation"
        >
          ☰
        </Button>

        <NavLink to="/" className="text-decoration-none">
          <span className="text-white fw-semibold ms-2">
            Clinic Sheduler ni Rhea Gandara
          </span>
        </NavLink>
      </header>

      <Offcanvas
        show={showSidebar}
        onHide={closeSidebar}
        placement="start"
        className="sidebar-offcanvas"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>ClinicalSched</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="p-0">
          <Nav className="flex-column p-3 gap-1">
            <NavLink
              to="/"
              end
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <BsBarChartFill />
              <span>Dashboard</span>
            </NavLink>

            {navigationGroups.map((group) => {
              const groupIsActive = group.items.some((item) =>
                location.pathname.startsWith(item.path),
              );

              const isOpen = openGroup === group.label || groupIsActive;

              return (
                <div key={group.label}>
                  <button
                    type="button"
                    className={`sidebar-group-button ${
                      groupIsActive ? "group-active" : ""
                    }`}
                    onClick={() =>
                      setOpenGroup((currentGroup) =>
                        currentGroup === group.label ? null : group.label,
                      )
                    }
                    aria-expanded={isOpen}
                  >
                    <span className="d-flex align-items-center gap-2">
                      {group.icon}
                      {group.label}
                    </span>

                    <BsChevronDown
                      className={
                        isOpen ? "sidebar-chevron open" : "sidebar-chevron"
                      }
                    />
                  </button>

                  {isOpen && (
                    <div className="sidebar-submenu">
                      {group.items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={closeSidebar}
                          className={({ isActive }) =>
                            `sidebar-sublink ${isActive ? "active" : ""}`
                          }
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
