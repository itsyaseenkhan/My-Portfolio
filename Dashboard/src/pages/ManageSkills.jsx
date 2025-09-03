import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import {
  clearAllSkillErrors,
  updateSkill,
  resetSkillSlice,
  deleteSkill,
  getallSkills,
} from "../Store/Slices/skillSlice";

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => navigateTo("/");

  const { loading, skills = [], error, message } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  // local state: proficiency per skill (so changing one doesn't affect others)
  const [proficiencies, setProficiencies] = useState({});

  useEffect(() => {
    // load skills on mount
    dispatch(getallSkills());
  }, [dispatch]);

  useEffect(() => {
    // when skills change, initialize local state
    const map = {};
    (skills || []).forEach((s) => {
      map[s._id] = s.proficiency ?? 0;
    });
    setProficiencies((prev) => ({ ...map, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills.length]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getallSkills());
    }
  }, [dispatch, error, message]);

  const handleInputChange = (id, value) => {
    // ensure numeric and within 0-100
    let num = Number(value);
    if (Number.isNaN(num)) num = 0;
    num = Math.max(0, Math.min(100, Math.round(num)));
    setProficiencies((p) => ({ ...p, [id]: num }));
  };

  const handleSaveSkill = (id) => {
    const prof = proficiencies[id] ?? 0;
    // dispatch update action — using same signature as your original code
    dispatch(updateSkill(id, prof));
  };

  const handleDeleteSkill = (id) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    dispatch(deleteSkill(id));
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 p-6">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card className="rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b bg-white">
              <CardTitle className="text-lg sm:text-xl font-semibold">Manage Your Skills</CardTitle>
              <div className="flex gap-2 items-center">
                <Button variant="outline" className="text-sm" onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-5">
              {skills?.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {skills.map((skill) => {
                    const prof = proficiencies[skill._id] ?? skill.proficiency ?? 0;
                    return (
                      <Card key={skill._id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-md font-semibold text-gray-800">{skill.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">{skill.description || ""}</p>
                            </div>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => handleDeleteSkill(skill._id)}
                                    className="inline-flex items-center justify-center rounded-md p-2 text-red-500 hover:bg-red-50 transition"
                                    aria-label="Delete skill"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="left">Delete</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                          {/* progress bar + percentage */}
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-1">
                              <Label className="text-sm">Proficiency</Label>
                              <span className="text-sm font-medium text-gray-700">{prof}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                              <div
                                className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all"
                                style={{ width: `${prof}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* controls */}
                        <div className="mt-4 flex items-center gap-2">
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={prof}
                            onChange={(e) => handleInputChange(skill._id, e.target.value)}
                            className="w-full"
                            aria-label={`Proficiency for ${skill.title}`}
                          />

                          <Input
                            type="number"
                            value={prof}
                            onChange={(e) => handleInputChange(skill._id, e.target.value)}
                            className="w-20"
                            min={0}
                            max={100}
                          />

                          <Button
                            className="px-3 py-1 text-sm"
                            onClick={() => handleSaveSkill(skill._id)}
                          >
                            Save
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  You have not added any skills yet.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
