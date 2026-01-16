import VideoTile from "./VideoTile";

interface CollapsedVideoGridProps {
    participants: any[];
    onEnterExpandedGrid: () => void;
}

function CollapsedVideoGrid({ participants, onEnterExpandedGrid }: CollapsedVideoGridProps) {
    return (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="pointer-events-auto">
                <div className="flex flex-wrap justify-center gap-3 max-w-[90vw] px-4">
                    {participants.map((participant) => (
                        <VideoTile
                            key={participant.id}
                            participant={participant}
                            mode="collapsed"
                            onEnterExpandedGrid={onEnterExpandedGrid}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CollapsedVideoGrid;