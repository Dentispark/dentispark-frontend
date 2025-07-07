import { notFound } from "next/navigation";
import Container from "@/src/components/layouts/container";
import { MentorProfileHeader } from "@/src/components/molecules/mentor-profile-header";
import { MentorProfileTabs } from "@/src/components/molecules/mentor-profile-tabs";
import { MentorAvailability } from "@/src/components/molecules/mentor-availability";

interface MentorPageProps {
  params: {
    id: string;
  };
}

// Mock mentor data - in a real app, this would come from an API or database
const getMentorData = (id: string) => {
  const mentors: Record<string, any> = {
    "1": {
      id: "1",
      name: "Andy J. Pierce",
      profession: "Orthodontist",
      rating: 4.5,
      reviewCount: 26,
      profileImage: "/images/mentor-img-1.png", // This would be the actual mentor image
      countryFlag: "🇬🇧", // UK flag
      education: {
        institution: "American Public University System",
        program: "Dental Sciences",
      },
      workExperience: {
        company: "Stanford University",
        role: "Orthodontist",
      },
      about: `With ten years of experience in graduate admissions at Stanford University's School of Engineering and School of Education, I can provide valuable insight into the application and review process. I am here to address your concerns and answer your questions about applying to graduate school.

Since 2013, I have worked as a professional graduate admission consultant and coach, specializing in helping navigate the application process for programs in the`,
      workExperienceDetails: [
        {
          company: "Stanford University",
          role: "Senior Orthodontist",
          duration: "2013 - Present",
          description:
            "Leading orthodontic treatments and graduate admission consulting. Specialized in complex cases and mentoring junior staff.",
        },
        {
          company: "American Public University System",
          role: "Clinical Instructor",
          duration: "2010 - 2013",
          description:
            "Taught advanced orthodontic techniques to dental students and supervised clinical rotations.",
        },
      ],
      educationDetails: [
        {
          institution: "American Public University System",
          program: "Doctor of Dental Surgery (DDS)",
          duration: "2006 - 2010",
          description:
            "Graduated summa cum laude with specialization in orthodontics and dentofacial orthopedics.",
        },
        {
          institution: "Stanford University",
          program: "Master of Science in Dental Sciences",
          duration: "2010 - 2012",
          description:
            "Advanced research in orthodontic biomechanics and treatment planning.",
        },
      ],
      ratings: {
        average: 4.5,
        total: 26,
        reviews: [
          {
            id: "1",
            rating: 5,
            comment:
              "Excellent mentor! Andy provided invaluable guidance throughout my application process. His insights into the dental program requirements were spot-on.",
            date: "Dec 2023",
            studentName: "Sarah Johnson",
          },
          {
            id: "2",
            rating: 4,
            comment:
              "Very knowledgeable and professional. Helped me understand the nuances of orthodontic residency applications.",
            date: "Nov 2023",
            studentName: "Michael Chen",
          },
          {
            id: "3",
            rating: 5,
            comment:
              "Andy's experience at Stanford really shows. He helped me craft a compelling personal statement that got me into my dream program.",
            date: "Oct 2023",
            studentName: "Emily Rodriguez",
          },
        ],
      },
      availability: {
        nextAvailable: "Available tomorrow at 19:30 GMT+1",
        responseTime: "17 hours",
        status: "available" as const,
      },
    },
    "2": {
      id: "2",
      name: "Dr. Baird James",
      profession: "Dental Surgeon",
      rating: 4.8,
      reviewCount: 34,
      profileImage: "/images/mentor-img-2.png",
      countryFlag: "🇺🇸",
      education: {
        institution: "Harvard School of Dental Medicine",
        program: "Oral Surgery",
      },
      workExperience: {
        company: "Boston Medical Center",
        role: "Chief of Oral Surgery",
      },
      about: `Building relationships with individuals from outside my typical circle, hearing about their paths and how they're preparing for careers is inspiring and motivating. A little extra money on the side is never a bad perk either. If you're interested and qualified to coach, I'd recommend giving it a try.

My approach focuses on practical guidance combined with emotional support throughout the challenging application process.`,
      workExperienceDetails: [
        {
          company: "Boston Medical Center",
          role: "Chief of Oral Surgery",
          duration: "2015 - Present",
          description:
            "Leading a team of 12 surgeons and overseeing complex oral and maxillofacial procedures.",
        },
      ],
      educationDetails: [
        {
          institution: "Harvard School of Dental Medicine",
          program: "Doctor of Dental Medicine (DMD)",
          duration: "2008 - 2012",
          description:
            "Specialized in oral and maxillofacial surgery with research focus on reconstructive procedures.",
        },
      ],
      ratings: {
        average: 4.8,
        total: 34,
        reviews: [
          {
            id: "1",
            rating: 5,
            comment:
              "Dr. James is exceptional! His surgical experience brings unique perspective to dental school applications.",
            date: "Jan 2024",
            studentName: "David Kim",
          },
        ],
      },
      availability: {
        nextAvailable: "Available today at 14:00 EST",
        responseTime: "12 hours",
        status: "available" as const,
      },
    },
  };

  return mentors[id] || null;
};

export default function MentorPage({ params }: MentorPageProps) {
  const { id } = params;
  const mentor = getMentorData(id);

  if (!mentor) {
    notFound();
  }

  // Prepare data for components
  const tabsData = {
    about: mentor.about,
    workExperience: mentor.workExperienceDetails,
    education: mentor.educationDetails,
    ratings: mentor.ratings,
  };

  const availabilityData = {
    id: mentor.id,
    name: mentor.name,
    availability: mentor.availability,
  };

  return (
    <main className="min-h-screen bg-white py-16">
      <Container>
        {/* Mobile Layout */}
        <div className="flex flex-col gap-8 lg:hidden">
          {/* Profile Header */}
          <div>
            <MentorProfileHeader className="rounded-lg" />
          </div>

          {/* Availability - Second on mobile */}
          <div>
            <MentorAvailability mentor={availabilityData} />
          </div>

          {/* Profile Tabs - Last on mobile */}
          <div>
            <MentorProfileTabs mentor={tabsData} className="rounded-lg" />
          </div>
        </div>

        {/* Desktop Layout - Original Structure */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <div className="mb-6">
              <MentorProfileHeader className="rounded-lg" />
            </div>

            {/* Profile Tabs */}
            <div>
              <MentorProfileTabs mentor={tabsData} className="rounded-lg" />
            </div>
          </div>

          {/* Sidebar - Availability */}
          <div className="lg:col-span-1">
            <MentorAvailability mentor={availabilityData} />
          </div>
        </div>
      </Container>
    </main>
  );
}
