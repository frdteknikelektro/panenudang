import React, { useRef, useState } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  Select,
  Button,
} from "@chakra-ui/react";

import _ from "lodash";
import PengaturanLcsForm from "./pengaturanlcsform";

export default function PengaturanLcs(data) {
  const [lcs, setLcs] = useState("lcs_ucok");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { dataLcs: datalcs } = data;

  //   const { dataPabrik: data } = dataPabrik;
  //   console.log(datalcs);

  const listLcs: any[] = _.uniqBy(datalcs, "fields.lcs");
  const bongkarLcs: any[] = _.orderBy(
    _.filter(datalcs, _.iteratee(["fields.url", lcs])),
    ["fields.pabrik"],
    ["desc"]
  );

  //   console.log("pengaturan", bongkarLcs);

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outline"
        borderRadius="full"
        color="gray"
        size="md"
        ml={2}
      >
        🚚
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="left"
        size="md"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader boxShadow="md">🚚 Pengaturan LcS</DrawerHeader>
          <DrawerBody p={4}>
            <Stack spacing={4} direction="column">
              <Select
                size="md"
                value={lcs}
                onChange={(e) => {
                  setLcs(e.target.value);
                }}
              >
                {listLcs.length
                  ? listLcs.map((l) => (
                      <option key={l.id} value={l.fields.url}>
                        {l.fields.lcs}
                      </option>
                    ))
                  : "loading..."}
              </Select>
              {bongkarLcs.map((b) => (
                <PengaturanLcsForm data={b} key={b.id} />
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
