import React from 'react'
import {
    Container,
    Button,
    Stack,
    Avatar,
    Divider,
    Heading,
    Select,
    Input,
    Icon,
    Textarea,
    Box,
    Text,
    Badge,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'


import format from 'date-fns/format'
import { id } from 'date-fns/locale'
import parseISO from 'date-fns/parseISO'
import differenceInDays from 'date-fns/differenceInDays'
import {useFormik} from 'formik'
import {trigger} from 'swr'

import HapusData from './hapusdata'
import StoryModal from './storymodal'


export default function LihatData(data) {
    // console.log(data, data.id)

    const {isOpen, onOpen, onClose} = useDisclosure()

    const toast = useToast()

    const formik = useFormik({
        initialValues: {
            region_id: data.data.region_id,
            date: data.data.date,
            species_id: data.data.species_id,
            size_20: data.data.size_20 ? data.data.size_20 : 0,
            size_30: data.data.size_30 ? data.data.size_30 : 0,
            size_40: data.data.size_40 ? data.data.size_40 : 0,
            size_50: data.data.size_50 ? data.data.size_50 : 0,
            size_60: data.data.size_60 ? data.data.size_60 : 0,
            size_70: data.data.size_70 ? data.data.size_70 : 0,
            size_80: data.data.size_80 ? data.data.size_80 : 0,
            size_90: data.data.size_90 ? data.data.size_90 : 0,
            size_100: data.data.size_100 ? data.data.size_100 : 0,
            size_110: data.data.size_110? data.data.size_110 : 0,
            size_120: data.data.size_120? data.data.size_120 : 0,
            size_130: data.data.size_130? data.data.size_130 : 0,
            size_140: data.data.size_140? data.data.size_140 : 0,
            size_150: data.data.size_150? data.data.size_150 : 0,
            remark: data.data.remark,
            created_by: 10579,
            country_id: 'ID',
            currency_id: 'IDR'
        },
        validate,
        onSubmit: values => {
            editData(values)
        }
    });

    function editData(value){
        // console.log(data.id, value)
        fetch(`https://app.jala.tech/api/shrimp_prices/${data.id}`, {
                method: 'PUT',
                body: JSON.stringify(value),
                    headers: {
                        'Authorization': `Bearer ${process.env.JALATOKENPROD}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.text())
                // .then(result => console.log(result))
                .catch(error => console.log('error', error));
                toast({
                    title: "Berhasil",
                    description: `Informasi harga ${data.data.region.full_name} berhasil diubah`,
                    status: "success",
                    duration: 5000,
                  })
                trigger(`https://app.jala.tech/api/shrimp_prices?search&with=creator,species,region&sort=size_100&created_by__in=10579&sort=created_at,desc`)
                location.reload()
    }

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


    
    return (
        <div>
            <Box
                key={data.id}
                maxW="xl"
                borderWidth="1px"
                borderRadius="lg"
                onClick={onOpen} style={{cursor: "pointer"}}>
                    {differenceInDays(new Date(), parseISO(data.data.date)) < 6
                                ? <Badge colorScheme="orange">New</Badge>
                                : ''}
                <Stack direction="row" spacing={2}>
                    <Box p={2}>
                        <Avatar
                            src={`https://app.jala.tech/img/cache/original/${data.data.creator.avatar}`}/>
                    </Box>
                    <Box p={2} w="xl">
                        <Text fontSize="md" fontWeight="semibold">{data.data.region.full_name}</Text>
                        <Text fontSize="sm" color="gray.500">{data.data.creator.name} &bull; {format(parseISO(data.data.date), 'dd MMMM yyyy', {locale: id})}</Text>
                        {/* <Text fontSize="xs" color="gray.500">{data.data.remark}</Text> */}
                    </Box>
                    <Box p={2}  align="right">
                        <Text fontSize="sm" color="gray.500">Size 100</Text>
                        <Text fontSize="2xl" fontWeight="bold">{data.data.size_100}</Text>
                    </Box>
                </Stack>
            </Box>


            <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
                {/* {console.log('harga terpilih', hargaUdang)} */}
                <DrawerOverlay>
                    <DrawerContent>
                        <Badge p={4} fontSize="0.8em" onClick={() => {onClose()}} style={{cursor: "pointer"}}><ArrowBackIcon w={4} h={4} /> Kembali</Badge>
                        <DrawerHeader><Text>{data.data.region.full_name}</Text> 
                        <Text color="gray.500" fontWeight={400} fontSize='sm'>{format(parseISO(data.data.date), 'dd MMMM yyyy', {locale: id})}</Text></DrawerHeader>
                        <DrawerBody>
                        <StoryModal data={data.data} />
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
                                        </Box>
                                       
                                        <Box>
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
                                        value={formik.values.remark ? formik.values.remark : ''}/>
                                    
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
                                    onClose()
                                }}
                                    type="submit">Ubah Harga</Button>
                                    <HapusData harga={data} />
                            </form>
                        </DrawerBody>
                    </DrawerContent>

                </DrawerOverlay>
            </Drawer>
        </div>
    )
}
