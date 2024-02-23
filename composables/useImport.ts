import { json2csv} from "json-2-csv";
import { csv2json } from "csv-2-json";

export const useImport = () => {
  const importFile = (file) => {
    // parse the file
    console.log('file', file)

    // read the file
    let reader = new FileReader()
    reader.onload = function (e) {
      let data = e.target.result
      console.log('data', data)

      csv2json(data).then(json => {
        console.log('json', json)
      })
    }
  }

  const exampleFile = () => {
    let data = [
      { name: 'John Cena', title: 'Catcheur', email: 'john.cena@wwe.com', phone: '1234567890', availability: ["Monday", "Thuesday"], schedule_start: "21:30:00", schedule_end: "23:00:00", competences: ["Wrestling", "Acting"] },
    ]

    return json2csv(data)
  }

  return {
    importFile,
    exampleFile
  }
}
