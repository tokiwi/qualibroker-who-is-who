import readXlsxFile from 'read-excel-file'


export const useImport = () => {

    const xlsxToJson = async (file) => {

        let json = [];

        const rows = await readXlsxFile(file)

        const dataRows = rows.slice(1, rows.length)
        dataRows.map(rawUser => {
            let item = {}
            rows[0].forEach((r, i) => {
                item[r] = rawUser[i]
            })
            json.push(item)
        })

        return json;
    }

    return {xlsxToJson}
}
