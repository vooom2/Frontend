import { create } from "zustand";

export type AccountDetails =  {
    _id: string;
    account_number: string;
    account_name: string;
    bank_code: string;
    bank_name: string;
    createdAt: string;
    recipient_code: string;
    user_id: string;
}

interface OwnerAccounts{
    accounts: AccountDetails[] | null;
    hasLoaded: boolean;
    setAccounts: (data:AccountDetails[] ) => void;
    removeAccount: (id: string) => void;
}

const useOwnerAccountStore = create<OwnerAccounts>((set) => ({
    accounts: null,
    hasLoaded: false,
   setAccounts: (data) => set(() => ({accounts: data, hasLoaded: true})),
    removeAccount: (id) => set((state) => ({accounts: state.accounts?.filter((account) => account._id !== id)}))
}));

export default useOwnerAccountStore;