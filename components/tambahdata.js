import React, {useState} from 'react'
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
    Textarea
} from '@chakra-ui/react'
import format from 'date-fns/format'
import {useFormik} from 'formik'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function TambahData() {

    const [provinceName,
        setProvinceName] = useState('')

    const listProvinceResponse = useSWR("https://app.jala.tech/api/regions?search&sort=&scope=province&per_page=3" +
            "4",
    (url) => fetcher(url, {
        headers: {
            'Authorization': `Bearer ${process.env.JALATOKENPROD}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }))

    let province;

    if (listProvinceResponse.data) {
        province = listProvinceResponse.data.data;
    }
    let region;

    function submitData(value) {
        // console.log('data harga', value.region_id)
        const regions = value.region_id;

        if (value.region_id.length) {
            // console.log('regions', regions)
            regions.forEach(multipleSend)
            location.reload()
        } else {
            console.log('pilih provinsi')
        }

        function multipleSend(index) {
            const dataHarga = {
                region_id: index,
            date: value.date,
            species_id: value.species_id,
            size_20: value.size_20,
            size_30: value.size_30,
            size_40: value.size_40,
            size_50: value.size_50,
            size_60: value.size_60,
            size_70: value.size_70,
            size_80: value.size_80,
            size_90: value.size_90,
            size_100: value.size_100,
            size_110: value.size_110,
            size_120: value.size_120,
            size_130: value.size_130,
            size_140: value.size_140,
            size_150: value.size_150,
            size_160: value.size_160,
            size_170: value.size_170,
            size_180: value.size_180,
            size_190: value.size_190,
            size_200: value.size_200,
            remark: value.remark,
            created_by: 10579,
            country_id: 'ID',
            currency_id: 'IDR'
            }
            console.log('kirim data ', dataHarga, index)
            fetch(`https://app.jala.tech/api/shrimp_prices`, {
                method: 'POST',
                body: JSON.stringify(dataHarga),
                    headers: {
                        'Authorization': `Bearer ${process.env.JALATOKENPROD}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            console.log('cek harga udang')
        }

    }

    

    const {isOpen, onOpen, onClose} = useDisclosure()

    const validate = values => {
        const errors = {};
        if (!values.region_id) {
            errors.region_id = 'Required';
        } else if (values.region_id == '') {
            errors.region_id = 'Pilih provinsi terlebih dahulu';
        }

        if (!values.size_100) {
            errors.size_100 = 'Required';
        } else if (values.size_100 == 0) {
            errors.size_100 = 'Isi harga size 100';
        }
        return errors;
    };

    

    const formik = useFormik({
        initialValues: {
            region_id: [],
            date: format(new Date(), 'yyyy-MM-dd'),
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
            remark: "dikirim dari Syauqy",
            created_by: 10579,
            country_id: 'ID',
            currency_id: 'IDR'
        },
        validate,
        onSubmit: values => {
            submitData(values)
        }
    });

    const listRegionResponse = useSWR(`https://app.jala.tech/api/regions?search&sort=&scope=regency&search=${provinceName}&per_page=100`, (url) => fetcher(url, {
        headers: {
            'Authorization': `Bearer ${process.env.JALATOKENPROD}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }))

    if (listRegionResponse.data) {
        region = listRegionResponse.data.data;
    }

    return (
        <div>
            <Button onClick={onOpen} mb={4} size="lg" colorScheme="orange">
                Tambah Data
            </Button>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xl">
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader>Tambah Harga Udang</DrawerHeader>
                        <DrawerBody>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-body">
                                    <Stack spacing={4} direction="row">
                                        <Box>
                                            <Text mb={2} color="orange.500" fontWeight={600}>Tanggal</Text>
                                            <Input
                                                mb={2}
                                                id="tanggal"
                                                name="tanggal"
                                                type="date"
                                                onChange={formik.handleChange}
                                                value={formik.values.date}/>
                                            <Text mb={2} color="orange.500" fontWeight={600}>Provinsi</Text>
                                            <Select
                                                id="province-picker"
                                                size="md"
                                                mb={2}
                                                value={provinceName}
                                                onBlur={formik.handleBlur}
                                                onChange={(e) => {
                                                setProvinceName(e.target.value);
                                            }}>
                                                <option value=''>Pilih Provinsi</option>
                                                {province
                                                    ? province.map(d => <option value={d.name} htmlFor="province-picker" key={d.id}>{d.name}</option>)
                                                    : 'Loading'}
                                            </Select>
                                            {formik.touched.region_id && formik.errors.region_id
                                                ? <Text mb={2} color="red.500" fontWeight={400} fontSize='xs'>{formik.errors.region_id}</Text>
                                                : null}
                                            <Text mb={2} color="gray.500" fontWeight={400} fontSize='xs'>note: satu kali submit hanya bisa untuk satu provinsi saja</Text>
                                            <Text mb={2} color="orange.500" fontWeight={600}>Kota/Kabupaten</Text>
                                            <Box h={500} textAlign="left" overflow="scroll">
                                                <Stack direction="column" spacing={3}>
                                                    {region && provinceName != ''
                                                        ? region.map(d => <Checkbox
                                                            type="checkbox"
                                                            colorScheme="orange"
                                                            name="region_id"
                                                            id="region_id"
                                                            onChange={
                                                                (e)=>{
                                                                    formik.values.region_id.push(e.target.value)
                                                                    // console.log(formik.values.region_id)
                                                                }
                                                            }
                                                            value={d.id}
                                                            key={d.id}>
                                                            {d.name}
                                                        </Checkbox>)
                                                        : <Text mb={2} color="gray.500" fontWeight={400} fontSize='sm'>Pilih Provinsi terlebih dahulu</Text>}
                                                </Stack>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Text htmlFor="size_20" mb={2} color="orange.500" fontWeight={600}>Size 20</Text>
                                            <Input
                                                mb={2}
                                                id="size_20"
                                                name="size_20"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_20}/>
                                            <Text htmlFor="size_30" mb={2} color="orange.500" fontWeight={600}>Size 30</Text>
                                            <Input
                                                mb={2}
                                                id="size_30"
                                                name="size_30"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_30}/>
                                            <Text htmlFor="size_40" mb={2} color="orange.500" fontWeight={600}>Size 40</Text>
                                            <Input
                                                mb={2}
                                                id="size_40"
                                                name="size_40"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_40}/>
                                            <Text htmlFor="size_50" mb={2} color="orange.500" fontWeight={600}>Size 50</Text>
                                            <Input
                                                mb={2}
                                                id="size_50"
                                                name="size_50"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_50}/>
                                            <Text htmlFor="size_60" mb={2} color="orange.500" fontWeight={600}>Size 60</Text>
                                            <Input
                                                mb={2}
                                                id="size_60"
                                                name="size_60"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_60}/>
                                            <Text htmlFor="size_70" mb={2} color="orange.500" fontWeight={600}>Size 70</Text>
                                            <Input
                                                mb={2}
                                                id="size_70"
                                                name="size_70"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_70}/>
                                            <Text htmlFor="size_80" mb={2} color="orange.500" fontWeight={600}>Size 80</Text>
                                            <Input
                                                mb={2}
                                                id="size_80"
                                                name="size_80"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_80}/>
                                            <Text htmlFor="size_90" mb={2} color="orange.500" fontWeight={600}>Size 90</Text>
                                            <Input
                                                mb={2}
                                                id="size_90"
                                                name="size_90"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_90}/>
                                            <Text htmlFor="size_100" mb={2} color="orange.500" fontWeight={600}>Size 100</Text>
                                            <Input
                                                mb={2}
                                                id="size_100"
                                                name="size_100"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.size_100}/> {formik.touched.size_100 && formik.errors.size_100
                                                ? <Text mb={2} color="red.500" fontWeight={400} fontSize='xs'>{formik.errors.size_100}</Text>
                                                : null}
                                        </Box>
                                        <Box>
                                            <Text htmlFor="size_110" mb={2} color="orange.500" fontWeight={600}>Size 110</Text>
                                            <Input
                                                mb={2}
                                                id="size_110"
                                                name="size_110"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_110}/>
                                            <Text htmlFor="size_120" mb={2} color="orange.500" fontWeight={600}>Size 120</Text>
                                            <Input
                                                mb={2}
                                                id="size_120"
                                                name="size_120"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_120}/>
                                            <Text htmlFor="size_130" mb={2} color="orange.500" fontWeight={600}>Size 130</Text>
                                            <Input
                                                mb={2}
                                                id="size_130"
                                                name="size_130"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_130}/>
                                            <Text htmlFor="size_140" mb={2} color="orange.500" fontWeight={600}>Size 140</Text>
                                            <Input
                                                mb={2}
                                                id="size_140"
                                                name="size_140"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_140}/>
                                            <Text htmlFor="size_150" mb={2} color="orange.500" fontWeight={600}>Size 150</Text>
                                            <Input
                                                mb={2}
                                                id="size_150"
                                                name="size_150"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_150}/>
                                            <Text htmlFor="size_160" mb={2} color="orange.500" fontWeight={600}>Size 160</Text>
                                            <Input
                                                mb={2}
                                                id="size_160"
                                                name="size_160"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_160}/>
                                            <Text htmlFor="size_170" mb={2} color="orange.500" fontWeight={600}>Size 170</Text>
                                            <Input
                                                mb={2}
                                                id="size_170"
                                                name="size_170"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_170}/>
                                            <Text htmlFor="size_180" mb={2} color="orange.500" fontWeight={600}>Size 180</Text>
                                            <Input
                                                mb={2}
                                                id="size_180"
                                                name="size_180"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_180}/>
                                            <Text htmlFor="size_190" mb={2} color="orange.500" fontWeight={600}>Size 190</Text>
                                            <Input
                                                mb={2}
                                                id="size_190"
                                                name="size_190"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_190}/>
                                            <Text htmlFor="size_200" mb={2} color="orange.500" fontWeight={600}>Size 200</Text>
                                            <Input
                                                mb={2}
                                                id="size_200"
                                                name="size_200"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_200}/>
                                        </Box>
                                    </Stack>
                                    <Text htmlFor="remark" mb={2} color="orange.500" fontWeight={600}>Catatan</Text>
                                    <Textarea
                                        mb={2}
                                        rows="10"
                                        id="remark"
                                        name="remark"
                                        placeholder="Format markdown"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.remark}/>
                                </div>
                                <Button
                                    mb={2}
                                    mt={2}
                                    isFullWidth
                                    colorScheme="orange"
                                    size="lg"
                                    aria-label="submit entry"
                                    onClick={() => {
                                    onClose()
                                }}
                                    type="submit">Tambah Harga</Button>
                            </form>
                        </DrawerBody>
                    </DrawerContent>

                </DrawerOverlay>
            </Drawer>

        </div>
    )
}
