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
        range: "A2:F",
    });

    const values = data.values; 
    console.log(values);
    const rows = values.slice(2); 
    const classHours = parseInt(values[0][0].split(":")[1]); 

    //console.log(classHours);

    if (rows.length) {

        const newData = rows.map(row => {
            const studentAbsence = parseFloat(row[2]);
            const p1 = parseFloat(row[3]);
            const p2 = parseFloat(row[4]);
            const p3 = parseFloat(row[5]); 
        
            console.log("Dados do aluno:", { studentAbsence, p1, p2, p3 });
        
            const media = (p1 + p2 + p3) / 3;
            const absentPercentage = (studentAbsence / classHours) * 100;
        
            console.log("Média:", media);
            console.log("Percentual de Faltas:", absentPercentage);
        
            let naf = 0; // Inicialize o naf como 0
        
            let situation;
            if (absentPercentage > 25) {
                situation = "Reprovado por Falta!";
            } else if (media < 50) {
                situation = "Reprovado por Nota!";
            } else if (media >= 50 && media < 70) {
                situation = "Exame final!";
                // Calcular naf apenas para a situação de "Exame final!"
                naf = Math.ceil(100 - media); // Calcula o naf e arredonda para cima
            } else {
                situation = "Aprovado!"; 
            }
        
            console.log("Situação:", situation);
            console.log("NAF:", naf);
        
            return [situation, naf];
        });

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

