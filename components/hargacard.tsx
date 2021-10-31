import React from "react";
import {
  Stack,
  Flex,
  Avatar,
  Box,
  Text,
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import format from "date-fns/format";
import { id } from "date-fns/locale";
import parseISO from "date-fns/parseISO";
import differenceInDays from "date-fns/differenceInDays";

import StoryModal from "./storymodal";
import HargaEditForm from "./hargaeditform";

import _ from "lodash";

export default function HargaCard(data) {
  const { data: dataharga, size = 100 } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Box
        key={dataharga.id}
        borderWidth="1px"
        borderRadius="lg"
        onClick={onOpen}
        style={{ cursor: "pointer" }}
      >
        {differenceInDays(new Date(), parseISO(dataharga.date)) < 6 ? (
          <Badge colorScheme="orange">New</Badge>
        ) : (
          ""
        )}
        <Flex direction="row" justify="center">
          <Box p={2} w="20vw" align="center">
            <Avatar
              size="md"
              src={`https://app.jala.tech/img/cache/original/${dataharga.creator.avatar}`}
            />
          </Box>
          <Box p={2} w="60vw">
            <Text fontSize="md" fontWeight="semibold">
              {_.startCase(dataharga.region.province_name.toLowerCase())},{" "}
              {_.startCase(dataharga.region.name.toLowerCase())}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {dataharga.creator.name} &bull;{" "}
              {format(parseISO(dataharga.date), "d MMMM yyyy", { locale: id })}
            </Text>
          </Box>
          <Box p={2} align="right" w="35vw">
            <Text fontSize="sm" color="gray.500">
              Size {size}
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {(dataharga[`size_${size}`] &&
                Intl.NumberFormat("id-ID").format(dataharga[`size_${size}`])) ||
                "-"}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
        {/* {console.log('harga terpilih', hargaUdang)} */}
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
              <Text>{dataharga.region.full_name}</Text>
              <Text color="gray.500" fontWeight={400} fontSize="sm">
                {format(parseISO(dataharga.date), "dd MMMM yyyy", {
                  locale: id,
                })}
              </Text>
            </DrawerHeader>
            <DrawerBody>
              <StoryModal data={dataharga} />
              <HargaEditForm data={dataharga} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
}
