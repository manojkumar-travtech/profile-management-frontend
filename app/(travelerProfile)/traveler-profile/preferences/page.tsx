"use client";
import React from "react";

import TravelerMainPageLayout from "../../_components/TravelerMainPageLayout";
import PreferenceComponent from "./_components/PreferenceComponent";

const Preferencespage = () => {
  return (
    <TravelerMainPageLayout
      title="Preferences"
      subtitle="This section stores traveler preferences to enable personalized services, tailored recommendations, and efficient trip management."
    >
      <PreferenceComponent />
    </TravelerMainPageLayout>
  );
};

export default Preferencespage;
