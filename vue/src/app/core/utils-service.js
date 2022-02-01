/** 
 * Removes wrapper
 * @return {Film} film
 * @param {Wrap} wrap
 */
export function removeWrap(wrap) {
  return wrap.fields;
}

/**
 * Makes Date to String in format "yyyy-mm-dd"
 * @param {Date} date 
 */
export const formatDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;