import React from 'react';
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { set_star_parameters } from "../../Backend/operations.js";

const Set_star = ({ arr }) => {
    const { star_full, star_half, star_empty } = set_star_parameters(arr);
    console.log({ star_full, star_half, star_empty })
    const stars = [];

    // Full stars
    for (let i = 0; i < star_full; i++) {
        stars.push(<FaStar key={`full-${i}`} color="black" />);
    }
    // Half stars
    for (let i = 0; i < star_half; i++) {
        stars.push(<FaStarHalfAlt key={`half-${i}`} color="black" />);
    }
    // Empty stars
    for (let i = 0; i < star_empty; i++) {
        stars.push(<CiStar key={`empty-${i}`} color="black" />);
    }

    return <div className='flex'>{stars}</div>;
};

export default Set_star;
