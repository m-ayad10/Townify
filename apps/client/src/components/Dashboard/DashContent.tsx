import { useEffect, useRef, useState } from "react";
import { Check, Link, MoreVertical, Trash } from "lucide-react";
import { Input } from "../ui/input";
import { type DashboardNavProps } from "@/types/type";
import CreateSpaceModal from "@/components/Dashboard/CreateSpaceModal";
import JoinRoomModal from "./JoinRoomModal";
import { deleteSpace } from "@/api/SpaceApi";
import { MapCardShimmer } from "./MapCardShimmer";
import { RainbowButton } from "../ui/rainbow-button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { deleteUserSpace } from "@/Redux/Slice/UserSpace/UserSpaceSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/Redux/stroe";

function DashContent({
  CreateRoom,
  setCreateRoom,
  JoinRoom,
  setJoinRoom,
}: DashboardNavProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [copy, setCopy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userMap = useSelector((state: RootState) => state.userSpace);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside (optional - remove if you want original behavior)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlecopy = async (slug: string) => {
    const inviteLink = `${window.location.origin}/join/${slug}`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopy(true);
      toast.success("Invite link copied!");
      setTimeout(() => {
        setCopy(false);
        setActiveMenuId(null);
      }, 700);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const deleteMap = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await deleteSpace(id);
      console.log(response.data);
      dispatch(deleteUserSpace({ id }));
      toast.success("Space deleted successfully");
      setActiveMenuId(null);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete space"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-end py-8">
        <Input className="w-64 bg-white" placeholder="Search Space" />
      </div>

      <div className="flex flex-wrap gap-10 items-center py-8">
        {userMap?.spaces &&
        Array.isArray(userMap.spaces) &&
        userMap.spaces.length > 0 ? (
          userMap.spaces.map((map) => (
            <div key={map?.id} className="">
              <div className="">
                <img
                  onClick={() => navigate(`/space/manage/${map?.slug}`)}
                  className="rounded-2xl h-72 w-90 cursor-pointer"
                  src={map?.map?.thumbnail}
                  alt={map?.name || "Space thumbnail"}
                />
              </div>

              <div className="flex flex-col px-1 py-2">
                <div className="flex justify-between items-center">
                  <h1 className="font-bricogrotesque text-base font-bold truncate max-w-[200px]">
                    {map?.name}
                  </h1>
                  <div className="flex gap-2 items-center">
                    <h1 className="text-xs">2 days ago</h1>
                   <MoreVertical 
                      onClick={() => setActiveMenuId(() => activeMenuId === map?.id ? null : map?.id)} 
                      className="w-5 h-5 cursor-pointer hover:bg-amber-50 rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end">

                {activeMenuId == map?.id && (
                  <div className="absolute ">
                    <div className="flex flex-col text-sm font-medium bg-background py-2  rounded-lg">
                      <h1 onClick={() => handlecopy(map?.slug)}
                        className='hover:bg-[#f2f7fc] px-4 py-2 cursor-pointer flex justify-between items-center gap-2 font-bricogrotesque'>
                        Copy URL {copy ? <Check className='h-4 w-3' /> : <Link className='h-4 w-3' />}
                      </h1>
                      <h1 onClick={() => deleteMap(map?.id)}
                        className='hover:bg-[#f2f7fc] font-bricogrotesque px-4 py-2 cursor-pointer flex gap-2 items-center'>
                        {deletingId === map?.id ? "Deleting...." : "Delete Space"} <Trash className='h-4 w-3' />
                      </h1>
                    </div>
                  </div>
                )}
                </div>
              </div>
            </div>
          ))
        ) : // Show shimmer or empty state
        userMap?.status === "loading" || userMap?.status === "idle" ? (
          <div className="flex flex-wrap gap-6">
            {[...Array(3)].map((_, index) => (
              <MapCardShimmer key={index} />
            ))}
          </div>
        ) : null}
      </div>

      {/* Show empty state only when loading is done AND there are no spaces */}
      {userMap?.status === "succeeded" &&
        (!userMap?.spaces || userMap.spaces.length === 0) && (
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-xl font-bold font-bricogrotesque">
                No spaces yet. Create one to get started.
              </h1>
              <RainbowButton onClick={() => setCreateRoom(true)}>
                Create Space
              </RainbowButton>
            </div>
          </div>
        )}

      {/* Create Space Modal */}
      <CreateSpaceModal CreateRoom={CreateRoom} setCreateRoom={setCreateRoom} />

      {/* Join Space Modal */}
      <JoinRoomModal JoinRoom={JoinRoom} setJoinRoom={setJoinRoom} />
    </div>
  );
}

export default DashContent;
