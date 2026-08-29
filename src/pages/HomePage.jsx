import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  Image as BootstrapImage,
} from "react-bootstrap";
import { NavLink } from "react-router";
import {
  BsBuildingFill,
  BsCalendarCheckFill,
  BsExclamationTriangleFill,
  BsPeopleFill,
  BsPlusCircleFill,
} from "react-icons/bs";

import image1 from "../assets/img/35671850_2483716851669378_5099802858274947072_n.jpg";

const summaryCards = [
  {
    label: "Total Students",
    value: 120,
    icon: <BsPeopleFill size={26} />,
    color: "primary",
  },
  {
    label: "Active Sections",
    value: 6,
    icon: <BsBuildingFill size={26} />,
    color: "success",
  },
  {
    label: "Upcoming Duties",
    value: 12,
    icon: <BsCalendarCheckFill size={26} />,
    color: "warning",
  },
  {
    label: "Needs Review",
    value: 3,
    icon: <BsExclamationTriangleFill size={26} />,
    color: "danger",
  },
];

const upcomingSchedules = [
  {
    dates: "Aug 27–29",
    section: "BSN 2-Y1-1A",
    hospital: "Novaliches General Hospital",
    status: "Finalized",
  },
  {
    dates: "Sep 3–5",
    section: "BSN 2-Y1-2A",
    hospital: "East Avenue Medical Center",
    status: "Draft",
  },
];

export function HomePage() {
  return (
    <Container className="py-4">
      <Row className="g-4">
        {/* Left side: existing dashboard */}
        <Col lg={8}>
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h1 className="h2 mb-1">Dashboard</h1>
              <p className="text-muted mb-0">
                Overview of clinical schedules and student assignments.
              </p>
            </div>

            <Button
              as={NavLink}
              to="/students"
              variant="success"
              className="d-inline-flex align-items-center gap-2"
            >
              <BsPlusCircleFill />
              Manage Students
            </Button>
          </div>

          <Row className="g-3 mb-4">
            {summaryCards.map((card) => (
              <Col key={card.label} sm={6}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className={`text-${card.color}`}>{card.icon}</div>

                    <div>
                      <div className="text-muted small">{card.label}</div>
                      <div className="fs-3 fw-bold">{card.value}</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white py-3">
              <h2 className="h5 mb-0">Upcoming Clinical Duties</h2>
            </Card.Header>

            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Duty Dates</th>
                    <th>Section</th>
                    <th>Affiliated Hospital</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {upcomingSchedules.map((schedule) => (
                    <tr key={schedule.section}>
                      <td>{schedule.dates}</td>
                      <td>{schedule.section}</td>
                      <td>{schedule.hospital}</td>
                      <td>
                        <span
                          className={`badge ${
                            schedule.status === "Finalized"
                              ? "text-bg-success"
                              : "text-bg-warning"
                          }`}
                        >
                          {schedule.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Right side: photo card */}
        <Col lg={4}>
          <section className="sticky-lg-top" style={{ top: "1rem" }}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 text-center">
                <BootstrapImage
                  src={image1}
                  alt="ClinicalSched team"
                  thumbnail
                  rounded
                  fluid
                  className="mb-3"
                />

                <Card.Title className="h4">The ClinicalSched Crew</Card.Title>

                <Card.Text className="text-muted mb-0">
                  Turning clinical scheduling chaos into something a little more
                  organized. <b>Made with ❤️ by Rhea Gandara.</b>
                </Card.Text>
              </Card.Body>
            </Card>
          </section>
        </Col>
      </Row>
    </Container>
  );
}
