import React, { useEffect, useState } from "react";

export default function ReadingProgress({
  target,
}: {
  target: React.RefObject<HTMLElement>;
}) {
  const [readingProgress, setReadingProgress] = useState(0);
  const scrollListener = () => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight = element.clientHeight - window.innerHeight;
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowScrollTop <= element.offsetTop) {
      return setReadingProgress(0);
    }

    if (windowScrollTop - element.offsetTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress(
      ((windowScrollTop - element.offsetTop) / totalHeight) * 100
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  return readingProgress > 0 ? (
    <div className={`reading-progress-bar`}>
      <div
        className={`reading-progress-bar-progress`}
        style={{ width: `${readingProgress}%` }}
      ></div>
    </div>
  ) : null;
}
