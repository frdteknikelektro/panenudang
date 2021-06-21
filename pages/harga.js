import React from 'react'
import useSWR from "swr";
import Head from 'next/head'
import Image from 'next/image'
import TambahData from '../components/tambahdata'
import PanenUdangImg from '../public/PanenUdanghead.png'
import {
    Container,
    Stack,
    Avatar,
    Divider,
    Heading,
    Box,
    Text
} from '@chakra-ui/react'
import formatISO from 'date-fns/formatISO'
import { utcToZonedTime } from 'date-fns-tz'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Harga() {
    const response = useSWR(`https://app.jala.tech/api/shrimp_prices?search&with=creator,species,region&sort=size_100&created_by__in=10579&sort=created_at,desc`,
    (url) => fetcher(url, {
      headers: {
        'Authorization': `Bearer ${process.env.JALATOKENPROD}`,
        'Accept': 'application/json',
      }
    }))
    if (response.error) 
        return <div>Gagal mengambil data. Coba refresh ulang</div>
    if (!response.data) {
        return (<div>loading. . .</div>
        )
    }
    console.log(response.data.data)

    const data = response.data.data;

    return (
        <div>
            <Head>
            <title>Harga Udang | PanenUdang</title>
            </Head>
            <Container w="100vw" maxW="4xl" pt="8" pb="8">
                <Box>
                    <Box m={6}>
                        <Image src={PanenUdangImg} alt="panen udang header" placeholder="blur"/>
                    </Box>
                    <Divider mb={8} />
                    <TambahData />
                    <Heading mb={2} s="h3" size="lg">Harga Terbaru</Heading>
                    <Stack spacing={8} direction="column">
                        {data? 
                        data.map((d)=>{
                            return(
                                <Box key={d.id}>
                                    <Avatar name={d.creator.name} src={`https://app.jala.tech/img/cache/original/${d.creator.avatar}`} />
                                    <Text fontSize="xl">{d.region.full_name}</Text>
                                    <Text fontSize="sm">{d.created_at}</Text>
                                    <Text fontSize="lg">Size 100: {d.size_100}</Text>
                                    <Text fontSize="sm">{d.remark}</Text>
                                </Box>
                            )
                        }): 'no data'}
                    </Stack>
                </Box>

            </Container>
        </div>
    )
}
