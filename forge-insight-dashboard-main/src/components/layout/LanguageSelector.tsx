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

interface LanguageSelectorProps {
  variant?: "navbar" | "dashboard";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = "navbar",
}) => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  const currentLanguage = languages.find((lang) => lang.value === language);

  if (variant === "dashboard") {
    return (
      <div className="flex items-center">
        <Select
          value={language}
          onValueChange={(value: Language) => setLanguage(value)}
        >
          <SelectTrigger className="group w-auto min-w-[140px] border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-primary/30 focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-xl px-4 py-2.5 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Globe
                  size={18}
                  className="text-gray-600 group-hover:text-primary transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
              </div>
              <span className="font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
                {currentLanguage?.label}
              </span>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-xl">
            {languages.map((lang) => (
              <SelectItem
                key={lang.value}
                value={lang.value}
                className="hover:bg-primary/5 hover:text-primary transition-all duration-200 rounded-lg mx-1"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{lang.label}</span>
                  {lang.value === language && (
                    <div className="w-2 h-2 bg-primary rounded-full ml-auto"></div>
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
        <SelectTrigger className="group w-auto min-w-[100px] border-none bg-transparent hover:bg-gray-50 focus:ring-0 focus:ring-offset-0 rounded-xl px-3 py-2 transition-all duration-300">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Globe
                size={16}
                className="text-gray-600 group-hover:text-secondary transition-colors duration-300"
              />
              <div className="absolute inset-0 bg-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-secondary transition-colors duration-300">
              {currentLanguage?.label}
            </span>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-xl">
          {languages.map((lang) => (
            <SelectItem
              key={lang.value}
              value={lang.value}
              className="hover:bg-secondary/5 hover:text-secondary transition-all duration-200 rounded-lg mx-1"
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
};

export default LanguageSelector;
