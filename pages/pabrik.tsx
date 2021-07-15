import React, { useState } from "react";
import useSWR from "swr";
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
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

  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

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

  console.log(datapabrik);

  return (
    <div>
      <Head>
        <title>Harga Udang | Pengaturan Pabrik</title>
      </Head>
      <Container w="100vw" maxW="xl" pt="8" pb="8">
        <Box>
          <Box m={6} align="center">
            <Heading mb={4} mt={4} as="h2" size="xl" color="gray.600">
              Pengaturan Data Pabrik
            </Heading>
          </Box>
          <Divider mb={8} />
          <Tabs isFitted variant="soft-rounded" colorScheme="orange">
            <TabList mb="1em">
              {datapabrik
                ? datapabrik.map((d: { id: string; fields: PabrikFields }) => (
                    <Tab key={d.id}>{d.fields.initial_name}</Tab>
                  ))
                : "no data"}
            </TabList>
            <TabPanels>
              {datapabrik
                ? datapabrik.map((d: { id: string; fields: PabrikFields }) => (
                    <TabPanel key={d.id}>
                      <Stack direction="column" spacing={2}>
                        <Heading as="h3" size="lg">
                          {d.fields.full_name}
                        </Heading>
                        <Text as="h4" fontSize="md">
                          Update terakhir pada {d.fields.last_update}
                        </Text>
                        <Text
                          htmlFor="size_20"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 150
                        </Text>
                        <Input
                          mb={2}
                          id="size_20"
                          name="size_20"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_150}
                        />
                        <Text
                          htmlFor="size_30"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 140
                        </Text>
                        <Input
                          mb={2}
                          id="size_30"
                          name="size_30"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_140}
                        />
                        <Text
                          htmlFor="size_40"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 130
                        </Text>
                        <Input
                          mb={2}
                          id="size_40"
                          name="size_40"
                          type="number"
                          placeholder="Dalam Rp"
                          onChange={handleChange}
                          value={d.fields.size_130}
                        />
                        <Text
                          htmlFor="size_50"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 120
                        </Text>
                        <Input
                          mb={2}
                          id="size_50"
                          name="size_50"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_120}
                        />
                        <Text
                          htmlFor="size_60"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 110
                        </Text>
                        <Input
                          mb={2}
                          id="size_60"
                          name="size_60"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_110}
                        />
                        <Text
                          htmlFor="size_70"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 100
                        </Text>
                        <Input
                          mb={2}
                          id="size_70"
                          name="size_70"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_100}
                        />
                        <Text
                          htmlFor="size_80"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 90
                        </Text>
                        <Input
                          mb={2}
                          id="size_80"
                          name="size_80"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_90}
                        />
                        <Text
                          htmlFor="size_90"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 80
                        </Text>
                        <Input
                          mb={2}
                          id="size_90"
                          name="size_90"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_80}
                        />
                        <Text
                          htmlFor="size_100"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 70
                        </Text>
                        <Input
                          mb={2}
                          id="size_100"
                          name="size_100"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          // onBlur={formik.handleBlur}
                          value={d.fields.size_70}
                        />
                        <Text
                          htmlFor="size_110"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 60
                        </Text>
                        <Input
                          mb={2}
                          id="size_110"
                          name="size_110"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_60}
                        />
                        <Text
                          htmlFor="size_120"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 50
                        </Text>
                        <Input
                          mb={2}
                          id="size_120"
                          name="size_120"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_50}
                        />
                        <Text
                          htmlFor="size_130"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 40
                        </Text>
                        <Input
                          mb={2}
                          id="size_130"
                          name="size_130"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_40}
                        />
                        <Text
                          htmlFor="size_140"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 30
                        </Text>
                        <Input
                          mb={2}
                          id="size_140"
                          name="size_140"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_30}
                        />
                        <Text
                          htmlFor="size_150"
                          mb={2}
                          color="gray.500"
                          fontWeight={600}
                        >
                          Size 20
                        </Text>
                        <Input
                          mb={2}
                          id="size_150"
                          name="size_150"
                          type="number"
                          placeholder="Dalam Rp"
                          // readOnly
                          onChange={handleChange}
                          value={d.fields.size_20}
                        />
                      </Stack>
                    </TabPanel>
                  ))
                : "no data"}
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}
