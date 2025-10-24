import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Banner = () => {
  const imagesData = [
    "https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1486294/pexels-photo-1486294.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="my-10 mx-auto w-[93vw] overflow-x-clip sm:overflow-visible items-center flex justify-center"
    >
      <CarouselContent>
        {imagesData.map((image, index) => (
          <CarouselItem key={index}>
            <img
              src={image}
              alt="carousel"
              loading="lazy"
              className="object-cover w-full min-h-[30vh] sm:h-[60vh] md:h-[70vh] lg:h-[60vh] rounded-3xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Banner;
