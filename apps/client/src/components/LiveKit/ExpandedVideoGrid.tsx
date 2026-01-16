import { Focus, Minimize2 } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import VideoTile from "./VideoTile";

interface ExpandedVideoGridProps {
    participants: any[];
    onToggleFocus: (participantId: string) => void;
    onExitExpanded: () => void;
}

function ExpandedVideoGrid({ participants, onToggleFocus, onExitExpanded }: ExpandedVideoGridProps) {
    const totalParticipants = participants.length;

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
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm">
            {/* Header Controls */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onExitExpanded}
                    className="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm text-gray-300 hover:text-white"
                    title="Collapse (Esc)"
                >
                    <Minimize2 className="w-4 h-4" />
                </Button>
            </div>

            {/* Content Area */}
            <div className="h-full pt-16 pb-4 px-4">
                <ScrollArea className={`h-full ${gridLayout.scrollable ? 'pr-4' : ''}`}>
                    <div
                        className={`grid gap-4 ${gridLayout.scrollable ? 'pb-4' : ''}`}
                        style={{
                            gridTemplateColumns: `repeat(${gridLayout.cols}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${gridLayout.rows}, minmax(0, 1fr))`,
                            minHeight: gridLayout.rows === 1 ? '50vh' : '100vh'
                        }}
                    >
                        {participants.map((participant) => (
                            <div key={participant.id} className="relative">
                                <VideoTile
                                    participant={participant}
                                    mode="expanded-grid"
                                />
                                {/* Focus Button Overlay */}
                                <div className="absolute top-3 right-3 opacity-0 hover:opacity-100 transition-opacity duration-200 z-10">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        onClick={() => onToggleFocus(participant.id)}
                                        className="bg-gray-900/90 hover:bg-gray-800/90 backdrop-blur-sm w-8 h-8 shadow-lg"
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
        </div>
    );
}

export default ExpandedVideoGrid;
