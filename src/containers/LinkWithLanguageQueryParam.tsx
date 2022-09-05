import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface LinkWithQueryProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  props?: unknown;
}

export const LinkWithLanguageQueryParam = ({
  children,
  to,
  ...props
}: LinkWithQueryProps) => {
  const { i18n } = useTranslation();

  return (
    <Link to={to + "?lang=" + i18n.resolvedLanguage} {...props}>
      {children}
    </Link>
  );
};
