getData();
async function getData() {
  const response = await fetch("ZonAnn.Ts+dSST.csv");
  //async/awaits have built in method to recieve and get raw text called .text()
  const data = await response.text();
  //   console.log(data);

  //there are many javascript libraries that can parse the data fr us and make the csv more useful(ex: D3-Data-Driven-Documents, P5*Js)
  //But for practice we will be parsing manually

  //this split will dplit by the rows, since each row is divided by a new line(linebreak = \n)
  //since we dont need the first row = [0], because its not actual numbers but just the title of each column we can splice it at index of 1 and keep everything that comes after index 0
  const table = data.split("\n").splice(1);
  table.forEach(row => {
    const columns = row.split(",");
    const year = columns[0];
    const temp = columns[1];
    console.log(year, temp);
  });
  //   console.log(rows);
}
