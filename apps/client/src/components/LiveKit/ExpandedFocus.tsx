import { Focus } from "lucide-react";
import { Button } from "../ui/button";
import { Grid3x3 } from "lucide-react";
import { Minimize2 } from "lucide-react";
import VideoTile from "./VideoTile";
import { useMemo } from "react";
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

    // Split unfocused participants into right column and bottom section
    const [rightColumnParticipants, bottomParticipants] = useMemo(() => {
        const maxRightColumn = Math.max(3, Math.floor(window.innerHeight / 200));
        return [
            unfocusedParticipants.slice(0, maxRightColumn),
            unfocusedParticipants.slice(maxRightColumn)
        ];
    }, [unfocusedParticipants]);

    return (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm">
            {/* Header Controls */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onExitFocus}
                    className="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm text-gray-300 hover:text-white"
                    title="Return to grid (Esc)"
                >
                    <Grid3x3 className="w-4 h-4 mr-2" />
                    Grid View
                </Button>
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

            {/* Content Layout */}
            <div className="h-full pt-16 pb-4 px-4 md:px-6 lg:px-8">
                <div className="h-full flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Left: Focused Video */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-900/50 border border-gray-700/30">
                            <VideoTile
                                participant={focusedParticipant}
                                mode="expanded-focus"
                                isFocused={true}
                            />
                            {/* Focus Indicator */}
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-purple-500/30">
                                <div className="flex items-center gap-2">
                                    <Focus className="w-3.5 h-3.5 text-purple-300" />
                                    <span className="text-sm text-purple-200 font-medium">Focused</span>
                                </div>
                            </div>
                        </div>

                        {/* Focused Participant Info */}
                        <div className="mt-4 flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                                    <span className="text-sm font-bold text-white">
                                        {focusedParticipant.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {focusedParticipant.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {focusedParticipant.isLocal ? "You" : "Participant"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {focusedParticipant.videoTrack && (
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-sm text-gray-400">Video</span>
                                    </div>
                                )}
                                {focusedParticipant.audioTrack && (
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-sm text-gray-400">Audio</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Column of Unfocused Videos */}
                    {rightColumnParticipants.length > 0 && (
                        <div className="md:w-72 lg:w-80 flex flex-col gap-4">
                            {rightColumnParticipants.map((participant) => (
                                <div key={participant.id} className="relative">
                                    <VideoTile
                                        participant={participant}
                                        mode="expanded-focus-side"
                                    />
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        onClick={() => onToggleFocus(participant.id)}
                                        className="absolute top-2 right-2 bg-gray-900/90 hover:bg-gray-800/90 backdrop-blur-sm w-7 h-7 shadow-lg"
                                        title="Focus on this participant"
                                    >
                                        <Focus className="w-3 h-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom: Remaining Unfocused Videos */}
                {bottomParticipants.length > 0 && (
                    <div className="mt-6">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-px flex-1 bg-gray-700/50" />
                            <span className="text-sm text-gray-500 px-3">Other Participants</span>
                            <div className="h-px flex-1 bg-gray-700/50" />
                        </div>
                        <ScrollArea className="h-40">
                            <div className="flex gap-3 pb-4">
                                {bottomParticipants.map((participant) => (
                                    <div key={participant.id} className="relative flex-shrink-0">
                                        <VideoTile
                                            participant={participant}
                                            mode="expanded-focus-bottom"
                                        />
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={() => onToggleFocus(participant.id)}
                                            className="absolute top-2 right-2 bg-gray-900/90 hover:bg-gray-800/90 backdrop-blur-sm w-6 h-6 shadow-lg"
                                            title="Focus on this participant"
                                        >
                                            <Focus className="w-2.5 h-2.5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </div>
        </div>
    );
}


export default ExpandedFocusView;