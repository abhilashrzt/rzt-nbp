const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function dateformatter (date){
  let dateFormatted = new Date(date);
  return `${dateFormatted.getDate()} ${month[dateFormatted.getMonth()]} ${dateFormatted.getFullYear()}`;
}

export const formatINR = (val = 0) => `${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(val).toFixed(2))}`;

export const shortenINR = function (num=0, digits = 2) {
    var si = [
        { value: 1E7,  symbol: "C" },
        { value: 1E5,  symbol: "L" },
        { value: 1E3,  symbol: "K" }
    ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
    for (i = 0; i < si.length; i++) {
        if (Math.abs(num) >= si[i].value) {
            return formatINR((num / si[i].value).toFixed(digits)).replace(rx, "$1") + si[i].symbol;
        }
    }
    return formatINR((num||0).toFixed(digits)).replace(rx, "$1");
}


export const nFormatter = function (num=0, digits = 2) {
    var si = [
        { value: 1E15,  symbol: "Z" },
        { value: 1E12,  symbol: "T" },
        { value: 1E9,  symbol: "B" },
        { value: 1E6,  symbol: "M" },
        { value: 1E3,  symbol: "K" }
    ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
    for (i = 0; i < si.length; i++) {
        if (Math.abs(num) >= si[i].value) {
            return ((num / si[i].value).toFixed(digits)).replace(rx, "$1") + si[i].symbol;
        }
    }
    return ((num||0).toFixed(digits)).replace(rx, "$1");
}