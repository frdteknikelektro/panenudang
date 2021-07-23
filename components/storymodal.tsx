import React, { useRef } from "react";
import {
  Icon,
  Button,
  Drawer,
  Box,
  Text,
  Image,
  Grid,
  Heading,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";

// import Image from 'next/image'
import format from "date-fns/format";
import { id } from "date-fns/locale";
import parseISO from "date-fns/parseISO";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSearch,
} from "react-icons/fa";
import PUStory1 from "../public/pu-bg-1.png";
import PUStory2 from "../public/pu-bg-2.png";
import PUStory3 from "../public/pu-bg-3.png";
import PUStory4 from "../public/pu-bg-4.png";
import PanenUdangImg from "../public/PanenUdangheadwhite.png";

export default function StoryModal(data) {
  const { data: dataharga } = data;
  // console.log(dataharga);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const igpost = useRef(null);

  const bgImages = [PUStory1, PUStory2, PUStory3, PUStory4];
  const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];

  // console.log('gambar random', randomImage)

  const width = window.innerWidth;
  const height = window.innerHeight;

  function TakeaScreenshot() {
    function screenshot() {
      // const igpost = document.querySelector("#igpost") as HTMLCanvasElement;
      const { left } = igpost.current.getBoundingClientRect();
      html2canvas(igpost.current, {
        x: left,
        y: window.scrollY,
      }).then((canvas) => {
        const story = canvas.toDataURL("image/jpeg", 1.0);
        const a = document.createElement("a");

        document.body.appendChild(a);

        a.href = story;
        a.download = `${dataharga.date_region_full_name}.jpg`;
        a.click();

        document.body.removeChild(a);
        onClose();
      });
    }

    setTimeout(() => {
      screenshot();
    }, 3000);
  }

  return (
    <div>
      <Button
        isFullWidth
        mt={2}
        mb={2}
        size="lg"
        colorScheme="purple"
        onClick={() => {
          onOpen();
          TakeaScreenshot();
        }}
      >
        <Text mr={2}>📥 </Text>
        {"  "}
        Simpan Gambar
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <Box
            id="igpost"
            bgImage={randomImage.src}
            bgPosition="center"
            bgSize="cover"
            ref={igpost}
            width={width}
            height={height}
            p={4}
          >
            <Box borderRadius="15" id="story-content">
              <Grid
                templateColumns="repeat(2, 1fr)"
                gap={4}
                style={{ backgroundColor: "rgba(225,225,225,0.8)" }}
                borderTopRadius="10"
              >
                <Box
                  p={1}
                  pb={0}
                  style={{ backgroundColor: "rgba(27,119,223,0.9)" }}
                  align="center"
                  color="white"
                  borderTopRightRadius="15"
                  borderTopLeftRadius="10"
                >
                  <Text
                    fontSize="xs"
                    align="center"
                    color="white"
                    fontWeight={700}
                  >
                    {format(parseISO(dataharga.date), "dd MMMM yyyy", {
                      locale: id,
                    })}
                  </Text>
                </Box>
                <Box p={1} pb={0} align="center" borderTopRightRadius="10">
                  <Text fontSize="xs" color="#004492" fontWeight={700}>
                    {dataharga.species.name}
                  </Text>
                </Box>
              </Grid>
              <Box bgColor="#004492" p={1} pl={4} pr={4} align="center">
                <Image
                  src={PanenUdangImg.src}
                  width={240}
                  height={55}
                  alt="panen udang"
                />
              </Box>
              <Box style={{ backgroundColor: "rgba(249,157,27,0.6)" }}>
                <Box
                  style={{ backgroundColor: "rgba(27,119,223,0.8)" }}
                  p={2}
                  borderBottomRadius="20"
                >
                  <Heading size="md" align="center" color="white">
                    {dataharga.region.name}
                  </Heading>
                </Box>
                <Box color="#004492" p={2} pt={1} pb={1}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Heading size="sm" align="center">
                      Size
                    </Heading>
                    <Heading size="sm" align="center">
                      Harga
                    </Heading>
                  </Grid>
                </Box>
              </Box>
              <Box
                color="white"
                p={3}
                style={{ backgroundColor: "rgba(0,68,146,0.7)" }}
              >
                <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Size 100
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Rp. {dataharga.size_100}
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Size 90
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Rp. {dataharga.size_90}
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Size 80
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Rp. {dataharga.size_80}
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Size 70
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Rp. {dataharga.size_70}
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Size 60
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Rp. {dataharga.size_60}
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Size 50
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Rp. {dataharga.size_50}
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Size 40
                  </Heading>
                  <Heading
                    size="sm"
                    align="center"
                    borderBottom="2px"
                    borderColor="orange.400"
                    pb={2}
                  >
                    Rp. {dataharga.size_40}
                  </Heading>
                  <Heading size="sm" align="center">
                    Size 30
                  </Heading>
                  <Heading size="sm" align="center">
                    Rp. {dataharga.size_30}
                  </Heading>
                </Grid>
              </Box>
              <Box
                p={2}
                pr={4}
                pl={4}
                pt={1}
                color="white"
                align="center"
                style={{ backgroundColor: "rgba(27,119,223,0.7)" }}
                borderBottomRadius="15"
              >
                <Text fontSize="xs" fontWeight={600}>
                  Update harga kami & supplier/bakul udang lainnya di berbagai
                  daerah melalui:{" "}
                </Text>
                <Box
                  p={2}
                  style={{ backgroundColor: "rgba(249,157,27,1)" }}
                  m={1}
                >
                  <Heading size="sm" align="center" color="#004492">
                    <Icon as={FaSearch} w={5} h={5} color="#004492" />{" "}
                    app.jala.tech/harga_udang
                  </Heading>
                </Box>
                <Text fontSize="sm" fontWeight={600} mt={1} mb={1}>
                  <Icon as={FaLinkedin} w={5} h={5} color="white" mr={1} />
                  <Icon as={FaFacebook} w={5} h={5} color="white" mr={1} />
                  <Icon as={FaInstagram} w={5} h={5} color="white" mr={1} />
                  {dataharga.creator.name}
                </Text>
                <Text fontSize="xs" fontWeight={600}>
                  <Icon as={FaWhatsapp} w={6} h={6} color="white" mr={1} />{" "}
                  {dataharga.creator.phone}(Aji)
                </Text>
              </Box>
            </Box>
          </Box>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
