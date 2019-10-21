createChart();

async function getData() {
  const yearData = [];
  const tempData = [];
  const northHem = [];
  const southHem = [];

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

    yearData.push(year);
    const temp = columns[1];
    tempData.push(parseFloat(temp) + 14);
    const nh = columns[2];
    northHem.push(parseFloat(nh) + 14);
    const sh = columns[3];
    southHem.push(parseFloat(sh) + 14);
    console.log(year, temp);
  });
  //   console.log(rows);
  // By returning our data as objects we will be able to access that object when calling it in the createChart() method
  return { yearData, tempData, northHem, southHem };
}

//=============CODE FOR CHART/TABLE================//

async function createChart() {
  //by making createChart() an async function and calling getData() as an await function, the createChart function will wait until the data is recieved before loading the chart
  const data = await getData(); //by assigning the getData() method to a variable we are then able to get those data which we returned as an object
  const ctx = document.getElementById("myChart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.yearData, //this is how we call the objects from what we returned earlier
      datasets: [
        {
          label:
            "Combined Land-Sruface Air and Sea-Surface Water temperature(C°)",
          data: data.tempData,
          backgroundColor: "rgba(25, 199, 232, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: false
        },
        {
          label:
            "Combined Land-Sruface Air and Sea-Surface Water NORTHERN HEMISPHERE Temperature(C°)",
          data: data.northHem,
          backgroundColor: "rgba(252, 202, 3, 0.2)",
          borderColor: "rgba(55, 939, 132, 1)",
          borderWidth: 1,
          fill: false
        },
        {
          label:
            "Combined Land-Sruface Air and Sea-Surface Water SOUTHERN HEMISPHERE Temperature(C°)",
          data: data.southHem,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(252, 202, 3, 1)",
          borderWidth: 1,
          fill: false
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return value + " C°";
              }
            }
          }
        ]
      }
    }
  });
}
