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
  