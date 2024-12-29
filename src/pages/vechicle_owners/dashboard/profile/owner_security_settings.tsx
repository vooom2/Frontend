"use client"

import { useState } from "react"
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface PasswordRequirement {
    text: string
    met: boolean
}

export default function OwnerSecuritySettings() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [newPassword, setNewPassword] = useState("")

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
        updatePasswordStrength(value)
    }

    return (
        <TabsContent value="security" className="space-y-8 mt-8">
            <div className="max-w-2xl">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Password Settings</h2>
                    <p className="text-sm text-muted-foreground">
                        Make sure your password is strong and unique to keep your account secure.
                    </p>
                </div>

                <div className="mt-6 space-y-6">
                    {/* Current Password */}
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                            <Input
                                id="currentPassword"
                                type={showCurrentPassword ? "text" : "password"}
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                className="pr-10"
                                value={newPassword}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>

                        {/* Password Strength Indicator */}
                        <div className="space-y-2 mt-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Password strength:</span>
                                <span className="font-medium">
                                    {passwordStrength === 100 ? "Strong" :
                                        passwordStrength >= 50 ? "Medium" : "Weak"}
                                </span>
                            </div>
                            <Progress value={passwordStrength} className="h-2" />
                        </div>

                        {/* Password Requirements */}
                        <div className="mt-4 space-y-2">
                            {passwordRequirements.map((requirement, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                    {requirement.met ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <X className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span className={requirement.met ? "text-green-500" : "text-muted-foreground"}>
                                        {requirement.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                    </div>

                    <Button className="w-full sm:w-auto">
                        Update Password
                    </Button>
                </div>
            </div>
        </TabsContent>
    )
}

