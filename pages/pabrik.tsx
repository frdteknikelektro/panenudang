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
  Icon,
  useToast,
  As,
  InputProps,
  OmitCommonProps,
} from "@chakra-ui/react";
import { PlusSquareIcon, SmallCloseIcon } from "@chakra-ui/icons";

import { motion } from "framer-motion";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  useField,
  FormikProps,
} from "formik";
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
  interface Values {
    size: number;
    tonase: number;
  }

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

  const initialValues = {
    panen: [
      {
        size: "",
        tonase: "",
      },
    ],
  };

  // eslint-disable-next-line react/prop-types
  function PanenInput(
    props: JSX.IntrinsicAttributes &
      OmitCommonProps<
        React.DetailedHTMLProps<
          React.InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        >,
        keyof InputProps
      > &
      InputProps &
      OmitCommonProps<any, keyof InputProps> & { as?: As<any> }
  ): JSX.Element {
    const [field, meta, helpers] = useField(props.name);
    return (
      <>
        <Input {...field} {...props} />
      </>
    );
  }

  // const formPanen = document.getElementById("panenform");

  return (
    <div>
      <Head>
        <title>Harga Udang | Bongkar Di mana?</title>
      </Head>
      <Container w="100vw" maxW="xl" pt="4" pb="8">
        <Box>
          <Box alignContent="right">
            <PengaturanPabrik dataPabrik={datapabrik} />
          </Box>
          <Box m={4} align="center">
            <Heading mb={4} as="h2" size="xl" color="gray.600">
              Kirim ke Mana?
            </Heading>
          </Box>
          <Divider mb={4} />

          <Box>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {({ values }) => (
                <Form>
                  <FieldArray name="panen">
                    {({ insert, remove, push }) => (
                      <Stack direction="column" spacing={4} id="panenform">
                        <Button
                          leftIcon={<PlusSquareIcon />}
                          onClick={() => push({ size: 0, tonase: 0 })}
                          isFullWidth
                          mb={4}
                          size="md"
                          colorScheme="pink"
                        >
                          Tambah Size Panen
                        </Button>
                        {values.panen.length > 0 &&
                          values.panen.map((p, index) => (
                            <Stack direction="column" spacing={2} key={index}>
                              <Stack direction="row" spacing={4}>
                                <Text as="h4" fontSize="md" fontWeight={600}>
                                  Size {index + 1}
                                </Text>
                                <Button
                                  leftIcon={<SmallCloseIcon />}
                                  onClick={() => remove(index)}
                                  mb={4}
                                  size="xs"
                                  colorScheme="red"
                                  borderRadius="15"
                                >
                                  Hapus
                                </Button>
                              </Stack>
                              <InputGroup size="sm">
                                <InputLeftAddon
                                  color="gray.500"
                                  htmlFor={`panen.${index}.size`}
                                  fontWeight={500}
                                  width="30%"
                                >
                                  Size
                                </InputLeftAddon>
                                <PanenInput
                                  name={`panen.${index}.size`}
                                  type="number"
                                  placeholder="ekor/kg"
                                />
                              </InputGroup>
                              <InputGroup size="sm">
                                <InputLeftAddon
                                  color="gray.500"
                                  htmlFor={`panen.${index}.tonase`}
                                  fontWeight={500}
                                  width="30%"
                                >
                                  Tonase
                                </InputLeftAddon>
                                <PanenInput
                                  name={`panen.${index}.tonase`}
                                  type="number"
                                  placeholder="dalam kg"
                                />
                                <InputRightAddon
                                  color="gray.500"
                                  fontWeight={600}
                                >
                                  kg
                                </InputRightAddon>
                              </InputGroup>
                            </Stack>
                          ))}
                      </Stack>
                    )}
                  </FieldArray>
                  <Button
                    type="submit"
                    isFullWidth
                    mt={4}
                    size="md"
                    colorScheme="twitter"
                  >
                    Cari Pabrik
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
