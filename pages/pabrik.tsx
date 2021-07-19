import React from "react";
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Divider,
  Heading,
  Box,
  Flex,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { motion } from "framer-motion";
import PengaturanPabrik from "../components/pengaturanpabrik";
import PabrikForm from "../components/pabrikform";
// import PabrikCard from "../components/pabrikcard";
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
        <Container w="100vw" h="100vh" maxW="xl" pt="4" pb="8">
          <Box
            style={{
              top: "50%",
              left: "50%",
              position: "fixed",
              margin: "-25px 0 0 -25px",
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
          </Box>
        </Container>
      </div>
    );
  }

  const { records: datapabrik } = response.data;

  return (
    <div>
      <Head>
        <title>Harga Udang | Bongkar di Mana?</title>
      </Head>
      <Container w="100vw" pt="4" maxW="xl" pb="8">
        <Box>
          <Flex alignContent="right">
            <Link href="/" passHref>
              <Button
                leftIcon={<ArrowBackIcon />}
                variant="outline"
                borderRadius="15"
                color="gray"
                size="md"
              >
                Beranda
              </Button>
            </Link>
            <Spacer />
            <PengaturanPabrik dataPabrik={datapabrik} />
          </Flex>
          <Box m={4} align="center">
            <Heading mb={4} as="h2" size="xl" color="gray.600">
              Kirim ke Mana?
            </Heading>
          </Box>
          <Divider mb={4} />

          <PabrikForm datapabrik={datapabrik} />
        </Box>
      </Container>
    </div>
  );
}
