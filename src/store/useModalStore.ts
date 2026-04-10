import { create } from "zustand";

interface ModalStore{
    isModal:boolean,
    toggleModal:() => void
}


export const useModalStore = create<ModalStore>((set) =>(
    {
        isModal:false,
        toggleModal:() =>set((state) =>({isModal:!state.isModal}))

    }
))