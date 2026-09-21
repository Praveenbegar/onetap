import { useEffect } from "react";
import site from "../config/site";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} - ${site.tagline}`;
  }, [title]);
}
