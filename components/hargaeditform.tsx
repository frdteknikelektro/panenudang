import React from "react";
import {
  Button,
  Input,
  Textarea,
  Box,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useFormik, FormikErrors } from "formik";
import { trigger } from "swr";

import HapusData from "./hapusdata";

export default function HargaEditForm(data) {
  const { data: dataharga } = data;
  const router = useRouter();
  // Shape of form values
  interface FormValues {
    region_id: string;
    date: string;
    species_id: number;
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
    remark: string;
    created_by: number;
    country_id: string;
    currency_id: string;
  }

  const { onClose } = useDisclosure();

  const toast = useToast();

  function editData(value) {
    // console.log(data.id, value, dataharga.id);
    fetch(`https://app.jala.tech/api/shrimp_prices/${dataharga.id}`, {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        Authorization: `Bearer ${process.env.JALATOKENPROD}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      // .then(result => console.log(result))
      .catch((error) => console.log("error", error));
    toast({
      title: "Berhasil",
      description: `Informasi harga ${dataharga.region.full_name} berhasil diubah`,
      status: "success",
      duration: 5000,
    });
    trigger(
      `https://app.jala.tech/api/shrimp_prices?search&with=creator,species,region&sort=size_100&created_by__in=10579&sort=created_at,desc`
    );
    router.reload();
  }

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.region_id) {
      errors.region_id = "Required";
    } else if (values.region_id === "") {
      errors.region_id = "Pilih provinsi terlebih dahulu";
    }

    if (!values.size_100) {
      errors.size_100 = "Required";
    } else if (values.size_100 === 0) {
      errors.size_100 = "Isi harga size 100";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      region_id: dataharga.region_id,
      date: dataharga.date,
      species_id: dataharga.species_id,
      size_20: dataharga.size_20 ? dataharga.size_20 : 0,
      size_30: dataharga.size_30 ? dataharga.size_30 : 0,
      size_40: dataharga.size_40 ? dataharga.size_40 : 0,
      size_50: dataharga.size_50 ? dataharga.size_50 : 0,
      size_60: dataharga.size_60 ? dataharga.size_60 : 0,
      size_70: dataharga.size_70 ? dataharga.size_70 : 0,
      size_80: dataharga.size_80 ? dataharga.size_80 : 0,
      size_90: dataharga.size_90 ? dataharga.size_90 : 0,
      size_100: dataharga.size_100 ? dataharga.size_100 : 0,
      size_110: dataharga.size_110 ? dataharga.size_110 : 0,
      size_120: dataharga.size_120 ? dataharga.size_120 : 0,
      size_130: dataharga.size_130 ? dataharga.size_130 : 0,
      size_140: dataharga.size_140 ? dataharga.size_140 : 0,
      size_150: dataharga.size_150 ? dataharga.size_150 : 0,
      remark: dataharga.remark,
      created_by: 10579,
      country_id: "ID",
      currency_id: "IDR",
    },
    validate,
    onSubmit: (values) => {
      editData(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-body">
          {/* <Stack spacing={4} direction="row"> */}
          <Box>
            <Text mb={2} color="gray.500" fontWeight={600}>
              Tanggal
            </Text>
            <Input
              mb={2}
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.date}
            />
          </Box>

          <Box>
            <Text htmlFor="size_20" mb={2} color="gray.500" fontWeight={600}>
              Size 20
            </Text>
            <Input
              mb={2}
              id="size_20"
              name="size_20"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_20}
            />
            <Text htmlFor="size_30" mb={2} color="gray.500" fontWeight={600}>
              Size 30
            </Text>
            <Input
              mb={2}
              id="size_30"
              name="size_30"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_30}
            />
            <Text htmlFor="size_40" mb={2} color="gray.500" fontWeight={600}>
              Size 40
            </Text>
            <Input
              mb={2}
              id="size_40"
              name="size_40"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_40}
            />
            <Text htmlFor="size_50" mb={2} color="gray.500" fontWeight={600}>
              Size 50
            </Text>
            <Input
              mb={2}
              id="size_50"
              name="size_50"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_50}
            />
            <Text htmlFor="size_60" mb={2} color="gray.500" fontWeight={600}>
              Size 60
            </Text>
            <Input
              mb={2}
              id="size_60"
              name="size_60"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_60}
            />
            <Text htmlFor="size_70" mb={2} color="gray.500" fontWeight={600}>
              Size 70
            </Text>
            <Input
              mb={2}
              id="size_70"
              name="size_70"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_70}
            />
            <Text htmlFor="size_80" mb={2} color="gray.500" fontWeight={600}>
              Size 80
            </Text>
            <Input
              mb={2}
              id="size_80"
              name="size_80"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_80}
            />
            <Text htmlFor="size_90" mb={2} color="gray.500" fontWeight={600}>
              Size 90
            </Text>
            <Input
              mb={2}
              id="size_90"
              name="size_90"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_90}
            />
          </Box>
          <Box>
            <Text htmlFor="size_100" mb={2} color="orange.500" fontWeight={800}>
              Size 100 *wajib diisi{" "}
            </Text>
            <Input
              mb={2}
              id="size_100"
              name="size_100"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.size_100}
            />{" "}
            {formik.touched.size_100 && formik.errors.size_100 ? (
              <Text mb={2} color="red.500" fontWeight={400} fontSize="xs">
                {formik.errors.size_100}
              </Text>
            ) : null}
            <Text htmlFor="size_110" mb={2} color="gray.500" fontWeight={600}>
              Size 110
            </Text>
            <Input
              mb={2}
              id="size_110"
              name="size_110"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_110}
            />
            <Text htmlFor="size_120" mb={2} color="gray.500" fontWeight={600}>
              Size 120
            </Text>
            <Input
              mb={2}
              id="size_120"
              name="size_120"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_120}
            />
            <Text htmlFor="size_130" mb={2} color="gray.500" fontWeight={600}>
              Size 130
            </Text>
            <Input
              mb={2}
              id="size_130"
              name="size_130"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_130}
            />
            <Text htmlFor="size_140" mb={2} color="gray.500" fontWeight={600}>
              Size 140
            </Text>
            <Input
              mb={2}
              id="size_140"
              name="size_140"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_140}
            />
            <Text htmlFor="size_150" mb={2} color="gray.500" fontWeight={600}>
              Size 150
            </Text>
            <Input
              mb={2}
              id="size_150"
              name="size_150"
              type="number"
              placeholder="Dalam Rp"
              onChange={formik.handleChange}
              value={formik.values.size_150}
            />
            <Text htmlFor="remark" mb={2} color="gray.500" fontWeight={600}>
              Catatan
            </Text>
            <Textarea
              mb={2}
              rows={5}
              id="remark"
              name="remark"
              placeholder="isi catatan anda di sini"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.remark ? formik.values.remark : ""}
            />
          </Box>
          {/* </Stack> */}
        </div>

        <Button
          mb={2}
          mt={2}
          isFullWidth
          colorScheme="blue"
          size="lg"
          aria-label="submit entry"
          onClick={() => {
            onClose();
          }}
          type="submit"
        >
          Ubah Harga
        </Button>
        <HapusData harga={data} />
      </form>
    </div>
  );
}
