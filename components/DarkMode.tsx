import { useState, useEffect } from "react";
import Image from "next/image";

const DarkMode = () => {
  const [theme, setTheme] = useState("light");
  const colorTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return (
  <button onClick={() => setTheme(colorTheme)}>
    {theme === "light" ? <Image src="/light.svg" alt="light" width={40} height={40}/> : <Image src="/dark.svg" alt="dark" width={30} height={30}/>}
  </button>
  );
};

export default DarkMode;
