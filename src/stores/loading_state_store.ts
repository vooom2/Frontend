import { create } from "zustand";

type LoadingStateStore = {
    isLoading: boolean,
    setState: (loaderstate:boolean) => void,
}

const useLoadingStateStore = create<LoadingStateStore>((set) => ({
isLoading: true,
setState: (loaderstate) => {
    set({isLoading: loaderstate})
}
}))

export default useLoadingStateStore