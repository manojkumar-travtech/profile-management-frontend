import dynamic from "next/dynamic";
import React from "react";

// Dynamic import, but with SSR enabled
const CreateEvent = dynamic(() => import("./_components/CreateEvent"), {
  // ssr: true is default, so you can omit it
  loading: () => <p>Loading...</p>, // optional fallback
});

const EventHomePage = () => {
  return <CreateEvent />;
};

export default EventHomePage;
