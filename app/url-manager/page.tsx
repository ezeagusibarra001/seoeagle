"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { seoTitleModel } from "@/models/ia";
import { addMultipleDocumentsByCol } from "@/utils/firebase";
import { Backspace, Trash } from "@phosphor-icons/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UrlManager() {
  const [urls, setUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { project } = useApp();

  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragment locator
    );
    return !!urlPattern.test(url);
  };

  const handleAddUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const urlInput = form.elements.namedItem("url") as HTMLInputElement;
    const newUrl = urlInput.value.trim();

    if (newUrl) {
      if (isValidUrl(newUrl)) {
        setUrls((prevUrls) => [...prevUrls, newUrl]);
        urlInput.value = "";
        setError(null);
      } else {
        setError("Please enter a valid URL.");
      }
    }
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    setUrls((prevUrls) => prevUrls.filter((url) => url !== urlToRemove));
  };

  const handleGenerate = async () => {
    try {
      toast.loading("Generando...");
      if (urls.length === 0) {
        toast.dismiss();
        toast.error("No URLs added yet.");
        return;
      }
      const promisesArray = urls.map((url) => {
        const prompt = seoTitleModel({
          company: project?.company || "",
          companyCountry: project?.companyCountry || "",
          whatCompanyDo: project?.whatCompanyDo || "",
          url,
          example: {
            url: project?.urlExample || "",
            title: project?.titleExample || "",
          },
        });
        return axios.get(`/api/gemini?prompt=${prompt}`);
      });

      const responses = await Promise.all(promisesArray);
      const generatedTitles = responses.map((response) => ({
        ...response.data.resources,
        projectId: project?.id,
      }));
      await addMultipleDocumentsByCol("titles", generatedTitles);
      toast.dismiss();
      toast.success("Contenido generado!");
    } catch (error) {
      toast.dismiss();
      toast.error("Error al generar contenido");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">URL Manager</h1>
        <Button disabled={urls.length === 0} onClick={handleGenerate}>
          Generate Content
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <form onSubmit={handleAddUrl} className="flex items-center space-x-4">
          <Input name="url" placeholder="Enter a URL" />
          <Button type="submit">Add URL</Button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-500">
                <th className="px-4 py-3 text-left font-medium">URL</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3">{url}</td>
                  <td className="px-4 py-3 flex items-center space-x-2">
                    <Button onClick={() => handleRemoveUrl(url)}>
                      <Trash className="h-5 w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {urls.length === 0 && (
            <p className="text-center p-4">No URLs added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
