import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${title} | VibeSphere`;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

export default useDocumentTitle;
