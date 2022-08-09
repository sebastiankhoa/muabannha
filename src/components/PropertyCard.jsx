import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { useRouter } from "next/router";

import numberWithCommas from "../utils/function";

const PropertyCard = ({ data }) => {
  const router = useRouter();
  const [showBox, setShowBox] = useState(false);

  const { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID } = data;
  return (
    <Box
      pos="relative"
      onMouseEnter={() => setShowBox(true)}
      onMouseLeave={() => setShowBox(false)}
      cursor="pointer"
      onClick={() => router.push(`/property/${externalID}`)}
    >
      <Image src={coverPhoto ? coverPhoto?.url : "house.jpg"} w="390px" h="260px" />
      {showBox && (
        <Box pos="absolute" bottom="0" bg="blackAlpha.300" w="100%" color="white" p="2">
          <Text fontWeight="600" fontSize="10pt" textAlign="center">
            {title.length > 45 ? title.substring(0, 45) + " ..." : title}
          </Text>
          <Flex justify="space-around" align="center">
            <Image alt="" src={agency?.logo?.url} rounded="full" w="30px" h="30px" />
            <Flex align="center" gap="1">
              <Box color="green.500">{isVerified && <GoVerified />}</Box>
              <Text fontWeight="600">
                {numberWithCommas(Math.round(price * 0.27))}${rentFrequency && `/${rentFrequency}`}
              </Text>
            </Flex>
          </Flex>
          <Flex align="center" justify="space-around" color="yellow.300">
            <Flex align="center" gap="2">
              <Text fontWeight="600" fontSize="9pt">
                {rooms}
              </Text>
              <FaBed />
            </Flex>
            <Flex align="center" gap="2">
              <Text fontWeight="600" fontSize="9pt">
                {baths}
              </Text>
              <FaBath />
            </Flex>
            <Flex align="center" gap="2">
              <Text fontWeight="600" fontSize="9pt">
                {Math.round(area)} m²{" "}
              </Text>
              <BsGridFill />
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default PropertyCard;
