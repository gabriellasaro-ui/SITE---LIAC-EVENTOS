/**
 * Consentimento de cookies (LGPD) integrado ao Google Consent Mode v2.
 * O aviso aparece sempre; quando o GTM for configurado, as tags já respeitam a escolha salva.
 */

export const CONSENT_KEY = 'lg-consent-v1'
/** Evento disparado pelo link "Preferências de cookies" para reabrir o aviso. */
export const CONSENT_OPEN_EVENT = 'lg:cookie-preferences'

export type ConsentChoice = { analytics: boolean; marketing: boolean; at: string }

export function consentModeUpdate(c: Pick<ConsentChoice, 'analytics' | 'marketing'>) {
  const v = (on: boolean) => (on ? 'granted' : 'denied')
  return {
    analytics_storage: v(c.analytics),
    ad_storage: v(c.marketing),
    ad_user_data: v(c.marketing),
    ad_personalization: v(c.marketing),
  }
}

/**
 * Roda no <head>, antes do GTM: tudo começa negado e, se a pessoa já escolheu antes,
 * aplica a escolha salva. Assim nenhuma tag grava cookie sem consentimento.
 */
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
try{var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');if(c){var v=function(b){return b?'granted':'denied'};gtag('consent','update',{analytics_storage:v(c.analytics),ad_storage:v(c.marketing),ad_user_data:v(c.marketing),ad_personalization:v(c.marketing)})}}catch(e){}`
