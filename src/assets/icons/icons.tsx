import { ReactElement } from "react";

export const getIcon = (name: "cross" | "heart" | "none"): ReactElement | null => {
    if (!name) return null;
    switch (name) {
        case "cross":
            return CrossIcon;
        case "heart":
            return HeartIcon;
        case "none":
            return null;
        default:
            return null;
    }
};


export const CrossIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
        <path d="M25.2578 5.25781L17.0547 13.4609L25.2578 21.7422C26.2734 22.6797 26.2734 24.3203 25.2578 25.2578C24.3203 26.2734 22.6797 26.2734 21.7422 25.2578L13.5391 17.0547L5.25781 25.2578C4.32031 26.2734 2.67969 26.2734 1.74219 25.2578C0.726562 24.3203 0.726562 22.6797 1.74219 21.7422L9.94531 13.4609L1.74219 5.25781C0.726562 4.32031 0.726562 2.67969 1.74219 1.74219C2.67969 0.726562 4.32031 0.726562 5.25781 1.74219L13.5391 9.94531L21.7422 1.74219C22.6797 0.726562 24.3203 0.726562 25.2578 1.74219C26.2734 2.67969 26.2734 4.32031 25.2578 5.25781Z" fill="url(#paint0_linear_16_235)" />
        <defs>
            <linearGradient id="paint0_linear_16_235" x1="6.76823" y1="-6.53906" x2="27.4665" y2="20.6274" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4A60" />
                <stop offset="1" stopColor="#F04463" />
            </linearGradient>
        </defs>
    </svg>

)

export const HeartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="35" viewBox="0 0 41 35" fill="none">
        <path d="M4.17188 20.5906C1.82812 18.4031 0.5 15.2781 0.5 11.9968V11.6062C0.5 6.13746 4.40625 1.44996 9.79688 0.590585C13.3906 -0.0344151 16.9844 1.13746 19.5625 3.63746L20.5 4.57496L21.4375 3.63746C23.9375 1.13746 27.6094 -0.0344151 31.125 0.590585C36.5156 1.44996 40.5 6.13746 40.5 11.6062V11.9968C40.5 15.2781 39.0938 18.4031 36.75 20.5906L22.6094 33.7937C22.0625 34.3406 21.2812 34.575 20.5 34.575C19.6406 34.575 18.8594 34.3406 18.3125 33.7937L4.17188 20.5906Z" fill="url(#paint0_linear_16_243)" />
        <defs>
            <linearGradient id="paint0_linear_16_243" x1="9.66667" y1="-2.92504" x2="26.3333" y2="32.075" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38FF94" />
                <stop offset="1" stopColor="#40DD89" />
            </linearGradient>
        </defs>
    </svg>
)