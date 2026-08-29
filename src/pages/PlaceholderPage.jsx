import { Container } from "react-bootstrap";

export function PlaceholderPage({ title }) {
  return (
    <Container className="py-4">
      <h1 className="h3">{title}</h1>
      <p className="text-muted">This page is coming next.</p>
    </Container>
  );
}
