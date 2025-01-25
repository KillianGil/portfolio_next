import React from "react";
import ZoomImage from "@/components/ui/ZoomImage";
import { TabsDemo } from "@/components/ui/tabs-projet";

const ProjectsPage = () => {
  return (
    <div className="bg-[#020202] text-white">
      <div>
        <ZoomImage />
      </div>
      <div className="mt-16">
        <TabsDemo />
      </div>
    </div>
  );
};

export default ProjectsPage;