import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Text,
  Select,
  Stack,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Checkbox,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import format from "date-fns/format";
import { useFormik, FormikErrors } from "formik";
import useSWR, { trigger } from "swr";

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function TambahData() {
  const [provinceId, setProvinceId] = useState("");

  const toast = useToast();
  const router = useRouter();

  // Shape of form values
  interface FormValues {
    id: number;
    region_ids: [];
    region_name: [];
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
    size_160: number;
    size_170: number;
    size_180: number;
    size_190: number;
    size_200: number;
    remark: string;
    created_by: number;
    country_id: string;
    currency_id: string;
  }

  const listProvinceResponse = useSWR(
    "https://app.jala.tech/api/regions?search&sort=&scope=province&per_page=3" +
      "4",
    (url) =>
      fetcher(url, {
        headers: {
          Authorization: `Bearer ${process.env.JALATOKENPROD}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
  );

  let province;

  if (listProvinceResponse.data) {
    province = listProvinceResponse.data.data;
  }
  let region;

  function submitData(values) {
    const regions = values.region_ids;

    function multipleSend(value, index) {
      const dataHarga = {
        region_id: values.region_ids[index],
        date: values.date,
        species_id: values.species_id,
        size_20: values.size_20,
        size_30: values.size_30,
        size_40: values.size_40,
        size_50: values.size_50,
        size_60: values.size_60,
        size_70: values.size_70,
        size_80: values.size_80,
        size_90: values.size_90,
        size_100: values.size_100,
        size_110: values.size_110,
        size_120: values.size_120,
        size_130: values.size_130,
        size_140: values.size_140,
        size_150: values.size_150,
        size_160: values.size_160,
        size_170: values.size_170,
        size_180: values.size_180,
        size_190: values.size_190,
        size_200: values.size_200,
        remark: values.remark,
        created_by: 10579,
        country_id: "ID",
        currency_id: "IDR",
      };
      // console.log("kirim data ", dataHarga, index, value);
      fetch(`https://app.jala.tech/api/shrimp_prices`, {
        method: "POST",
        body: JSON.stringify(dataHarga),
        headers: {
          Authorization: `Bearer ${process.env.JALATOKENPROD}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.text();
          toast({
            title: "Berhasil",
            description: `Harga baru untuk ${values.region_name[index]} berhasil dibuat`,
            status: "success",
            duration: 5000,
          });
        })
        // .then(result => console.log(result))
        .catch((error) => {
          toast({
            title: "Gagal",
            description: `Gagal membuat harga, ${error}`,
            status: "error",
            duration: 5000,
          });
        });
    }

    if (values.region_ids.length) {
      // console.log('regions', regions)
      regions.forEach(multipleSend);
      trigger(
        `https://app.jala.tech/api/shrimp_prices?search&with=creator,species,region&sort=size_100&created_by__in=10579&sort=created_at,desc`
      );
    } else {
      // console.log("pilih provinsi");
      toast({
        title: "Gagal",
        description: `Gagal membuat harga, periksa kembali data harga yang Anda buat`,
        status: "error",
        duration: 5000,
      });
    }
    setTimeout(() => {
      router.reload();
    }, 3000);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.region_ids) {
      errors.region_ids = "Required";
    } else if (values.region_ids === []) {
      errors.region_ids = "Pilih provinsi terlebih dahulu";
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
      id: 0,
      region_id: "",
      region_ids: [],
      region_name: [],
      date: format(new Date(), "yyyy-MM-dd"),
      species_id: 1,
      size_20: 0,
      size_30: 0,
      size_40: 0,
      size_50: 0,
      size_60: 0,
      size_70: 0,
      size_80: 0,
      size_90: 0,
      size_100: 0,
      size_110: 0,
      size_120: 0,
      size_130: 0,
      size_140: 0,
      size_150: 0,
      size_160: 0,
      size_170: 0,
      size_180: 0,
      size_190: 0,
      size_200: 0,
      remark: "",
      created_by: 10579,
      country_id: "ID",
      currency_id: "IDR",
    },
    validate,
    onSubmit: (values) => {
      submitData(values);
    },
  });

  // console.log("province id", provinceId);
  const listRegionResponse = useSWR(
    // `https://app.jala.tech/api/regions?sort=&scope=regency&search=${provinceName}&per_page=100&id=${provinceId}&`,
    `https://app.jala.tech/api/regions?sort=&scope=regency&province_id__in=${provinceId}&per_page=100`,
    (url) =>
      fetcher(url, {
        headers: {
          Authorization: `Bearer ${process.env.JALATOKENPROD}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
  );

  if (listRegionResponse.data) {
    region = listRegionResponse.data.data;
    // console.log("region", region);
  }

  const regionlist = document.getElementById("region-list");

  // const provincePicker = document.getElementById("province-picker");

  return (
    <div>
      <Button
        onClick={onOpen}
        isFullWidth
        mb={4}
        size="lg"
        colorScheme="orange"
      >
        <Text mr={2}>😏 </Text>Mau Buat Harga Baru?
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
        <DrawerOverlay>
          <DrawerContent>
            <Box pl={4} pt={4}>
              <Button
                onClick={() => onClose()}
                variant="outline"
                borderRadius="full"
                colorScheme="gray"
                size="md"
              >
                <ArrowBackIcon />
              </Button>
            </Box>
            <DrawerHeader>
              <Text>Tambah Harga Udang</Text>
              <Text
                color="orange.500"
                id="region-list"
                fontWeight={500}
                fontSize="xs"
              >
                {formik.values.region_name.join()}
              </Text>
            </DrawerHeader>
            <DrawerBody>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-body">
                  {/* <Stack spacing={4} direction="row"> */}
                  <Stack direction="column" spacing={3}>
                    <Text color="gray.500" fontWeight={600}>
                      Tanggal
                    </Text>
                    <Input
                      id="tanggal"
                      name="tanggal"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.date}
                    />
                    <Text color="gray.500" fontWeight={600}>
                      Provinsi
                    </Text>
                    <Select
                      id="province-picker"
                      size="md"
                      value={provinceId}
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        // setProvinceName(e.target.value);
                        setProvinceId(e.target.value);
                      }}
                    >
                      <option value="">Pilih Provinsi</option>
                      {province
                        ? province.map((d) => (
                            <option
                              value={d.id}
                              // htmlFor={provincePicker}
                              key={d.id}
                            >
                              {d.name}
                            </option>
                          ))
                        : "Loading"}
                    </Select>
                    {formik.touched.region_id && formik.errors.region_id ? (
                      <Text color="red.500" fontWeight={400} fontSize="xs">
                        {formik.errors.region_id}
                      </Text>
                    ) : null}
                    <Text color="gray.500" fontWeight={600}>
                      Kota/Kabupaten
                    </Text>
                    <Box textAlign="left" overflow="scroll" maxH={500}>
                      <Stack
                        direction="column"
                        spacing={3}
                        borderWidth="1px"
                        borderRadius="lg"
                        p={2}
                      >
                        {region && provinceId !== "" ? (
                          region.map(
                            (d: {
                              id: string;
                              name: string;
                              regency_id: string;
                              province_id: string;
                            }) =>
                              d.regency_id && d.province_id === provinceId ? (
                                formik.values.region_ids.includes(d.id) ? (
                                  <Checkbox
                                    defaultIsChecked
                                    type="checkbox"
                                    colorScheme="orange"
                                    name="region_id"
                                    id={`region_id ${d.id}`}
                                    onChange={(e) => {
                                      const cb = document.getElementById(
                                        `region_id ${d.id}`
                                      ) as HTMLInputElement;
                                      if (cb.checked === true) {
                                        formik.values.region_ids.push(
                                          e.target.value
                                        );
                                        formik.values.region_name.push(d.name);
                                      } else {
                                        const index =
                                          formik.values.region_ids.indexOf(
                                            e.target.value
                                          );
                                        if (index > -1) {
                                          formik.values.region_ids.splice(
                                            index,
                                            1
                                          );
                                          formik.values.region_name.splice(
                                            index,
                                            1
                                          );
                                        }
                                      }
                                      regionlist.innerText = `${formik.values.region_name.join(
                                        ", "
                                      )}`;
                                    }}
                                    value={d.id}
                                    key={d.id}
                                  >
                                    {d.name}
                                  </Checkbox>
                                ) : (
                                  <Checkbox
                                    type="checkbox"
                                    colorScheme="orange"
                                    name="region_id"
                                    id={`region_id ${d.id}`}
                                    onChange={(e) => {
                                      const cb = document.getElementById(
                                        `region_id ${d.id}`
                                      ) as HTMLInputElement;
                                      if (cb.checked === true) {
                                        formik.values.region_ids.push(
                                          e.target.value
                                        );
                                        formik.values.region_name.push(d.name);
                                      } else {
                                        const index =
                                          formik.values.region_ids.indexOf(
                                            e.target.value
                                          );
                                        if (index > -1) {
                                          formik.values.region_ids.splice(
                                            index,
                                            1
                                          );
                                          formik.values.region_name.splice(
                                            index,
                                            1
                                          );
                                        }
                                      }
                                      regionlist.innerText = `${formik.values.region_name.join(
                                        ", "
                                      )}`;
                                    }}
                                    value={d.id}
                                    key={d.id}
                                  >
                                    {d.name}
                                  </Checkbox>
                                )
                              ) : (
                                ""
                              )
                          )
                        ) : (
                          <Text color="gray.500" fontWeight={400} fontSize="sm">
                            Pilih Provinsi terlebih dahulu
                          </Text>
                        )}
                      </Stack>
                    </Box>
                    <Text htmlFor="size_20" color="gray.500" fontWeight={600}>
                      Size 20
                    </Text>
                    <Input
                      id="size_20"
                      name="size_20"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_20}
                    />
                    <Text htmlFor="size_30" color="gray.500" fontWeight={600}>
                      Size 30
                    </Text>
                    <Input
                      id="size_30"
                      name="size_30"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_30}
                    />
                    <Text htmlFor="size_40" color="gray.500" fontWeight={600}>
                      Size 40
                    </Text>
                    <Input
                      id="size_40"
                      name="size_40"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_40}
                    />
                    <Text htmlFor="size_50" color="gray.500" fontWeight={600}>
                      Size 50
                    </Text>
                    <Input
                      id="size_50"
                      name="size_50"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_50}
                    />
                    <Text htmlFor="size_60" color="gray.500" fontWeight={600}>
                      Size 60
                    </Text>
                    <Input
                      id="size_60"
                      name="size_60"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_60}
                    />
                    <Text htmlFor="size_70" color="gray.500" fontWeight={600}>
                      Size 70
                    </Text>
                    <Input
                      id="size_70"
                      name="size_70"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_70}
                    />
                    <Text htmlFor="size_80" color="gray.500" fontWeight={600}>
                      Size 80
                    </Text>
                    <Input
                      id="size_80"
                      name="size_80"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_80}
                    />
                    <Text htmlFor="size_90" color="gray.500" fontWeight={600}>
                      Size 90
                    </Text>
                    <Input
                      id="size_90"
                      name="size_90"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_90}
                    />
                    <Text
                      htmlFor="size_100"
                      color="orange.500"
                      fontWeight={800}
                    >
                      Size 100 *wajib diisi{" "}
                    </Text>
                    <Input
                      id="size_100"
                      name="size_100"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.size_100}
                    />{" "}
                    {formik.touched.size_100 && formik.errors.size_100 ? (
                      <Text color="red.500" fontWeight={400} fontSize="xs">
                        {formik.errors.size_100}
                      </Text>
                    ) : null}
                    <Text htmlFor="size_110" color="gray.500" fontWeight={600}>
                      Size 110
                    </Text>
                    <Input
                      id="size_110"
                      name="size_110"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_110}
                    />
                    <Text htmlFor="size_120" color="gray.500" fontWeight={600}>
                      Size 120
                    </Text>
                    <Input
                      id="size_120"
                      name="size_120"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_120}
                    />
                    <Text htmlFor="size_130" color="gray.500" fontWeight={600}>
                      Size 130
                    </Text>
                    <Input
                      id="size_130"
                      name="size_130"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_130}
                    />
                    <Text htmlFor="size_140" color="gray.500" fontWeight={600}>
                      Size 140
                    </Text>
                    <Input
                      id="size_140"
                      name="size_140"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_140}
                    />
                    <Text htmlFor="size_150" color="gray.500" fontWeight={600}>
                      Size 150
                    </Text>
                    <Input
                      id="size_150"
                      name="size_150"
                      type="number"
                      placeholder="Dalam Rp"
                      onChange={formik.handleChange}
                      value={formik.values.size_150}
                    />
                    <Text htmlFor="remark" color="gray.500" fontWeight={600}>
                      Catatan
                    </Text>
                    <Textarea
                      rows={2}
                      id="remark"
                      name="remark"
                      placeholder="isi catatan anda di sini"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.remark}
                    />
                  </Stack>
                </div>
                <Button
                  mt={2}
                  isFullWidth
                  colorScheme="orange"
                  size="lg"
                  aria-label="submit entry"
                  onClick={() => {
                    onClose();
                  }}
                  type="submit"
                >
                  Tambah Harga
                </Button>
              </form>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
}
