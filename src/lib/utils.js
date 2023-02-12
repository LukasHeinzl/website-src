export class TextUtils {
    static limit (str, limit, ellipsis = '[...]') {
        if(str.length < limit)
            return str.slice();

        const cutIndex = str.slice(0, limit - ellipsis.length).lastIndexOf(' ') + 1;
        return str.slice(0, cutIndex) + ellipsis;
    }
}