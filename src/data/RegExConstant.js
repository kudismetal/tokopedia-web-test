export const reOnlyDigitOrDigitWithPeriodDelimiter = /(^\d+$)|(^\d{1,3}(\.\d{3}|$)+$)/;
export const reRpWithOnlyDigit = /^(Rp|Rp )\d+$/;
export const reRpWithOnlyDigitCommaEnds = /^(Rp|Rp )\d+,[0]{2}$/;
export const reRpWithPeriodDelimiter = /^(Rp|Rp )\d{1,3}(\.\d{3}|$)+$/;
export const reRpWithPeriodDelimiterCommaEnds = /^(Rp|Rp )\d{1,3}(\.\d{3}|$)+,[0]{2}$/;