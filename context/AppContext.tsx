"use client";
import { CompleteProject } from "@/types/settings.types";
import { getByColAndFilter } from "@/utils/firebase";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type AppContextType = {
  userId: string | null;
  loading: boolean;
  projects: CompleteProject[] | null;
  project: CompleteProject | null;
  setProject: Dispatch<SetStateAction<CompleteProject | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProviderProps = {
  children: ReactNode;
  userId: string | null;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
  userId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [projects, setProjects] = useState<CompleteProject[] | null>(null);
  const [project, setProject] = useState<CompleteProject | null>(null);
  const [loading, setLoading] = useState(true);
  const getProjects = async () => {
    try {
      if (!userId) return;
      const data = await getByColAndFilter("projects", "userId", userId);
      setProjects(data as unknown as CompleteProject[]);
    } catch (error) {
      toast.error("Error while fetching Projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) getProjects();
  }, [project, userId]);

  useEffect(() => {
    console.log(pathname);
    if (!userId && pathname !== "/sign-in" && pathname !== "/sign-up") {
      router.replace(process.env.NEXT_PUBLIC_BASE_URL + "/sign-in" || "");
    }
  }, [userId, pathname]);

  const contextValue: AppContextType = {
    userId,
    projects,
    loading,
    project,
    setProject,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within a AppContextProvider");
  }

  return context;
};
