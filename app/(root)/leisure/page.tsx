"use client";

import { useEffect, useRef, useState } from "react";

export default function LeisurePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState("100vh");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const updateHeight = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          setHeight(doc.body.scrollHeight + "px");
        }
      } catch {
        setHeight("100vh");
      } finally {
        setLoading(false);
      }
    };

    iframe.addEventListener("load", updateHeight);
    return () => iframe.removeEventListener("load", updateHeight);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Spinner while loading */}
      {/* {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )} */}

      {/* Iframe container */}
      <div className="w-full h-full rounded-xl overflow-hidden">
        <iframe
          ref={iframeRef}
          src="https://www.omegatravel.com/vacations/"
          title="Omega Travel Leisure"
          onLoad={() => setLoading(false)}
          style={{
            width: "100%",
            height,
            border: "none",
          }}
        />
      </div>
    </main>
  );
}
