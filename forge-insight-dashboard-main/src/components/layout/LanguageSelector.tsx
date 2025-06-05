
import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'navbar' | 'dashboard';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'navbar' }) => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.value === language);

  if (variant === 'dashboard') {
    return (
      <div className="flex items-center">
        <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
          <SelectTrigger className="w-auto min-w-[120px] border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>{currentLanguage?.label}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                <div className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
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
      <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
        <SelectTrigger className="w-auto border-none bg-transparent hover:bg-gray-100 focus:ring-0 focus:ring-offset-0">
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <span>{currentLanguage?.label}</span>
          </div>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
