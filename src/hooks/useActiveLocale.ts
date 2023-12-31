import { useCallback } from "react";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "constants/locales";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { updateUserLocale } from "store/global/actions";
import { SupportedLocale } from "constants/locales";

function parseLocale(maybeSupportedLocale: string) {
  const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase();
  return SUPPORTED_LOCALES.find(
    (locale) => locale.toLowerCase() === lowerMaybeSupportedLocale || locale.split("-")[0] === lowerMaybeSupportedLocale
  );
}

export function navigatorLocale() {
  if (!navigator.language) return undefined;

  const [language, region] = navigator.language.split("-");

  if (region) {
    return parseLocale(`${language}-${region.toUpperCase()}`) ?? parseLocale(language);
  }

  return parseLocale(language);
}

export function useActiveLocale() {
  return useAppSelector((state) => state.global.userLocale) ?? navigatorLocale() ?? DEFAULT_LOCALE;
}

export function useLocaleManager(): [SupportedLocale, (locale: SupportedLocale) => void] {
  const dispatch = useAppDispatch();
  const locale = useActiveLocale();

  const setLocale = useCallback(
    (newLocale: SupportedLocale) => {
      dispatch(updateUserLocale(newLocale));
    },
    [dispatch]
  );

  return [locale, setLocale];
}
