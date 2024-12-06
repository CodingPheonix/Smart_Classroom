import React from 'react';
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
// import set_star_parameters from "../../../Backend/operations"

const Set_star = ({ arr }) => {
    const { star_full, star_half, star_empty } = set_star_parameters(arr);
    const stars = [];

    function per_cent_in5(arr) {
        let marks = 0;
        let count = 0;
    
        arr.forEach((e) => {
            if (e.content_type === "quiz" && e.is_complete === true) {
                marks += e.quiz_score;
                count += 1;
            }
        });
    
        let avg = count > 0 ? ((marks / 15) * 5).toFixed(2) : "0.00";
    
        return avg;
    }
    
    function set_star_parameters(arr) {
        let star_full = 0, star_half = 0, star_empty = 0;
        const num = per_cent_in5(arr);
    
        if (num > Math.floor(num)) {
            star_full = Math.floor(num);
            star_half = 1;
            star_empty = 5 - star_full - star_half;
        } else {
            star_full = num;
            star_empty = 5 - num;
        }
    
        return { star_full, star_half, star_empty };
    }

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
