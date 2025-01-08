import { create } from "zustand";

export type GuarantorDocuments = {
  full_name: string;
  email: string;
  phone_number: string;
  organization: string;
  location: string;
  gender: string;
  state: string;
  address: string;
  img: string;
  workID?: string | null;
  primaryID?: string | null;
};

export type VerificationDetails = {
  primaryID: string;
  secondaryID: string;
  guarantor_documents: GuarantorDocuments;
  updateGuarantorInfo: (field: keyof GuarantorDocuments, value: string) => void;
  updatePrimaryID: (url: string) => void;
  updateSecondaryID: (url: string) => void;
  resetForm: () => void;
};

const initialGuarantorState: GuarantorDocuments = {
  full_name: "",
  email: "",
  phone_number: "",
  organization: "",
  location: "",
  gender: "",
  state: "",
  address: "",
  img: "",
  workID: null,
  primaryID: null,
};

const useVerificationStore = create<VerificationDetails>((set) => ({
  primaryID: "",
  secondaryID: "",
  guarantor_documents: initialGuarantorState,
  updatePrimaryID: (url: string) => 
    set((state) => ({
      ...state,
      primaryID: url,
    })),
  updateSecondaryID: (url: string) => {
    set((state) => ({
      ...state,
      secondaryID: url,
    }));
  },
  updateGuarantorInfo: (field, value) =>
    set((state) => ({
      ...state,
      guarantor_documents: {
        ...state.guarantor_documents,
        [field]: value,
      },
    })),
  resetForm: () =>
    set((state) => ({
      ...state,
      guarantor_documents: initialGuarantorState,
    })),
}));

export default useVerificationStore;
