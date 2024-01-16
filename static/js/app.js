// step one: Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
// Define a function that will create metadata for given sample
function buildMetadata(selection) {

    // Read the json data
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((sampleData) => {
  
        console.log(sampleData);
  
        // Parse and filter the data to get the sample's metadata
        let parsedData = sampleData.metadata;
        console.log("parsed data inside buildMetadata")
        console.log(parsedData);
  
        let sample = parsedData.filter(item => item.id == selection);
        console.log("showing sample[0]:");
        console.log(sample[0]);
  
        // Specify the location of the metadata and update it
        let metadata = d3.select("#sample-metadata").html("");
  
        Object.entries(sample[0]).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });
  
        console.log("next again");
        console.log(metadata);
    });
  }

// step two: Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.  
// Define a function that will create charts for given sample
function buildCharts(selection) {

    // Read the json data
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((sampleData) => {
  
        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart
        let parsedData = sampleData.samples;
        console.log("parsed data inside buildCharts")
        console.log(parsedData);
  
        let sample = parsedData.filter(item => item.id == selection)[0];
        console.log("sample")
        console.log(sample);
  
  
        let sampleValues = sample.sample_values; 
        let barChartValues = sampleValues.slice(0, 10).reverse();
        console.log("sample_values")
        console.log(barChartValues);
  
        let idValues = sample.otu_ids;
        let barChartLabels = idValues.slice(0, 10).reverse();
        console.log("otu_ids");
        console.log(barChartLabels);
  
        let reformattedLabels = [];
        barChartLabels.forEach((label) => {
            reformattedLabels.push("OTU " + label);
        });
  
        console.log("reformatted");
        console.log(reformattedLabels);
  
        let hovertext = sample.otu_labels;
        let barCharthovertext = hovertext.slice(0, 10).reverse();
        console.log("otu_labels");
        console.log(barCharthovertext);
  
        // Create bar chart in correct location
  
        let barChartTrace = {
            type: "bar",
            y: reformattedLabels,
            x: barChartValues,
            text: barCharthovertext,
            orientation: 'h'
        };
  
        let barChartData = [barChartTrace];
  
        Plotly.newPlot("bar", barChartData);

// step three:  Create a bubble chart that displays each sample
        // Create bubble chart in correct location

        let bubbleChartTrace = {
            x: idValues,
            y: sampleValues,
            text: hovertext,
            mode: "markers",
            marker: {
                color: idValues,
                size: sampleValues,
                colorscale: 'Viridis'

            }
       };

        let bubbleChartData = [bubbleChartTrace];

        let layout = {
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.newPlot("bubble", bubbleChartData, layout);
  });
}

// step four: Display the sample metadata, i.e., an individual's demographic information.
// Define function that will run on page load
function init() {

    // Read json data
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((sampleData) => {
  
        // Parse and filter data to get sample names
        let parsedData = sampleData.names;
        console.log("parsed data inside init")
        console.log(parsedData);
  
        // Add dropdown option for each sample
        let dropdownMenu = d3.select("#selDataset");
  
        parsedData.forEach((name) => {
            dropdownMenu.append("option").property("value", name).text(name);
        })
  
        // Use first sample to build metadata and initial plots
        buildMetadata(parsedData[0]);
  
        buildCharts(parsedData[0]);
  
    });
  }

// step five: Display each key-value pair from the metadata JSON object somewhere on the page.
function optionChanged(newSelection) {

    // Update metadata with newly selected sample
    buildMetadata(newSelection); 
    // Update charts with newly selected sample
    buildCharts(newSelection);
    // Call updateGaugeChart with the selected sample ID
    updateGaugeChart(newSelection);
  }

// step six: Update all the plots when a new sample is selected.
// Initialize dashboard on page load
init();