import React from "react";

import logo192 from "../../resources/images/logo/ncrp-logo-192x96.webp"
import logo205 from "../../resources/images/logo/ncrp-logo-205x103.webp"
import logo208 from "../../resources/images/logo/ncrp-logo-208x104.webp"
import logo320 from "../../resources/images/logo/ncrp-logo-320x160.webp"
import logo600 from "../../resources/images/logo/ncrp-logo-600x300.webp"

import logo600fallback from "../../resources/images/logo/ncrp-logo-600x300.png"

/**
 * Container for site logo
 * @remark The picture tag is used to support a wide variety of resolutions in both screen orientations
 * and the img tag is used as a fallback.
 * @returns {JSX.Element}
 */
const Logo = ({className, alt="Site logo", tabIndex=-1, href="/"}) => {

    return <picture>
                <source
                    type="image/webp"
                    media="(orientation: landscape)"
                    srcSet={`${logo192} 192w`}
                    sizes="(max-width: 800px) 192w, (max-width: 900px) 192w"
                />

                <source
                    type="image/webp"
                    media="(orientation: portrait)"
                    srcSet={`${logo192} 192w, ${logo205} 205w, ${logo208} 208w, ${logo320} 320w, ${logo600} 600w`}
                    sizes="(max-width: 600px) 205px, (min-width: 600px) 208px, (min-width: 992px) 320px"
                />

                <img
                    src={logo600fallback}
                    className={className}
                    alt={alt}
                    tabIndex={tabIndex}
                    draggable={false}
                    onClick={() => document.location.href = href}
                />
           </picture>
}

export default Logo;