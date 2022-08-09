import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";

import Filter from "../components/Filter";
import PropertyCard from "../components/PropertyCard";
import { fetchApi, baseUrl } from "../utils/fetchAPI";

const SearchPage = ({ properties }) => {
  // console.log({ properties });

  const router = useRouter();
  const [filter, setFilter] = useState(false);
  return (
    <Flex direction="column">
      <Flex w="full" bg="gray.100" align="center" justify="center" p="2" borderBottom="1px" borderColor="gray.300" gap="2">
        <Text fontWeight="700" fontSize="15pt">
          Search Property By Filters
        </Text>
        <BsFilter size="1.5rem" cursor="pointer" onClick={() => setFilter(!filter)} />
      </Flex>
      {filter && <Filter />}
      <Text fontWeight="700" fontSize="20pt">
        Property for {router.query.purpose === "for-sale" ? "sale" : "rent"} :
      </Text>
      <Flex flexWrap="wrap" py="10" h="85vh" gap="2">
        {properties.length > 0 ? (
          properties?.map((property) => <PropertyCard key={property?.id} data={property} />)
        ) : (
          <Flex direction="column" align="center" justify="center" w="full" gap="2">
            <Text fontWeight="700" fontSize="20pt">
              No property has found !!
            </Text>
            <Image alt="" src="\images\noresult.svg" />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchPage;

export const getServerSideProps = async ({ query }) => {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data.hits,
    },
  };
};
