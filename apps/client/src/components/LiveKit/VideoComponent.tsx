import type { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import { useEffect, useRef } from "react";

function VideoComponent({
    track,
    participantIdentity,
    local
}: {
    track?: LocalVideoTrack | RemoteVideoTrack;
    participantIdentity: string;
    local?: boolean
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && track) {
            track.attach(videoRef.current);
        }

        return () => {
            if (track) {
                track.detach();
            }
        };
    }, [track]);

    const initials = participantIdentity
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="relative w-full h-full bg-zinc-800">
            {track ? (
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted={local}
                    autoPlay
                />
            ) : (
                <div className="flex flex-col items-center justify-center w-full h-full p-4">
                    <div className="w-14 h-14 rounded-full bg-zinc-600 flex items-center justify-center mb-2">
                        <span className="text-lg font-semibold text-white">
                            {initials}
                        </span>
                    </div>
                    <span className="text-zinc-300 font-medium text-sm text-center truncate max-w-full">
                        {participantIdentity}
                    </span>
                    {local && (
                        <span className="mt-1 text-[10px] text-zinc-500 font-medium">You</span>
                    )}
                </div>
            )}
        </div>
    );
}

export default VideoComponent;