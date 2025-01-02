import Container from "@/components/Container";
import ProfileSection from "@/components/ProfileSection";
import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "About Me - Akshat Blog",
  description: "Learn more about Akshat and his journey in technology and writing",
};

const AboutPage = () => {
  return (
    <Container className="py-20 px-4">
      <ProfileSection />
      <AboutContent />
    </Container>
  );
};

export default AboutPage;