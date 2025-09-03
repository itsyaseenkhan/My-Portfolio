import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TableHeader ,Table, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { getAllAbouts, } from '@/Store/Slices/AboutSlice';
import { getAllProjects } from '@/Store/Slices/projectSlice';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
 const { user } = useSelector((state) => state.user);
 const {projects} =useSelector((state) => state.project);
 const { skills } =useSelector((state) => state.skill);
 const {  timeline } = useSelector((state)=> state.timeline )
 const { loading, error } = useSelector((state) => state.about);
const { abouts,  } = useSelector((state) => state.about);


const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      const res = await axios.delete(
        `https://my-portfolio-q3dv.onrender.com/api/v1/AboutRouter/delete/${id}`,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      dispatch(getAllAbouts()); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };




 const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllProjects());
    dispatch(getAllAbouts());
  },[] );
  return ( 
    <>
     <div className="flex flex-col gap-4 sm:gap-6 sm:py-4 sm:pl-10 bg-gray-50 min-h-screen">
  <main className="grid flex-1 items-start gap-4 p-4 sm:p-6 md:gap-6 lg:grid-cols-2 xl:grid-cols-2">
    
    {/* Top Cards Section */}
    <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        
        {/* About Me */}
        <Card className="sm:col-span-2 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl border border-gray-200">
          <CardHeader className="p-4">
            <CardDescription className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {user.AboutMe}
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Link to={user.portfolioURL} target="_blank">
              <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md shadow hover:bg-blue-700 transition-colors">
                Visit Portfolio
              </button>
            </Link>
          </CardFooter>
        </Card>

        {/* Projects */}
        <Card className="flex flex-col justify-center bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl border border-gray-200 text-center py-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-2xl font-medium text-gray-800">Projects Completed</CardTitle>
            <CardTitle className="text-3xl font-bold text-blue-600">{projects?.length || 0}</CardTitle>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link to="/Manage/Project">
              <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-md shadow hover:bg-green-700 transition-colors">
                Manage Projects
              </button>
            </Link>
          </CardFooter>
        </Card>

        {/* Skills */}
        <Card className="flex flex-col justify-center bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl border border-gray-200 text-center py-4">
          <CardHeader className="pb-1">
            <CardTitle className="text-2xl font-45 text-gray-800">Complete Skills</CardTitle>
            <CardTitle className="text-3xl font-bold text-purple-600">{skills?.length || 0}</CardTitle>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link to="/Manage/Skills">
              <button className="px-3 py-1.5 bg-purple-600 text-white text-xs rounded-md shadow hover:bg-purple-700 transition-colors">
                Manage Skills
              </button>
            </Link>
          </CardFooter>
        </Card>

      </div>

     {/* Projects Table */}
    <Tabs>
      <TabsContent value="">
    <Card className="bg-white shadow-md rounded-2xl overflow-hidden">
      <CardHeader className="px-7 border-b">
        <CardTitle className="text-xl font-semibold">Projects</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Stack</TableHead>
              <TableHead>Deployed</TableHead>
              <TableHead>Update</TableHead>
              <TableHead className="text-right">Visit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.length > 0 ? (
              projects.map(element => (
                <TableRow key={element._id} className="hover:bg-gray-100 transition-colors">
                  <TableCell className="font-medium">{element.title}</TableCell>
                  <TableCell>{element.stack}</TableCell>
                  <TableCell>{element.deployed}</TableCell>
                  <TableCell>
                    <Link to={`/update/Project/${element._id}`}>
                      <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        Update
                      </button>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={element.projectLink || ""} target="_blank">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Visit
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  You have not added any Project
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>

         {/* Skills & Timelines */}
<Tabs defaultValue="Skills">
  <TabsContent value="Skills" className="grid gap-6 lg:grid-cols-2">
    
    {/* Skills List */}
    <Card className="bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-2xl border border-blue-100">
      <CardHeader className="px-7 py-5 border-b border-blue-100">
        <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-5 p-5">
        {skills?.length > 0 ? (
          skills.map(element => (
            <Card 
              key={element._id} 
              className="bg-white border border-gray-200 hover:border-blue-300 transition-all p-5 rounded-xl shadow-sm hover:shadow-md"
            >
              <CardHeader className="p-0">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {element.title}
                </CardTitle>
              </CardHeader>
              <CardFooter className="mt-3 p-0 flex flex-col gap-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Proficiency</span>
                  <span className="text-blue-600 font-medium">{element.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${element.proficiency}%` }}
                    className="h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
                  />
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-gray-500 text-center col-span-2 py-8">
            <p className="text-lg">You have not added any skills yet</p>
          </div>
        )}
      </CardContent>
    </Card>

          {/* Timeline */}
          <Card className="bg-white shadow-md rounded-2xl">
            <CardHeader className="px-7 flex items-center justify-between flex-row border-b">
              <CardTitle className="text-xl font-semibold">Timelines</CardTitle>
              <Link to="/Manage/Timeline">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Manage Timeline</button>
              </Link>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeline?.length > 0 ? (
                    timeline.map(element => (
                      <TableRow key={element._id} className="hover:bg-gray-100 transition-colors">
                        <TableCell className="font-medium">{element.title}</TableCell>
                        <TableCell>{element.timeline.from}</TableCell>
                        <TableCell>{element.timeline.to || "Present"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                        You have not added any Timeline
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>    
        </TabsContent>
      </Tabs>
<Tabs defaultValue="abouts">
  <TabsContent value="abouts">
    <Card className="bg-white shadow-md rounded-2xl overflow-hidden">
      <CardHeader className="px-7 flex items-center justify-between flex-row border-b">
        <CardTitle className="text-xl font-semibold">About Me</CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        {error && (
          <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
        )}
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading...</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Update</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {abouts && abouts.length > 0 ? (
                    abouts.map(({ _id, title, description, image }) => (
                      <TableRow
                        key={_id}
                        className="hover:bg-gray-100 transition-colors"
                      >
                        <TableCell>
                          <img
                            src={image?.url || ""}
                            alt={title}
                            className="w-24 h-16 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{title}</TableCell>
                        <TableCell className="max-w-xl break-words">
                          {description}
                        </TableCell>
                        <TableCell>
                          <Link to={`/Update/About/${_id}`}>
                            <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                              Update
                            </button>
                          </Link>
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => handleDelete(_id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No About entries found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card Layout */}
            <div className="space-y-4 md:hidden">
              {abouts && abouts.length > 0 ? (
                abouts.map(({ _id, title, description, image }) => (
                  <div
                    key={_id}
                    className="bg-white border rounded-lg shadow-sm p-4 space-y-3"
                  >
                    <img
                      src={image?.url || ""}
                      alt={title}
                      className="w-full h-48 object-cover rounded"
                    />
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-gray-600 break-words">{description}</p>
                    <div className="flex justify-between">
                      <Link to={`/Update/About/${_id}`}>
                        <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(_id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-gray-500">
                  No About entries found.
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>



           
    </div>
  </main>
</div>

      
    </>
  )
}

export default Dashboard
 