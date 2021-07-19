import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Container, Stack, Divider, Box, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import PanenUdangImg from "../public/PanenUdanghead.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Panen Udang | Home</title>
        <meta name="description" content="All in one app for Panen Udang" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container w="100vw" maxW="xl" pt="4" pb="8">
        <Stack direction="column" spacing={2}>
          <Box m={4} align="center">
            <Image
              layout="responsive"
              src={PanenUdangImg}
              alt="panen udang header"
              placeholder="blur"
            />
          </Box>
          <Divider mb={8} />
          <Stack direction="row" spacing={2}>
            <Stack
              direction="column"
              spacing={2}
              p={2}
              boxShadow="md"
              rounded="md"
              w="50vh"
            >
              <Box align="center">
                <Text as="h1" fontSize="4xl" fontWeight={600}>
                  🍤
                </Text>
              </Box>
              <Text as="h1" fontSize="lg" fontWeight={600} color="gray.600">
                Harga Udang
              </Text>
              <Text as="h1" fontSize="xs" fontWeight={400} color="gray.500">
                Buat harga udang dan konten promosinya untuk berbagai daerah
                sekaligus.
              </Text>
              <Link href="/harga" passHref>
                <a>
                  <Text fontWeight={600} color="orange.500">
                    Buat Harga <ArrowForwardIcon />
                  </Text>
                </a>
              </Link>
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              p={2}
              boxShadow="md"
              rounded="md"
              w="50vh"
            >
              <Box align="center">
                <Text as="h1" fontSize="4xl" fontWeight={600}>
                  🚚
                </Text>
              </Box>

              <Text as="h1" fontSize="lg" fontWeight={600} color="gray.600">
                Kirim mana?
              </Text>
              <Text as="h3" fontSize="xs" fontWeight={400} color="gray.500">
                Hitung estimasi hasil bongkar dan bandingkan antar satu pabrik
                dan lainnya.
              </Text>
              <Link href="/pabrik" passHref>
                <a>
                  <Text fontWeight={600} color="orange.500">
                    Cari Pabrik <ArrowForwardIcon />
                  </Text>
                </a>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
