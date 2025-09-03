import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {Table, TableBody, TableCell,TableHead,TableHeader,TableRow,} from '@/components/ui/table';
import {clearAllTimelineError,deleteTimeline,getAllTimeline,resetTimelineSlice,} from '@/Store/Slices/timelineSlice';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { Trash, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageTimeline = () => {
  const { loading, error, message, timeline } = useSelector((state) => state.timeline);
  const [timelineId, setTimelineId] = useState('');
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handledeleteTimeline = (id) => {
    setTimelineId(id);
    dispatch(deleteTimeline(id));
  };

  const handleReturnToDashboard = () => {
    navigateTo('/');
  };

  useEffect(() => {
    dispatch(getAllTimeline());
  },[dispatch]);


  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineError()); 
    }
  },[dispatch, error]);


  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, loading, message, error]);

  return (
  <div className="flex min-h-screen w-full flex-col bg-muted/40 p-6">
  <Tabs defaultValue="week">
    <TabsContent value="week">
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 px-6 py-4 border-b border-gray-200">
          <CardTitle className="text-2xl font-semibold text-indigo-700">Manage Your Timeline</CardTitle>
          <Button
            className="w-fit bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md transition"
            onClick={handleReturnToDashboard}
          >
            Return to Dashboard
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 p-6">
          <Table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <TableHeader>
              <TableRow className="bg-indigo-100">
                <TableHead className="px-4 py-3 text-left font-medium text-indigo-900">Title</TableHead>
                <TableHead className="hidden md:table-cell px-4 py-3 text-left font-medium text-indigo-900">Description</TableHead>
                <TableHead className="hidden md:table-cell px-4 py-3 text-left font-medium text-indigo-900">From</TableHead>
                <TableHead className="hidden md:table-cell px-4 py-3 text-left font-medium text-indigo-900">To</TableHead>
                <TableHead className="px-4 py-3 text-right font-medium text-indigo-900">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeline && timeline.length > 0 ? (
                timeline.map((element) => (
                  <TableRow
                    key={element._id}
                    className="bg-white even:bg-gray-50 hover:bg-indigo-50 transition"
                  >
                    <TableCell className="px-4 py-3 font-semibold text-gray-800">{element.title}</TableCell>
                    <TableCell className="hidden md:table-cell px-4 py-3 text-gray-600">{element.description}</TableCell>
                    <TableCell className="hidden md:table-cell px-4 py-3 text-gray-600">{element.timeline.from}</TableCell>
                    <TableCell className="hidden md:table-cell px-4 py-3 text-gray-600">
                      {element.timeline.to ? element.timeline.to : "____"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition"
                        onClick={() => handledeleteTimeline(element._id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="px-4 py-6 text-center text-gray-500 italic">
                    You have not added any timeline.
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

export default ManageTimeline;
