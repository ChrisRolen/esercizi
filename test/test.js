require("../LibraryDateArray");
var lib = DateFormatter;
const assert = require('chai').assert;
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
/**
 * Gli anni minori del 1900 non vengono ben interpretati dalla Date
 * attualmente non ha senso testarli se non si vuole permettere l'inserimento di date < 1900
 * NB: i mesi vanno da 0 a 11
 *
 * Le date senza mesi e giorni non hanno senso
 */
var dateParams = [
    {year: 1980, month: 5, day: 10, hour: 13, min: 45, sec: 8, ms: 123},
    {year: 1991, month: 0, day: 30, hour: 2, min: 1, sec: 12, ms: 5},
    {year: 2000, month: 9, day: 22, hour: 12, min: 21, sec: 55, ms: null},
    {year: 2006, month: 11, day: 1, hour: 23, min: 55, sec: null, ms: null},
    {year: 2022, month: 10, day: 21, hour: 0, min: null, sec: null, ms: null},
    {year: 2115, month: 2, day: 29, hour: null, min: null, sec: null, ms: null}
];
var dates = [], d, dp, i, format, check, names;
for (i=0; i<dateParams.length; i++){
    dates[i] = new Date(dateParams[i].year, dateParams[i].month, dateParams[i].day, dateParams[i].hour, dateParams[i].min, dateParams[i].sec, dateParams[i].ms);
}

describe('Date', function () {
    describe('#format', function () {

        it('returns undefined if nothing is valid', function () {
            assert.throws(() => lib.format('', 'no'), 'Variable date or format are not of the required format.');
        });

        it('returns a String given a Date of the desired Format', function () {
            for (i=0; i<dates.length; i++){
                d = dates[i];

                /** test migliorabile con un controllo puntuale sulla frase in output */
                assert.isString(lib.format(d, "Era il mese MM dell'anno YY"), "errore con data "+d.toString());
            }
        });

        it('returns a full year (4 chars) if YYYY is requested', function () {
            format = 'YYYY';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].year || "";
                check = dp.toString();

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns a short year (2 chars) if YY is requested', function () {
            format = 'YY';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].year || "";
                check = pad(dp,2).toString().slice(-2);

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns a full month written in letters if MMMM is requested', function () {
            names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            format = 'MMMM';
            for (i=0; i<dates.length; i++){
                d = dates[i];

                assert.oneOf(lib.format(d, format), names, "errore con data "+d.toString());
            }
        });

        it('returns a short month written in letters if MMM is requested', function () {
            names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            format = 'MMM';
            for (i=0; i<dates.length; i++){
                d = dates[i];

                assert.oneOf(lib.format(d, format), names, "errore con data "+d.toString());
            }
        });

        it('returns a month in two digits if MM is requested', function () {
            format = 'MM';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].month || "";
                check = pad(dp,2).toString().slice(-2);

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns a month if M is requested', function () {
            format = 'M';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].month || "";
                check = dp;

                assert.equal(parseInt(lib.format(d, format)), check, "errore con data "+d.toString());
            }
        });

        it('returns a full day of the week in letters if DDDD is requested', function () {
            names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            format = 'DDDD';
            for (i=0; i<dates.length; i++){
                d = dates[i];

                assert.oneOf(lib.format(d, format), names, "errore con data "+d.toString());
            }
        });

        it('returns a short day of the week in letters if DDD is requested', function () {
            names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            format = 'DDD';
            for (i=0; i<dates.length; i++){
                d = dates[i];

                assert.oneOf(lib.format(d, format), names, "errore con data "+d.toString());
            }
        });

        it('returns a two digit day if DD is requested', function () {
            format = 'DD';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].day || "";
                check = pad(dp,2).toString().slice(-2);

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns a one digit day if D is requested', function () {
            format = 'D';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].day || "";
                check = dp.toString();

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns a blank space if T is requested ', function () {
            format = 'T';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                check = " ";

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns the hours with two digit in 00-23 format if HH is requested', function () {
            format = 'HH';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].hour || 0;
                check = pad(dp,2).toString().slice(-2);

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns the hours in 0-23 format if H is requested', function () {
            format = 'H';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].hour || 0;
                check = dp.toString();

                assert.equal(lib.format(d, format), check, "errore con data"+d.toString());
            }
        });

        it('returns the hours in two digits and 00-12 am/pm if hh is requested', function () {
            format = 'hh';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].hour || 0;
                check = dp > 12 ? pad((dp % 12),2).toString()+"pm" : pad(dp,2).toString()+"am";

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns the hours in 0-12 a/pm format if h is requested', function () {
            format = 'h';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].hour || 0;
                check = dp > 12 ? (dp % 12).toString()+"pm" : dp.toString()+"am";

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('return two digits minutes if mm is requested', function () {
            format = 'mm';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].min || 0;
                check = pad(dp,2).toString();

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns the minutes if m is requested', function () {
            format = 'm';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].min || 0;
                check = dp.toString();

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns two digits seconds if ss is requested', function () {
            format = 'ss';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].sec || 0;
                check = pad(dp,2).toString();

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns the seconds if s is requested', function () {
            format = 's';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].sec || 0;
                check = dp.toString();

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

        it('returns the milliseconds if sss is requested', function () {
            format = 'sss';
            for (i=0; i<dates.length; i++){
                d = dates[i];
                dp = dateParams[i].ms || 0;
                check = dp.toString();

                assert.equal(lib.format(d, format), check, "errore con data "+d.toString());
            }
        });

    });
    describe('#parse', function () {
        it('returns an Array of Dates given an Array of Strings and the Format in which it is written', function () {
            assert.isArray(lib.parse(["21/8/28", "21/8/28"], ['YY/M/DD', 'YY/M/DD']))
        });

        it('sets an Array of Dates with a four digit year when YYYY is given', function () {
            assert.equal(lib.parse(["21/8/28", "21/8/28"], ['YYYY/M/DD', 'YYYY/M/DD'])[0].getFullYear().toString(), '21')
        });

        it('sets an Array of Dates with an year with the "20" prefix when YY is given', function () {
            assert.equal(lib.parse(["21/8/28", "21/8/28"], ['YY/M/DD', 'YY/M/DD'])[0].getFullYear().toString(), '2021')
            assert.isBelow(lib.parse(["21/8/28", "21/8/28"], ['YY/M/DD', "YY/M/DD"])[0].getFullYear(), 2100)
        });

        it('sets an Array of Dates with a month from their long names when MMMM is given', function () {
            assert.isBelow(lib.parse(["21/May/28", "21/May/28"], ['YY/MMMM/DD', 'YY/MMMM/DD'])[0].getMonth(), 13)
        });

        it('sets an Array of Dates with a month from their short names when MMM is given', function () {
            assert.isBelow(lib.parse(["21/Feb/28", "21/Feb/28"], ['YY/MMM/DD', "YY/MMM/DD"])[0].getMonth(), 13)
        });

        it('sets an Array of Dates with a month from two digits when MM is given', function () {
            assert.isBelow(lib.parse(["21/01/28"], ['YY/MM/DD'])[0].getMonth(), 13)
        });

        it('sets an Array of Dates with a month when M is given', function () {
            assert.isBelow(lib.parse(["21/11/28"], ['YY/M/DD'])[0].getMonth(), 13)
        });

        it('skips the command if DDDD is passed', function () {
            assert.isDefined(lib.parse(["Friday"], ['DDDD']))
        });

        it('skips the command if DDD is passed', function () {
            assert.isDefined(lib.parse(["Fri"], ['DDD']))
        });

        it('sets an Array of Dates with a day from two digits when DD is given', function () {
            assert.isBelow(lib.parse(["1/01/08"], ['YY/MM/DD'])[0].getDate(), 32)
        });

        it('sets an Array of Dates with a day when D is given', function () {
            assert.isBelow(lib.parse(["21/01/28"], ['YY/MM/D'])[0].getDate(), 32)
        });

        it('sets an Array of Dates with the hours from two digits when HH is given', function () {
            assert.isBelow(lib.parse(["21/8/28 01:44"], ['YY/M/DDTHH:mm'])[0].getHours(), 24)
        });

        it('sets an Array of Dates with the hours when H is given', function () {
            assert.isBelow(lib.parse(["21/8/28 13:44"], ['YY/M/DDTH:mm'])[0].getHours(), 24)
        });

        it('sets an Array of Dates with the hours from a 12 hours format in two digits when hh is given', function () {
            assert.isBelow(lib.parse(["21/8/28 12pm:44"], ['YY/M/DDThh:mm'])[0].getHours(), 24)
        });

        it('sets an Array of Dates with the hours from a 12 hours format when h is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44"], ['YY/M/DDThh:mm'])[0].getHours(), 24)
        });

        it('sets an Array of Dates with the minutes from two digits when mm is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:04"], ['YY/M/DDThh:mm'])[0].getMinutes(), 60)
        });

        it('sets an Array of Dates with the minutes when m is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44"], ['YY/M/DDThh:m'])[0].getMinutes(), 60)
        });

        it('sets an Array of Dates with the seconds from two digits when ss is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44:02"], ['YY/M/DDThh:m:ss'])[0].getMinutes(), 60)
        });

        it('sets an Array of Dates with the seconds when s is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44:12"], ['YY/M/DDThh:m:s'])[0].getMinutes(), 60)
        });

        it('sets an Array of Dates with the milliseconds when sss is given', function () {
            assert.isBelow(lib.parse(["21/8/28 1am:44:12:394"], ['YY/M/DDThh:m:s:sss'])[0].getMinutes(), 1000)
        });

    });

    describe('#config', function () {
        it('sets an Object with a Label for the language given', function () {
            assert.isUndefined(lib.config('language', {
                'it': {
                    short_months: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
                    long_months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
                    short_days: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
                    long_days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
                }
            }));
        });
        it('should get an error if an incomplete array of object is given', function () {
            assert.throws(() => lib.config('language', {'it': {}}), 'Variable Value does not contain all the required values.');
        });

    });
});