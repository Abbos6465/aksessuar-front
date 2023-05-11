import XLSX from 'xlsx'

export function toXlsx(data, filename, headers, options, title) {
    let createXLSLFormatObj = setDataWithHeaders(data, headers, title)
    var ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj)
    if (options) {
        ws = Object.assign(ws, options)
    }
    if (!ws['!cols']) {
        ws = autoWidth(ws, createXLSLFormatObj)
    }
    var wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'sheetname')

    XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'base64', FS: 't' })
    filename = filename + '(' + today() + ')'
    XLSX.writeFile(wb, filename + '.xlsx')
}

function setDataWithHeaders(data, headers, title){
    let createXLSLFormatObj = []
    if (title) {
        createXLSLFormatObj.push([title])
    }
    let newXlsHeader = []
    headers.forEach(header => {
        newXlsHeader.push(header.label)
    })
    createXLSLFormatObj.push(newXlsHeader)
    Object.keys(data).forEach(key => {
        let value = data[key]
        let innerRowData = []
        headers.forEach(header => {
            if (header.dataFormat && typeof header.dataFormat === 'function') {
                innerRowData.push(header.dataFormat(value[header.field]))
            } else {
                innerRowData.push(value[header.field])
            }
        })
        createXLSLFormatObj.push(innerRowData)
    })
    return createXLSLFormatObj
}

function today() {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
    var yyyy = today.getFullYear()
    return dd + '.' + mm + '.' + yyyy
}

function autoWidth(ws, data) {
    const colWidth = data.map(row => row.map(val => {
        if (val == null) {
            return {
                'wch': 10
            }
        } else if (val.toString().charCodeAt(0) > 255) {
            return {
                'wch': val.toString().length * 2
            }
        } else {
            return {
                'wch': val.toString().length
            }
        }
    }))
    let result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
        for (let j = 0; j < colWidth[i].length; j++) {
            if (result[j]['wch'] < colWidth[i][j]['wch']) {
                result[j]['wch'] = colWidth[i][j]['wch']
            }
        }
    }
    ws['!cols'] = result
    return ws
}
