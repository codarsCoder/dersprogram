import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const veri = {
    "Pazartesi": [
        {
            "select": "Fen",
            "input": "45",
            "input2": "45"
        },
        {
            "select": "Türkçe",
            "input": "45",
            "input2": "45"
        },
        {
            "select": "Sosyal",
            "input": "45",
            "input2": "45"
        }
    ],
    "Salı": [
        {
            "select": "Matematik",
            "input": "45",
            "input2": "45"
        }
    ],
    "Çarşamba": [
        {
            "select": "İngilizce",
            "input": "45",
            "input2": "45"
        }
    ],
    "Perşembe": [
        {
            "select": "İngilizce",
            "input": "45",
            "input2": "45"
        }
    ],
    "Cuma": [
        {
            "select": "Türkçe",
            "input": "45",
            "input2": "45"
        },
        {
            "select": "Matematik",
            "input": "45",
            "input2": "45"
        }
    ],
    "Cumartesi": [
        {
            "select": "Fen",
            "input": "45",
            "input2": "50"
        }
    ],
    "Pazar": []
};

function DersProgrami() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Gün</TableCell>
            <TableCell>Ders</TableCell>
            <TableCell>Süre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(veri).map((gun) => (
            <TableRow key={gun}>
              <TableCell>{gun}</TableCell>
              <TableCell>
                {veri[gun].map((ders, index) => (
                  <div key={index}>{ders.select}</div>
                ))}
              </TableCell>
              <TableCell>
                {veri[gun].map((ders, index) => (
                  <div key={index}>{ders.input} - {ders.input2}</div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DersProgrami;
