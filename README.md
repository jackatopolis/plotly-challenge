# plotly-challenge
### By: Jack Cohen

## Background
The goal of this project is to build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Dashboard Information
The dashboard and plots are setup in the following manner:

1. Horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
	* Used `sample_values` as the values for the bar chart.
	* Used `otu_ids` as the labels for the bar chart.
	* Used `otu_labels` as the hovertext for the chart.

2. Bubble chart that displays each sample for the individual.
	* Used `otu_ids` for the x values.
	* Used `sample_values` for the y values.
	* Used `sample_values` for the marker size.
	* Used `otu_ids` for the marker colors.
	* Used `otu_labels` for the text values.

3. Gauge chart that displays the individual's weekly belly button wash frequency

4. Display of sample metadata, i.e., an individual's demographic information.

5. All plots are updated any time that a new sample is selected.


## Deployment
App deployed to GitHub Pages, a free static page hosting service. The dashboard can be found [here](https://jackatopolis.github.io/plotly-challenge/StarterCode/).
