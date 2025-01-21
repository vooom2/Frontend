/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Link } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import deliveryman from "../../assets/images/delivery_man.jpeg";
import logo from "../../assets/images/logo_white.png";
import { USER_ROLES } from "@/utils/constant";
import InputError from "@/components/input_errors";
import AuthService from "@/api/auth.services";
import notify from "@/utils/toast";
import CircularLoader from "@/components/circular_loader";
import { handleAxiosError } from "@/utils/axios";
import UserService from "@/api/user.services";

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {
    const [userType, setUserType] = useState(USER_ROLES.OWNER);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsLoading(true);
            const response = await AuthService.login(data);
            console.log(response.profile.email_verified);
            if (response.userType == userType) {
                if (!response.profile.email_verified) {
                    notify("Email not verified, Otp sent to email for verification. Redirecting...", "error");
                    setTimeout(() => {
                        window.location.href = `/auth/verify?email=${data.email}`
                    }, 3000)
                    return;
                }
                notify("Login successful", "success");
                setTimeout(() => {
                    window.location.href = `/${userType}/dashboard`
                }, 3000)
            } else {
                notify("Invalid user type selected", "error");
            }
        } catch (error: unknown) {
            notify(handleAxiosError(error), "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            await UserService.getCurrentUser().then((res: any) => {
                const userType = res.profile.account_type;
                setTimeout(() => {
                    window.location.href = `/${userType}/dashboard`
                }, 2000)
            })
        })()
    }, [])

    return (
        <div className="min-h-screen flex lg:grid-cols-3 bg-black p-6 w-screen">
            <div className="ld:p-8 text-white lg:w-[55vw] mx-auto">
                <div className="max-w-xl mx-auto space-y-8 mt-10">
                    <div className="space-y-6">
                        <img src={logo} alt="vooom logo" className="w-40" />
                        <ToggleGroup
                            type="single"
                            value={userType}
                            onValueChange={(value) => value && setUserType(value)}
                            className="bg-zinc-900 p-1 rounded-lg grid grid-cols-2"
                        >
                            <ToggleGroupItem
                                value={USER_ROLES.OWNER}
                                className="data-[state=on]:bg-white data-[state=on]:text-black rounded-md px-3 py-2 text-sm transition-colors"
                            >
                                Vehicle Owner
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value={USER_ROLES.RIDER}
                                className="data-[state=on]:bg-white data-[state=on]:text-black rounded-md px-3 py-2 text-sm transition-colors"
                            >
                                Rider
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">Welcome Back 👋</h2>
                            <p className="text-sm text-zinc-400">
                                We are happy to have you back
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="bg-transparent border-zinc-800"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <InputError />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="bg-transparent border-zinc-800"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <InputError />}
                            </div>
                            <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-full py-6 mt-4">
                                {isLoading ? <CircularLoader /> : "Login"}
                            </Button>

                            <p className="text-sm text-center text-zinc-400">
                                By clicking the "login" button, you agree to{" "}
                                <Link to="/policy" className="text-orange-500 hover:underline">
                                    Vooom's terms of acceptable use
                                </Link>
                                .
                            </p>
                        </form>

                        <p className="text-sm text-center">
                            Don't have an account?{" "}
                            <Link
                                to="/auth/signup"
                                className="text-orange-500 hover:underline"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="relative hidden lg:block lg:w-[45vw] rounded-[2rem]"
                style={{
                    backgroundImage: `url(${deliveryman})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
        </div>
    );
}
