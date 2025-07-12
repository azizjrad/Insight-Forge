import React from "react";
import { Linkedin } from "lucide-react";

interface LeadershipCardProps {
  name: string;
  title: string;
  image: string;
  linkedin?: string;
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({
  name,
  title,
  image,
  linkedin,
}) => {
  return (
    <div className="bg-gray-100 rounded-3xl pt-6 pl-8 pr-12 pb-6 transition-all duration-500 group relative overflow-hidden min-h-[320px]">
      {/* Gradient Overlay - appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 opacity-0 group-hover:opacity-90 transition-opacity duration-500 rounded-3xl"></div>{" "}
      {/* LinkedIn Icon - appears on hover in bottom left */}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 left-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-gray-800 hover:scale-110 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <Linkedin size={24} className="text-white" />
        </a>
      )}
      {/* Default Layout - visible when not hovering */}
      <div className="flex flex-col items-start text-left h-full relative z-10 group-hover:opacity-0 transition-opacity duration-500">
        {/* Profile Image */}
        <div className="w-32 h-32 mb-16 overflow-hidden rounded-full bg-gray-200 transition-transform duration-300">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                name
              )}&background=e2e8f0&color=475569&size=128`;
            }}
          />
        </div>{" "}
        {/* Leadership Info */}
        <div className="space-y-4 flex-1">
          <p className="text-sm font-semibold text-teal-500 uppercase tracking-wider transition-colors duration-500 select-none">
            {title}
          </p>
          <div className="text-2xl font-bold text-gray-900 transition-colors duration-500 leading-tight select-none">
            {name.split(" ").map((namePart, index) => (
              <div key={index}>{namePart}</div>
            ))}
          </div>
        </div>
      </div>{" "}
      {/* Hover Layout - visible when hovering */}
      <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
        <p className="text-sm font-semibold text-teal-500 uppercase tracking-wider mb-2 select-none">
          {title}
        </p>
        <div className="text-2xl font-bold text-gray-900 leading-tight select-none">
          {name.split(" ").map((namePart, index) => (
            <div key={index}>{namePart}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadershipCard;
