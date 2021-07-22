import React, { useState } from "react";
import useSWR from "swr";
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
  Spinner,
  Select,
  As,
  InputProps,
  OmitCommonProps,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FiPlusCircle } from "react-icons/fi";

import _ from "lodash";

import { Formik, Form, ErrorMessage, FieldArray, useField } from "formik";
import PabrikCard from "../components/pabrikcard";

import { hitungHargaPabrik } from "../utils/pabrikhelpers";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function PabrikForm(data) {
  const { datapabrik: datapabrik } = data;
  const { datalcs: datalcs } = data;
  const [selectedLcs, setSelectedLcs] = useState("lcs_ucok");
  // console.log(datalcs);

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

  let pabrikTerbaik = null;
  let listPabrik: any[] = [];

  const listLcs: any[] = _.uniqBy(datalcs, "fields.lcs");
  const bongkarLcs: any[] = _.filter(
    datalcs,
    _.iteratee(["fields.url", selectedLcs])
  );

  // console.log(_.uniqBy(datalcs, "fields.name"));
  // console.log(listLcs, selectedLcs);
  // console.log(selectedLcs, bongkarLcs);
  return (
    <div>
      <Stack spacing={4}>
        <Select
          size="md"
          value={selectedLcs}
          onChange={(e) => {
            setSelectedLcs(e.target.value);
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
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            let semuaPabrik: any[] = [];
            await new Promise((r) => setTimeout(r, 500));
            hitungHargaPabrik(values, datapabrik, bongkarLcs, semuaPabrik);
            listPabrik = _.orderBy(semuaPabrik, ["totalHarga"], ["desc"]);
            // console.log(listPabrik, semuaPabrik);
            pabrikTerbaik = _.maxBy(semuaPabrik, function (o) {
              return o.totalHarga;
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
      </Stack>
    </div>
  );
}
