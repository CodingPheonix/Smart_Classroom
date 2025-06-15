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
        if (e.content_type === "quiz" && e.is_complete === true) {
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
        if (e.content_type === "quiz" && e.is_complete === true) {
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


// Backend operations
export function addTimes(time1, time2) {
    const [h1, m1, s1] = time1.split(":").map(Number);
    const [h2, m2, s2] = time2.split(":").map(Number);

    let seconds = s1 + s2;
    let minutes = m1 + m2 + Math.floor(seconds / 60);
    let hours = h1 + h2 + Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;

    return `${hours}:${minutes}:${seconds}`;
}

export function add_all_durations(arr){
    let total_time = "0:0:0"

    for (let index = 0; index < arr.length; index++) {
        const time = arr[index];
        total_time = addTimes(time, total_time)
    }

    return total_time
}

export function get_student_rank(arr, student_id) {
    let data = [];

    arr.forEach(module => {
      const existingData = data.find(I_data => I_data.id === module.student_id);
  
      if (!existingData) {
        data.push({
          id: module.student_id,
          total_marks: module.total_score,
          obtained_marks: module.quiz_score
        });
      } else {
        existingData.total_marks += module.total_score;
        existingData.obtained_marks += module.quiz_score;
      }
    });

    data = data.map(student => ({
      ...student,
      percentage: (student.obtained_marks / student.total_marks) * 100
    }));

    data.sort((a, b) => b.percentage - a.percentage);
    const rank = data.findIndex(student => student.id === student_id) + 1;
  
    return rank;
  }
  