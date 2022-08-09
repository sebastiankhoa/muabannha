import { Box, Button, Flex, Input, Select, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

import { filterData, getFilterValues } from "../utils/filterData";
import { fetchApi, baseUrl } from "../utils/fetchAPI";

const Filter = () => {
  const router = useRouter();

  const [filters, setFilters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [showLocation, setShowLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAutoComplete, setShowAutoComplete] = useState(true);

  //Search properties function
  const searchProperties = (filterValue) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filterValue);

    values.forEach((item) => {
      if (item.value && filterValue[item.name]) {
        query[item.name] = item.value;
      }
    });
    router.push({ pathname: path, query: query });
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
        setLoading(false);
        setLocationData(data?.hits);
        setShowAutoComplete(false);
      };
      fetchData();
    }
  }, [searchTerm]);

  return (
    <Flex direction="column">
      <Flex flexWrap="wrap" p="2" bg="gray.100" align="center" gap="2">
        {filters.map((filter) => (
          <Box key={filter.queryName}>
            <Select placeholder={filter.placeholder} p="2" onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}>
              {filter.items.map((i) => (
                <option value={i.value} key={i.value}>
                  {i.name}
                </option>
              ))}
            </Select>
          </Box>
        ))}
        <Button mx="5" colorScheme="facebook" onClick={() => setShowLocation(!showLocation)}>
          Search Location
        </Button>
        {showLocation && (
          <Flex bg="whiteAlpha.700" align="center" rounded="xl" w="300px">
            <Input
              type="text"
              border="none"
              _focus={{ shadow: "none" }}
              placeholder="Search by location...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Box
              fontSize="15pt"
              cursor="pointer"
              onClick={() => {
                setSearchTerm("");
                setLocationData(null);
                router.reload();
              }}
              mr="2"
            >
              <MdCancel />
            </Box>
          </Flex>
        )}
        {loading && <Spinner />}
      </Flex>
      {showLocation && (
        <Flex h="300px" w="300px" overflow="auto" direction="column" gap="2" mx="auto">
          {locationData?.map((location) => (
            <Box
              cursor="pointer"
              shadow="md"
              key={location?.id}
              _hover={{ bg: "blue", color: "white" }}
              onClick={() => {
                searchProperties({ locationExternalIDs: location?.externalID });
                setShowLocation(false);
                setSearchTerm(location?.name);
              }}
            >
              <Text fontSize="11pt" fontWeight="600">
                {location?.name}
              </Text>
            </Box>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Filter;
