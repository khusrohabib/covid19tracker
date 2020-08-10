import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  chart: {},
});

const data = {
  labels: [],
  datasets: [
    {
      label: "New Cases Today",
      backgroundColor: "gray",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [],
    },
  ],
};

export default function BarChart() {
  const classes = useStyles();
  const [graphData, setGraphData] = useState(data);
  const [draw, setDraw] = useState(false);
  var dictionary = {};

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://api.thevirustracker.com/free-api?countryTotals=ALL"
      );
      let apiData = await response.json();

      Object.keys(apiData.countryitems[0]).forEach(function (key) {
        dictionary[apiData.countryitems[0][key]["title"]] =
          apiData.countryitems[0][key]["total_new_cases_today"];
        //data.labels.push(apiData.countryitems[0][key]["title"]);
        //data.datasets[0].data.push(apiData.countryitems[0][key]["total_new_cases_today"]);
      });

      // Create items array
      var items = Object.keys(dictionary).map(function (key) {
        return [key, dictionary[key]];
      });

      // Sort the array based on the second element
      items.sort(function (first, second) {
        return second[1] - first[1];
      });
      data.labels = [];    
      data.datasets[0].data = [];  
      items.slice(0, 20).forEach(element => {
          console.log(element);
        data.labels.push(element[0]);
        data.datasets[0].data.push(element[1]);          
      });
      setGraphData(data);
      setDraw(true);
    }
    getData();
  }, [])

  return (
    <div className={classes.chart}>
      <h2>Top 20 Countries</h2>
      <Bar
        redraw={draw}
        data={graphData}
        width={100}
        height={200}
        options={{
          maintainAspectRatio: false,
        }}
        
      />
    </div>
  );
}
