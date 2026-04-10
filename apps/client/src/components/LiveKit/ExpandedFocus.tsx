import { Focus, Grid3x3, Minimize2 } from "lucide-react";
import { Button } from "../ui/button";
import VideoTile from "./VideoTile";
import { ScrollArea } from "../ui/scroll-area";

interface ExpandedFocusViewProps {
    participants: any[];
    focusedParticipant: any;
    focusedParticipantId: string;
    onToggleFocus: (participantId: string) => void;
    onExitFocus: () => void;
    onExitExpanded: () => void;
}

function ExpandedFocusView({
    participants,
    focusedParticipant,
    focusedParticipantId,
    onToggleFocus,
    onExitFocus,
    onExitExpanded
}: ExpandedFocusViewProps) {
    const unfocusedParticipants = participants.filter(p => p.id !== focusedParticipantId);
    // const allParticipants = [focusedParticipant, ...unfocusedParticipants, ...unfocusedParticipants, ...unfocusedParticipants, ...unfocusedParticipants, ...unfocusedParticipants, ...unfocusedParticipants, ...unfocusedParticipants, ...unfocusedParticipants, ...unfocusedParticipants];

    return (
        <div className="fixed inset-0 z-40 bg-zinc-950">
            {/* Header Controls */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onExitFocus}
                    className="h-9 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white transition-colors rounded-lg px-3 text-xs"
                    title="Return to grid (Esc)"
                >
                    <Grid3x3 className="w-3.5 h-3.5 mr-1.5" />
                    Grid
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onExitExpanded}
                    className="h-9 w-9 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white transition-colors rounded-lg"
                    title="Collapse (Esc)"
                >
                    <Minimize2 className="w-4 h-4" />
                </Button>
            </div>

            {/* Content Layout */}
            <div className="h-full pt-16 pb-4 px-4 lg:px-6">
                <div className="h-full flex flex-col lg:flex-row gap-3">
                    {/* Main Focused Video */}
                    <div className="flex-1 min-h-0 flex flex-col">
                        <div className="relative flex-1 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-800">
                            <VideoTile
                                participant={focusedParticipant}
                                mode="expanded-focus"
                                isFocused={true}
                            />
                        </div>
                    </div>

                    {/* Sidebar / Bottom Stack for Unfocused Participants */}
                    {unfocusedParticipants.length > 0 && (
                        <div className="lg:w-72 xl:w-80 flex flex-col lg:h-full h-[200px] shrink-0 min-h-0">

                            <ScrollArea className="flex-1 overflow-hidden">
                                <div className="flex flex-col gap-2">
                                    {unfocusedParticipants.map((participant) => (
                                        <div
                                            key={participant.id}
                                            className="group/side relative rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors shrink-0 aspect-video lg:aspect-video"
                                        >
                                            <VideoTile
                                                participant={participant}
                                                mode="expanded-focus-side"
                                            />

                                            {/* Overlay Controls */}
                                            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/side:opacity-100 transition-opacity duration-150 flex items-center justify-end">

                                                <Button
                                                    size="icon"
                                                    onClick={() => onToggleFocus(participant.id)}
                                                    className="h-7 w-7 rounded-md bg-black/50 hover:bg-black/70 text-white border-0 cursor-pointer transition-colors"
                                                    title="Focus View"
                                                >
                                                    <Focus className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ExpandedFocusView;