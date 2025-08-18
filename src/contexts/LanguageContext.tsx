
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Simple translation function - in a real app this would load from files
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.login': 'Log In',
    'nav.register': 'Start Free Trial',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.features': 'Features',
    'footer.contactUs': 'Contact Us',
    'footer.copyright': 'All rights reserved.',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.cookiePolicy': 'Cookie Policy',
    
    // Home page
    'home.hero.title': 'Transform Your Hotel Data Into Actionable Insights',
    'home.hero.subtitle': 'InsightForge helps hotels make data-driven decisions with powerful analytics, real-time reporting, and intuitive dashboards.',
    'home.hero.cta1': 'Start Free Trial',
    'home.hero.cta2': 'Request Demo',
    
    // About page
    'about.title': 'About InsightForge',
    'about.subtitle': 'InsightForge: Stop Guessing, Start Growing.',
    'about.description': 'We\'re on a mission to transform hotel operations through the power of data analytics and actionable insights.',
    
    // FAQ page
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Find answers to common questions about InsightForge and how it can help your hotel.',
    'faq.stillHaveQuestions': 'Still have questions?',
    'faq.contactTeam': 'Our team is happy to help with any questions you may have about InsightForge.',
    
    // Contact page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions or ready to get started? Reach out to our team.',
    'contact.getInTouch': 'Get in touch',
    'contact.description': 'We\'re here to answer your questions and help you get the most out of InsightForge.',
    'contact.sendMessage': 'Send us a message',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Your message has been sent successfully. We\'ll get back to you soon!',
    
    // Terms page
    'terms.title': 'Terms of Service',
    'terms.lastUpdated': 'Last updated: May 20, 2025',
    
    // Privacy page
    'privacy.title': 'Privacy Policy',
    'privacy.lastUpdated': 'Last updated: May 20, 2025',
    
    // Cookie Policy page
    'cookie.title': 'Cookie Policy',
    'cookie.lastUpdated': 'Last updated: May 20, 2025',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.description': 'Overview of your hotel\'s performance',
    'dashboard.noDataMessage': 'No data has been imported yet. Go to Settings > Data Import to upload your hotel data.',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.occupancyRate': 'Occupancy Rate',
    'dashboard.revpar': 'RevPAR',
    'dashboard.adr': 'ADR',
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.bookingSources': 'Booking Sources',
    'dashboard.topPerformingRooms': 'Top Performing Rooms',
    'dashboard.roomName': 'Room Name',
    'dashboard.bookings': 'Bookings',
    'dashboard.revenue': 'Revenue',
    'dashboard.occupancy': 'Occupancy Rate',
    'dashboard.noRoomData': 'No room data available. Please import data to see room performance.',
    'dashboard.totalRevenueDesc': 'Total revenue generated from all bookings and services',
    'dashboard.occupancyDesc': 'Percentage of available rooms occupied',
    'dashboard.revparDesc': 'Revenue per available room',
    'dashboard.adrDesc': 'Average daily rate across all room types',
    'dashboard.revenueBreakdown': 'Revenue Breakdown',
    'dashboard.roomRevenue': 'Room Revenue',
    'dashboard.serviceRevenue': 'Service Revenue',
    'dashboard.occupancyDetails': 'Occupancy Details',
    'dashboard.weekdays': 'Weekdays',
    'dashboard.weekends': 'Weekends',
    'dashboard.revparAnalysis': 'RevPAR Analysis',
    'dashboard.thisMonth': 'This Month',
    'dashboard.lastMonth': 'Last Month',
    'dashboard.adrByRoomType': 'ADR by Room Type',
    'dashboard.standard': 'Standard',
    'dashboard.deluxe': 'Deluxe',
    'dashboard.dateRanges.today': 'Today',
    'dashboard.dateRanges.yesterday': 'Yesterday',
    'dashboard.dateRanges.thisWeek': 'This Week',
    'dashboard.dateRanges.lastWeek': 'Last Week',
    'dashboard.dateRanges.thisMonth': 'This Month',
    'dashboard.dateRanges.lastMonth': 'Last Month',
    'dashboard.dateRanges.thisQuarter': 'This Quarter',
    'dashboard.dateRanges.lastQuarter': 'Last Quarter',
    'dashboard.dateRanges.thisYear': 'This Year',
    'dashboard.dateRanges.customRange': 'Custom Range',
    
    // Bookings Analytics
    'bookings.title': 'Bookings Analytics',
    'bookings.description': 'Analyze booking patterns and distribution channels',
    'bookings.bookingChannels': 'Booking Channels',
    'bookings.channelPerformance': 'Channel Performance',
    'bookings.channel': 'Channel',
    'bookings.distribution': 'Distribution',
    'bookings.trend': 'Trend',
    'bookings.bookingLeadTime': 'Booking Lead Time',
    'bookings.bookingsVsCancellations': 'Bookings vs Cancellations',
    'bookings.mostCommon': 'Most Common',
    'bookings.averageLeadTime': 'Average Lead Time',
    'bookings.sameDayBookings': 'Same-day Bookings',
    'bookings.totalCancellations': 'Total Cancellations',
    'bookings.cancellationRate': 'Cancellation Rate',
    'bookings.channelsDesc': 'Distribution of bookings across different channels',
    'bookings.performanceDesc': 'Detailed performance metrics for each booking channel',
    'bookings.leadTimeDesc': 'Time between booking and check-in date distribution',
    'bookings.cancellationsDesc': 'Monthly trend of bookings versus cancellations',
    
    // Guest Segments
    'guests.title': 'Guest Segmentation',
    'guests.description': 'Understand your guests and their booking patterns',
    'guests.nationalityHeatmap': 'Guest Nationality Heatmap',
    'guests.nationalityDistribution': 'Nationality Distribution',
    'guests.bookingTrends': 'Booking Trends',
    'guests.heatmapDesc': 'Geographic distribution of guest origins',
    'guests.distributionDesc': 'Breakdown of guest nationalities by percentage',
    'guests.trendsDesc': 'Monthly booking trends across guest segments',
    
    // Financial Overview
    'financial.title': 'Financial Overview',
    'financial.description': 'Track revenue, expenses, and profitability',
    'financial.totalRevenue': 'Total Revenue',
    'financial.totalExpenses': 'Total Expenses',
    'financial.profitMargin': 'Profit Margin',
    'financial.revenueVsExpenses': 'Revenue vs Expenses',
    'financial.expenseCategories': 'Expense Categories',
    'financial.financialDetails': 'Financial Details',
    'financial.month': 'Month',
    'financial.expenses': 'Expenses',
    'financial.profit': 'Profit',
    'financial.margin': 'Margin',
    'financial.total': 'Total',
    'financial.generateReport': 'Generate Financial Report',
    'financial.reviewBudget': 'Review Expense Budget',
    'financial.generateReportDesc': 'Export detailed financial reports for accounting and tax purposes.',
    'financial.reviewBudgetDesc': 'Compare actual expenses against budgeted amounts.',
    'financial.generate': 'Generate',
    'financial.review': 'Review',
    
    // Settings
    'settings.title': 'Settings',
    'settings.description': 'Manage your account and preferences',
    'settings.accountSettings': 'Account Settings',
    'settings.accountDesc': 'Configure your account settings and preferences',
    
    // Alerts
    'alerts.realTimeAlerts': 'Real-time Alerts',
    'alerts.noRecentAlerts': 'No recent alerts',
    'alerts.revenueAlert': 'Revenue Alert',
    'alerts.occupancyAlert': 'Occupancy Rate Alert',
    'alerts.adrAlert': 'ADR Alert',
    'alerts.revparAlert': 'RevPAR Alert',
    'alerts.hasExceeded': 'has exceeded target threshold',
    'alerts.hasDropped': 'has dropped below critical level',
    'alerts.hasFluctuated': 'has shown unusual fluctuation',
    
    // Common
    'common.language': 'Language',
    'common.backToTop': 'Back to top',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.login': 'Se connecter',
    'nav.register': 'Essai gratuit',
    
    // Footer
    'footer.quickLinks': 'Liens rapides',
    'footer.features': 'Fonctionnalités',
    'footer.contactUs': 'Nous contacter',
    'footer.copyright': 'Tous droits réservés.',
    'footer.privacyPolicy': 'Politique de confidentialité',
    'footer.termsOfService': 'Conditions d\'utilisation',
    'footer.cookiePolicy': 'Politique des cookies',
    
    // Home page
    'home.hero.title': 'Transformez vos données hôtelières en insights exploitables',
    'home.hero.subtitle': 'InsightForge aide les hôtels à prendre des décisions basées sur les données avec des analyses puissantes, des rapports en temps réel et des tableaux de bord intuitifs.',
    'home.hero.cta1': 'Essai gratuit',
    'home.hero.cta2': 'Demander une démo',
    
    // About page
    'about.title': 'À propos d\'InsightForge',
    'about.subtitle': 'InsightForge : Arrêtez de deviner, commencez à grandir.',
    'about.description': 'Nous avons pour mission de transformer les opérations hôtelières grâce à la puissance de l\'analyse de données et des insights exploitables.',
    
    // FAQ page
    'faq.title': 'Questions fréquemment posées',
    'faq.subtitle': 'Trouvez des réponses aux questions courantes sur InsightForge et comment il peut aider votre hôtel.',
    'faq.stillHaveQuestions': 'Vous avez encore des questions ?',
    'faq.contactTeam': 'Notre équipe est heureuse de vous aider avec toutes vos questions sur InsightForge.',
    
    // Contact page
    'contact.title': 'Nous contacter',
    'contact.subtitle': 'Vous avez des questions ou êtes prêt à commencer ? Contactez notre équipe.',
    'contact.getInTouch': 'Entrer en contact',
    'contact.description': 'Nous sommes là pour répondre à vos questions et vous aider à tirer le meilleur parti d\'InsightForge.',
    'contact.sendMessage': 'Envoyez-nous un message',
    'contact.name': 'Votre nom',
    'contact.email': 'Adresse e-mail',
    'contact.subject': 'Sujet',
    'contact.message': 'Votre message',
    'contact.send': 'Envoyer le message',
    'contact.sending': 'Envoi en cours...',
    'contact.success': 'Votre message a été envoyé avec succès. Nous vous répondrons bientôt !',
    
    // Terms page
    'terms.title': 'Conditions d\'utilisation',
    'terms.lastUpdated': 'Dernière mise à jour : 20 mai 2025',
    
    // Privacy page
    'privacy.title': 'Politique de confidentialité',
    'privacy.lastUpdated': 'Dernière mise à jour : 20 mai 2025',
    
    // Cookie Policy page
    'cookie.title': 'Politique des cookies',
    'cookie.lastUpdated': 'Dernière mise à jour : 20 mai 2025',
    
    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.description': 'Aperçu des performances de votre hôtel',
    'dashboard.noDataMessage': 'Aucune donnée n\'a encore été importée. Allez dans Paramètres > Importation de données pour télécharger vos données hôtelières.',
    'dashboard.totalRevenue': 'Chiffre d\'affaires total',
    'dashboard.occupancyRate': 'Taux d\'occupation',
    'dashboard.revpar': 'RevPAR',
    'dashboard.adr': 'TJM',
    'dashboard.monthlyRevenue': 'Chiffre d\'affaires mensuel',
    'dashboard.bookingSources': 'Sources de réservation',
    'dashboard.topPerformingRooms': 'Chambres les plus performantes',
    'dashboard.roomName': 'Nom de la chambre',
    'dashboard.bookings': 'Réservations',
    'dashboard.revenue': 'Chiffre d\'affaires',
    'dashboard.occupancy': 'Taux d\'occupation',
    'dashboard.noRoomData': 'Aucune donnée de chambre disponible. Veuillez importer des données pour voir les performances des chambres.',
    'dashboard.totalRevenueDesc': 'Chiffre d\'affaires total généré par toutes les réservations et services',
    'dashboard.occupancyDesc': 'Pourcentage de chambres disponibles occupées',
    'dashboard.revparDesc': 'Chiffre d\'affaires par chambre disponible',
    'dashboard.adrDesc': 'Tarif journalier moyen pour tous les types de chambres',
    'dashboard.revenueBreakdown': 'Répartition du chiffre d\'affaires',
    'dashboard.roomRevenue': 'Chiffre d\'affaires chambres',
    'dashboard.serviceRevenue': 'Chiffre d\'affaires services',
    'dashboard.occupancyDetails': 'Détails d\'occupation',
    'dashboard.weekdays': 'Jours de semaine',
    'dashboard.weekends': 'Week-ends',
    'dashboard.revparAnalysis': 'Analyse RevPAR',
    'dashboard.thisMonth': 'Ce mois',
    'dashboard.lastMonth': 'Le mois dernier',
    'dashboard.adrByRoomType': 'TJM par type de chambre',
    'dashboard.standard': 'Standard',
    'dashboard.deluxe': 'Deluxe',
    'dashboard.dateRanges.today': 'Aujourd\'hui',
    'dashboard.dateRanges.yesterday': 'Hier',
    'dashboard.dateRanges.thisWeek': 'Cette semaine',
    'dashboard.dateRanges.lastWeek': 'La semaine dernière',
    'dashboard.dateRanges.thisMonth': 'Ce mois',
    'dashboard.dateRanges.lastMonth': 'Le mois dernier',
    'dashboard.dateRanges.thisQuarter': 'Ce trimestre',
    'dashboard.dateRanges.lastQuarter': 'Le trimestre dernier',
    'dashboard.dateRanges.thisYear': 'Cette année',
    'dashboard.dateRanges.customRange': 'Plage personnalisée',
    
    // Bookings Analytics
    'bookings.title': 'Analyse des réservations',
    'bookings.description': 'Analyser les modèles de réservation et les canaux de distribution',
    'bookings.bookingChannels': 'Canaux de réservation',
    'bookings.channelPerformance': 'Performance des canaux',
    'bookings.channel': 'Canal',
    'bookings.distribution': 'Distribution',
    'bookings.trend': 'Tendance',
    'bookings.bookingLeadTime': 'Délai de réservation',
    'bookings.bookingsVsCancellations': 'Réservations vs Annulations',
    'bookings.mostCommon': 'Le plus courant',
    'bookings.averageLeadTime': 'Délai moyen',
    'bookings.sameDayBookings': 'Réservations le jour même',
    'bookings.totalCancellations': 'Annulations totales',
    'bookings.cancellationRate': 'Taux d\'annulation',
    'bookings.channelsDesc': 'Distribution des réservations sur différents canaux',
    'bookings.performanceDesc': 'Métriques de performance détaillées pour chaque canal de réservation',
    'bookings.leadTimeDesc': 'Distribution du temps entre la réservation et la date d\'arrivée',
    'bookings.cancellationsDesc': 'Tendance mensuelle des réservations par rapport aux annulations',
    
    // Guest Segments
    'guests.title': 'Segmentation des clients',
    'guests.description': 'Comprendre vos clients et leurs habitudes de réservation',
    'guests.nationalityHeatmap': 'Carte thermique des nationalités',
    'guests.nationalityDistribution': 'Répartition des nationalités',
    'guests.bookingTrends': 'Tendances de réservation',
    'guests.heatmapDesc': 'Distribution géographique des origines des clients',
    'guests.distributionDesc': 'Répartition des nationalités des clients par pourcentage',
    'guests.trendsDesc': 'Tendances mensuelles de réservation par segment de clientèle',
    
    // Financial Overview
    'financial.title': 'Aperçu financier',
    'financial.description': 'Suivre les revenus, les dépenses et la rentabilité',
    'financial.totalRevenue': 'Chiffre d\'affaires total',
    'financial.totalExpenses': 'Dépenses totales',
    'financial.profitMargin': 'Marge bénéficiaire',
    'financial.revenueVsExpenses': 'Revenus vs Dépenses',
    'financial.expenseCategories': 'Catégories de dépenses',
    'financial.financialDetails': 'Détails financiers',
    'financial.month': 'Mois',
    'financial.expenses': 'Dépenses',
    'financial.profit': 'Bénéfice',
    'financial.margin': 'Marge',
    'financial.total': 'Total',
    'financial.generateReport': 'Générer un rapport financier',
    'financial.reviewBudget': 'Réviser le budget des dépenses',
    'financial.generateReportDesc': 'Exporter des rapports financiers détaillés à des fins comptables et fiscales.',
    'financial.reviewBudgetDesc': 'Comparer les dépenses réelles aux montants budgétés.',
    'financial.generate': 'Générer',
    'financial.review': 'Réviser',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.description': 'Gérer votre compte et préférences',
    'settings.accountSettings': 'Paramètres du compte',
    'settings.accountDesc': 'Configurer les paramètres et préférences de votre compte',
    
    // Alerts
    'alerts.realTimeAlerts': 'Alertes en temps réel',
    'alerts.noRecentAlerts': 'Aucune alerte récente',
    'alerts.revenueAlert': 'Alerte revenus',
    'alerts.occupancyAlert': 'Alerte taux d\'occupation',
    'alerts.adrAlert': 'Alerte TJM',
    'alerts.revparAlert': 'Alerte RevPAR',
    'alerts.hasExceeded': 'a dépassé le seuil cible',
    'alerts.hasDropped': 'est tombé en dessous du niveau critique',
    'alerts.hasFluctuated': 'a montré une fluctuation inhabituelle',
    
    // Common
    'common.language': 'Langue',
    'common.backToTop': 'Retour en haut',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.close': 'Fermer',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.view': 'Voir',
    'common.export': 'Exporter',
    'common.import': 'Importer',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.sort': 'Trier',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'حول',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.contact': 'اتصل بنا',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'تجربة مجانية',
    
    // Footer
    'footer.quickLinks': 'روابط سريعة',
    'footer.features': 'الميزات',
    'footer.contactUs': 'اتصل بنا',
    'footer.copyright': 'جميع الحقوق محفوظة.',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.termsOfService': 'شروط الخدمة',
    'footer.cookiePolicy': 'سياسة ملفات تعريف الارتباط',
    
    // Home page
    'home.hero.title': 'حوّل بيانات فندقك إلى رؤى قابلة للتنفيذ',
    'home.hero.subtitle': 'يساعد InsightForge الفنادق على اتخاذ قرارات مدفوعة بالبيانات مع تحليلات قوية وتقارير فورية ولوحات تحكم بديهية.',
    'home.hero.cta1': 'تجربة مجانية',
    'home.hero.cta2': 'طلب عرض توضيحي',
    
    // About page
    'about.title': 'حول InsightForge',
    'about.subtitle': 'InsightForge: توقف عن التخمين، ابدأ النمو.',
    'about.description': 'نحن في مهمة لتحويل عمليات الفنادق من خلال قوة تحليل البيانات والرؤى القابلة للتنفيذ.',
    
    // FAQ page
    'faq.title': 'الأسئلة الشائعة',
    'faq.subtitle': 'اعثر على إجابات للأسئلة الشائعة حول InsightForge وكيف يمكن أن يساعد فندقك.',
    'faq.stillHaveQuestions': 'ما زال لديك أسئلة؟',
    'faq.contactTeam': 'فريقنا سعيد لمساعدتك في أي أسئلة قد تكون لديك حول InsightForge.',
    
    // Contact page
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'لديك أسئلة أو مستعد للبدء؟ تواصل مع فريقنا.',
    'contact.getInTouch': 'تواصل معنا',
    'contact.description': 'نحن هنا للإجابة على أسئلتك ومساعدتك في الحصول على أقصى استفادة من InsightForge.',
    'contact.sendMessage': 'أرسل لنا رسالة',
    'contact.name': 'اسمك',
    'contact.email': 'عنوان البريد الإلكتروني',
    'contact.subject': 'الموضوع',
    'contact.message': 'رسالتك',
    'contact.send': 'إرسال الرسالة',
    'contact.sending': 'جارٍ الإرسال...',
    'contact.success': 'تم إرسال رسالتك بنجاح. سنعود إليك قريباً!',
    
    // Terms page
    'terms.title': 'شروط الخدمة',
    'terms.lastUpdated': 'آخر تحديث: 20 مايو 2025',
    
    // Privacy page
    'privacy.title': 'سياسة الخصوصية',
    'privacy.lastUpdated': 'آخر تحديث: 20 مايو 2025',
    
    // Cookie Policy page
    'cookie.title': 'سياسة ملفات تعريف الارتباط',
    'cookie.lastUpdated': 'آخر تحديث: 20 مايو 2025',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.description': 'نظرة عامة على أداء فندقك',
    'dashboard.noDataMessage': 'لم يتم استيراد أي بيانات بعد. انتقل إلى الإعدادات > استيراد البيانات لتحميل بيانات فندقك.',
    'dashboard.totalRevenue': 'إجمالي الإيرادات',
    'dashboard.occupancyRate': 'معدل الإشغال',
    'dashboard.revpar': 'الإيراد لكل غرفة متاحة',
    'dashboard.adr': 'متوسط المعدل اليومي',
    'dashboard.monthlyRevenue': 'الإيرادات الشهرية',
    'dashboard.bookingSources': 'مصادر الحجز',
    'dashboard.topPerformingRooms': 'الغرف الأكثر أداءً',
    'dashboard.roomName': 'اسم الغرفة',
    'dashboard.bookings': 'الحجوزات',
    'dashboard.revenue': 'الإيرادات',
    'dashboard.occupancy': 'معدل الإشغال',
    'dashboard.noRoomData': 'لا توجد بيانات غرف متاحة. يرجى استيراد البيانات لرؤية أداء الغرف.',
    'dashboard.totalRevenueDesc': 'إجمالي الإيرادات المحققة من جميع الحجوزات والخدمات',
    'dashboard.occupancyDesc': 'نسبة الغرف المتاحة المشغولة',
    'dashboard.revparDesc': 'الإيراد لكل غرفة متاحة',
    'dashboard.adrDesc': 'متوسط المعدل اليومي عبر جميع أنواع الغرف',
    'dashboard.revenueBreakdown': 'تفصيل الإيرادات',
    'dashboard.roomRevenue': 'إيرادات الغرف',
    'dashboard.serviceRevenue': 'إيرادات الخدمات',
    'dashboard.occupancyDetails': 'تفاصيل الإشغال',
    'dashboard.weekdays': 'أيام الأسبوع',
    'dashboard.weekends': 'عطلات نهاية الأسبوع',
    'dashboard.revparAnalysis': 'تحليل الإيراد لكل غرفة',
    'dashboard.thisMonth': 'هذا الشهر',
    'dashboard.lastMonth': 'الشهر الماضي',
    'dashboard.adrByRoomType': 'المعدل اليومي حسب نوع الغرفة',
    'dashboard.standard': 'عادي',
    'dashboard.deluxe': 'ديلوكس',
    'dashboard.dateRanges.today': 'اليوم',
    'dashboard.dateRanges.yesterday': 'أمس',
    'dashboard.dateRanges.thisWeek': 'هذا الأسبوع',
    'dashboard.dateRanges.lastWeek': 'الأسبوع الماضي',
    'dashboard.dateRanges.thisMonth': 'هذا الشهر',
    'dashboard.dateRanges.lastMonth': 'الشهر الماضي',
    'dashboard.dateRanges.thisQuarter': 'هذا الربع',
    'dashboard.dateRanges.lastQuarter': 'الربع الماضي',
    'dashboard.dateRanges.thisYear': 'هذا العام',
    'dashboard.dateRanges.customRange': 'نطاق مخصص',
    
    // Bookings Analytics
    'bookings.title': 'تحليلات الحجوزات',
    'bookings.description': 'تحليل أنماط الحجز وقنوات التوزيع',
    'bookings.bookingChannels': 'قنوات الحجز',
    'bookings.channelPerformance': 'أداء القنوات',
    'bookings.channel': 'القناة',
    'bookings.distribution': 'التوزيع',
    'bookings.trend': 'الاتجاه',
    'bookings.bookingLeadTime': 'مهلة الحجز',
    'bookings.bookingsVsCancellations': 'الحجوزات مقابل الإلغاءات',
    'bookings.mostCommon': 'الأكثر شيوعاً',
    'bookings.averageLeadTime': 'متوسط المهلة',
    'bookings.sameDayBookings': 'حجوزات نفس اليوم',
    'bookings.totalCancellations': 'إجمالي الإلغاءات',
    'bookings.cancellationRate': 'معدل الإلغاء',
    'bookings.channelsDesc': 'توزيع الحجوزات عبر قنوات مختلفة',
    'bookings.performanceDesc': 'مقاييس الأداء التفصيلية لكل قناة حجز',
    'bookings.leadTimeDesc': 'توزيع الوقت بين الحجز وتاريخ الوصول',
    'bookings.cancellationsDesc': 'الاتجاه الشهري للحجوزات مقابل الإلغاءات',
    
    // Guest Segments
    'guests.title': 'تجزئة الضيوف',
    'guests.description': 'فهم ضيوفك وأنماط الحجز لديهم',
    'guests.nationalityHeatmap': 'خريطة حرارية لجنسيات الضيوف',
    'guests.nationalityDistribution': 'توزيع الجنسيات',
    'guests.bookingTrends': 'اتجاهات الحجز',
    'guests.heatmapDesc': 'التوزيع الجغرافي لأصول الضيوف',
    'guests.distributionDesc': 'تفصيل جنسيات الضيوف بالنسبة المئوية',
    'guests.trendsDesc': 'اتجاهات الحجز الشهرية عبر شرائح الضيوف',
    
    // Financial Overview
    'financial.title': 'النظرة المالية العامة',
    'financial.description': 'تتبع الإيرادات والمصروفات والربحية',
    'financial.totalRevenue': 'إجمالي الإيرادات',
    'financial.totalExpenses': 'إجمالي المصروفات',
    'financial.profitMargin': 'هامش الربح',
    'financial.revenueVsExpenses': 'الإيرادات مقابل المصروفات',
    'financial.expenseCategories': 'فئات المصروفات',
    'financial.financialDetails': 'التفاصيل المالية',
    'financial.month': 'الشهر',
    'financial.expenses': 'المصروفات',
    'financial.profit': 'الربح',
    'financial.margin': 'الهامش',
    'financial.total': 'المجموع',
    'financial.generateReport': 'إنشاء تقرير مالي',
    'financial.reviewBudget': 'مراجعة ميزانية المصروفات',
    'financial.generateReportDesc': 'تصدير تقارير مالية مفصلة لأغراض المحاسبة والضرائب.',
    'financial.reviewBudgetDesc': 'مقارنة المصروفات الفعلية بالمبالغ المدرجة في الميزانية.',
    'financial.generate': 'إنشاء',
    'financial.review': 'مراجعة',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.description': 'إدارة حسابك وتفضيلاتك',
    'settings.accountSettings': 'إعدادات الحساب',
    'settings.accountDesc': 'تكوين إعدادات حسابك وتفضيلاتك',
    
    // Alerts
    'alerts.realTimeAlerts': 'تنبيهات فورية',
    'alerts.noRecentAlerts': 'لا توجد تنبيهات حديثة',
    'alerts.revenueAlert': 'تنبيه الإيرادات',
    'alerts.occupancyAlert': 'تنبيه معدل الإشغال',
    'alerts.adrAlert': 'تنبيه المعدل اليومي',
    'alerts.revparAlert': 'تنبيه الإيراد لكل غرفة',
    'alerts.hasExceeded': 'تجاوز العتبة المستهدفة',
    'alerts.hasDropped': 'انخفض إلى ما دون المستوى الحرج',
    'alerts.hasFluctuated': 'أظهر تقلباً غير عادي',
    
    // Common
    'common.language': 'اللغة',
    'common.backToTop': 'العودة إلى الأعلى',
    'common.loading': 'جارٍ التحميل...',
    'common.error': 'خطأ',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.close': 'إغلاق',
    'common.edit': 'تحرير',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.export': 'تصدير',
    'common.import': 'استيراد',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
  },
};
