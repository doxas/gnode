
export default class Util {
    static get Math(){return MathUtil;}
    static get Str(){return StringUtil;}
    static isNumber(n){
        return n != null && Object.prototype.toString.call(n) === '[object Number]';
    }
    static isString(s){
        return s != null && Object.prototype.toString.call(s) === '[object String]';
    }
    static isObject(o){
        return o != null && Object.prototype.toString.call(o) === '[object Object]';
    }
}

class MathUtil {
    static clamp(v, min, max){
        return Math.min(Math.max(v, min), max);
    }
    static saturate(v){
        return MathUtil.clamp(v, 0.0, 1.0);
    }
    static easing(t){
        return t < 0.5 ? 4.0 * t * t * t : (t - 1.0) * (2.0 * t - 2.0) * (2.0 * t - 2.0) + 1.0;
    }
    static easeOutCubic(t){
        return (t = t / 1.0 - 1.0) * t * t + 1.0;
    }
    static easeQuintic(t){
        let ts = (t = t / 1.0) * t;
        let tc = ts * t;
        return (tc * ts);
    }
}

class StringUtil {
    static zeroPadding(s, n){
        if(n == null || Util.isNumber(n) !== true || n <= 0){return null;}
        let nega = (s < 0);
        let f = ((`${s}`).match(/\./) != null);
        let target = f ? Math.floor(s) : s;
        if(nega){target *= -1;}
        if(target >= Math.pow(10, n)){return `${s}`;}
        let conv = (new Array(n).join('0') + target).slice(-n);
        if(nega){conv = `-${conv}`;}
        if(f){conv += ((`${s}`).match(/\.\d+/));}
        return conv;
    }
    static convertTimeToSerial(d){
        let e = new Date(d);
        let year   = e.getYear() + 1900;
        let month  = StringUtil.zeroPadding(e.getMonth() + 1, 2);
        let day    = StringUtil.zeroPadding(e.getDate(), 2);
        let hour   = StringUtil.zeroPadding(e.getHours(), 2);
        let minute = StringUtil.zeroPadding(e.getMinutes(), 2);
        let second = StringUtil.zeroPadding(e.getSeconds(), 2);
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    }
    static numberToHexString(color){
        let r = StringUtil.zeroPadding(color[0].toString(16), 2);
        let g = StringUtil.zeroPadding(color[1].toString(16), 2);
        let b = StringUtil.zeroPadding(color[2].toString(16), 2);
        return `#${r}${g}${b}`;
    }
    static hexStringToNumber(color){
        if(color == null || Util.isString(color) !== true){return null;}
        if(color.search(/^#+[\d|a-f|A-F]+$/) === -1){return null;}
        let s = color.replace('#', '');
        if(s.length !== 3 && s.length !== 6){return null;}
        let t = s.length / 3;
        return [
            parseInt(color.substr(1, t), 16) / 255,
            parseInt(color.substr(1 + t, t), 16) / 255,
            parseInt(color.substr(1 + t * 2, t), 16) / 255
        ];
    }
}
