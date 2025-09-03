import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { toast } from 'react-toastify';
import {
  deleteProject,
  getAllProjects,
  clearAllProjectErrors,
  resetProjectSlice,
} from '@/Store/Slices/projectSlice';

const ManageProject = () => {
  const { error, projects, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleReturnToDashboard = () => navigateTo('/');

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 p-6">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card className="shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white border-b p-5">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Manage Your Projects
              </CardTitle>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                onClick={handleReturnToDashboard}
              >
                Return to Dashboard
              </Button>
            </CardHeader>

            {/* Table */}
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[700px]">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="text-gray-700 font-semibold">Banner</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Title</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Stack</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Deployed</TableHead>
                    <TableHead className="text-gray-700 font-semibold text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.map((element, index) => (
                      <TableRow
                        key={element._id}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
                      >
                        {/* Banner */}
                        <TableCell>
                          <img
                            src={element.projectBanner?.url}
                            alt={element.title}
                            className="w-14 h-14 rounded-lg object-cover shadow-sm"
                          />
                        </TableCell>

                        {/* Title */}
                        <TableCell className="font-medium text-gray-800">
                          {element.title}
                        </TableCell>

                        {/* Stack */}
                        <TableCell className="text-gray-600">{element.stack}</TableCell>

                        {/* Deployed */}
                        <TableCell className="text-gray-600">{element.deployed}</TableCell>

                        {/* Actions */}
                        <TableCell className="flex gap-2 justify-center">
                          {/* View */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/view/Project/${element._id}`}>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                                  >
                                    <Eye className="h-5 w-5" />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">View</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {/* Edit */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/update/Project/${element._id}`}>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                                  >
                                    <Pencil className="h-5 w-5" />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">Edit</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {/* Delete */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                  onClick={() => handleDeleteProject(element._id)}
                                >
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-gray-500 py-10 text-lg"
                      >
                        You have not added any projects.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProject;
