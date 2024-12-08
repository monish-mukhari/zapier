"use client";
import { useState } from "react";
import { Appbar } from "../../components/Appbar";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { CheckFeature } from "../../components/CheckFeature";
import { Input } from "../../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

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
                    <Input label="Email" type="text" placeholder="Your email" onChange={(e) => {setEmail(e.target.value)}} />
                    <Input label="Password" type="password" placeholder="Your password" onChange={(e) => {setPassword(e.target.value)}}/>

                    <div className="pt-4">
                        <PrimaryButton size="big" onClick={async () => {
                            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                                username: email,
                                password
                            });

                            localStorage.setItem("token", res.data.token);
                            router.push("/dashboard");
                        }}>Login</PrimaryButton>
                    </div>
                </div>

            </div>
        </div>
    </div>
}