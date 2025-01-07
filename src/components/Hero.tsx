import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] lg:h-screen relative">
      <Image
        src="https://cdn.sanity.io/images/mnzfyx37/production/cc387c91b97251c14690851aabbd50de6e0c029d-1024x1024.jpg"
        alt="banner image"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute top-0 w-full h-full bg-gradient-to-b from-[#251e56]/70 to-[#0a0a0bb8]/70 text-gray-100 flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-[150px] font-bold text-center">
         BY8
        </h2>
        <p className="text-base sm:text-lg md:text-2xl lg:text-5xl text-center font-semibold mt-6" >
        Infinite Thoughts, One Byte at a Time.
        </p>
      </div>
    </div>
  );
};

export default Hero;