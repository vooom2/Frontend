import { create } from "zustand";

type AccountDetails =  {
    id: string;
    account_number: string;
    account_name: string;

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
    removeAccount: (id) => set((state) => ({accounts: state.accounts?.filter((account) => account.id !== id)}))
}));

export default useOwnerAccountStore;