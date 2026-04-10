import { Focus, X } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import VideoTile from "./VideoTile";

interface ExpandedVideoGridProps {
    participants: any[];
    onToggleFocus: (participantId: string) => void;
    onExitExpanded: () => void;
}

function ExpandedVideoGrid({ participants, onToggleFocus, onExitExpanded }: ExpandedVideoGridProps) {
    const totalParticipants = participants.length;

    // const allParticipants = [...participants, ...participants, ...participants, ...participants, ...participants, ...participants, ...participants, ...participants, ...participants, ...participants];

    // Calculate grid layout based on participant count
    const getGridLayout = () => {
        if (totalParticipants <= 2) return { cols: 2, rows: 1, scrollable: false };
        if (totalParticipants <= 4) return { cols: 2, rows: 2, scrollable: false };
        if (totalParticipants <= 6) return { cols: 3, rows: 2, scrollable: false };
        if (totalParticipants <= 8) return { cols: 4, rows: 2, scrollable: false };
        return { cols: 4, rows: 2, scrollable: true };
    };

    const gridLayout = getGridLayout();
    return (
        <div className="fixed inset-0 z-40 bg-zinc-950">
            {/* Close */}
            <div className="absolute top-4 right-4 z-50">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onExitExpanded}
                    className="h-9 w-9 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white transition-colors rounded-lg"
                    title="Collapse (Esc)"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* Grid */}
            <div className="h-full pt-16 pb-16 px-4">
                <ScrollArea className={`h-full ${gridLayout.scrollable ? 'pr-4' : ''}`}>
                    <div
                        className={`grid gap-3 ${gridLayout.scrollable ? 'pb-4' : ''}`}
                        style={{
                            gridTemplateColumns: `repeat(${gridLayout.cols}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${gridLayout.rows}, minmax(0, 1fr))`,
                            minHeight: gridLayout.rows === 1 ? '60vh' : '100vh'
                        }}
                    >
                        {participants.map((participant) => (
                            <div
                                key={participant.id}
                                className="relative group/video-tile rounded-lg overflow-hidden"
                            >

                                <VideoTile
                                    participant={participant}
                                    mode="expanded-grid"
                                />

                                {/* Focus button */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover/video-tile:opacity-100 transition-opacity duration-150 z-10">
                                    <Button
                                        size="icon"
                                        onClick={() => onToggleFocus(participant.id)}
                                        className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border-0 rounded-lg transition-colors"
                                        title="Focus on this participant"
                                    >
                                        <Focus className="w-3.5 h-3.5" />
                                    </Button>
                                </div>

                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Participant count */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="text-zinc-500 text-xs">
                    {totalParticipants} participant{totalParticipants !== 1 ? 's' : ''}
                </span>
            </div>
        </div>
    );
}

export default ExpandedVideoGrid;

