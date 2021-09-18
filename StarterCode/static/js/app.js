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
    var layout1 = {
        title: {
            text: 'Top 10 OTUs'
        },
        xaxis: {
            title: {text:'Value'}
        }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data1, layout1);

    let trace2 = {
        x:ex['otu_ids'],
        y:ex['sample_values'],
        mode:'markers',
        test:ex['otu_labels'],
        marker: {
            size:ex['sample_values'],
            color:ex['otu_ids']
        }
    };
    var layout2 = {
        title: {
            text: 'OTU Bubble Chart'
        },
        xaxis: {
            title: {text:'OTU Number'}
        },
        yaxis: {
            title: {text:'Value'}
        }
    };
    var data2 = [trace2];
    Plotly.newPlot("bubble",data2,layout2)

    // Demographics Info
    let meta = data['metadata'][0];
    let demographics = "";
    for (const [key, value] of Object.entries(meta)) {
        demographics += key+" : "+value+"<br>";
    }
    document.getElementById("sample-metadata").innerHTML = demographics

    // Gauge Plot
    let data3 = [{
        domain: {x:[0,1],y:[0,1]},
        value:data['metadata'][0].wfreq,
        title: {text:"Weekly Belly Button Wash Frequency"},
        type:"indicator",
        mode:"gauge+number",
        gauge: {
            axis: {range: [0,9],
                tickvals:[0,1,2,3,4,5,6,7,8,9]
            },
            steps: {range:[0,9]}
        }
    }]
    let layout3 = {
        width:600,
        height:450,
        margin: {t:0, b:0}
    };
    Plotly.newPlot("gauge",data3,layout3);


    for (var j = 0; j < subj.length; j++) {
        var dropdown = document.getElementById("selDataset");
        var opt = document.createElement("option"); 
        opt.text = subj[j].toString();
        opt.value = subj[j].toString();
        dropdown.options.add(opt);
    };

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

                // Bubble Chart
                let trace2 = {
                    x:data['samples'][f]['otu_ids'],
                    y:data['samples'][f]['sample_values'],
                    mode:'markers',
                    test:data['samples'][f]['otu_labels'],
                    marker: {
                        size:ex['sample_values'],
                        color:ex['otu_ids']
                    }
                };
                let layout2 = {
                    title: {
                        text: 'OTU Bubble Chart'
                    },
                    xaxis: {
                        title: {text:'OTU Number'}
                    },
                    yaxis: {
                        title: {text:'Value'}
                    }
                };
                var data2 = [trace2];
                Plotly.newPlot("bubble",data2,layout2)

                // Demographics Info
                let meta = data['metadata'][f];
                let demographics = "";
                for (const [key, value] of Object.entries(meta)) {
                    demographics += key+" : "+value+"<br>";
                }
                document.getElementById("sample-metadata").innerHTML = demographics

                    // Gauge Plot
                let data3 = [{
                    domain: {x:[0,1],y:[0,1]},
                    value:data['metadata'][f].wfreq,
                    title: {text:"Weekly Belly Button Wash Frequency"},
                    type:"indicator",
                    mode:"gauge+number",
                    gauge: {
                        axis: {range: [0,9],
                            tickvals:[0,1,2,3,4,5,6,7,8,9]
                        },
                        steps: {range:[0,9]}
                    }
                }]
                let layout3 = {
                    width:600,
                    height:450,
                    margin: {t:0, b:0}
                };
                Plotly.newPlot("gauge",data3,layout3);
                break
            };
        };
        console.log('ids: '+ids)

        // Bar Chart
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
        Plotly.newPlot("bar", data1, layout1);   
    };




});