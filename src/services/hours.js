
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
        hours: D.getHours(),
        minutes: D.getMinutes(),
        seconds: D.getSeconds() ,
        day: D.getDate(),
        dayWeek: dayWeek[D.getDay()],
        year : D.getFullYear()
    }
    return date
}