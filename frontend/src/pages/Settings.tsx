import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  Monitor,
  Globe,
  Bell,
  User,
  Shield,
  Eye,
  Check
} from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { cn } from '../utils/cn';

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'es' | 'fr';

export const Settings = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useThemeStore();
  const [language, setLanguage] = useState<Language>(i18n.language as Language);

  // Dummy settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [priceAlerts, setPriceAlerts] = useState(true);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const themeOptions: { value: Theme; label: string; icon: any }[] = [
    { value: 'light', label: t('settings.lightMode'), icon: Sun },
    { value: 'dark', label: t('settings.darkMode'), icon: Moon },
    { value: 'system', label: t('settings.systemMode'), icon: Monitor },
  ];

  const languages: { value: Language; label: string; flag: string }[] = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
          <SettingsIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t('settings.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your preferences and account settings
        </p>
      </div>

      {/* Appearance Section */}
      <div className="card p-6 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Sun className="text-primary-600 dark:text-primary-400" size={24} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('settings.appearance')}
          </h2>
        </div>

        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t('settings.theme')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 active:scale-95',
                  theme === option.value
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <option.icon
                    size={24}
                    className={cn(
                      theme === option.value
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-400'
                    )}
                  />
                  {theme === option.value && (
                    <Check size={20} className="text-primary-600 dark:text-primary-400" />
                  )}
                </div>
                <span
                  className={cn(
                    'block text-sm font-medium',
                    theme === option.value
                      ? 'text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Language Section */}
      <div className="card p-6 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Globe className="text-primary-600 dark:text-primary-400" size={24} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('settings.language')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => handleLanguageChange(lang.value)}
              className={cn(
                'p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 active:scale-95',
                language === lang.value
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{lang.flag}</span>
                {language === lang.value && (
                  <Check size={20} className="text-primary-600 dark:text-primary-400" />
                )}
              </div>
              <span
                className={cn(
                  'block text-sm font-medium',
                  language === lang.value
                    ? 'text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300'
                )}
              >
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="card p-6 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Bell className="text-primary-600 dark:text-primary-400" size={24} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('settings.notifications')}
          </h2>
        </div>

        <div className="space-y-4">
          <ToggleSetting
            label={t('settings.emailNotifications')}
            description="Receive updates and news via email"
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
          <ToggleSetting
            label={t('settings.pushNotifications')}
            description="Get push notifications for important updates"
            checked={pushNotifications}
            onChange={setPushNotifications}
          />
          <ToggleSetting
            label={t('settings.priceAlerts')}
            description="Get notified when prices change significantly"
            checked={priceAlerts}
            onChange={setPriceAlerts}
          />
        </div>
      </div>

      {/* Account Section */}
      <div className="card p-6 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700">
          <User className="text-primary-600 dark:text-primary-400" size={24} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('settings.account')}
          </h2>
        </div>

        <div className="space-y-3">
          <SettingButton icon={User} label={t('settings.profile')} />
          <SettingButton icon={Shield} label={t('settings.security')} />
          <SettingButton icon={Eye} label={t('settings.privacy')} />
        </div>
      </div>
    </div>
  );
};

interface ToggleSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSetting = ({ label, description, checked, onChange }: ToggleSettingProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{label}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
          checked ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
};

interface SettingButtonProps {
  icon: any;
  label: string;
}

const SettingButton = ({ icon: Icon, label }: SettingButtonProps) => {
  return (
    <button className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 active:scale-[0.99]">
      <div className="flex items-center space-x-3">
        <Icon className="text-gray-600 dark:text-gray-400" size={20} />
        <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
      </div>
      <span className="text-gray-400">›</span>
    </button>
  );
};
