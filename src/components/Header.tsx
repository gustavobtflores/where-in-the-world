import { Sun } from "phosphor-react";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="bg-light-white py-6 shadow-md">
      <Container className="flex flex-1 justify-between">
        <h1 className="text-2xl font-bold text-text-light">Where in the world?</h1>
        <button>
          <Sun />
        </button>
      </Container>
    </header>
  );
}
