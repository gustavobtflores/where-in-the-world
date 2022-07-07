import { Sun } from "phosphor-react";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="bg-light-white py-6 shadow-md dark:bg-elements-dark">
      <Container className="flex flex-1 justify-between">
        <h1 className="text-2xl font-bold text-text-light text-text-dark">
          Where in the world?
        </h1>
        <button className="dark:text-text-dark">
          <Sun size={24} />
        </button>
      </Container>
    </header>
  );
}
