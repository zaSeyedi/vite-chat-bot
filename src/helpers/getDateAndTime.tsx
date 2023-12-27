export function getTime(date: string) {
    let time = new Date(date);
    let hours = time.getUTCHours()
    let minutes = time.getUTCMinutes()
    return (
      `${hours}:${minutes}`
    );
  }