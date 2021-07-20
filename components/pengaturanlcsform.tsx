import React from "react";
import {
  Stack,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import { id } from "date-fns/locale";
import { trigger } from "swr";

export default function PengaturanLcsForm(data) {
  const { data: d } = data;
  const toast = useToast();

  // console.log("lcs", d);

  function editData(value) {
    console.log(JSON.stringify(value));
    fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/lcs_all`, {
      method: "PATCH",
      body: JSON.stringify(value),
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      // .then(result => console.log(result))
      .catch((error) => console.log("error", error));
    toast({
      title: "Berhasil",
      description: `Informasi LcS ${d.fields.lcs} untuk pabrik ${d.fields.pabrik} berhasil diubah`,
      status: "success",
      duration: 5000,
    });
    trigger(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/lcs_all`);
  }

  const formik = useFormik({
    initialValues: {
      percent_size: d.fields.percent_size ? d.fields.percent_size : 0,
      percent_ton: d.fields.percent_ton ? d.fields.percent_ton : 0,
      lcs: d.fields.lcs ? d.fields.lcs : "",
      pabrik: d.fields.pabrik ? d.fields.pabrik : "",
      url: d.fields.url ? d.fields.url : "",
    },
    // validate,
    onSubmit: (values) => {
      const airtableBody = {
        records: [
          {
            id: d.id,
            fields: {
              percent_size: values.percent_size ? values.percent_size : 0,
              percent_ton: values.percent_ton ? values.percent_ton : 0,
              lcs: d.fields.lcs,
              pabrik: d.fields.pabrik,
              url: d.fields.url,
            },
          },
        ],
      };
      //   console.log("edit data", JSON.stringify(values));
      editData(airtableBody);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-body">
          <Stack spacing={2} direction="column">
            <Text as="h4" fontWeight={600} color="gray.600">
              {d.fields.pabrik}
            </Text>
            <Text as="h4" fontSize="xs" color="gray.400">
              Update terakhir{" "}
              {formatDistanceToNow(parseISO(d.fields.last_update), {
                addSuffix: true,
                locale: id,
              })}
            </Text>
            <InputGroup size="sm">
              <InputLeftAddon
                color="gray.500"
                htmlFor="percent_size"
                fontWeight={600}
                width="40%"
              >
                Size
              </InputLeftAddon>
              <Input
                id={`percent_size${d.id}`}
                name="percent_size"
                type="number"
                placeholder="Dalam %"
                // readOnly
                onChange={formik.handleChange}
                value={formik.values.percent_size}
              />
              <InputRightAddon color="gray.500" fontWeight={600}>
                %
              </InputRightAddon>
            </InputGroup>
            <InputGroup size="sm">
              <InputLeftAddon
                htmlFor="percent_ton"
                color="gray.500"
                fontWeight={600}
                width="40%"
              >
                Tonase
              </InputLeftAddon>
              <Input
                id={`percent_ton${d.id}`}
                name="percent_ton"
                type="number"
                placeholder="Dalam kg"
                // readOnly
                onChange={formik.handleChange}
                value={formik.values.percent_ton}
              />
              <InputRightAddon color="gray.500" fontWeight={600}>
                %
              </InputRightAddon>
            </InputGroup>
            <Button
              mb={2}
              mt={2}
              type="submit"
              size="sm"
              bg="orange.400"
              color="white"
            >
              Ubah Data Bongkar
            </Button>
          </Stack>
        </div>
      </form>
    </>
  );
}
