"use client";
import { useState } from "react";
import { Appbar } from "../../../components/Appbar";
import { ZapCell } from "../../../components/ZapCell";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";


export default function CreateZap() {
    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedActions, setSelectedActions] = useState<{
        availableActionId: string,
        availableActionName: string
    }[]>([]);

    return <div>
        <Appbar />
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center w-full">
                <ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1} />
            </div>
            <div className="w-full pt-2 pb-2">
                {selectedActions.map((action, index) => <div className="flex justify-center pt-2"><ZapCell name={action.availableActionName ? action.availableActionName : "Action"} index={2+index} /> </div>)}
            </div>
            <div className="flex justify-center">
                <div>
                    <PrimaryButton onClick={() => {
                        setSelectedActions(a => [...a, {
                            availableActionId: "",
                            availableActionName: ""
                        }])
                    }} ><div className="text-2xl">+</div></PrimaryButton>
                </div>
            </div>
        </div>
    </div>
}