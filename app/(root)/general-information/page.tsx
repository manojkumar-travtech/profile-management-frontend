import { PageLayout } from "@/components/layout/PageLayout";
import React from "react";
import GeneralInformationContent from "./GeneralInformation";

const GeneralInformationPage = () => {
  return (
    <PageLayout
      title="General Information"
      subtitle="Manage your general account information and settings."
    >
        <GeneralInformationContent/>
    </PageLayout>
  );
};

export default GeneralInformationPage;
