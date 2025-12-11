import { useState } from 'react'
import { MoreVertical } from "lucide-react";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Building, Rocket } from "lucide-react";
import { BorderBeam } from '../ui/border-beam';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';

interface DashboardNavProps {
  CreateRoom: boolean;
  setCreateRoom: React.Dispatch<React.SetStateAction<boolean>>;
  JoinRoom: boolean,
  setJoinRoom: React.Dispatch<React.SetStateAction<boolean>>;
}

function DashContent({ CreateRoom, setCreateRoom, JoinRoom, setJoinRoom }: DashboardNavProps) {

  const [dashboard, setDashboard] = useState<boolean>(false);

  return (
    <div>
      <div className="flex justify-end py-8">
        <Input className='w-64 bg-white' placeholder="Search Space" />
      </div>

      {/* This is Map list page */}
      <div className="flex flex-wrap gap-10 items-center py-8">

        <div className="">
          <div className="">
            <img
              className='rounded-3xl'
              src="https://res.cloudinary.com/djbawwbzi/image/upload/v1765434825/Screenshot_2025-12-11_120316_nfsuva.png"
              alt="" />
          </div>
          <div className="flex justify-between px-1 py-2">
            <h1>Bridgeon</h1>
            <div className="flex gap-2 items-center">
              <h1 className='text-xs'>2 days ago</h1>
              <MoreVertical onClick={() => setDashboard(true)} className="w-5 h-5 cursor-pointer hover:bg-amber-50 rounded-lg" />
            </div>
            {dashboard && (
              <div className="absolute left-90 top-123 ">
                <div className="flex flex-col text-sm font-medium bg-background py-2  rounded-lg">
                  <h1 onClick={() => setDashboard(false)} className='hover:bg-[#f2f7fc] px-4 py-2 cursor-pointer'>Edit Map</h1>
                  <h1 onClick={() => setDashboard(false)} className='hover:bg-[#f2f7fc] px-4 py-2 cursor-pointer'>Copy URL</h1>
                  <h1 onClick={() => setDashboard(false)} className='hover:bg-[#f2f7fc] px-4 py-2 cursor-pointer'>Delete URL</h1>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <div className="">
            <img
              className='rounded-3xl'
              src="https://res.cloudinary.com/djbawwbzi/image/upload/v1765434825/Screenshot_2025-12-11_120316_nfsuva.png"
              alt="" />
          </div>
          <div className="flex justify-between px-1 py-2">
            <h1>Bridgeon</h1>
            <div className="flex gap-2 items-center">
              <h1 className='text-xs'>2 days ago</h1>
              <MoreVertical onClick={() => setDashboard(true)} className="w-5 h-5 cursor-pointer hover:bg-amber-50 rounded-lg" />
            </div>
            {dashboard && (
              <div className="absolute left-90 top-123 ">
                <div className="flex flex-col text-sm font-medium bg-background py-2  rounded-lg">
                  <h1 onClick={() => setDashboard(false)} className='hover:bg-[#f2f7fc] px-4 py-2 cursor-pointer'>Edit Map</h1>
                  <h1 onClick={() => setDashboard(false)} className='hover:bg-[#f2f7fc] px-4 py-2 cursor-pointer'>Copy URL</h1>
                  <h1 onClick={() => setDashboard(false)} className='hover:bg-[#f2f7fc] px-4 py-2 cursor-pointer'>Delete URL</h1>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <div className="">
            <img
              className='rounded-3xl'
              src="https://res.cloudinary.com/djbawwbzi/image/upload/v1765434825/Screenshot_2025-12-11_120316_nfsuva.png"
              alt="" />
          </div>
          <div className="flex justify-between px-1 py-2">
            <h1>Bridgeon</h1>
            <div className="flex gap-2 items-center">
              <h1 className='text-xs'>2 days ago</h1>
              <MoreVertical onClick={() => setDashboard(true)} className="w-5 h-5 cursor-pointer hover:bg-amber-50 rounded-lg" />
            </div>
            {dashboard && (
              <div className="absolute left-90 top-123 ">
                <div className="flex flex-col text-sm font-medium bg-background py-2  rounded-lg">
                  <h1 onClick={() => setDashboard(false)} className='hover:bg-[#f2f7fc] px-4 py-2 cursor-pointer'>Edit Map</h1>
                  <h1 onClick={() => setDashboard(false)} className='hover:bg-[#f2f7fc] px-4 py-2 cursor-pointer'>Copy URL</h1>
                  <h1 onClick={() => setDashboard(false)} className='hover:bg-[#f2f7fc] px-4 py-2 cursor-pointer'>Delete URL</h1>
                </div>
              </div>
            )}
          </div>
        </div>


      </div>

      {/* Create Space Modal/ */}
      {CreateRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Card className="relative w-[500px] rounded-2xl shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className='font-bricogrotesque'>Create Space</CardTitle>
              <CardDescription className='font-bricogrotesque'>Choose your office template.</CardDescription>
            </CardHeader>

            <CardContent >
              <div className="flex gap-4">
                <img
                  className="rounded-xl w-96 h-44 object-cover"
                  src="https://res.cloudinary.com/djbawwbzi/image/upload/v1765434825/Screenshot_2025-12-11_120316_nfsuva.png"
                  alt=""
                />

                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Building className="w-4 h-4 font-bricogrotesque" />
                    Office
                  </Button>

                  <Button variant="outline" className="flex items-center gap-2 font-bricogrotesque">
                    <Rocket className="w-4 h-4" />
                    Startup
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-3">
              <Button className='font-bricogrotesque' variant="outline" onClick={() => setCreateRoom(false)}>Cancel</Button>
              <Button className='font-bricogrotesque'>Create</Button>
            </CardFooter>

            <BorderBeam duration={8} size={100} />
          </Card>
        </div>
      )}


      {/* Join Space Modal/ */}
      {JoinRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Card className="relative w-[500px] rounded-2xl shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className='font-bricogrotesque'>Join Space</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>

            <CardContent >
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 gap-1">
                    <Label htmlFor="email" className='font-bricogrotesque'>Enter Space url</Label>
                    <Input className='font-bricogrotesque' id="email" type="email" placeholder="Paste Url..." />
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex justify-end gap-3">
              <Button 
                className='font-bricogrotesque' variant="outline" onClick={() => setJoinRoom(false)}>Cancel</Button>
              <Button className='font-bricogrotesque'>Create</Button>
            </CardFooter>

            <BorderBeam duration={8} size={100} />
          </Card>
        </div>
      )}





    </div>
  )
}

export default DashContent
