import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

interface ProgressBarSliderProps {
  setFieldValue: (field: string, value?: number) => void;
  minValueDefault?: number;
  maxValueDefault?: number;
}

const ProgressBarSlider: React.FC<ProgressBarSliderProps> = ({
  setFieldValue,
  minValueDefault,
  maxValueDefault,
}) => {
  const minValueInitial = minValueDefault || 0;
  const maxValueInitial = maxValueDefault || 100;

  const [minValue, setMinValue] = useState(minValueInitial);
  const [maxValue, setMaxValue] = useState(maxValueInitial);
  const [showMinValue, setShowMinValue] = useState(false);
  const [showMaxValue, setShowMaxValue] = useState(false);

  return (
    <Flex w='full' justifyContent='center' alignItems='center'>
      <RangeSlider
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={["Progress Bar Min", "Progress Bar Max"]}
        colorScheme='teal'
        w='94%'
        defaultValue={[minValue, maxValue]}
        onChange={(values) => {
          setMinValue(values[0]);
          setFieldValue("progressBarFrom", values[0]);
          setMaxValue(values[1]);
          setFieldValue("progressBarTo", values[1]);
        }}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip
          hasArrow
          bg='teal.500'
          color='white'
          placement='top'
          isOpen={showMinValue}
          label={`${minValue}%`}
        >
          <RangeSliderThumb
            zIndex={0}
            index={0}
            ring='2'
            ringColor='teal'
            _focus={{}}
            onMouseEnter={() => setShowMinValue(true)}
            onMouseLeave={() => setShowMinValue(false)}
          />
        </Tooltip>
        <Tooltip
          hasArrow
          bg='teal.500'
          color='white'
          placement='top'
          isOpen={showMaxValue}
          label={`${maxValue}%`}
        >
          <RangeSliderThumb
            zIndex={0}
            index={1}
            ring='2'
            ringColor='teal'
            _focus={{}}
            onMouseEnter={() => setShowMaxValue(true)}
            onMouseLeave={() => setShowMaxValue(false)}
          />
        </Tooltip>
      </RangeSlider>
    </Flex>
  );
};

export default ProgressBarSlider;
