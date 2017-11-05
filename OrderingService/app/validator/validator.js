module.exports = {
    ConvertStringToDate : function(date){
        if (!date)
            return null;
        const dateParts = date.split('.');
        if (!dateParts || dateParts.length != 3)
            return null;
        const year  = parseInt(dateParts[2]);
        const month = parseInt(dateParts[1]);
        const day   = parseInt(dateParts[0]);
        return new Date(year, month - 1, day);
    }   
}