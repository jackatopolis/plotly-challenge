const url = "samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it

d3.json(url).then(function(data) {
    console.log(data)

    let subj = data['names']
    console.log(subj)

    let ex = data['samples'][0]
    console.log(ex);

    const ids = [];
    let vals = [];
    let labels = [];

    for (let i = 0; i < 11; i++) {
        ids.push("OTU"+ex['otu_ids'][i]);
        vals.push(ex['sample_values'][i]);
        labels.push(ex['otu_labels'][i]);
    };
  
    var trace1 = {
        y: ids,
        x: vals,
        text: labels,
        type: "bar",
        orientation: "h"
    };

    var data1 = [trace1];
    var title = "Top 10 OTUs";

    // Apply a title to the layout
    var layout = {
        title: title
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data1, layout);
  
    var options = '';
    
    for (var j = 0; j < subj.length; j++) {
       options += ('<option value="' + subj[j]+ '">' + subj[j] + '</option>');
    };
    console.log(options);

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");

        console.log("dataset: "+dataset)
        
        const ids = [];
        let vals = [];
        let labels = [];

        for (let f=0; f < data['samples'].length; f++) {
            if (data['samples'][f]['id'] == dataset) {
                if (data['samples'][f]['otu_ids'].length < 10) {
                    for (let i = 0; i < data['samples'][f]['otu_ids'].length; i++) {
                        ids.push("OTU"+data['samples'][f]['otu_ids'][i]);
                        vals.push(data['samples'][f]['sample_values'][i]);
                        labels.push(data['samples'][f]['otu_labels'][i]);
                        };
                }
                else {
                    for (let i = 0; i < 11; i++) {
                        ids.push("OTU"+data['samples'][f]['otu_ids'][i]);
                        vals.push(data['samples'][f]['sample_values'][i]);
                        labels.push(data['samples'][f]['otu_labels'][i]);
                    };
                };
                break
            };
        };
        console.log('ids: '+ids)

        var trace1 = {
            y: ids,
            x: vals,
            text: labels,
            type: "bar",
            orientation: "h"
        };
        var data1 = [trace1];
        var title = `Top 10 OTUs`;
        var layout1 = {
            title: {
                text: 'Top 10 OTUs'
            },
            xaxis: {
                title: {text:'Frequency'}
            }
        };
        Plotly.Plot("bar", data1, layout1);   
    };
});