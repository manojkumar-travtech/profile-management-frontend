import React from "react";
import TravelerMainPageLayout from "../../_components/TravelerMainPageLayout";
import UpcomingTripsMain from "./_components/UpcomingTripsMain";

const UpcomingTripspage = () => {
  return (
    <TravelerMainPageLayout
      title="Upcoming Trip"
      subtitle="Stay on track with alerts that notify you and your agent about upcoming journeys and key trip milestones."
    >
      <UpcomingTripsMain />
    </TravelerMainPageLayout>
  );
};

export default UpcomingTripspage;
