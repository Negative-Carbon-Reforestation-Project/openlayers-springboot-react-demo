/**
 * A RegEx expression that groups keys and values in document.cookie
 * @type {RegExp}
 * @remark Example: "onboarded=true; expires=Fri, 27 May 2022 19:56:24 GMT; path=/"
 *  The RegEx finds 3 groups (onboarded=true), (expires=Fri...), (path=/)
 *  and then separates each group by key and value such as (key: onboarded, value=true)
 *
 *  Test available at https://regex101.com/r/Iq7TVG/1
 */
const cookieTokenExpression = /(?<key>[^=;]*)=(?<value>[^=;]*)/gm;

/**
 * Sets a browser cookie with the given details
 * @param name The name of the cookie
 * @param value The value of the cookie
 * @param daysTillExpiry The days till the cookie expires. Default is 30
 */
const setCookie = (name, value, daysTillExpiry=30) => {
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysTillExpiry);

    let expiry = `expires=${expiryDate.toUTCString()}`;

    document.cookie = `${name}=${value}`;
    document.cookie = `${expiry};`;
    document.cookie = `path=/`;

}

/**
 * Gets a cookie's value with the given name
 * @param name THe cookie name
 * @returns {*} The value of the cookie if found; Undefined otherwise.
 */
const getCookie = (name) => {
    let cookie = decodeURIComponent(document.cookie);
    let cookieMatches = Array.from(cookie.matchAll(cookieTokenExpression));

    let result;

    cookieMatches.forEach((match) => {
        if (match.groups.key === name)
        {
            result = match.groups.value;
        }
    });

    return result;
}

export {
    setCookie,
    getCookie
};