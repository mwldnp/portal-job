import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { router } from '@inertiajs/react'

export default function DialogLogout({ open, onOpenChange }: {
    open: boolean;
    onOpenChange: (open: boolean) => void
}
) {

    const handleLogout = (e: FormEvent) => {
        e.preventDefault()

        router.post('/logout')
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>
                        Konfirmasi Keluar
                    </DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin keluar dari aplikasi? Sesi Anda akan berakhir.
                    </DialogDescription>
                    <div className="flex mt-2 justify-end items-center gap-2">
                        <Button variant='outline' onClick={() => onOpenChange(false)}>
                            Batal
                        </Button>
                        <Button variant='destructive' onClick={handleLogout}>
                            Keluar
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}