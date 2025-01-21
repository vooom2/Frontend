import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import logo from "@/assets/images/logo_white.png";
import notify from "@/utils/toast";
import CircularLoader from "@/components/circular_loader";
import InputError from "@/components/input_errors";
import AuthService from "@/api/auth.services";
import { Link } from "react-router";

type Inputs = {
    password: string;
};

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const getToken = new URLSearchParams(window.location.search);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsLoading(true);
            const response = (await AuthService.setPassword({ ...data, token: getToken.get("token") })) as { message: string };
            if (response != null) {
                notify(response.message, "success");
                setTimeout(() => {
                    window.location.href = '/'
                }, 3000)
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex lg:grid-cols-3 bg-black p-6 w-screen">
            <div className="lg:p-8 text-white mx-auto lg:w-[55vw] w-full">
                <div className="max-w-xl mx-auto space-y-8 ">
                    <div className="space-y-6">
                        <Link to='/'>
                            <img src={logo} alt="vooom logo" className="w-40" />
                        </Link>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl mt-20 font-semibold">Reset password</h2>
                            <p className="text-sm text-onprimary">

                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                <Label htmlFor="password">New password</Label>
                                <Input
                                    id="password"
                                    type="text"
                                    className="bg-transparent border-zinc-800"
                                    required
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <InputError />}
                            </div>
                            <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-full py-6">
                                {isLoading ? <CircularLoader /> : "Submit"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
