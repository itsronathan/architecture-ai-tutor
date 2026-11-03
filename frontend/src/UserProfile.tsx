import type { MessageKey } from "./i18n/messages";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useProfileSettings } from "./context/ProfileSettingsContext";
import { useLocale } from "./i18n/LocaleContext";
import { APP_LOCALES, LOCALE_NATIVE_LABELS, type AppLocale } from "./i18n/types";
import { PAGE_BACKGROUND_OPTIONS, type PageBackgroundId } from "./profile/profileSettings";
import "./UserProfile.css";

export default function UserProfile() {
  const { user, loading, logout, setShowSignIn } = useAuth();
  const { pageBackground, setPageBackground } = useProfileSettings();
  const { locale, applyLocale, t } = useLocale();
  const [localeNotice, setLocaleNotice] = useState<string | null>(null);
  const onApplyLocale = (next: AppLocale) => {
    applyLocale(next);
    setLocaleNotice(t("locale.applied"));
    window.setTimeout(() => setLocaleNotice(null), 2400);
  };

  return (
    <div className="profile-page">
      <header className="profile-page-header">
        <h1 className="profile-page-title">{t("profile.title")}</h1>
        <p className="profile-page-subtitle">Account, language, and appearance. Studio notes are saved in this browser.</p>
      </header>

      <section className="profile-card" aria-labelledby="profile-locale-heading">
        <h2 id="profile-locale-heading" className="profile-card-title">
          {t("locale.sectionTitle")}
        </h2>
        <p className="profile-setting-desc">{t("locale.sectionDesc")}</p>
        <div className="profile-locale-grid" role="radiogroup" aria-label={t("locale.sectionTitle")}>
          {APP_LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              role="radio"
              aria-checked={locale === code}
              className={`profile-locale-option${locale === code ? " profile-locale-option--active" : ""}`}
              onClick={() => onApplyLocale(code)}
            >
              <span className="profile-locale-option-label">{LOCALE_NATIVE_LABELS[code]}</span>
              <span className="profile-locale-option-code">{code.toUpperCase()}</span>
            </button>
          ))}
        </div>
        <button type="button" className="profile-locale-apply-all" onClick={() => onApplyLocale(locale)}>
          {t("locale.applyAll")}
        </button>
        {localeNotice ? (
          <p className="profile-locale-notice" role="status" aria-live="polite">
            {localeNotice}
          </p>
        ) : null}
      </section>

      <section className="profile-card" aria-labelledby="profile-account-heading">
        <h2 id="profile-account-heading" className="profile-card-title">
          {t("profile.account")}
        </h2>
        {loading ? (
          <p className="profile-muted">{t("profile.loading")}</p>
        ) : user ? (
          <div className="profile-account-block">
            <div className="profile-account-row">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="profile-avatar-lg" referrerPolicy="no-referrer" />
              ) : (
                <div className="profile-avatar-placeholder" aria-hidden>
                  {(user.displayName || user.email || "?").slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="profile-account-text">
                <p className="profile-display-name">{user.displayName || "—"}</p>
                <p className="profile-email">{user.email}</p>
              </div>
            </div>
            <button type="button" className="profile-signout-btn" onClick={() => void logout()}>
              {t("profile.signOut")}
            </button>
          </div>
        ) : (
          <div className="profile-account-block">
            <p className="profile-muted">{t("profile.notSignedIn")}</p>
            <button type="button" className="profile-google-btn" onClick={() => setShowSignIn(true)}>
              {t("profile.signIn")}
            </button>
          </div>
        )}
      </section>

      <section className="profile-card" aria-labelledby="profile-appearance-heading">
        <h2 id="profile-appearance-heading" className="profile-card-title">
          {t("profile.appearance")}
        </h2>
        <p className="profile-setting-desc">{t("profile.appearanceDesc")}</p>
        <div className="profile-bg-grid" role="radiogroup" aria-label={t("profile.appearanceGroup")}>
          {PAGE_BACKGROUND_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={pageBackground === opt.id}
              className={`profile-bg-swatch ${pageBackground === opt.id ? "profile-bg-swatch--active" : ""}`}
              onClick={() => setPageBackground(opt.id as PageBackgroundId)}
              title={`${t(`theme.${opt.id}` as MessageKey)}: ${t("theme.titleSuffix")}`}
            >
              <span
                className="profile-bg-swatch-dot"
                style={{
                  background: `linear-gradient(135deg, ${opt.page} 45%, ${opt.chat} 45%)`,
                }}
                aria-hidden
              />
              <span className="profile-bg-swatch-label">{t(`theme.${opt.id}` as MessageKey)}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
