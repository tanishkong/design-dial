import { copyBank } from '../data/copyBank.js'

export function resolveCopy(dialState) {
  const { playful, warm, energetic } = dialState
  const serious    = 100 - playful
  const technical  = 100 - warm
  const calm       = 100 - energetic

  return {
    cta:              resolveCta(playful, warm, serious, technical),
    emptyHeadline:    resolveEmptyHeadline(playful, serious, warm, technical),
    emptySubtext:     resolveEmptySubtext(playful, serious, warm, technical),
    addButton:        resolveAddButton(playful, serious, energetic, calm),
    navMain:          resolveNavMain(playful, serious, warm, technical),
    metricActivity:   resolveMetricActivity(playful, serious, warm, technical),
    metricProgress:   resolveMetricProgress(playful, serious, warm, technical),
    inputPlaceholder: resolveInputPlaceholder(playful, serious, warm, technical),
  }
}

function resolveCta(playful, warm, serious, technical) {
  if (playful > 50 && warm > 50)      return copyBank.cta.playful_warm
  if (playful > 50 && technical > 50) return copyBank.cta.playful_tech
  if (serious > 50 && warm > 50)      return copyBank.cta.serious_warm
  if (serious > 50 && technical > 50) return copyBank.cta.serious_tech
  return copyBank.cta.default
}

function resolveEmptyHeadline(playful, serious, warm, technical) {
  const dominant = Math.max(playful, serious, warm, technical)
  if (dominant === playful && playful > 60)   return copyBank.emptyHeadline.playful
  if (dominant === serious && serious > 60)   return copyBank.emptyHeadline.serious
  if (dominant === warm && warm > 60)         return copyBank.emptyHeadline.warm
  if (dominant === technical && technical > 60) return copyBank.emptyHeadline.technical
  return copyBank.emptyHeadline.default
}

function resolveEmptySubtext(playful, serious, warm, technical) {
  const dominant = Math.max(playful, serious, warm, technical)
  if (dominant === playful && playful > 60)   return copyBank.emptySubtext.playful
  if (dominant === serious && serious > 60)   return copyBank.emptySubtext.serious
  if (dominant === warm && warm > 60)         return copyBank.emptySubtext.warm
  if (dominant === technical && technical > 60) return copyBank.emptySubtext.technical
  return copyBank.emptySubtext.default
}

function resolveAddButton(playful, serious, energetic, calm) {
  if (energetic > 60) return copyBank.addButton.energetic
  if (playful > 60)   return copyBank.addButton.playful
  if (serious > 60)   return copyBank.addButton.serious
  if (calm > 60)      return copyBank.addButton.calm
  return copyBank.addButton.default
}

function resolveNavMain(playful, serious, warm, technical) {
  const dominant = Math.max(playful, serious, warm, technical)
  if (dominant === technical && technical > 60) return copyBank.navMain.technical
  if (dominant === playful && playful > 60)   return copyBank.navMain.playful
  if (dominant === warm && warm > 60)         return copyBank.navMain.warm
  if (dominant === serious && serious > 60)   return copyBank.navMain.serious
  return copyBank.navMain.default
}

function resolveMetricActivity(playful, serious, warm, technical) {
  const dominant = Math.max(playful, serious, warm, technical)
  if (dominant === technical && technical > 60) return copyBank.metricActivity.technical
  if (dominant === playful && playful > 60)   return copyBank.metricActivity.playful
  if (dominant === warm && warm > 60)         return copyBank.metricActivity.warm
  if (dominant === serious && serious > 60)   return copyBank.metricActivity.serious
  return copyBank.metricActivity.default
}

function resolveMetricProgress(playful, serious, warm, technical) {
  const dominant = Math.max(playful, serious, warm, technical)
  if (dominant === technical && technical > 60) return copyBank.metricProgress.technical
  if (dominant === playful && playful > 60)   return copyBank.metricProgress.playful
  if (dominant === warm && warm > 60)         return copyBank.metricProgress.warm
  if (dominant === serious && serious > 60)   return copyBank.metricProgress.serious
  return copyBank.metricProgress.default
}

function resolveInputPlaceholder(playful, serious, warm, technical) {
  const dominant = Math.max(playful, serious, warm, technical)
  if (dominant === technical && technical > 60) return copyBank.inputPlaceholder.technical
  if (dominant === playful && playful > 60)   return copyBank.inputPlaceholder.playful
  if (dominant === warm && warm > 60)         return copyBank.inputPlaceholder.warm
  if (dominant === serious && serious > 60)   return copyBank.inputPlaceholder.serious
  return copyBank.inputPlaceholder.default
}
