import { create } from "zustand";

type LoadingStateStore = {
    isLoading: boolean,
    setState: (loaderstate:boolean) => void,
}

export const useLoadingStore = create<LoadingStateStore>((set) => ({
isLoading: true,
setState: (loaderstate) => {
    set({isLoading: loaderstate})
}
}))