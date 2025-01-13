import { create } from 'zustand'

interface WalletHistory {
    _id: string;
    owner: string;
    wallet: string;
    type: 'debit' | 'credit';
    description: string;
    newBalance: number;
    oldBalance: number;
    amount: number;
    reference: string;
    createdAt: string;
    updatedAt: string;
}

interface WalletHistoryState {
    history: WalletHistory[] | null;
    setHistory: (history: WalletHistory[]) => void;
}

const useOwnerWalletHistoryStore = create<WalletHistoryState>((set) => ({
    history: null,
    setHistory: (history) => set({ history }),
}));

export default useOwnerWalletHistoryStore;