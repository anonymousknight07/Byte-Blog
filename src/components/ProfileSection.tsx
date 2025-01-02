import Image from "next/image";

const ProfileSection = () => {
  return (
    <div className="text-center mb-12">
      <div className="relative w-48 h-48 mx-auto mb-8">
        <Image
          src="https://cdn.sanity.io/images/mnzfyx37/production/f669e95d5ce7f6a079dd6ec68193732c3c7b218e-960x1280.jpg"
          alt="Profile picture"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h1 className="text-4xl font-bold text-[#4967b8] mb-4">Akshat Pandey</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Passionate about technology and creating meaningful digital experiences. I love to write about my journey and share my knowledge with others.
      </p>
    </div>
  );
};

export default ProfileSection;