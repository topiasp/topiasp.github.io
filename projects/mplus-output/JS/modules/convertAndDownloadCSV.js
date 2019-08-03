

const convertAndDownloadCSV = {}


convertAndDownloadCSV.convertArrayOfCellsToCSV = (args) => {

    let headers,data,delimiter

    headers = args.headers
    data    = args.data
    delimiter = args.delimiter || ';'

    let result = ''

    result += headers.join(delimiter) + '\n'


    result += data.map((d) => cellToArray(d).join(delimiter)).join('\n')
    return result
}

convertAndDownloadCSV.downloadCSV = (args) => {


    var data, filename, link;
    var csv = convertAndDownloadCSV.convertArrayOfCellsToCSV(args);
    if (csv == null) return;


    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}


