import { Box, Button, Flex, IconButton, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { FcAbout, FcHome, FcMenu } from "react-icons/fc";
import { FiKey } from "react-icons/fi";

const Navbar = () => {
  const router = useRouter();
  return (
    <Flex
      w="full"
      h="80px"
      borderBottom="1px solid"
      borderColor="gray.300"
      mb="5"
      py="2"
      px={["0", "4"]}
      justify="space-between"
      align="center"
      gap="1"
    >
      <Image alt="logo" src="\images\logo.png" w={["100px", "150px"]} cursor="pointer" onClick={() => router.push("/")} />
      <Flex align="center" gap="5" display={{ base: "none", lg: "flex" }}>
        <Button variant="unstyle" leftIcon={<FcHome />} fontSize="2xl" _hover={{ textDecoration: "underline" }} onClick={() => router.push("/")}>
          Trang chủ
        </Button>
        <Button
          variant="unstyle"
          leftIcon={<FcAbout />}
          fontSize="2xl"
          _hover={{ textDecoration: "underline" }}
          onClick={() => router.push("/search?purpose=for-sale")}
        >
          Mua căn hộ
        </Button>
        <Button
          variant="unstyle"
          leftIcon={<FiKey />}
          fontSize="2xl"
          _hover={{ textDecoration: "underline" }}
          onClick={() => router.push("/search?purpose=for-rent")}
        >
          Thuê căn hộ
        </Button>
      </Flex>
      <Button
        variant="unstyle"
        leftIcon={<BsSearch />}
        fontSize="2xl"
        _hover={{ textDecoration: "underline" }}
        onClick={() => router.push("/search")}
      >
        Tìm kiếm
      </Button>

      <Box display={{ base: "flex", lg: "none" }}>
        <Menu>
          <MenuButton icon={<FcMenu />} as={IconButton} color="green.400" variant="outline" />
          <MenuList>
            <MenuItem icon={<FcHome />} onClick={() => router.push("/")}>
              Home
            </MenuItem>
            <MenuItem icon={<FcAbout />} onClick={() => router.push("/search?purpose=for-sale")}>
              Buy Property
            </MenuItem>
            <MenuItem icon={<FiKey />} onClick={() => router.push("/search?purpose=for-rent")}>
              Rent Property
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
