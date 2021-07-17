import React, { useRef } from "react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";

import { SettingsIcon } from "@chakra-ui/icons";

import PabrikTabPanel from "./pabriktabpanel";

export default function PengaturanPabrik(dataPabrik) {
  interface PabrikFields {
    full_name: string;
    last_update: string;
    initial_name: string;
    percent_size: number;
    percent_ton: number;
    size_20: number;
    size_30: number;
    size_40: number;
    size_50: number;
    size_60: number;
    size_70: number;
    size_80: number;
    size_90: number;
    size_100: number;
    size_110: number;
    size_120: number;
    size_130: number;
    size_140: number;
    size_150: number;
  }

  const { dataPabrik: data } = dataPabrik;
  // console.log(data);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        aria-label="Pengaturan pabrik"
        icon={<SettingsIcon />}
        variant="outline"
        borderRadius="15"
        color="gray"
        size="md"
        onClick={onOpen}
      />

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
          <DrawerHeader>Pengaturan Pabrik</DrawerHeader>
          <DrawerBody p={2}>
            <Tabs isFitted variant="soft-rounded" colorScheme="orange">
              <TabList mb="1em">
                {data
                  ? data.map((d: { id: string; fields: PabrikFields }) => (
                      <Tab key={d.id}>{d.fields.initial_name}</Tab>
                    ))
                  : "no data"}
              </TabList>
              <TabPanels>
                {data
                  ? data.map((d: { id: string; fields: PabrikFields }) => (
                      <TabPanel key={d.id}>
                        <PabrikTabPanel detailPabrik={d} />
                      </TabPanel>
                    ))
                  : "no data"}
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
