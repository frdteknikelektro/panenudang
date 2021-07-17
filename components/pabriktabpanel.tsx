import React from "react";
import {
  Stack,
  Divider,
  Heading,
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

export default function PabrikTabPanel(detailPabrik) {
  const { detailPabrik: d } = detailPabrik;
  //   console.log("detail pabrik data", d);
  const toast = useToast();

  function editData(value) {
    // console.log("edit data", value);

    // console.log(JSON.stringify(value));
    fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/${process.env.AIRTABLE_TABLE}/${d.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(value),
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      // .then(result => console.log(result))
      .catch((error) => console.log("error", error));
    toast({
      title: "Berhasil",
      description: `Informasi pabrik ${d.fields.full_name} berhasil diubah`,
      status: "success",
      duration: 5000,
    });
    trigger(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/${process.env.AIRTABLE_TABLE}`
    );
    //   window.location.reload();
  }

  const formik = useFormik({
    initialValues: {
      percent_size: d.fields.percent_size,
      percent_ton: d.fields.percent_ton,
      size_20: d.fields.size_20 ? d.fields.size_20 : 0,
      size_30: d.fields.size_30 ? d.fields.size_30 : 0,
      size_40: d.fields.size_40 ? d.fields.size_40 : 0,
      size_50: d.fields.size_50 ? d.fields.size_50 : 0,
      size_60: d.fields.size_60 ? d.fields.size_60 : 0,
      size_70: d.fields.size_70 ? d.fields.size_70 : 0,
      size_80: d.fields.size_80 ? d.fields.size_80 : 0,
      size_90: d.fields.size_90 ? d.fields.size_90 : 0,
      size_100: d.fields.size_100 ? d.fields.size_100 : 0,
      size_110: d.fields.size_110 ? d.fields.size_110 : 0,
      size_120: d.fields.size_120 ? d.fields.size_120 : 0,
      size_130: d.fields.size_130 ? d.fields.size_130 : 0,
      size_140: d.fields.size_140 ? d.fields.size_140 : 0,
      size_150: d.fields.size_150 ? d.fields.size_150 : 0,
    },
    // validate,
    onSubmit: (values) => {
      const airtableBody = {
        fields: {
          percent_size: values.percent_size,
          percent_ton: values.percent_ton,
          size_20: values.size_20 ? values.size_20 : 0,
          size_30: values.size_30 ? values.size_30 : 0,
          size_40: values.size_40 ? values.size_40 : 0,
          size_50: values.size_50 ? values.size_50 : 0,
          size_60: values.size_60 ? values.size_60 : 0,
          size_70: values.size_70 ? values.size_70 : 0,
          size_80: values.size_80 ? values.size_80 : 0,
          size_90: values.size_90 ? values.size_90 : 0,
          size_100: values.size_100 ? values.size_100 : 0,
          size_110: values.size_110 ? values.size_110 : 0,
          size_120: values.size_120 ? values.size_120 : 0,
          size_130: values.size_130 ? values.size_130 : 0,
          size_140: values.size_140 ? values.size_140 : 0,
          size_150: values.size_150 ? values.size_150 : 0,
        },
      };
      //   console.log("edit data", JSON.stringify(values));
      editData(airtableBody);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-body">
          <Stack direction="column" spacing={4}>
            <Heading as="h3" size="lg">
              {d.fields.full_name}
            </Heading>
            <Text as="h4" fontSize="sm" color="gray.500">
              Update terakhir{" "}
              {formatDistanceToNow(parseISO(d.fields.last_update), {
                addSuffix: true,
                locale: id,
              })}
            </Text>
            <Stack direction="column" spacing={2}>
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
                  id="percent_size"
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
                  id="percent_ton"
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
            </Stack>
            <Divider mb={4} />
            <Text as="h3" fontSize="lg" fontWeight={600}>
              Harga Pabrik
            </Text>
            <Stack direction="column" spacing={2}>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_150"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 150
                </InputLeftAddon>
                <Input
                  id="size_150"
                  name="size_150"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_150}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_140"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 140
                </InputLeftAddon>
                <Input
                  id="size_140"
                  name="size_140"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_140}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_130"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 130
                </InputLeftAddon>
                <Input
                  id="size_130"
                  name="size_130"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_130}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_120"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 120
                </InputLeftAddon>
                <Input
                  id="size_120"
                  name="size_120"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_120}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_110"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 110
                </InputLeftAddon>
                <Input
                  id="size_110"
                  name="size_110"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_110}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_100"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 100
                </InputLeftAddon>
                <Input
                  id="size_100"
                  name="size_100"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_100}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_90"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 90
                </InputLeftAddon>
                <Input
                  id="size_90"
                  name="size_90"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_90}
                />
              </InputGroup>

              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_80"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 80
                </InputLeftAddon>
                <Input
                  id="size_80"
                  name="size_80"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_80}
                />
              </InputGroup>

              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_70"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 70
                </InputLeftAddon>
                <Input
                  id="size_70"
                  name="size_70"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_70}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_60"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 60
                </InputLeftAddon>
                <Input
                  id="size_60"
                  name="size_60"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_60}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_50"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 50
                </InputLeftAddon>
                <Input
                  id="size_50"
                  name="size_50"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_50}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_40"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 40
                </InputLeftAddon>
                <Input
                  id="size_40"
                  name="size_40"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_40}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_20"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 20
                </InputLeftAddon>
                <Input
                  id="size_20"
                  name="size_20"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_20}
                />
              </InputGroup>

              <InputGroup size="sm">
                <InputLeftAddon
                  htmlFor="size_30"
                  color="gray.500"
                  fontWeight={600}
                  width="40%"
                >
                  Size 30
                </InputLeftAddon>
                <Input
                  id="size_30"
                  name="size_30"
                  type="number"
                  placeholder="Dalam Rp"
                  onChange={formik.handleChange}
                  value={formik.values.size_30}
                />
              </InputGroup>
            </Stack>
            <Button
              mb={2}
              mt={2}
              type="submit"
              isFullWidth
              borderRadius="full"
              size="md"
              bg="orange.400"
              color="white"
            >
              Ubah Data
            </Button>
          </Stack>
        </div>
      </form>
    </>
  );
}
