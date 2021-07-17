import * as React from "react";
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Stack,
  Divider,
  Heading,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import LihatData from "../components/lihatdata";
import TambahData from "../components/tambahdata";
import PanenUdangImg from "../public/PanenUdanghead.png";
import PanenUdangLogo from "../public/pulogo.png";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function Harga() {
  const response = useSWR(
    `https://app.jala.tech/api/shrimp_prices?search&with=creator,species,region&sort=size_100&created_by__in=10579&sort=created_at,desc`,
    (url) =>
      fetcher(url, {
        headers: {
          Authorization: `Bearer ${process.env.JALATOKENPROD}`,
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
              // width: "100%",
              // height: "100%",
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
  //   console.log(response.data.data);

  const { data: dataharga } = response.data;

  console.log(dataharga);

  return (
    <div>
      <Head>
        <title>Harga Udang | PanenUdang</title>
      </Head>
      <Container w="100vw" maxW="xl" pt="4" pb="8">
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
                Home
              </Button>
            </Link>
          </Flex>
          <Box m={4} align="center">
            <Image
              src={PanenUdangImg}
              alt="panen udang header"
              placeholder="blur"
            />
          </Box>
          <Divider mb={8} />
          <TambahData />
          <Heading mb={4} mt={4} as="h3" size="md" color="gray.600">
            Harga Terbaru
          </Heading>
          <Stack spacing={4} direction="column">
            {dataharga
              ? dataharga.map((d: { id: any }) => (
                  <LihatData data={d} key={d.id} id={d.id} />
                ))
              : "no data"}
          </Stack>
        </Box>
      </Container>
    </div>
  );
}
