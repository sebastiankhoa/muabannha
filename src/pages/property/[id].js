import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillArchiveFill, BsFillForwardFill, BsGridFill } from "react-icons/bs";
import { FaBath, FaBed } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { MdChair } from "react-icons/md";

import Slideshow from "../../components/Slideshow";
import { baseUrl, fetchApi } from "../../utils/fetchAPI";
import numberWithCommas from "../../utils/function";

const PropertyDetail = ({ propertyDetail }) => {
  // console.log({ propertyDetail });
  const { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos } =
    propertyDetail;

  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }
  return (
    <Flex direction="column" w="full" mb="10">
      {photos && <Slideshow photos={photos} />}
      <Flex direction="column" mt="80px" fontWeight="600" fontSize="20pt" gap="2">
        <Flex mx="auto">
          <Image alt="" src={agency?.logo?.url} rounded="full" w="100px" h="100px" />
        </Flex>
        <Text fontFamily="cursive" mb="2" fontSize="16pt">
          {title}
        </Text>
        <Flex flexWrap="wrap" gap="2">
          {amenities?.map((item) =>
            item?.amenities?.map((amenty) => (
              <Box key={amenty?.text} rounded="xl" color="blue" bg="gray.200" p="2" cursor="pointer">
                <Text fontSize="9pt">{amenty.text}</Text>
              </Box>
            ))
          )}
        </Flex>
        <Flex align="center" gap="2">
          <GiPriceTag />
          <Text>
            Price: {numberWithCommas(Math.round(price * 0.27))}${rentFrequency && `/${rentFrequency}`}
          </Text>
        </Flex>
        <Flex align="center" gap="2">
          <BsFillForwardFill />
          <Text textTransform="capitalize">Purpose: {purpose}</Text>
        </Flex>
        <Flex align="center" gap="2">
          <FaBed color="green" />
          <Text>Bed rooms : {rooms}</Text>
        </Flex>
        <Flex align="center" gap="2">
          <FaBath color="green" />
          <Text>Bath rooms : {baths}</Text>
        </Flex>
        <Flex align="center" gap="2">
          <BsGridFill color="blue" />
          <Text> {Math.round(area)} m² </Text>
        </Flex>
        <Flex align="center" gap="2">
          <BsFillArchiveFill color="blue" />
          <Text textTransform="capitalize">Type: {type} </Text>
        </Flex>
        {furnishingStatus && (
          <Flex align="center" gap="2">
            <MdChair color="green" />
            <Text textTransform="capitalize">{furnishingStatus} </Text>
          </Flex>
        )}
        <Text fontSize="14pt">{description}</Text>
      </Flex>
    </Flex>
  );
};

export default PropertyDetail;

export const getServerSideProps = async ({ params: { id } }) => {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  return {
    props: {
      propertyDetail: data,
    },
  };
};
