"use client";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { projects, setProject, project } = useApp();
  const router = useRouter();



  //fix
  const handleNewProject = () => {
    setProject(null);
    router.push("/settings");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 p-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        SEO Eagle Projects
      </h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none mb-4"
        onClick={handleNewProject}
      >
        New Project
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects?.map((p) => (
          <button
            onClick={() => {
              setProject(p);
              router.push(`/projects/${p.id}`);
            }}
            key={p.id}
            className={`${
              p.id === project?.id
                ? "bg-blue-500 text-white font-bold"
                : "bg-white"
            } rounded-lg shadow-md p-6 hover:shadow-lg hover:bg-blue-500/50`}
          >
            <h3>{p.company}</h3>
            <p
              className={`${
                p.id === project?.id ? "text-white" : "text-gray-600"
              }`}
            >
              {p.companyCountry}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
