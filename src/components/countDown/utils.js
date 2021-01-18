const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
const DAY = 24 * HOURS;

export function parseTimeData(time) {
    let days = Math.floor(time / DAY);
    let hours = Math.floor((time % DAY) / HOURS);
    let minutes = Math.floor((time % HOURS) / MINUTES);
    let seconds = Math.floor((time % MINUTES) / SECONDS);
    let millSeconds = Math.floor(time % SECONDS);
    return {
        days,
        hours,
        minutes,
        seconds,
        millSeconds
    }
}

// DD	天数
// HH	小时
// mm	分钟
// ss	秒数
// S	毫秒（1 位）
// SS	毫秒（2 位）
// SSS	毫秒（3 位）
export function parseFormat(format, timeData) {
    let { days, hours, minutes, seconds, millSeconds } = timeData;
    if (format.indexOf('DD') == -1) {
        hours += days * 24;
    } else {
        format = format.replace('DD', padZero(days))
    }

    if (format.indexOf('HH') == -1) {
        minutes += hours * 60;
    } else {
        format = format.replace('HH', padZero(hours))
    }

    if (format.indexOf('mm') == -1) {
        seconds += minutes * 1000;
    } else {
        format = format.replace('mm', padZero(minutes))
    }

    if (format.indexOf('ss') == -1) {
        millSeconds += seconds * 1000;
    } else {
        format = format.replace('ss', padZero(seconds))
    }

    if (format.indexOf('S') !== -1) {
        const ms = padZero(millSeconds, 3);

        if (format.indexOf('SSS') !== -1) {
            format = format.replace('SSS', ms);
        } else if (format.indexOf('SS') !== -1) {
            format = format.replace('SS', ms.slice(0, 2));
        } else {
            format = format.replace('S', ms.charAt(0));
        }
    }
    return format;
}

export function padZero(num, targetLength = 2) {
    let str = num + '';
    while (str.length < targetLength) {
        str = '0' + str
    }
    return str;
}

export function isSameSecond(time1, time2) {
    return Math.floor(time1 / 1000) == Math.floor(time2 / 1000);
}