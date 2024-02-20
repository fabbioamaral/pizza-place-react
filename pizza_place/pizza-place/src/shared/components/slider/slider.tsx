import { Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.css';
import { SliderProps } from '../../types/slider-props';

const Slider = (props: SliderProps) => {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={props.numberOfSlidesPerView}
        className="slider"
      >
        {props.slides?.map((slide: string) => (
          <SwiperSlide>
            <Button variant="outlined">{slide}</Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default Slider;
