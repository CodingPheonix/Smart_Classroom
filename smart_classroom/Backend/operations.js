export function ftotal_quiz(arr){
    let count = 0;
    arr.map((e, index) => {
        if ( e.content_type === "quiz" && e.is_complete === true) {
            count = count + 1
        }
    })
    return count
}

export function favg_score(arr) {
    let marks = 0
    let count = 0
    arr.map((e, index) => {
        if ( e.content_type === "quiz" ) {
            marks = marks + e.quiz_score
            count = count + 1
        }
    })
    let avg = count > 0 ? (marks / count).toFixed(2) : 0.00;

    return avg
}

export function fmodules_completed(arr){
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
