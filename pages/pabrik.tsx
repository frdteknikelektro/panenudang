import React, { useState } from "react";
import useSWR, { trigger } from "swr";
import Head from "next/head";
import Image from "next/image";
import {
  Container,
  Stack,
  Divider,
  Heading,
  Box,
  Flex,
  Tabs,
  Text,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button,
  useToast,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import { id } from "date-fns/locale";
import { useFormik, FormikErrors } from "formik";
import PengaturanPabrik from "../components/pengaturanpabrik";
// import PanenUdangImg from "../public/PanenUdanghead.png";
import PanenUdangLogo from "../public/pulogo.png";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function Pabrik() {
  // interface PabrikFields {
  //   full_name: string;
  //   last_update: string;
  //   initial_name: string;
  //   percent_size: number;
  //   percent_ton: number;
  //   size_20: number;
  //   size_30: number;
  //   size_40: number;
  //   size_50: number;
  //   size_60: number;
  //   size_70: number;
  //   size_80: number;
  //   size_90: number;
  //   size_100: number;
  //   size_110: number;
  //   size_120: number;
  //   size_130: number;
  //   size_140: number;
  //   size_150: number;
  // }

  const response = useSWR(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/${process.env.AIRTABLE_TABLE}`,
    (url) =>
      fetcher(url, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          Accept: "application/json",
        },
      })
  );
  if (response.error)
    return <div>Gagal mengambil data. Coba refresh ulang</div>;
  if (!response.data) {
    return (
      <div>
        <Flex
          style={{
            top: "50%",
            left: "50%",
            position: "fixed",
          }}
        >
          <motion.div
            animate={{
              scale: [0.5, 1, 1, 0.5, 0.5],
              rotate: [0, 270, 0, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
          >
            <Image src={PanenUdangLogo} alt="panen udang header" />
          </motion.div>
        </Flex>
      </div>
    );
  }

  const { records: datapabrik } = response.data;

  return (
    <div>
      <Head>
        <title>Harga Udang | Pengaturan Pabrik</title>
      </Head>
      <Container w="100vw" maxW="xl" pt="8" pb="8">
        <Box>
          <Box alignContent="right">
            <PengaturanPabrik dataPabrik={datapabrik} />
          </Box>
          <Box m={4} align="center">
            <Heading mb={4} as="h2" size="xl" color="gray.600">
              Kirim ke Mana?
            </Heading>
          </Box>

          <Divider mb={8} />
        </Box>
      </Container>
    </div>
  );
}
