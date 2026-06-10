import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="container section center-col">
      <h1>404</h1>
      <p className="muted-text">This page doesn’t exist.</p>
      <Button to="/">Back home</Button>
    </div>
  );
}
