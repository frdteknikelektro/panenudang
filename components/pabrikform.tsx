import React from "react";
import {
  Stack,
  Divider,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button,
  As,
  InputProps,
  OmitCommonProps,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FiPlusCircle } from "react-icons/fi";

import _ from "lodash";

import { Formik, Form, ErrorMessage, FieldArray, useField } from "formik";
import PabrikCard from "../components/pabrikcard";

export default function PabrikForm(data: any) {
  const { datapabrik: datapabrik } = data;
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
    // console.log("data size tonase", values, "datapabrik", data);
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
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 40) {
        hargaSize =
          (40 - naikSize) *
            ((data[i].fields.size_30 - data[i].fields.size_40) * 0.1) +
          data[i].fields.size_40;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 50) {
        hargaSize =
          (50 - naikSize) *
            ((data[i].fields.size_40 - data[i].fields.size_50) * 0.1) +
          data[i].fields.size_50;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 60) {
        hargaSize =
          (60 - naikSize) *
            ((data[i].fields.size_50 - data[i].fields.size_60) * 0.1) +
          data[i].fields.size_60;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 70) {
        hargaSize =
          (70 - naikSize) *
            ((data[i].fields.size_60 - data[i].fields.size_70) * 0.1) +
          data[i].fields.size_70;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 80) {
        hargaSize =
          (80 - naikSize) *
            ((data[i].fields.size_70 - data[i].fields.size_80) * 0.1) +
          data[i].fields.size_80;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 90) {
        hargaSize =
          (90 - naikSize) *
            ((data[i].fields.size_80 - data[i].fields.size_90) * 0.1) +
          data[i].fields.size_90;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 100) {
        hargaSize =
          (100 - naikSize) *
            ((data[i].fields.size_90 - data[i].fields.size_100) * 0.1) +
          data[i].fields.size_100;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 110) {
        hargaSize =
          (110 - naikSize) *
            ((data[i].fields.size_100 - data[i].fields.size_110) * 0.1) +
          data[i].fields.size_110;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 120) {
        hargaSize =
          (120 - naikSize) *
            ((data[i].fields.size_110 - data[i].fields.size_120) * 0.1) +
          data[i].fields.size_120;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 130) {
        hargaSize =
          (130 - naikSize) *
            ((data[i].fields.size_120 - data[i].fields.size_130) * 0.1) +
          data[i].fields.size_130;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 140) {
        hargaSize =
          (140 - naikSize) *
            ((data[i].fields.size_130 - data[i].fields.size_140) * 0.1) +
          data[i].fields.size_140;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      }
      if (naikSize < 150) {
        hargaSize =
          (150 - naikSize) *
            ((data[i].fields.size_140 - data[i].fields.size_150) * 0.1) +
          data[i].fields.size_150;
        if (hargaSize < 0) {
          hargaSize = 0;
        }
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: _.round(hargaSize * naikTon),
        };
      } else {
        return {
          size: values.panen[k].size,
          tonase: values.panen[k].tonase,
          naikSize: _.round(naikSize, 2),
          naikTon: _.round(naikTon, 2),
          harga: 0,
        };
      }
    }

    for (let i = 0; i < data.length; i++) {
      let hargaSize: number;
      let multiHarga: any[] = [];
      for (let k = 0; k < values.panen.length; k++) {
        multiHarga.push(hitungHargaSize(i, k, hargaSize));
        // console.log(`loop dalam ${i} ${k}`, multiHarga);
      }
      semuaPabrik.push({
        id: data[i].id,
        pabrik: data[i].fields.full_name,
        initial: data[i].fields.initial_name,
        harga: multiHarga,
        total: _.sumBy(multiHarga, "harga"),
      });
      // console.log("loop luar", multiHarga);
    }
  }

  let pabrikTerbaik = null;
  let listPabrik: any[] = [];

  return (
    <div>
      <Box>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            let semuaPabrik: any[] = [];
            await new Promise((r) => setTimeout(r, 500));
            hitungHargaPabrik(values, datapabrik, semuaPabrik);
            listPabrik = _.orderBy(semuaPabrik, ["total"], ["desc"]);
            pabrikTerbaik = _.maxBy(semuaPabrik, function (o) {
              return o.total;
            });
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
                            <InputRightAddon color="gray.500" fontWeight={600}>
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
                  <Text as="h4" fontSize="sm" align="center" color="gray.500">
                    kirim hasil panen ke:
                  </Text>
                  <PabrikCard listPabrik={listPabrik} />
                </>
              ) : null}
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
