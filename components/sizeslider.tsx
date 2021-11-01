import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import PropTypes from "prop-types";

export default function SizeSlider(props) {
  const { size, onChange } = props;

  return (
    <Flex alignContent="center">
      <Box paddingX={8}>
        <Text fontSize="md" fontWeight="semibold">
          Size {size}
        </Text>
      </Box>
      <Slider
        flex="1"
        aria-label="slider-ex-1"
        defaultValue={size}
        step={10}
        min={20}
        max={200}
        onChange={onChange}
      >
        <SliderTrack bg="orange">
          <SliderFilledTrack bg="orange" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  );
}

SizeSlider.propTypes = {
  size: PropTypes.number,
  onChange: PropTypes.func,
};
