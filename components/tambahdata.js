import React, {useState} from 'react'
import {
    Button,
    Text,
    Select,
    Stack,
    Box,
    Badge,

    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,

    Checkbox,

    Input,
    Textarea,
    useToast
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import format from 'date-fns/format'
import {useFormik} from 'formik'
import useSWR,{trigger} from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function TambahData() {

    const [provinceName,
        setProvinceName] = useState('')
    
        const toast = useToast()

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

    function submitData(values) {
        const regions = values.region_id;

        if (values.region_id.length) {
            // console.log('regions', regions)
            regions.forEach(multipleSend)
            
            toast({
                title: "Berhasil",
                description: `Harga baru untuk ${values.region_name} berhasil dibuat`,
                status: "success",
                duration: 5000,
              })
              trigger(`https://app.jala.tech/api/shrimp_prices?search&with=creator,species,region&sort=size_100&created_by__in=10579&sort=created_at,desc`)
              location.reload()
        } else {
            console.log('pilih provinsi')
        }

        function multipleSend(value, index) {
            const dataHarga = {
                region_id: values.region_id[index],
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
            country_id: 'ID',
            currency_id: 'IDR'
            }
            console.log('kirim data ', dataHarga, index, value)
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
                // .then(result => console.log(result))
                .catch(error => console.log('error', error));
                
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
            region_name: [],
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
            remark: "",
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

    const regionlist = document.getElementById('region-list')

    return (
        <div>
            <Button onClick={onOpen} isFullWidth mb={4} size="lg" colorScheme="orange">
                <Text mr={2} >😏 </Text>Mau Buat Harga Baru?
            </Button>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
                <DrawerOverlay>
                    <DrawerContent>
                    <Badge p={4} fontSize="0.8em" onClick={() => {onClose()}} style={{cursor: "pointer"}}><ArrowBackIcon w={4} h={4} /> Kembali</Badge>
                        <DrawerHeader><Text>Tambah Harga Udang</Text>
                        <Text color="orange.500" id="region-list" fontWeight={500} fontSize='xs'>{formik.values.region_name.join()}</Text>
                        </DrawerHeader>
                        <DrawerBody>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-body">
                                    {/* <Stack spacing={4} direction="row"> */}
                                        <Box>
                                            <Text mb={2} color="gray.500" fontWeight={600}>Tanggal</Text>
                                            <Input
                                                mb={2}
                                                id="tanggal"
                                                name="tanggal"
                                                type="date"
                                                onChange={formik.handleChange}
                                                value={formik.values.date}/>
                                            <Text mb={2} color="gray.500" fontWeight={600}>Provinsi</Text>
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
                                            <Text mb={2} color="gray.500" fontWeight={400} fontSize='xs'>note: sudah bisa pilih region di beda provinsi dalam sekali kirim!!</Text>
                                            <Text mb={2} color="gray.500" fontWeight={600}>Kota/Kabupaten</Text>
                                            <Box textAlign="left" overflow="scroll">
                                                <Stack direction="column" spacing={3} borderWidth="1px" borderRadius="lg" p={2}>
                                                    {region && provinceName != ''
                                                        ? region.map(d => 
                                                        (formik.values.region_id.includes(d.id) ? <Checkbox defaultIsChecked
                                                            type="checkbox"
                                                            colorScheme="orange"
                                                            name="region_id"
                                                            id={"region_id"+d.id}
                                                            onChange={
                                                                (e)=>{
                                                                    
                                                                    var cb = document.getElementById(`region_id`+d.id)
                                                                    if(cb.checked == true){
                                                                        formik.values.region_id.push(e.target.value)
                                                                        formik.values.region_name.push(d.name)
                                                                    }else{
                                                                        const index = formik.values.region_id.indexOf(e.target.value);
                                                                        if (index > -1) {
                                                                            formik.values.region_id.splice(index, 1);
                                                                            formik.values.region_name.splice(index, 1)
                                                                        }
                                                                    }
                                                                    regionlist.innerText = `${formik.values.region_name.join(', ')}`
                                                                }
                                                            }
                                                            value={d.id}
                                                            key={d.id}>
                                                            {d.name}</Checkbox> : 
                                                            <Checkbox
                                                            type="checkbox"
                                                            colorScheme="orange"
                                                            name="region_id"
                                                            id={"region_id"+d.id}
                                                            onChange={
                                                                (e)=>{
                                                                    var cb = document.getElementById(`region_id`+d.id)
                                                                    if(cb.checked == true){
                                                                        formik.values.region_id.push(e.target.value)
                                                                        formik.values.region_name.push(d.name)
                                                                    }else{
                                                                        const index = formik.values.region_id.indexOf(e.target.value);
                                                                        if (index > -1) {
                                                                            formik.values.region_id.splice(index, 1);
                                                                            formik.values.region_name.splice(index, 1)
                                                                        }
                                                                    }
                                                                    regionlist.innerText = `${formik.values.region_name.join(', ')}`
                                                                }
                                                            }
                                                            value={d.id}
                                                            key={d.id}>
                                                            {d.name}</Checkbox>)
                                                        )
                                                        : <Text mb={2} color="gray.500" fontWeight={400} fontSize='sm'>Pilih Provinsi terlebih dahulu</Text>}
                                                </Stack>
                                            </Box>
                                        </Box>
                                        <Box mt={2}>
                                            <Text htmlFor="size_20" mb={2} color="gray.500" fontWeight={600}>Size 20</Text>
                                            <Input
                                                mb={2}
                                                id="size_20"
                                                name="size_20"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_20}/>
                                            <Text htmlFor="size_30" mb={2} color="gray.500" fontWeight={600}>Size 30</Text>
                                            <Input
                                                mb={2}
                                                id="size_30"
                                                name="size_30"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_30}/>
                                            <Text htmlFor="size_40" mb={2} color="gray.500" fontWeight={600}>Size 40</Text>
                                            <Input
                                                mb={2}
                                                id="size_40"
                                                name="size_40"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_40}/>
                                            <Text htmlFor="size_50" mb={2} color="gray.500" fontWeight={600}>Size 50</Text>
                                            <Input
                                                mb={2}
                                                id="size_50"
                                                name="size_50"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_50}/>
                                            <Text htmlFor="size_60" mb={2} color="gray.500" fontWeight={600}>Size 60</Text>
                                            <Input
                                                mb={2}
                                                id="size_60"
                                                name="size_60"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_60}/>
                                            <Text htmlFor="size_70" mb={2} color="gray.500" fontWeight={600}>Size 70</Text>
                                            <Input
                                                mb={2}
                                                id="size_70"
                                                name="size_70"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_70}/>
                                            <Text htmlFor="size_80" mb={2} color="gray.500" fontWeight={600}>Size 80</Text>
                                            <Input
                                                mb={2}
                                                id="size_80"
                                                name="size_80"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_80}/>
                                            <Text htmlFor="size_90" mb={2} color="gray.500" fontWeight={600}>Size 90</Text>
                                            <Input
                                                mb={2}
                                                id="size_90"
                                                name="size_90"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_90}/>
                                            
                                        </Box>
                                        <Box>
                                        <Text htmlFor="size_100" mb={2} color="orange.500" fontWeight={800}>Size 100 *wajib diisi </Text>
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
                                            <Text htmlFor="size_110" mb={2} color="gray.500" fontWeight={600}>Size 110</Text>
                                            <Input
                                                mb={2}
                                                id="size_110"
                                                name="size_110"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_110}/>
                                            <Text htmlFor="size_120" mb={2} color="gray.500" fontWeight={600}>Size 120</Text>
                                            <Input
                                                mb={2}
                                                id="size_120"
                                                name="size_120"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_120}/>
                                            <Text htmlFor="size_130" mb={2} color="gray.500" fontWeight={600}>Size 130</Text>
                                            <Input
                                                mb={2}
                                                id="size_130"
                                                name="size_130"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_130}/>
                                            <Text htmlFor="size_140" mb={2} color="gray.500" fontWeight={600}>Size 140</Text>
                                            <Input
                                                mb={2}
                                                id="size_140"
                                                name="size_140"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_140}/>
                                            <Text htmlFor="size_150" mb={2} color="gray.500" fontWeight={600}>Size 150</Text>
                                            <Input
                                                mb={2}
                                                id="size_150"
                                                name="size_150"
                                                type="number"
                                                placeholder="Dalam Rp"
                                                onChange={formik.handleChange}
                                                value={formik.values.size_150}/>
                                                <Text htmlFor="remark" mb={2} color="gray.500" fontWeight={600}>Catatan</Text>
                                    <Textarea
                                        mb={2}
                                        rows="5"
                                        id="remark"
                                        name="remark"
                                        placeholder="isi catatan anda di sini"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.remark}/>
                                        </Box>
                                    {/* </Stack> */}
                                    {/* <Box mt={4} mb={2}>
                                            <Text color="gray.600" fontWeight={400} fontSize='sm'>buat harga baru untuk untuk daerah:</Text>
                                            <Text color="orange.500" id="region-list" fontWeight={500} fontSize='md'>{formik.values.region_name.join()}</Text>
                                            </Box> */}
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
