import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RainbowButton } from "../ui/rainbow-button"
import { Link } from "lucide-react";

function Invite() {
    return (
        <div>
            <div className="flex items-center px-20 py-8">
                {/* Logo */}
                <div className="flex gap-2 items-center cursor-pointer ">
                    <img
                        src="https://res.cloudinary.com/dnkenioua/image/upload/v1764999707/Group_ik1uap.png"
                        className=" "
                    />
                    <h1 className="font-inter font-semibold text-sm md:text-lg">Townify</h1>
                </div>
            
            </div>

            <div className="flex justify-center gap-10 mt-10">
                <div className="font-bricogrotesque text-4xl font-semibold">
                    <h1 className="text-2xl">Your office has been created.</h1>
                    <h1>Next, let’s bring in your team</h1>
                    <h1 className="text-base">Try inviting some teammates to join the space with you.</h1>
                    <img className="h-20"
                     src="https://res.cloudinary.com/djbawwbzi/image/upload/v1765445208/Framesdgvsdf_2_axssox.png" alt="" />
                </div>

                <div className="flex flex-col gap-2">
                    <Label >Enter team member’s email</Label>
                    <Input className="bg-background w-96" placeholder="Ex. email@gmail.com"/>
                    <div className="flex gap-2 mt-4">
                        <Button className="font-bricogrotesque" variant={"secondary"}>Or copy invite link <Link/></Button>
                        <RainbowButton className="font-bricogrotesque">Next</RainbowButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invite
