import Image from "next/image";
import type { TeamMember } from "@/types";

interface TeamProfileProps {
  member: TeamMember;
}

export function TeamProfile({ member }: TeamProfileProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-navy">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-teal-text">{member.role}</p>
        {member.bio && (
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}
