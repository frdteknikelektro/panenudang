import React, {useRef} from 'react'
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import {trigger} from 'swr'

export default function HapusData(harga) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = useRef();

    const toast = useToast()

    // console.log('hapus', harga.harga.data)

    function deleteData(id) {
        // console.log(id)
        fetch(`https://app.jala.tech/api/shrimp_prices/${id}`, {
                method: 'DELETE',
                // body: JSON.stringify(value),
                    headers: {
                        'Authorization': `Bearer ${process.env.JALATOKENPROD}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.text())
                // .then(result => console.log(result))
                .catch(error => console.log('error', error));
                toast({
                    title: "Menghapus",
                    description: `Menghapus harga ${harga.harga.data.region.full_name} &bull; ${format(parseISO(harga.harga.data.date), 'dd MMMM yyyy')}`,
                    status: "error",
                    duration: 5000,
                  })
                // trigger(`https://app.jala.tech/api/shrimp_prices?search&with=creator,species,region&sort=size_100&created_by__in=10579&sort=created_at,desc`)
                location.reload()
    }
    return (
        <div>
            <Button
                onClick={onOpen}
                mb={2}
                isFullWidth
                size="lg"
                colorScheme="red"
                aria-label="delete entry">Hapus Harga</Button>

            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered>
                <AlertDialogOverlay/>

                <AlertDialogContent>
                    <AlertDialogHeader>Hapus Data?</AlertDialogHeader>
                    <AlertDialogBody>
                        Anda yakin ingin menghapus harga {harga.harga.data.region.full_name} &bull; {format(parseISO(harga.harga.data.date), 'dd MMMM yyyy')} ?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            ref={cancelRef}
                            onClick={() => {
                            onClose()
                        }}>
                            Duh, ragu nih
                        </Button>
                        <Button
                            colorScheme="red"
                            ml={3}
                            onClick={() => {
                            deleteData(harga.harga.id)
                            onClose()
                        }}>
                            Yakin
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}