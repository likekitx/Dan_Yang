export function subNumber(num:string | number) {
    let numStr = num + ''
    if(numStr.length > 4){
        const str1:string = numStr.slice(0,numStr.length-3);
        return str1.slice(0,str1.length-1) + '.' + str1.slice(str1.length-1) + 'w';
    }else {
        return num
    }
}

export function getNowTime():string {
    let dt = new Date()
    let y = dt.getFullYear()
    let mt = (dt.getMonth() + 1).toString().padStart(2,'0')
    let day = dt.getDate().toString().padStart(2,'0')
    let h = dt.getHours().toString().padStart(2,'0')
    let m = dt.getMinutes().toString().padStart(2,'0')
    return  y + "-" + mt + "-" + day + " " + h + ":" + m
}

export function getStrTen(str:string) {
    if(str.length > 10){
        return (str).slice(0,10) + '...'
    }else {
        return str
    }
}