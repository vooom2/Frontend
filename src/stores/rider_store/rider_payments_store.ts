import {create} from 'zustand'

interface Payment {
  _id: string
  rider: string
  vehicle: string
  payment_amount: number
  description: string
  payment_due_date: string
  payment_status: 'pending' | 'completed'
  reference: string | null
  overdue_charges: number
  payment_date: string
  createdAt: string
}

interface PaymentState {
  payments: Payment[] | null,
  setPayments: (payments: Payment[]) => void
}

const useRiderPaymentStore = create<PaymentState>((set) => ({
    payments: null,
    setPayments: (payments) => set({ payments })
    }));

export default useRiderPaymentStore