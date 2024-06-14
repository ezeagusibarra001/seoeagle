"use client";
import { useApp } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import Table from "@/components/ui/table";
import toast from "react-hot-toast";
import { addMultipleDocumentsByCol, getByColAndFilter } from "@/utils/firebase";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { seoDescModel } from "@/models/ia";
import axios from "axios";

export default function ProductDetail() {
  const { project } = useApp();
  const router = useRouter();
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getGeneratedContent = async () => {
    try {
      if (!project) {
        throw new Error("projectId not found");
      }
      const titles = getByColAndFilter("titles", "projectId", project.id);
      const descriptions = getByColAndFilter("descriptions", "projectId", project.id);
      const [titlesResponse, descriptionsResponse] = await Promise.all([titles, descriptions]);
      
      const generatedContent = titlesResponse.map(titleItem => {
        const matchingDescription = descriptionsResponse.find(descItem => descItem.title === titleItem.title);
        return {
          projectId: titleItem.projectId,
          url: titleItem.url,
          title: titleItem.title,
          titleId: titleItem.id,
          descId: matchingDescription ? matchingDescription.id : null,
          description: matchingDescription ? matchingDescription.description : ""
        };
      });
      setGeneratedContent(generatedContent);
    } catch (error) {
      toast.error("Cannot fetch titles");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (!project) {
      router.push("/");
    }
    getGeneratedContent();
  }, []);

  const handleGenerate = async () => {
    try {
      toast.loading("Generando...");
      const promisesArray = generatedContent.filter((content) => !content.description).map((title) => {
        const prompt = seoDescModel({
          company: project?.company || "",
          companyCountry: project?.companyCountry || "",
          whatCompanyDo: project?.whatCompanyDo || "",
          title: title.title,
          example: {
            title: project?.titleExample || "",
            desc: project?.descExample || "",
          },
        });
        return axios.get(`/api/gemini?prompt=${prompt}`);
      });

      const responses = await Promise.all(promisesArray);
      const generatedDescriptions = responses.map((response) => ({
        ...response.data.resources,
        projectId: project?.id,
      }));
      await addMultipleDocumentsByCol("descriptions", generatedDescriptions);
      await getGeneratedContent()
      toast.dismiss();
      toast.success("Contenido generado!");
    } catch (error) {
      toast.dismiss();
      toast.error("Error al generar contenido");
    }
  };

  return (
    <div className="p-8">
      <Loading isLoading={!project || loading}>
        <Table
          title={`${project?.company} - ${project?.companyCountry}`}
          description={project?.whatCompanyDo}
          data={generatedContent.map((content) => ({
            key: content.id,
            content: [
              <div>{content.url}</div>,
              <div>{content.title}</div>,
              <div>{content.description|| "-"}</div>,
            ],
          }))}
          cols={["URL", "TITLE", "DESCRIPTION"]}
          add={
            <button
              className="flex items-center justify-center hover:animate-pulse gap-2 rounded-md px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              onClick={handleGenerate}
            >
              <p className="text-white">Generate all</p>
              <SparklesIcon className="w-6 h-6 text-white" />
            </button>
          }
          // callBack={
          //   <button
          //     className="flex items-center justify-center hover:animate-pulse gap-2 rounded-md px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          //     onClick={() => {}}
          //   >
          //     <p className="text-white">Generate</p>
          //     <SparklesIcon className="w-6 h-6 text-white" />
          //   </button>
          // }
        />
      </Loading>
    </div>
  );
}
