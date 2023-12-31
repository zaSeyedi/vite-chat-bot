export function getTime(date: string) {
    let time = new Date(date);
    let hours = time.getHours()
    let minutes = time.getMinutes()
    return (
      `${hours}:${minutes}`
    );
  }

  export function getDate(date: string) {
    let myDate = new Date(date);
    let year = myDate.getFullYear()
    let month = myDate.getMonth()
    let day = myDate.getDay()
    return (
      `${year}/${month}/${day}`
    );
  }