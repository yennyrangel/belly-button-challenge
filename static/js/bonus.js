function updateGaugeChart(selectedSampleId) {
    // Read the json data to get washing frequency
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((sampleData) => {
        // Get the first washing frequency value from the data
        let washingFrequency = sampleData.metadata[0].wfreq || 0; // Default to 0 if 'wfreq' is not available

        // If a sample is selected, find the washing frequency for that sample
        if (selectedSampleId) {
            let selectedMetadata = sampleData.metadata.find(item => item.id == selectedSampleId);
            if (selectedMetadata && selectedMetadata.wfreq !== undefined) {
                washingFrequency = selectedMetadata.wfreq;
            }
        }

        // Use console.log to check the data
        console.log("Weekly Washing Frequency:", washingFrequency);

        // Create the gauge chart
        let gaugeData = [
            {
                type: "indicator",
                mode: "gauge+number",
                value: washingFrequency,
                title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: { size: 24 } },
                gauge: {
                    axis: {
                        range: [0, 9],
                        tickmode: 'array',
                        tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                        ticktext: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                        tickwidth: 1,
                        tickcolor: "dark"
                    },
                    bar: { color: "transparent" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "transparent",
                    steps: [
                        { range: [0, 1], color: "#440154" },
                        { range: [1, 2], color: "#482878" },
                        { range: [2, 3], color: "#3E4989" },
                        { range: [3, 4], color: "#26828E" },
                        { range: [4, 5], color: "#1F9E89" },
                        { range: [5, 6], color: "#35B779" },
                        { range: [6, 7], color: "#6ECC49" },
                        { range: [7, 8], color: "#B5DE2B" },
                        { range: [8, 9], color: "#FDE725" }
                    ],
                    threshold: {
                        line: { color: "red", width: 4, },
                        thickness: 0.75,
                        value: washingFrequency
                    
                    }, 
                }
            }
        ];

        let gaugeLayout = { width: 480, height: 450, margin: { t: 0, b: 0 } };

        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    }).catch(error => {
        console.error("Error loading JSON data:", error);
    });
}

// Call the function to initially create the gauge chart with the first value
updateGaugeChart();