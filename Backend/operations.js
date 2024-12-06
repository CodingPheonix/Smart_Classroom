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