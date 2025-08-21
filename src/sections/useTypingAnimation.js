import { useState, useEffect } from "react";

export default function useTypingAnimation(texts, speed = 80, pause = 1200) {
  const safeTexts = Array.isArray(texts) && texts.length > 0 ? texts : [""];
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (finished) {
      setDisplayed(safeTexts[safeTexts.length - 1]);
      return;
    }
    let timeout;
    const currentText = safeTexts[index % safeTexts.length];
    if (!isDeleting && char < currentText.length) {
      timeout = setTimeout(() => setChar(char + 1), speed);
    } else if (isDeleting && char > 0) {
      timeout = setTimeout(() => setChar(char - 1), speed / 2);
    } else if (!isDeleting && char === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && char === 0) {
      if (index === safeTexts.length - 1) {
        setFinished(true);
        setDisplayed(safeTexts[safeTexts.length - 1]);
        return;
      }
      setIsDeleting(false);
      setIndex((prev) => prev + 1);
    }
    setDisplayed(currentText.substring(0, char));
    return () => clearTimeout(timeout);
  }, [char, isDeleting, index, safeTexts, speed, pause, finished]);

  return displayed;
}
