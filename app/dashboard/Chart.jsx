"use client";
import { CChart } from "@coreui/react-chartjs";
import React, { useEffect, useState } from "react";
import fetchPred from "./fetchPred";

const Chart = () => {
  const [label, setlabel] = useState([]);
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function getData() {
      let data = await fetchPred();
      data["results"].map((item) => {
        setlabel((label) => [...label, item["date"]]);
        setdata((data) => [...data, item["price"]]);
      });
    }
    getData();
  }, []);
  return (
    <div>
      {label.length > 0 && (
        <CChart
          type="line"
          data={{
            labels: label,
            datasets: [
              {
                label: "Predicted Price",
                backgroundColor: "rgba(220, 220, 220, 0.2)",
                borderColor: "rgba(220, 220, 220, 1)",
                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                pointBorderColor: "#fff",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default Chart;
