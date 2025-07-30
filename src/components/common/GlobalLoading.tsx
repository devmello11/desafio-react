"use client";
import React from "react";

export default function GlobalLoading() {
  const [loadingGlobal, setLoadingGlobal] = React.useState(false);

  React.useEffect(() => {
    function onShowLoading() { setLoadingGlobal(true); }
    function onHideLoading() { setLoadingGlobal(false); }
    window.addEventListener('show-loading-global', onShowLoading);
    window.addEventListener('hide-loading-global', onHideLoading);
    return () => {
      window.removeEventListener('show-loading-global', onShowLoading);
      window.removeEventListener('hide-loading-global', onHideLoading);
    };
  }, []);

  if (!loadingGlobal) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
    </div>
  );
}
