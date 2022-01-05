export class Utils {
    static match(str, rule) {
        var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
    }

    static getParameters(str, rule){
        let parameters = {};

        str = str.split(/\//g);
        rule = rule.split(/\//g);
        let newStr = [];

        rule.forEach((ruler, index) => {
            if(ruler.startsWith(":")){
                parameters[ruler.substr(1)] = str[index];
                newStr.push("*");
            } else 
                newStr.push(ruler);
        });

        newStr = newStr.join("/");
        str = str.join("/");

        if(!Utils.match(str, newStr))
            return;

        return parameters;
    }
}