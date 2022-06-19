import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <h1>{t("home.message")}</h1>
    </header>
  );
}
