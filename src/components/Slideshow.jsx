import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Slide, Fade } from "react-slideshow-image";

const Slideshow = ({ photos }) => {
  console.log({ photos });
  return (
    <Flex h="maxContent" direction="column">
      <Fade>
        {photos.map((photo, index) => (
          <div className="each-fade" key={index}>
            <div className="image-container">
              <Image alt="" src={photo.url} rounded="30px" w="full" />
            </div>
          </div>
        ))}
      </Fade>
    </Flex>
  );
};

export default Slideshow;
