import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Flex align="center" justify="center" w="100%" h="50px" borderTop="1px solid" borderColor="gray.200" py="10">
      <Text fontWeight="600" fontSize="20pt">
        2022 Hoozing, Inc
      </Text>
    </Flex>
  );
};

export default Footer;
