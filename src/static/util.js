
import CONST from './constant.js';

export default class Util {
    static get Math(){return MathUtil;}
    static get String(){return StringUtil;}
    static get Color(){return ColorUtil;}
    static get Error(){return ErrorUtil;}
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
        if(s == null || (Util.isNumber(s) !== true && Util.isString(s) !== true)){
            ErrorUtil.throw('the first argument should be a type of {number|string}', 'Util.StringUtil.zeroPadding', 'type');
        }
        if(n == null || Util.isNumber(n) !== true || n <= 0){
            ErrorUtil.throw('the second argument should be a type of {number} and greater than 0', 'Util.StringUtil.zeroPadding', 'type');
        }
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
        let year   = e.getFullYear();
        let month  = StringUtil.zeroPadding(e.getMonth() + 1, 2);
        let day    = StringUtil.zeroPadding(e.getDate(), 2);
        let hour   = StringUtil.zeroPadding(e.getHours(), 2);
        let minute = StringUtil.zeroPadding(e.getMinutes(), 2);
        let second = StringUtil.zeroPadding(e.getSeconds(), 2);
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    }
}

class ColorUtil {
    static RGBtoHSV(){}
    static RGBtoHSL(){}
    static HSVtoRGB(){}
    static HSLtoRGB(){}
    static RGBtoHEX(color){
        if(color == null || Array.isArray(color) !== true || color.length < 3){
            ErrorUtil.throw('should be a type of {Array} and greater equal than length is 3', 'Util.ColorUtil.RGBtoHEX', 'type');
        }
        let r = StringUtil.zeroPadding(color[0].toString(16), 2);
        let g = StringUtil.zeroPadding(color[1].toString(16), 2);
        let b = StringUtil.zeroPadding(color[2].toString(16), 2);
        return `#${r}${g}${b}`;
    }
    static HEXtoRGB(color){
        if(color == null || Util.isString(color) !== true){
            ErrorUtil.throw('should be a type of {string}', 'Util.ColorUtil.HEXtoRGB', 'type');
        }
        if(color.search(/^#+[\d|a-f|A-F]+$/) === -1){
            ErrorUtil.throw('should be a format of "#ffffff"', 'Util.ColorUtil.HEXtoRGB', 'type');
        }
        let s = color.replace('#', '');
        if(s.length !== 3 && s.length !== 6){
            ErrorUtil.throw('should be a format of "#ffffff" or "#fff"', 'Util.ColorUtil.HEXtoRGB', 'type');
        }
        let t = s.length / 3;
        return [
            parseInt(color.substr(1, t), 16) / 255,
            parseInt(color.substr(1 + t, t), 16) / 255,
            parseInt(color.substr(1 + t * 2, t), 16) / 255
        ];
    }
}

class ErrorUtil {
    static new(msg, name = '', type = ''){
        let method = '';
        if(Util.isString(name) === true && name !== ''){
            method = `: ${name}`;
        }
        let message = `${CONST.CONSOLE_ERROR_PREFIX}[${CONST.GLOBAL_NAME}${method}] ${msg}`;
        switch(type){
            case 'reference':
                return new ReferenceError(message);
            case 'syntax':
                return new SyntaxError(message);
            case 'type':
                return new TypeError(message);
            default:
                return new Error(message);
        }
    }
    static throw(msg, name = '', type = ''){
        throw ErrorUtil.new(msg, name, type);
    }
    static warn(msg, name = ''){
        let method = '';
        if(Util.isString(name) === true && name !== ''){
            method = `: ${name}`;
        }
        let message = `${CONST.CONSOLE_WARN_PREFIX}[${CONST.GLOBAL_NAME}${method}] ${msg}`;
        console.warn(message);
    }
}

