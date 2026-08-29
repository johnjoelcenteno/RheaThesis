import { Route, Routes } from "react-router";
import { SidebarNavigation } from "./components/SidebarNavigation.jsx";
import { HomePage } from "./pages/HomePage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { StudentPage } from "./pages/StudentPage";

function App() {
  return (
    <>
      <SidebarNavigation />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentPage />} />

          <Route
            path="/clinical-instructors"
            element={<PlaceholderPage title="Clinical Instructors" />}
          />

          <Route
            path="/student-groups"
            element={<PlaceholderPage title="Student Groups" />}
          />

          <Route
            path="/hospitals"
            element={<PlaceholderPage title="Affiliated Hospitals" />}
          />

          <Route
            path="/clinical-areas"
            element={<PlaceholderPage title="Wards & Clinical Areas" />}
          />

          <Route
            path="/duty-shifts"
            element={<PlaceholderPage title="Duty Shifts" />}
          />

          <Route
            path="/rotation-slots"
            element={<PlaceholderPage title="Rotation Slots" />}
          />

          <Route
            path="/generate-schedule"
            element={<PlaceholderPage title="Generate Schedule" />}
          />

          <Route
            path="/schedule-review"
            element={<PlaceholderPage title="Schedule Review" />}
          />

          <Route
            path="/export-schedule"
            element={<PlaceholderPage title="Export Schedule" />}
          />

          <Route
            path="/rotation-history"
            element={<PlaceholderPage title="Rotation History" />}
          />

          <Route
            path="/terms-and-sections"
            element={<PlaceholderPage title="Terms & Sections" />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
