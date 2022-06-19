// import Translator from "./i18n/Translator";
import { useTranslation } from "react-i18next";
import { Header } from "./components/Header";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
    </>
  );
}

export default App;
