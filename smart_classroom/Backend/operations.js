export function ftotal_quiz(arr) {
    let count = 0;
    arr.map((e, index) => {
        if (e.content_type === "quiz" && e.is_complete === true) {
            count = count + 1
        }
    })
    return count
}

export function ftotal_lessons(arr) {
    let count = 0;
    arr.map((e, index) => {
        if (e.content_type === "Content" && e.is_complete === true) {
            count = count + 1
        }
    })
    return count
}

export function favg_score(arr) {
    let marks = 0
    let count = 0
    arr.map((e, index) => {
        if (e.content_type === "quiz") {
            marks = marks + e.quiz_score
            count = count + 1
        }
    })
    let avg = count > 0 ? (marks / count).toFixed(2) : 0.00;

    return avg
}

export function fmodules_completed(arr) {
    let count = 0;
    arr.map((e, index) => {
        if (e.is_complete === true) {
            count = count + 1
        }
    })
    return count
}

export function fper_cent_score(arr) {
    let marks = 0;
    let count = 0;

    arr.forEach((e) => {
        if (e.content_type === "quiz") {
            marks += e.quiz_score;
            count += 1;
        }
    });

    let avg = count > 0 ? ((marks / 15) * 100).toFixed(2) : "0.00";

    return `${avg}%`;
}

export function tot_assign_submitted(arr) {
    let count = 0;
    arr.forEach((e) => {
        if (e.content_type === "quiz") {
            count += 1;
        }
    });
    return count
}

export function fmax_score(arr) {
    let max = 0;
    arr.forEach((e) => {
        if (e.content_type === "quiz" && e.quiz_score > max) {
            max = e.quiz_score
        }
    });
    return max
}

export function per_cent_in5(arr) {
    let marks = 0;
    let count = 0;

    arr.forEach((e) => {
        if (e.content_type === "quiz") {
            marks += e.quiz_score;
            count += 1;
        }
    });

    let avg = count > 0 ? ((marks / 15) * 5).toFixed(2) : "0.00";

    return avg;
}

export function set_star_parameters(arr) {
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
