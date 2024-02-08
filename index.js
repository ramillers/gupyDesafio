const {google} = require('googleapis');
const { sheets } = require('googleapis/build/src/apis/sheets');

//const app = express();

//autentication pra acessar API
async function getAuthSheets(){
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    const client = await auth.getClient();

    //conexão com google sheets
    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    })

    const spreadsheetId = "1JtJ82jOFbg7v9Tj1gxutoJPHy4b6YWBOrNjvfQxYcjM";

    return{
        auth, 
        client,
        googleSheets,
        spreadsheetId
    }
}

async function getSpreadsheetData() {

    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
    //console.log(googleSheets.spreadsheets); 
    //console.log(auth);

    const { data } = await googleSheets.spreadsheets.values.get({
        spreadsheetId,
        range: "A4:F",
    });

    const rows = data.values; 

    if (rows.length) {
        const newData = rows.map(row => {
            const p1 = parseFloat(row[3]);
            const p2 = parseFloat(row[4]);
            const p3 = parseFloat(row[5]); 

            const media = (p1 + p2 + p3) / 3; 

            let situacao;
            if ( media < 50) {
                situacao = "Reprovado por Nota!";
            } else  if ( media >=50 && media<70) {
                situacao = "Exame final!";
            } else {
                situacao = "Aprovado!"; 
            }

            return [situacao, media]

        })

        console.log(data.values);
        console.log(newData);

        await googleSheets.spreadsheets.values.update({
            spreadsheetId,
            range: "G4:H",
            valueInputOption: 'RAW',
            requestBody: { values: newData }
        })
    }

};



getSpreadsheetData();

