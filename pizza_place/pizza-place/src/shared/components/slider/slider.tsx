import { Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.css';
import { SliderProps } from '../../types/slider-props';
import { useState } from 'react';

const Slider = (props: SliderProps) => {
  const [slideSelected, setSlideSelected] = useState();

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={props.numberOfSlidesPerView}
        className="slider"
      >
        {props.slides?.map((slide: any) => (
          <SwiperSlide key={slide.id}>
            <Button
              variant={slide.name === slideSelected ? 'contained' : 'outlined'}
              onClick={() => {
                setSlideSelected(slide.name);
                props.onAction(slide);
              }}
            >
              {slide.name}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default Slider;
