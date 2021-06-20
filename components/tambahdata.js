import React, {useState} from 'react'
import {
    Button,
    Text,
    Select,
    Center,

    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,

    Input,
    Textarea
} from '@chakra-ui/react'
import format from 'date-fns/format'
import {useFormik} from 'formik'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function TambahData() {

    const [provinceName, setProvinceName] = useState('')

    const listProvinceResponse = useSWR("https://staging-app.jala.tech/api/regions?search&sort=&scope=province&per_page=34",
      (url) => fetcher(url, {
        headers: {
            'Authorization': `Bearer ${process.env.JALATOKENSTAG}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      }))

      console.log('provinsi', listProvinceResponse.data)

      let province;

      if(listProvinceResponse.data){
        province = listProvinceResponse.data.data;
      }
      let region;

    function submitData(value) {
        console.log('data harga', value)
        fetch(`https://staging-app.jala.tech/api/shrimp_prices`, {
            method: 'POST',
            body: JSON.stringify(value),
                headers: {
                    'Authorization': `Bearer ${process.env.JALATOKENSTAG}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        console.log('cek harga udang')
    }

    const listRegionResponse = useSWR(`https://staging-app.jala.tech/api/regions?search&sort=&scope=regency&search=${provinceName}`,
      (url) => fetcher(url, {
        headers: {
            'Authorization': `Bearer ${process.env.JALATOKENSTAG}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      }))

      if(listRegionResponse.data){
        region = listRegionResponse.data.data;
        console.log('ganti province', provinceName, region)
      }
      

    const {isOpen, onOpen, onClose} = useDisclosure()

    const formik = useFormik({
        initialValues: {
            date: format(new Date(), 'yyyy-MM-dd'),
            species_id: 1,
            size_20: 0,
            size_30: 85000,
            size_40: 76000,
            size_50: 66000,
            size_60: 63000,
            size_70: 60000,
            size_80: 56000,
            size_90: 53000,
            size_100: 51000,
            size_110: 49000,
            size_120: 47000,
            size_130: 43000,
            size_140: 41000,
            size_150: 39000,
            size_160: 0,
            size_170: 0,
            size_180: 0,
            size_190: 0,
            size_200: 0,
            remark: "dikirim dari Syauqy",
            created_by: 10579,
            region_id: 33,
            country_id: 'ID',
            currency_id: 'IDR'
        },
        onSubmit: values => {
            submitData(values)
        }
    });
    return (
        <div>
            <Button onClick={onOpen} mb={4} size="lg" colorScheme="purple">
                Tambah Data
            </Button>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader>Tambah Harga Udang</DrawerHeader>
                        <DrawerBody>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-body">
                                    <Text mb={2} mb={2} color="purple.500" fontWeight={600}>Provinsi</Text>
                                    <Select
                                        id="province-picker"
                                        size="md"
                                        mb={2}
                                        value={provinceName}
                                        onChange={(e) => {
                                            setProvinceName(e.target.value);
                                            console.log('region', provinceName, region)
                                    }}>
                                        <option value=''>Pilih provinsi</option>
                                        {province ? province.map(d => <option value={d.name} htmlFor="province-picker" key={d.id}>{d.name
                                        }</option>) : 'Loading'}
                                    </Select>
                                    <Text mb={2} mb={2} color="purple.500" fontWeight={600}>Kota/Kabupaten</Text>
                                    <Select
                                        id="region-picker"
                                        size="md"
                                        mb={2}
                                        value={provinceName}
                                        onChange={(e) => {
                                            setProvinceName(e.target.value);
                                            console.log('region', provinceName, region)
                                    }}>
                                        <option value=''>Pilih lokasi</option>
                                        {region ? region.map(d => <option value={d.name} htmlFor="region-picker" key={d.id+1}>{d.name
                                        }</option>) : 'Loading'}
                                    </Select>
                                    <Text htmlFor="tanggal" mb={2} color="purple.500" fontWeight={600}>Tanggal</Text>
                                    <Input
                                        mb={2}
                                        id="tanggal"
                                        name="tanggal"
                                        type="date"
                                        onChange={formik.handleChange}
                                        value={formik.values.date}/>

                                    <Text htmlFor="size_20" mb={2} color="purple.500" fontWeight={600}>Size 20</Text>
                                    <Input
                                        mb={2}
                                        id="size_20"
                                        name="size_20"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_20}/>
                                    <Text htmlFor="size_30" mb={2} color="purple.500" fontWeight={600}>Size 30</Text>
                                    <Input
                                        mb={2}
                                        id="size_30"
                                        name="size_30"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_30}/>
                                    <Text htmlFor="size_40" mb={2} color="purple.500" fontWeight={600}>Size 40</Text>
                                    <Input
                                        mb={2}
                                        id="size_40"
                                        name="size_40"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_40}/>
                                    <Text htmlFor="size_50" mb={2} color="purple.500" fontWeight={600}>Size 50</Text>
                                    <Input
                                        mb={2}
                                        id="size_50"
                                        name="size_50"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_50}/>
                                    <Text htmlFor="size_60" mb={2} color="purple.500" fontWeight={600}>Size 60</Text>
                                    <Input
                                        mb={2}
                                        id="size_60"
                                        name="size_60"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_60}/>
                                    <Text htmlFor="size_70" mb={2} color="purple.500" fontWeight={600}>Size 70</Text>
                                    <Input
                                        mb={2}
                                        id="size_70"
                                        name="size_70"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_70}/>
                                    <Text htmlFor="size_80" mb={2} color="purple.500" fontWeight={600}>Size 80</Text>
                                    <Input
                                        mb={2}
                                        id="size_80"
                                        name="size_80"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_80}/>
                                    <Text htmlFor="size_90" mb={2} color="purple.500" fontWeight={600}>Size 90</Text>
                                    <Input
                                        mb={2}
                                        id="size_90"
                                        name="size_90"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_90}/>
                                    <Text htmlFor="size_100" mb={2} color="purple.500" fontWeight={600}>Size 100</Text>
                                    <Input
                                        mb={2}
                                        id="size_100"
                                        name="size_100"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_100}/>
                                    <Text htmlFor="size_110" mb={2} color="purple.500" fontWeight={600}>Size 110</Text>
                                    <Input
                                        mb={2}
                                        id="size_110"
                                        name="size_110"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_110}/>
                                    <Text htmlFor="size_120" mb={2} color="purple.500" fontWeight={600}>Size 120</Text>
                                    <Input
                                        mb={2}
                                        id="size_120"
                                        name="size_120"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_120}/>
                                    <Text htmlFor="size_130" mb={2} color="purple.500" fontWeight={600}>Size 130</Text>
                                    <Input
                                        mb={2}
                                        id="size_130"
                                        name="size_130"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_130}/>
                                    <Text htmlFor="size_140" mb={2} color="purple.500" fontWeight={600}>Size 140</Text>
                                    <Input
                                        mb={2}
                                        id="size_140"
                                        name="size_140"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_140}/>
                                    <Text htmlFor="size_150" mb={2} color="purple.500" fontWeight={600}>Size 150</Text>
                                    <Input
                                        mb={2}
                                        id="size_150"
                                        name="size_150"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_150}/>
                                    <Text htmlFor="size_160" mb={2} color="purple.500" fontWeight={600}>Size 160</Text>
                                    <Input
                                        mb={2}
                                        id="size_160"
                                        name="size_160"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_160}/>
                                    <Text htmlFor="size_170" mb={2} color="purple.500" fontWeight={600}>Size 170</Text>
                                    <Input
                                        mb={2}
                                        id="size_170"
                                        name="size_170"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_170}/>
                                    <Text htmlFor="size_180" mb={2} color="purple.500" fontWeight={600}>Size 180</Text>
                                    <Input
                                        mb={2}
                                        id="size_180"
                                        name="size_180"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_180}/>
                                    <Text htmlFor="size_190" mb={2} color="purple.500" fontWeight={600}>Size 190</Text>
                                    <Input
                                        mb={2}
                                        id="size_190"
                                        name="size_190"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_190}/>
                                    <Text htmlFor="size_200" mb={2} color="purple.500" fontWeight={600}>Size 200</Text>
                                    <Input
                                        mb={2}
                                        id="size_200"
                                        name="size_200"
                                        type="number"
                                        placeholder="Dalam Rp"
                                        onChange={formik.handleChange}
                                        value={formik.values.size_200}/>

                                    <Text htmlFor="remark" mb={2} color="purple.500" fontWeight={600}>S</Text>
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
                                    colorScheme="purple"
                                    size="lg"
                                    aria-label="submit entry"
                                    onClick={() => {
                                    onClose();
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
