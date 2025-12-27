import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent} from "../components/ui/card";

import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {

  Users,
  Settings,
  UserPlus,
  Copy,
  Trash2,
} from "lucide-react";
import InvitationsTab from "../components/EditSpace/InvitationSpace";
import SpaceMember from "../components/EditSpace/SpaceMember";
import { useParams } from "react-router-dom";
import { fetchSpaceBySlug } from "@/api/SpaceApi";
import { toast } from "sonner";
import type { SpaceI } from "@repo/types";
import SpaceMemberShimmer from "../components/EditSpace/SpaceMemberShimmer";
import InvitationsShimmer from "../components/EditSpace/InvitationShimmer";
import EditSpace from "@/components/EditSpace/EditSpace";
import SpaceInfoShimmer from "@/components/EditSpace/SpaceInfoShimmer";

function EditSpacePage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [spaceDetails, setSpaceDetails] = useState<SpaceI | null>(null);

  useEffect(()=>{
    setLoading(true);
    if(!slug) return
    async function fetchSpaceDetails(){
      try{
        const response = await fetchSpaceBySlug(slug||'');
        setSpaceDetails((_)=>response.data.space);
        console.log("Space details:", response.data);
        setLoading(false);
      }catch(error){
        toast.error("Failed to fetch space details.");
        console.error("Error fetching space details:", error);
        setLoading(false);
      }
    }
    fetchSpaceDetails()
  },[slug])
 





  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-bricogrotesque tracking-tight">
          Edit Space
        </h1>
        <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
          Manage space details, map, and members
        </p>
      </div>

      {/* Main Tabs Section */}
      <div className="space-y-6">
        {/* Tabs Navigation */}
        <Tabs defaultValue="edit" className="w-full">
          <div className="border-b">
            <TabsList className="inline-flex h-10 w-full md:w-auto items-center justify-start md:justify-center bg-transparent p-0">
              <TabsTrigger
                value="edit"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none"
              >
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Space Details</span>
                <span className="sm:hidden">Details</span>
              </TabsTrigger>
              <TabsTrigger
                value="members"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none"
              >
                <Users className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Members</span>
                <span className="sm:hidden">Members</span>
                
              </TabsTrigger>
              <TabsTrigger
                value="invited"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Invitations</span>
                <span className="sm:hidden">Invites</span>

              </TabsTrigger>
            </TabsList>
          </div>

          {/* Space Details Tab */}
          <TabsContent value="edit" className="space-y-6 mt-6">
            {
              loading ? <SpaceInfoShimmer /> :<EditSpace spaceDetails={spaceDetails} setSpaceDetails={setSpaceDetails}  />
            }
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="mt-6">
            {
              loading ? <SpaceMemberShimmer /> : <SpaceMember spaceDetails={spaceDetails} setSpaceDetails={setSpaceDetails} />
            }
          </TabsContent>

          {/* Invitations Tab */}
          <TabsContent value="invited" className="mt-6">
            {
              loading ? <InvitationsShimmer /> :<InvitationsTab spaceDetails={spaceDetails} setSpaceDetails={setSpaceDetails} />
            }    
          </TabsContent>
        </Tabs>

        <div className="md:hidden">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full justify-start">
                  <Copy className="h-4 w-4 mr-3" />
                  Copy Invite Link
                </Button>
                <Separator />
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-3" />
                  Delete Space
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EditSpacePage;


