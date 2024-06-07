"use client";
import { useApp } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import Table from "@/components/ui/table";
import toast from "react-hot-toast";
import { getByColAndFilter } from "@/utils/firebase";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";

export default function ProductDetail() {
  const { project } = useApp();
  const router = useRouter();
  const [titles, setTitles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getTitles = async () => {
    try {
      if (!project) {
        throw new Error("projectId not found");
      }
      const res = await getByColAndFilter("titles", "projectId", project.id);
      console.log(res);
      setTitles(res);
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
    getTitles();
  }, []);

  return (
    <div className="p-8">
      <Loading isLoading={!project || loading}>
        <Table
          title={`${project?.company} - ${project?.companyCountry}`}
          description={project?.whatCompanyDo}
          data={titles.map((t) => ({
            key: t.id,
            content: [<div>{t.url}</div>, <div>{t.title}</div>],
          }))}
          cols={["URL", "TITLE"]}
        />
      </Loading>
    </div>
  );
}
