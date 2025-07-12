import React from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LanguageSelectorProps {
  variant?: "navbar" | "dashboard";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = "navbar",
}) => {
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();

  const languages = [
    { value: "en", label: "English", shortCode: "eng", flag: "🇺🇸" },
    { value: "fr", label: "Français", shortCode: "fr", flag: "🇫🇷" },
    { value: "ar", label: "العربية", shortCode: "ar", flag: "🇸🇦" },
  ];

  const currentLanguage = languages.find((lang) => lang.value === language);

  // For mobile navbar, show short codes instead of full names
  const getDisplayText = (lang: (typeof languages)[0] | undefined) => {
    if (!lang) return "";
    if (variant === "navbar" && isMobile) {
      return lang.shortCode;
    }
    return lang.label;
  };

  if (variant === "dashboard") {
    return (
      <div className="flex items-center">
        <Select
          value={language}
          onValueChange={(value: Language) => setLanguage(value)}
        >
          <SelectTrigger className="group w-auto min-w-[140px] border-2 border-gray-700/50 bg-gray-800/60 hover:bg-gray-700/80 hover:border-secondary/30 focus:ring-2 focus:ring-secondary/20 focus:ring-offset-2 focus:ring-offset-primary rounded-xl px-4 py-2.5 transition-all duration-300 backdrop-blur-sm [&>svg]:text-gray-300 hover:[&>svg]:text-secondary [&>svg]:opacity-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Globe
                  size={18}
                  className="text-gray-300 group-hover:text-secondary transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
              </div>
              <span className="font-medium text-white group-hover:text-secondary transition-colors duration-300">
                {getDisplayText(currentLanguage)}
              </span>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-primary/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-xl">
            {languages.map((lang) => (
              <SelectItem
                key={lang.value}
                value={lang.value}
                className="hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary transition-all duration-200 rounded-lg mx-1 text-gray-300"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{lang.label}</span>
                  {lang.value === language && (
                    <div className="w-2 h-2 bg-secondary rounded-full ml-auto"></div>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Select
        value={language}
        onValueChange={(value: Language) => setLanguage(value)}
      >
        <SelectTrigger
          className={`group w-auto border-none bg-transparent hover:bg-gray-700/50 hover:backdrop-blur-3xl focus:ring-0 focus:ring-offset-0 rounded-xl px-3 py-2 transition-all duration-300 hover:scale-102 overflow-hidden z-10 relative [&>svg]:hidden ${
            isMobile && variant === "navbar" ? "min-w-[70px]" : "min-w-[100px]"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Globe
                size={16}
                className="text-gray-300 group-hover:text-secondary transition-colors duration-300"
              />
            </div>
            <span
              className={`font-medium text-gray-200 group-hover:text-secondary transition-colors duration-300 ${
                isMobile ? "text-xs uppercase tracking-wider" : "text-sm"
              }`}
            >
              {getDisplayText(currentLanguage)}
            </span>
          </div>

          {/* Enhanced multi-layer glass reflection - same as navbar items */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 pointer-events-none"></div>

          {/* Subtle shimmer effect on hover - same as navbar items */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xl pointer-events-none"></div>
        </SelectTrigger>
        <SelectContent className="bg-primary/85 backdrop-blur-3xl border border-gray-600/30 shadow-2xl shadow-black/25 rounded-xl ring-1 ring-gray-500/20">
          {/* Multi-layer gradient overlay for depth - same as navbar */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/12 via-primary/5 to-accent/12 opacity-100 rounded-xl"></div>

          {/* Enhanced glass reflection - same as navbar */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-100 rounded-xl"></div>

          <div className="relative z-10">
            {languages.map((lang) => (
              <SelectItem
                key={lang.value}
                value={lang.value}
                className="group relative hover:bg-gray-700/50 hover:backdrop-blur-3xl hover:text-secondary focus:bg-gray-700/50 focus:backdrop-blur-3xl focus:text-secondary transition-all duration-300 rounded-xl mx-1 text-gray-300 hover:scale-102 overflow-hidden cursor-pointer"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <span
                    className={`font-medium ${
                      isMobile && variant === "navbar"
                        ? "text-xs uppercase tracking-wider"
                        : ""
                    }`}
                  >
                    {getDisplayText(lang)}
                  </span>
                  {lang.value === language && (
                    <div className="w-2 h-2 bg-secondary rounded-full ml-auto"></div>
                  )}
                </div>

                {/* Enhanced multi-layer glass reflection - same as navbar items */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 pointer-events-none"></div>

                {/* Subtle shimmer effect on hover - same as navbar items */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xl pointer-events-none"></div>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
