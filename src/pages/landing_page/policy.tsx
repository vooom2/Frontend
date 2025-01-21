import { Link } from "react-router";
import logo from "@/assets/images/logo_white.png"

const Policy = () => {
    return (
        <div className="min-h-screen flex lg:grid-cols-3 bg-black p-6 w-screen">
            <div className="lg:p-8 text-white lg:w-[55vw] mx-auto">
                <div className="max-w-3xl mx-auto space-y-8 mt-10">
                    {/* Header Section */}
                    <div className="space-y-6">
                        <img src={logo} alt="vooom logo" className="w-60 mx-auto" />
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold">Terms of Acceptable Use</h1>
                            <p className="text-sm text-zinc-400">
                                Last updated: January 21, 2025
                            </p>
                        </div>
                    </div>

                    {/* Terms Content */}
                    <div className="space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                By accessing and using Vooom's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Acceptable Use. These terms constitute a legally binding agreement between you and Vooom.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold">2. User Responsibilities</h2>
                            <div className="space-y-3 text-zinc-300 leading-relaxed">
                                <p>As a user of our platform, whether as a Vehicle Owner or Rider, you agree to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Provide accurate and complete information during registration</li>
                                    <li>Maintain the security of your account credentials</li>
                                    <li>Comply with all applicable local transportation laws and regulations</li>
                                    <li>Maintain appropriate insurance coverage as required by law</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold">3. Service Usage</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                Our platform facilitates connections between Vehicle Owners and Riders. We are not responsible for the quality, safety, or legality of vehicles listed or the accuracy of listings. Users interact at their own risk and discretion.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold">4. Privacy & Data</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                Your use of Vooom is also governed by our Privacy Policy. By using our services, you consent to our collection and use of your data as described in the Privacy Policy.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold">5. Prohibited Activities</h2>
                            <div className="space-y-3 text-zinc-300 leading-relaxed">
                                <p>Users must not:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Use the service for any illegal purposes</li>
                                    <li>Attempt to gain unauthorized access to other user accounts</li>
                                    <li>Post false, inaccurate, or misleading content</li>
                                    <li>Harass or harm other users of the platform</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-zinc-800 pt-6 pb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <Link
                                to="/auth/login"
                                className="text-orange-500 hover:underline text-sm"
                            >
                                ← Back to Login
                            </Link>
                            <p className="text-zinc-400 text-sm">
                                Questions? Contact us at{' '}
                                <a href="mailto:support@vooom.com" className="text-orange-500 hover:underline">
                                    support@vooom.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Policy;