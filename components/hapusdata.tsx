import React, { useRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { useRouter } from "next/router";
import parseISO from "date-fns/parseISO";
import { id as indo } from "date-fns/locale";
// import { trigger } from "swr";

export default function HapusData(harga) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const router = useRouter();

  const { harga: dataharga } = harga;

  // console.log("harga", dataharga);

  const toast = useToast();

  // console.log('hapus', harga.harga.data)

  function deleteData(id: number) {
    // console.log(id)
    fetch(`https://app.jala.tech/api/shrimp_prices/${id}`, {
      method: "DELETE",
      // body: JSON.stringify(value),
      headers: {
        Authorization: `Bearer ${process.env.JALATOKENPROD}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      // .then(result => console.log(result))
      .catch((error) => console.log("error", error));
    toast({
      title: "Menghapus",
      description: `Menghapus harga ${
        dataharga.data.region.full_name
      } - ${format(parseISO(dataharga.data.date), "d MMMM yyyy", {
        locale: indo,
      })}`,
      status: "error",
      duration: 5000,
    });
    // trigger(`https://app.jala.tech/api/shrimp_prices?search&with=creator,species,region&sort=size_100&created_by__in=10579&sort=created_at,desc`)
    router.reload();
  }
  return (
    <>
      <Button
        onClick={onOpen}
        mb={2}
        isFullWidth
        size="lg"
        colorScheme="red"
        aria-label="delete entry"
      >
        Hapus Harga
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Hapus Data?</AlertDialogHeader>
          <AlertDialogBody>
            Anda yakin ingin menghapus harga {dataharga.data.region.full_name}{" "}
            &bull;{" "}
            {format(parseISO(dataharga.data.date), "dd MMMM yyyy", {
              locale: indo,
            })}{" "}
            ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                onClose();
              }}
            >
              Duh, ragu nih
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                deleteData(dataharga.data.id);
                onClose();
              }}
            >
              Yakin
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
