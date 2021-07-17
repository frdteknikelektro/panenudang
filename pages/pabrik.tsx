import React from "react";
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
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button,
  As,
  InputProps,
  OmitCommonProps,
  Tag,
  Spacer,
} from "@chakra-ui/react";
import {
  PlusSquareIcon,
  SmallCloseIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import { FiPlusCircle } from "react-icons/fi";

import _ from "lodash";

import { motion } from "framer-motion";
import { Formik, Form, ErrorMessage, FieldArray, useField } from "formik";
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

  function hitungHargaPabrik(values, data, semuaPabrik) {
    console.log("data size tonase", values, "datapabrik", data);
    function hitungHargaSize(i, k, hargaSize) {
      let naikSize: number = 0;
      let naikTon: number = 0;
      //naikin size dan tonase
      naikSize =
        values.panen[k].size -
        values.panen[k].size * _.divide(data[i].fields.percent_size, 100);
      naikTon =
        values.panen[k].tonase +
        values.panen[k].tonase * _.divide(data[i].fields.percent_ton, 100);

      if (naikSize < 30) {
        hargaSize =
          (30 - naikSize) *
            ((data[i].fields.size_20 - data[i].fields.size_30) * 0.1) +
          data[i].fields.size_30;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 40) {
        hargaSize =
          (40 - naikSize) *
            ((data[i].fields.size_30 - data[i].fields.size_40) * 0.1) +
          data[i].fields.size_40;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 50) {
        hargaSize =
          (50 - naikSize) *
            ((data[i].fields.size_40 - data[i].fields.size_50) * 0.1) +
          data[i].fields.size_50;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 60) {
        hargaSize =
          (60 - naikSize) *
            ((data[i].fields.size_50 - data[i].fields.size_60) * 0.1) +
          data[i].fields.size_60;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 70) {
        hargaSize =
          (70 - naikSize) *
            ((data[i].fields.size_60 - data[i].fields.size_70) * 0.1) +
          data[i].fields.size_70;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 80) {
        hargaSize =
          (80 - naikSize) *
            ((data[i].fields.size_70 - data[i].fields.size_80) * 0.1) +
          data[i].fields.size_80;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 90) {
        hargaSize =
          (90 - naikSize) *
            ((data[i].fields.size_80 - data[i].fields.size_90) * 0.1) +
          data[i].fields.size_90;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 100) {
        hargaSize =
          (100 - naikSize) *
            ((data[i].fields.size_90 - data[i].fields.size_100) * 0.1) +
          data[i].fields.size_100;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 110) {
        hargaSize =
          (110 - naikSize) *
            ((data[i].fields.size_100 - data[i].fields.size_110) * 0.1) +
          data[i].fields.size_110;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 120) {
        hargaSize =
          (120 - naikSize) *
            ((data[i].fields.size_110 - data[i].fields.size_120) * 0.1) +
          data[i].fields.size_120;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 130) {
        hargaSize =
          (130 - naikSize) *
            ((data[i].fields.size_120 - data[i].fields.size_130) * 0.1) +
          data[i].fields.size_130;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 140) {
        hargaSize =
          (140 - naikSize) *
            ((data[i].fields.size_130 - data[i].fields.size_140) * 0.1) +
          data[i].fields.size_140;
        return _.round(hargaSize * naikTon);
      }
      if (naikSize < 150) {
        hargaSize =
          (150 - naikSize) *
            ((data[i].fields.size_140 - data[i].fields.size_150) * 0.1) +
          data[i].fields.size_150;
        return _.round(hargaSize * naikTon);
      }
    }

    for (let i = 0; i < data.length; i++) {
      let hargaSize: number;
      let multiHarga: number[] = [];
      for (let k = 0; k < values.panen.length; k++) {
        multiHarga.push(hitungHargaSize(i, k, hargaSize));
        // console.log(`loop dalam ${i} ${k}`, multiHarga);
      }
      semuaPabrik.push({
        id: data[i].id,
        pabrik: data[i].fields.full_name,
        initial: data[i].fields.initial_name,
        harga: multiHarga,
        total: _.sum(multiHarga),
      });
      // console.log("loop luar", multiHarga);
    }
  }

  let pabrikTerbaik = null;

  return (
    <div>
      <Head>
        <title>Harga Udang | Bongkar di Mana?</title>
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

          <Box>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                let semuaPabrik: any[] = [];
                await new Promise((r) => setTimeout(r, 500));
                hitungHargaPabrik(values, datapabrik, semuaPabrik);
                console.log("semua pabrik multi size", semuaPabrik);
                pabrikTerbaik = _.maxBy(semuaPabrik, function (o) {
                  return o.total;
                });
                console.log("pabrikTerbaik", pabrikTerbaik);
              }}
            >
              {({ values }) => (
                <Form>
                  <FieldArray name="panen">
                    {({ insert, remove, push }) => (
                      <Stack direction="column" spacing={4} id="panenform">
                        <Button
                          leftIcon={<FiPlusCircle />}
                          onClick={() => push({ size: "", tonase: "" })}
                          variant="outline"
                          borderRadius="full"
                          mb={2}
                          size="sm"
                          colorScheme="gray"
                          color="gray.500"
                          w="60%"
                        >
                          tambah label
                        </Button>
                        {values.panen.length > 0 &&
                          values.panen.map((p, index) => (
                            <Stack direction="column" spacing={2} key={index}>
                              <Stack direction="row" spacing={4}>
                                <Text
                                  as="h4"
                                  fontSize="md"
                                  fontWeight={600}
                                  color="gray.600"
                                >
                                  Size {index + 1}
                                </Text>
                                <Button
                                  leftIcon={<SmallCloseIcon />}
                                  onClick={() => remove(index)}
                                  mb={4}
                                  size="xs"
                                  variant="solid"
                                  bg="red.300"
                                  color="white"
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
                    borderRadius="full"
                    mt={4}
                    mb={4}
                    size="md"
                    bg="orange.400"
                    color="white"
                  >
                    Cari Pabrik
                  </Button>
                  {pabrikTerbaik ? (
                    <>
                      <Divider mb={2} />
                      <Text
                        as="h4"
                        fontSize="sm"
                        align="center"
                        color="gray.500"
                      >
                        kirim hasil panen ke:
                      </Text>
                      <Box p={2} boxShadow="base" m={2} borderRadius="15">
                        <Stack direction="column" spacing={2}>
                          <Text
                            as="h2"
                            fontSize="2xl"
                            color="gray.600"
                            fontWeight={700}
                            align="center"
                          >
                            {pabrikTerbaik.pabrik}
                          </Text>
                          <Box align="center">
                            <Tag
                              size="lg"
                              borderRadius="full"
                              p={2}
                              align="center"
                              colorScheme="orange"
                              variant="subtle"
                              color="orange.500"
                              fontSize="lg"
                              fontWeight="bold"
                            >
                              {Intl.NumberFormat("id", {
                                style: "currency",
                                currency: "IDR",
                              }).format(pabrikTerbaik.total)}
                            </Tag>
                          </Box>
                        </Stack>
                      </Box>
                    </>
                  ) : null}
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
