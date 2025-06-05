
import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import LanguageSelector from '../../components/layout/LanguageSelector';
import ScrollToTop from '../../components/ui/ScrollToTop';
import { Card } from '../../components/ui/card';
import { useLanguage } from '../../contexts/LanguageContext';

const Settings = () => {
  const { t } = useLanguage();
  
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title={t('settings.title')}
        description={t('settings.description')}
        actions={<LanguageSelector variant="dashboard" />}
      />
      
      <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
        <h3 className="text-lg font-medium mb-4">{t('settings.accountSettings')}</h3>
        <p className="text-gray-500">{t('settings.accountDesc')}</p>
      </Card>
      
      {/* Additional settings sections would go here */}

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default Settings;
