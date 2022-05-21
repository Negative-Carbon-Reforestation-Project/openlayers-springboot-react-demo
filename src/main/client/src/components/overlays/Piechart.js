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

	// TODO
	// Add error handling and a display message for non-reforestable area when the list is emtpy

	// getData returns an object with two arrays, names and densities
	// which are parsed from the response json
    const getData = (list) => {
        let names = [];
        let densities = [];
		// console.log(list);
		for (const [key, value] of Object.entries(list[0])) {
			names.push(getTreeType(key));
			densities.push(value);
		}
        return { names, densities };
    };

	// getColors stores the color information for each tree type
	// and returns an array of colors matching the response json
    const getColors = (list) => {
        // Each tree type gets its own color!
        let colors = new Map([
            ["Red Alder", "#cc5e5d"], // --color-red
            ["Douglas Fir", "#127f2c"], // --color-dark-green
            ["Western Hemlock", "#4567a3"], // --color-dark-blue
            ["Pacific Yew", "#b83130"], // --color-dark-red
            ["Bigleaf Maple", "#5d97cc"], // --color-blue
            ["Ponderosa Pine", "#93b4d2"], // --color-light-blue
            ["Sitka Spruce", "#5fba77"], // --color-light-green
            ["Western Red Cedar", "#ecb65a"], // -- color--yelow
        ]);
		
		let colorArray = []
		
		// Iterate through the list of trees and return a list of each
		// tree type's color
		list.forEach(element => {
			colorArray.push(colors.get(element));
		});

		return colorArray;
    };

    const treeData = getData(data);

    const labels = treeData.names,
        densities = treeData.densities;

    const colors = getColors(labels);

    const pieData = {
        labels: labels,
        datasets: [
            {
                label: "Tree Species Data",
                data: densities,
                backgroundColor: colors,
            },
        ],
    };

	const options = {
		responsive: true,
		plugins: {
			legends: {
				position: "top",
				color: "#ffffff",
			},
		}
	};

    return (
        <>
            <Pie data={pieData} options={options} redraw={true} />
        </>
    );
};

export default Piechart;
