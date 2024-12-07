"use client";
import { Appbar } from "../../components/Appbar";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { CheckFeature } from "../../components/CheckFeature";
import { Input } from "../../components/Input";

export default function Signup() {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="flex pt-8 max-w-4xl">
                <div className="flex-1 pt-20 px-4">
                    <div className="font-semibold text-3xl pb-8">
                        Join millions worldwide who automate their work using Zapier.
                    </div>
                    <div className="pb-6">
                        <CheckFeature label="Easy setup, no coding required"></CheckFeature>
                    </div>
                    <div className="pb-6">
                        <CheckFeature label="Free forever for free features"></CheckFeature>
                    </div>
                    <div className="pb-6">
                        <CheckFeature label="14-day trail of premium features & apps"></CheckFeature>
                    </div>
                </div>

                <div className="flex-1 pt-6 pb-6 px-4 border rounded mt-12">
                    <Input label="Name" type="text" placeholder="Your name" onChange={(e) => {}} />
                    <Input label="Email" type="text" placeholder="Your email" onChange={(e) => {}} />
                    <Input label="Password" type="password" placeholder="Your password" onChange={(e) => {}}/>

                    <div className="pt-4">
                        <PrimaryButton size="big" onClick={() => {}}>Get started free</PrimaryButton>
                    </div>
                </div>

            </div>
        </div>
    </div>
}