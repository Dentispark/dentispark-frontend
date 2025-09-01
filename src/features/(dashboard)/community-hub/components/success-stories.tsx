import { SuccessStory } from "../types";
import { SuccessStoryCard } from "./success-story-card";

interface SuccessStoriesProps {
  stories: SuccessStory[];
}

export function SuccessStories({ stories }: SuccessStoriesProps) {
  return (
    <div className="rounded-xl bg-white">
      <h2 className="mb-8 text-2xl font-semibold text-gray-900">
        Success Stories
      </h2>

      <div className="space-y-6">
        {stories.map((story) => (
          <SuccessStoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
