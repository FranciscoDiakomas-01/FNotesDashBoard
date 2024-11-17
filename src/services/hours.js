
export default function Hours(){

    const D = new Date()
    const dayWeek = [
        'Domingo',
        'Segunda-Feira',
        'Terça-Feira',
        'Quarta-Feira',
        'Quinta-Feira',
        'Sexta-Feira',
        'Sábado'
    ]
    const date = {
      time: D.getTime(),
      hours: D.getHours().toString().padStart(1, "0"),
      minutes: D.getMinutes().toString().padStart(1, "0"),
      seconds: D.getSeconds().toString().padStart(1, "0"),
      day: D.getDate(),
      dayWeek: dayWeek[D.getDay()],
      year: D.getFullYear(),
      month: D.getMonth() + 1,
    };
    return date
}