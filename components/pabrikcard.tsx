import React from "react";
import {
  Stack,
  Box,
  Text,
  Tag,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

interface PabrikValue {
  listPabrik: any[];
}

export default function PabrikCard({ listPabrik }: PabrikValue) {
  return (
    <div>
      <Stack direction="column" spacing={4}>
        {listPabrik.map((pabrik, index) => (
          <Box key={pabrik.id} p={2} boxShadow="base" m={2} borderRadius="15">
            <Stack direction="column" spacing={2}>
              <Text
                as="h2"
                fontSize="xl"
                color="gray.600"
                fontWeight={700}
                align="center"
                isTruncated
              >
                {index === 0 ? (
                  <Tag
                    mr={2}
                    size="sm"
                    borderRadius="full"
                    variant="subtle"
                    colorScheme="green"
                  >
                    Best
                  </Tag>
                ) : (
                  ""
                )}
                {pabrik.pabrik}
              </Text>
              <Box align="center">
                <Tag
                  size="lg"
                  borderRadius="full"
                  p={2}
                  align="center"
                  colorScheme="orange"
                  variant="subtle"
                  color="orange.500"
                  fontSize="lg"
                  fontWeight="bold"
                >
                  {pabrik.total != 0
                    ? Intl.NumberFormat("id", {
                        style: "currency",
                        currency: "IDR",
                      }).format(pabrik.total)
                    : "No price"}
                </Tag>
              </Box>
              <Box>
                <Text
                  as="h2"
                  fontSize="sm"
                  color="gray.500"
                  fontWeight={400}
                  align="center"
                  mb={2}
                >
                  estimasi kenaikan
                </Text>
                <Table variant="simple" size="sm" p={2}>
                  <Thead>
                    <Tr>
                      <Th>Size</Th>
                      <Th>Tonase</Th>
                      <Th>Harga</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pabrik.harga.map((harga) => (
                      <Tr key={harga.naikSize}>
                        <Td>{harga.naikSize}</Td>
                        <Td>{harga.naikTon}</Td>
                        <Td>
                          {harga.harga != 0 ? (
                            Intl.NumberFormat("id", {
                              style: "currency",
                              currency: "IDR",
                            }).format(harga.harga)
                          ) : (
                            <Tag
                              size="sm"
                              borderRadius="8"
                              colorScheme="red"
                              variant="subtle"
                              color="red.500"
                            >
                              No price
                            </Tag>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </div>
  );
}
