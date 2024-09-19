"use client";

import { create } from "zustand";

import { Dialog } from "~/components/ui/dialog";

interface ModalType {
  id: string;
  isOpen: boolean;
  children: React.ReactNode;
}

export interface ModalsStore {
  isOpen: (id: string) => boolean;
  modals: ModalType[];
  open: ({ id, children }: { id: string; children: React.ReactNode }) => void;
  close: (id: string) => void;
}

export const useModalsStore = create<ModalsStore>((set, get) => ({
  modals: [],
  open({ id, children }) {
    set((prevState) => {
      return {
        modals: [
          ...prevState.modals,
          {
            id,
            isOpen: true,
            children,
          },
        ],
      };
    });
  },
  close(id) {
    set((prevState) => {
      return {
        modals: prevState.modals.filter((modal) => modal.id !== id),
      };
    });
  },
  isOpen(id) {
    const { modals } = get();
    return !!modals.find((s) => s.id === id);
  },
}));

export default function Modals() {
  const { modals, close } = useModalsStore();
  return (
    <>
      {modals.map((modal) => (
        <Dialog
          open={modal.isOpen}
          onOpenChange={() => close(modal.id)}
          key={`modal-${modal.id}`}
        >
          {modal.children}
        </Dialog>
      ))}
    </>
  );
}
