module.exports = {
    DATA_ONLY : /^[1-9]\d{3}-\d{2}-\d{2}$/,
    TIME_ONLY : /^\d{2}:\d{2}:\d{2}$/,
    DATE_TIME_ONLY : /^[1-9]\d{3}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
    DATE_TIME : /^[1-9]\d{3}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
    DATE_TIME_RFC : /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), ([0-3][0-9]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ([0-9]{4}) ([01][0-9]|2[0-3])(:[0-5][0-9]){2} GMT$/,
}