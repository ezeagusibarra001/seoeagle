"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { CompleteProject, Projects } from "@/types/settings.types";

export function ProjectsComponent({
  onSubmit,
  project,
}: {
  project: CompleteProject | null;
  onSubmit: (project: Projects) => void;
}) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Model Projects</h1>
          <p className="mt-2 text-lg text-gray-500 ">
            Customize the parameters of your AI model to optimize its
            performance.
          </p>
        </div>
        <Card>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                company: { value: string };
                companyCountry: { value: string };
                whatCompanyDo: { value: string };
                urlExample: { value: string };
                titleExample: { value: string };
              };
              const settings = {
                company: target.company.value,
                companyCountry: target.companyCountry.value,
                whatCompanyDo: target.whatCompanyDo.value,
                urlExample: target.urlExample.value,
                titleExample: target.titleExample.value,
              };
              onSubmit(settings);
            }}
          >
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
              <CardDescription>
                Adjust the settings for your AI model to fine-tune its behavior.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    defaultValue={project?.company}
                    id="company"
                    required
                    name="company"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyCountry">Company Country</Label>
                  <Input
                    defaultValue={project?.companyCountry}
                    id="companyCountry"
                    required
                    name="companyCountry"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatCompanyDo">What company do?</Label>
                  <Input
                    defaultValue={project?.whatCompanyDo}
                    id="whatCompanyDo"
                    required
                    name="whatCompanyDo"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="urlExample">URL Example</Label>
                  <Input
                    defaultValue={project?.urlExample}
                    id="urlExample"
                    required
                    name="urlExample"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleExample">Title Response Example</Label>
                  <Input
                    defaultValue={project?.titleExample}
                    id="titleExample"
                    required
                    name="titleExample"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Model Metadata</CardTitle>
            <CardDescription>
              View and manage the metadata associated with your AI model.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Creation Date</Label>
                <p className="text-gray-500 ">May 31, 2024</p>
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <p className="text-gray-500 ">1.2.3</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Accuracy</Label>
                <p className="text-gray-500 ">92.5%</p>
              </div>
              <div className="space-y-2">
                <Label>F1 Score</Label>
                <p className="text-gray-500 ">0.89</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Training Samples</Label>
                <p className="text-gray-500 ">10,000</p>
              </div>
              <div className="space-y-2">
                <Label>Validation Samples</Label>
                <p className="text-gray-500 ">2,000</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Training Time</Label>
                <p className="text-gray-500 ">3 hours</p>
              </div>
              <div className="space-y-2">
                <Label>Inference Time</Label>
                <p className="text-gray-500 ">50 ms</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Model Size</Label>
                <p className="text-gray-500 ">125 MB</p>
              </div>
              <div className="space-y-2">
                <Label>Parameters</Label>
                <p className="text-gray-500 ">2.5 million</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>View Version History</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
