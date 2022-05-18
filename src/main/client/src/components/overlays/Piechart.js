import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";

const Piechart = ({data}) => {
    const getTreeType = (result) => {
        switch (result) {
            case "wa_red_alder_stand_density":
                return "Red Alder";
            case "wa_douglas_fir_stand_density":
                return "Douglas Fir";
            case "wa_western_hemlock_stand_density":
                return "Western Hemlock";
            case "wa_pacific_yew_basal_area":
                return "Pacific Yew";
            case "wa_bigleaf_maple_stand_density":
                return "Bigleaf Maple";
            case "wa_ponderosa_pine_stand_density":
                return "Ponderosa Pine";
            case "wa_sitka_spruce_stand_density":
                return "Sitka Spruce";
            case "wa_western_redcedar_stand_density":
                return "Western Red Cedar";
            default:
                return "Unknown";
        }
    };

    const getData = (list) => {
        let names = [];
        let densities = [];
		console.log(list);
		// debugger;
		for (const [key, value] of Object.entries(list[0])) {
			names.push(getTreeType(key));
			densities.push(value);
		}
        // list[0].forEach((element) => {
        //     names.push(getTreeType(element));
        //     densities.push(list[element]);
        // });
        return { names, densities };
    };

    const getColors = (list) => {
        // ["blue", "green", "red", "orange", "darkblue", "fuschia", "lightblue", "yellow"]
        // 8 colors for the 8 possible treetypes, probably will never encounter a query like that though
        let colors = [
            "#3b37bd",
            "#298758",
            "red",
            "orange",
            "#37187e",
            "#c31c76",
            "#8b8dc7",
            "#eddd35",
        ];
        return colors.slice(0, Object.entries(list[0]).length + 1);
    };

    const treeData = getData(data);

    const labels = treeData.names,
        densities = treeData.densities;

    const colors = getColors(data);

    const pieData = {
        // labels: ["Sitka Spruce", "Pine", "Fir", "Maple", "Cedar"],
        labels: labels,
        datasets: [
            {
                label: "Tree Species Data",
                // data: [20, 25, 30, 40, 50],
                data: densities,
                backgroundColor: colors,
                // [
                //     "red",
                //     "orange",
                //     "#ffffff",
                //     "#127f2c",
                //     "blue",
                // ],
            },
        ],
    };

    const config = {
        type: "pie",
        data: pieData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Tree Species",
                    color: "white",
                    align: "center",
                },
            },
        },
    };

    return (
        <>
            <Pie data={pieData} config={config} />
        </>
    );
};

export default Piechart;
