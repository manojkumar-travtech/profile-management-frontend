import TravelerMainPageLayout from "../../_components/TravelerMainPageLayout";
import GeneralInfoMain from "./_components/GeneralInfoMain";

const GeneralInfoPage: React.FC = () => {
  return (
    <TravelerMainPageLayout
      title=" General Info"
      subtitle="Traveler details recorded for personalized experiences."
    >
      <GeneralInfoMain />
    </TravelerMainPageLayout>
  );
};

export default GeneralInfoPage;
