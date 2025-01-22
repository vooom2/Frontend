
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form";
import deliveryman from "@/assets/images/delivery_man.jpeg"
import logo from "@/assets/images/logo_white.png"
import CircularLoader from "@/components/circular_loader"
import InputError from "@/components/input_errors"
import AuthService from "@/api/auth.services";
import notify from "@/utils/toast";

type Inputs = {
    email: string;
    otp: string;
};

export default function Verify({ email }: { email: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsLoading(true);
            const response = await AuthService.verifyEmail({ otp: parseInt(data.otp), email });
            if (response != null) {
                notify("Email verified successfully", "success");
                setTimeout(() => {
                    window.location.href = `/auth/login`
                }, 3000);
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex lg:grid-cols-3 bg-black p-6 w-screen">
            <div className="lg:p-8 text-white mx-auto lg:w-[55vw] w-full">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="space-y-6">
                        <img src={logo} alt="vooom logo" className="w-40" />
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl mt-20 font-semibold">Verify Email Address</h2>
                            <p className="text-sm text-onprimary">Check your email for a 6 digit verification code</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    readOnly
                                    className="bg-transparent border-zinc-800"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <InputError />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">OTP (6 digit code)</Label>
                                <Input
                                    id="otp"
                                    type="number"
                                    className="bg-transparent border-zinc-800 leading-10"
                                    required
                                    minLength={6}
                                    maxLength={6}
                                    placeholder="Enter 6 digit code"
                                    {...register("otp", { required: true })}
                                />
                                {errors.otp && <InputError />}
                            </div>


                            <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-full py-6">
                                {isLoading ? <CircularLoader /> : "Verify"}
                            </Button>


                        </form>
                    </div>
                </div>
            </div>

            <div className="relative hidden lg:block lg:w-[45vw] rounded-[2rem]"
                style={{
                    backgroundImage: `url(${deliveryman})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
            </div>
        </div>
    )
}

