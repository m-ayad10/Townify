import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Game from "../game/Game";
import Navbar from "@/components/invite/Navbar";
import { fetchSpaceBySlug, checkSpaceAccess } from "@/api/SpaceApi";
import Loading from "@/components/JoinRoom/Loading";
import BlockedUser from "@/components/JoinRoom/BlockedUser";
import SpaceNotFound from "@/components/JoinRoom/SpaceNotFound";
import { useSocket } from "@/hooks/useSocket";
import { useSelector } from "react-redux";
import type { RootState } from "@/Redux/stroe";
import type { AvatarSchema } from "@/types/type";

type SpaceState = "loading" | "allowed" | "blocked" | "not-found";

export default function Space() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user);
  const { avatars } = useSelector((state: RootState) => state.avatars);

  const [state, setState] = useState<SpaceState>("loading");
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [spaceId, setSpaceId] = useState<string | null>(null);

  useSocket(spaceId ?? undefined, user?.id, user?.name, user?.avatarId ?? undefined);

  const avatarMap = useMemo(() => {
    const map: Record<string, AvatarSchema> = {};
    avatars.forEach((avatar) => {
      map[avatar.id] = avatar;
    });
    return map;
  }, [avatars]);

  useEffect(() => {
    if (!slug || !user) return;

    const loadSpace = async () => {
      try {
        const room = await checkSpaceAccess(slug);
        const { spaceId } = room.data;

        const res = await fetchSpaceBySlug(slug);
        setMapUrl(res.data.space.map.configJson);

        setSpaceId(spaceId);
        setState("allowed");
      } catch (error: any) {
        const message = error?.response?.data?.message;

        if (message === "BLOCKED") setState("blocked");
        else if (message === "NO_ACCESS") navigate(`/join/${slug}`);
        else if (message === "SPACE_NOT_FOUND") setState("not-found");
        else navigate(`/join/${slug}`);
      }
    };
    loadSpace();
  }, [slug, user, navigate]);

    if (!user || !spaceId ) return;


  return (
    <div className="">
      {/* Background + UI (only when NOT allowed) */}
      {state !== "allowed" && (
        <div className="min-h-screen w-full bg-[#f8fafc] relative">
          {/* Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
              linear-gradient(135deg, 
                rgba(248,250,252,1) 0%, 
                rgba(219,234,254,0.7) 30%, 
                rgba(165,180,252,0.5) 60%, 
                rgba(129,140,248,0.6) 100%
              ),
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(199,210,254,0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(224,231,255,0.3) 0%, transparent 60%)
            `,
            }}
          />

          <div className="relative">
            <Navbar />

            {state === "loading" && <Loading />}
            {state === "blocked" && <BlockedUser />}
            {state === "not-found" && <SpaceNotFound />}
          </div>
        </div>
      )}

      {state === "allowed" && mapUrl && (
        <div className="w-screen h-screen">
          <Game
            mapUrl={mapUrl}
            avatarMap={avatarMap}
            localPlayer={{
              roomId : spaceId,
              userId: user.id,
              name: user.name,
              avatarId: user.avatarId!,
            }}
          /> {/* // Game component mounts */}
        </div>
      )}
    </div>
  );
}
