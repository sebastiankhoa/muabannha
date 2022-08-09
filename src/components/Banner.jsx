import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Banner = ({ imageUrl, purpose, title, desc, buttonText, linkName }) => {
  const router = useRouter();
  return (
    <Flex align="center" direction="column" gap="3" mt="10" py="5">
      <Image src={imageUrl} alt="image" w="500px" h="300px" rounded="20px" />
      <Text color="gray.500" fontSize="sm" fontWeight="medium" textTransform="uppercase">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold" textTransform="capitalize">
        {title}
      </Text>
      <Text fontSize="lg" color="gray.700">
        {desc}
      </Text>
      <Button colorScheme="facebook" onClick={() => router.push(linkName)}>
        {buttonText}
      </Button>
    </Flex>
  );
};

export default Banner;
