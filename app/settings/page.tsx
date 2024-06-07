"use client";
import React from "react";
import { ProjectsComponent } from "@/components/settings";
import { Projects } from "@/types/settings.types";
import { addData, updateByColAndId } from "@/utils/firebase";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const { userId, project, loading, setProject } = useApp();
  const router = useRouter();
  const handleSubmit = async (settings: Projects) => {
    try {
      toast.loading("Saving...");
      let projectId = project?.id;
      if (!!project?.userId) {
        await updateByColAndId("projects", project.id, {
          ...settings,
          userId: userId,
        });
      } else {
        const id = await addData("projects", {
          ...settings,
          userId: userId,
        });
        projectId = id;
      }
      setProject({
        ...settings,
        userId: userId,
        id: projectId as string,
      });
      toast.dismiss();
      toast.success("Projects saved!");
      router.push("/");
    } catch (error) {
      toast.dismiss();
      toast.error("Error al agregar configuracion");
    }
  };

  return (
    <Loading isLoading={!userId || loading}>
      <ProjectsComponent
        project={project}
        onSubmit={(settings) => handleSubmit(settings)}
      />
    </Loading>
  );
}
