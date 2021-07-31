import useMediaQuery from "@material-ui/core/useMediaQuery";
import Storage from "../storage";

const storage = new Storage();

export const hasDarkMode: () => boolean = () => {
  if (storage.has("dark-mode")) return storage.getBool("dark-mode");

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  storage.setBool("dark-mode", darkMode);
  return darkMode;
};

export const toggleDarkMode: () => boolean = () => {
  const current = storage.getBool("dark-mode");
  storage.setBool("dark-mode", !current);
  return !current;
};
