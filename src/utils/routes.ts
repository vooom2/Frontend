
// Type for the routes object
export type AppRoutes = typeof dashboardRoutes;
export const dashboardRoutes = {
    auth: {
        signup: '/auth/signup',
        login: '/auth/login'
    },
    dashboard: {
        root: '/dashboard',
        unverified: '/dashboard/unverified',
        rent: {
            available: '/dashboard/rent/available',
            details: (id: string) => `/dashboard/rent/available/${id}`,
            apply: {
                form: (id: string) => `/dashboard/rent/available/apply/${id}`,
                success: '/dashboard/rent/available/apply/success'
            }
        },
        payments: {
            root: '/dashboard/payments',
            pay: '/dashboard/payments/pay'
        },
        fleet: '/dashboard/fleet',
        complaints: {
            root: '/dashboard/complaints',
            create: '/dashboard/complaints/create'
        },
        bikes: '/dashboard/bikes',
        profile: '/dashboard/profile',
        setupAccount: '/dashboard/setupaccount'
    }
} as const;