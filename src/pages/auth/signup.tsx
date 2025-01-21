
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Link } from "react-router";
import deliveryman from "../../assets/images/delivery_man.jpeg"
import logo from "../../assets/images/logo_white.png"
import notify from "@/utils/toast"
import { handleAxiosError } from "@/utils/axios"
import AuthService from "@/api/auth.services"
import CircularLoader from "@/components/circular_loader"
import InputError from "@/components/input_errors"
import { USER_ROLES } from "@/utils/constant"
import { Check, Eye, EyeOff, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type Inputs = {
    firstname?: string;
    lastname?: string;
    email: string;
    gender: string;
    phone_number: string;
    password: string;
    confirmPassword?: string;
};

interface PasswordRequirement {
    text: string
    met: boolean
}

export default function Signup() {
    const [userType, setUserType] = useState(USER_ROLES.OWNER)
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [newPassword, setNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>();

    const passwordRequirements: PasswordRequirement[] = [
        { text: "At least 8 characters long", met: newPassword.length >= 8 },
        { text: "Contains at least one number", met: /\d/.test(newPassword) },
        { text: "Contains at least one special character", met: /[!@#$%^&*]/.test(newPassword) },
        { text: "Contains uppercase and lowercase letters", met: /(?=.*[a-z])(?=.*[A-Z])/.test(newPassword) },
    ]
    const updatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength += 25
        if (/\d/.test(password)) strength += 25
        if (/[!@#$%^&*]/.test(password)) strength += 25
        if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) strength += 25
        setPasswordStrength(strength)
    }

    const handlePasswordChange = (value: string) => {
        setNewPassword(value)
        updatePasswordStrength(value);
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (passwordStrength !== 100) {
                notify("Please complete password requirements", 'error');
                return;
            }
            if (data.password !== data.confirmPassword) {
                notify("Passwords do not match", "error");
                return;
            }
            setIsLoading(true);
            const fields = { ...data };
            delete fields.firstname;
            delete fields.lastname;
            delete fields.confirmPassword;
            await AuthService.register({ ...fields, full_name: `${data.firstname} ${data.lastname}` }, userType);
            notify("Account created successfully", "success");
            setTimeout(() => {
                window.location.href = `/auth/login`
            }, 3000);
        } catch (error: unknown) {
            notify(handleAxiosError(error), "error");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex lg:grid-cols-3 bg-black p-6 w-screen">
            <div className="lg:p-8 text-white lg:w-[55vw] mx-auto">
                <div className="max-w-xl mx-auto space-y-8 ">
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
                            <h2 className="text-xl font-semibold">Create an Account 👋</h2>
                            <p className="text-sm text-zinc-400">Kindly fill in your details to create an account</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        className="bg-transparent border-zinc-800"
                                        {...register("firstname", { required: true })}
                                    />
                                    {errors.firstname && <InputError />}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        className="bg-transparent border-zinc-800"
                                        {...register("lastname", { required: true })}
                                    />
                                    {errors.lastname && <InputError />}

                                </div>
                            </div>

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
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Phone number</Label>
                                    <Input
                                        id="phone_number"
                                        type="tel"
                                        minLength={11}
                                        maxLength={11}
                                        prefix="22"
                                        className="bg-transparent border-zinc-800"
                                        {...register("phone_number", { required: true })}
                                    />
                                    {errors.phone_number && <InputError />}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Gender</Label>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}

                                            >
                                                <SelectTrigger className="mt-1 w-full bg-transparent border-zinc-800">
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                </div>
                            </div>
                            <div className="space-y-2">



                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="password"
                                                type={showNewPassword ? "text" : "password"}
                                                className="bg-transparent border-zinc-800"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handlePasswordChange(e.target.value);
                                                }}
                                                required
                                            />
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="h-4 w-4 text-white" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-white" />
                                        )}
                                    </Button>
                                </div>

                                {errors.password && <InputError />}
                                {/* Password Strength Indicator */}
                                <div className={`space-y-2 mt-2 ${newPassword.length <= 0 && "hidden"}`}>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Password strength:</span>
                                        <span className={`font-medium ${passwordStrength === 100 ? "text-green-500" : passwordStrength >= 50 ? "text-yellow-500" : "text-red-500"}`}>
                                            {passwordStrength === 100 ? "Strong" : passwordStrength >= 50 ? "Medium" : "Weak"}
                                        </span>
                                    </div>
                                    <Progress color="bg-white" value={passwordStrength} className="h-2 bg-transparent text-white" />
                                </div>
                                {/* Password Requirements */}
                                <div className="space-y-2 mt-2">
                                    {passwordRequirements.map((requirement, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                            {requirement.met ? (
                                                <Check className="h-3 w-3 text-green-500" />
                                            ) : (
                                                <X className="h-3 w-3 text-muted-foreground" />
                                            )}
                                            <span className={requirement.met ? "text-green-500" : "text-muted-foreground text-xs"}>
                                                {requirement.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    className="bg-transparent border-zinc-800"
                                    {...register("confirmPassword", { required: true })}
                                />
                                {errors.confirmPassword && <InputError />}

                            </div>

                            <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-full py-6" disabled={passwordStrength !== 100}>
                                {isLoading ? <CircularLoader /> : "Create My Account"}
                            </Button>

                            <p className="text-sm text-center text-zinc-400">
                                By clicking the "Create your account" button, you agree to{' '}
                                <Link to="#" className="text-orange-500 hover:underline">
                                    Vooom's terms of acceptable use
                                </Link>
                                .
                            </p>
                        </form>

                        <p className="text-sm text-center">
                            Already have an account?{' '}
                            <Link to="/auth/login" className="text-orange-500 hover:underline">
                                Login
                            </Link>
                        </p>
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

