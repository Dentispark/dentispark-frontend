import { Card } from "@/src/components/ui/card";
import { SuccessStory } from "../types";
import Image from "next/image";

interface SuccessStoryCardProps {
  story: SuccessStory;
}

export function SuccessStoryCard({ story }: SuccessStoryCardProps) {
  return (
    <Card
      className={`p-8 ${story.bgColor} relative overflow-hidden rounded-2xl border-none pb-28 shadow-none`}
    >
      <div className="space-y-8">
        <h3 className="text-3xl leading-[125%] text-[#585858]">
          {story.title}
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800">
            <span className="text-base font-semibold text-white">
              {story.avatar ? (
                <Image
                  width={1000}
                  height={1000}
                  src={story.avatar}
                  className="object-cover"
                  alt={story.author}
                />
              ) : (
                story.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              )}
            </span>
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">
              {story.author}
            </p>
            <p className="text-black-300 text-sm font-medium">
              {story.location}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -right-8 -bottom-8 rounded-xl p-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="87"
          height="131"
          viewBox="0 0 87 131"
          fill="none"
        >
          <path
            opacity="0.5"
            d="M0 97.033V87.3661C0 53.5043 6.70887 31.5064 19.1779 18.0033C31.7062 4.43638 49.5252 8.49072e-05 70.3321 0V2.661L68.4221 2.674C28.5331 3.22003 2.661 21.205 2.661 87.3661V97.033L2.6727 98.8456C3.18431 135.88 19.4388 145.973 36.3679 146.284L37.1878 146.29C55.3138 146.29 66.749 133.354 67.102 116.264L67.1098 115.447C67.1097 96.8676 54.6201 85.426 37.983 85.0728L37.1878 85.0637C34.886 85.0637 32.1228 85.0633 29.3607 85.5237V74.9355C29.3608 42.3081 39.6213 27.0778 68.0453 26.61L69.4121 26.5983H73.5557V2.661H70.3321V0H76.2167V29.2593H69.4121C55.116 29.2593 46.0494 32.9336 40.4192 39.9969C34.669 47.2109 32.0217 58.5267 32.0217 74.9355V82.5405C33.9185 82.4025 35.7023 82.4027 37.1878 82.4027C46.3091 82.4028 54.4874 85.4928 60.3975 91.2758C66.3193 97.0704 69.7707 105.381 69.7708 115.447C69.7708 124.776 66.6967 133.168 60.9952 139.249C55.2746 145.351 47.0715 148.951 37.1878 148.951C27.9221 148.951 18.4497 146.252 11.3547 138.08C4.32154 129.979 9.48739e-06 116.925 0 97.033ZM89.3086 97.033V87.3661C89.3086 53.5043 96.0175 31.5064 108.487 18.0033C121.015 4.43639 138.834 8.0849e-05 159.641 0V2.661L157.731 2.674C117.842 3.22002 91.9696 21.205 91.9696 87.3661V97.033L91.9813 98.8456C92.4929 135.88 108.747 145.973 125.676 146.284L126.496 146.29C144.622 146.29 156.058 133.354 156.411 116.264L156.418 115.447C156.418 96.8676 143.929 85.426 127.292 85.0728L126.496 85.0637C124.195 85.0637 121.431 85.0633 118.669 85.5237V74.9355C118.669 42.3081 128.93 27.0778 157.354 26.61L158.721 26.5983H162.864V2.661H159.641V0H165.525V29.2593H158.721C144.425 29.2593 135.358 32.9336 129.728 39.9969C123.978 47.2109 121.33 58.5267 121.33 74.9355V82.5405C123.227 82.4025 125.011 82.4027 126.496 82.4027C135.618 82.4029 143.796 85.4928 149.706 91.2758C155.628 97.0704 159.079 105.381 159.079 115.447C159.079 124.776 156.005 133.168 150.304 139.249C144.583 145.351 136.38 148.951 126.496 148.951C117.231 148.951 107.758 146.252 100.663 138.08C93.6301 129.979 89.3086 116.925 89.3086 97.033Z"
            fill="#DFDFDF"
          />
        </svg>
      </div>
    </Card>
  );
}
