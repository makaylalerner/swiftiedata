# Data Analysis of Taylor Swift's Eras

## Overview
The proposed visualization project will provide an interactive experience following the career of Taylor Swift. Taylor Swift is one of the most famous pop stars today and is known for experimenting with new music styles, this project will follow her through her career on a timeline,showing key statistics from Spotify. The user will be able to follow her story and compare metrics of her albums, including average duration, number of listeners, popularity, danceability, etc. I intend to have each era display averages for the music she released during that time as well as
include views for her top 3 hits in that era. Additionally, there will be a summary view that looks at her all time averages. I want it to be a fun experience not only for myself but other fans to see where their favorite songs/eras square up. I intend to display this data in a timeline format (innovative) and incorporate reusable components for barcharts and scatter plots to compare eras to one another. 

## Description of the Data
I am using a kaggle dataset that was sourced from the Spotify API. The link for the dataset is https://www.kaggle.com/datasets/jarredpriester/taylor-swift-spotify-dataset. The dataset has the following columns: name, album, release_date, track number, id, uri, acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence, popularity, and duration_ms (duration in milliseconds). Many of the columns are categorical, using an ordinal scale from 0.0 to 1.0 to describe characteristics. 

## Data Cleaning and Transformations 
Data was cleaned using Python. 24 Albums were dropped from the set to reduce duplicates and to cut out albums associated with Taylor Swift but not her actual music, such as karaoke versions and radio specials. Full list of dropped albums can be seen in the ts-metadata gsheet or ts_data_exp_clean.ipynb. For albums with multiple versions, like deluxe or platinum editions, a new column 'era' was added to classify rows by the era they will appear as on the timeline. All song titles were normalized, cutting off labels such as "Acoustic Version" or "(ft. Lana Del Ray)" etc annd removing capital letters, then grouped by the normalized song name and their eras. Numerical values were then averaged based on this grouping. 

## Usage scenarios and tasks
While this project is primarily for fun, it will provide detailed information about Taylor Swift's music throughout her career. It can be used to find out what the top song of each of her era's was, as well as the top song of her career. It will also provide analysis comparing her albums and see how these metrics have changed since her debut in 2006. 

## Timeline (Innovative View) 
The first data view will be a timeline starting at Taylor's debut album, Taylor Swift, in 2006 and to the present, her most recent released album, Midnights in 2022, and the albums she has been reproducing as "Taylor's Version": Fearless and Red, also in 2022 and still going. Years should be labeled, using the release date of each album as the stopping point. Above each year, album images will be used to label, with hover links having the album title. The order is as follows: 

* 2006 - Debut/Self-Titled Album 
* 2008 - Fearless 
* 2010 - Speak Now
* 2012 - RED 
* 2014 - 1989 
* 2017 - Reputation 
* 2019 - Lover 
* 2020 - Folklore and Evermore 
* 2021 - Taylor's Version (Ongoing) 
* 2022 - Midnights 

## Second View: Album/Era Profile 
Upon clicking sn album cover on the timrlinr, the next view appears, to look at stats on the album/era level. Displays the top three hits from that album, by popularity index in a bar chart, ordered decreasingly. Then, it pulls a filtered view of the bubble chart, showing average metrics for that era. A picture of Taylor performing will be displayed here, possibly with a good quote on the top before the data. Allows for going forward and backward in the stack.

## Third View: Overview of Her Career 
After clicking through the albums/eras, an overview will be presented, showing the top songs overall and overall statistics or possibly have a button on the profiles view to see full view, were we'll look at her top 3 songs overall and the bubble chart showing the average metrics by era in color, all of them this time, only filtered on the album/era profile. 

## D3 Elements to use
* Timneline: 
* Bar Chart: https://observablehq.com/@d3/horizontal-bar-chart
*   - horizontal, shows top 3 hits based on popularity by album and in the overview 
* Bubble Chart: https://observablehq.com/@d3/bubble-chart
*   - uses color and area to show which features are the most prominent, using color to decode eras, color chart: 
*   Debut: #97e9c1
*   Lover: #8a5066
*   SpeakNow: #813c60
*   Fearless: #d9c78f
*   Evermore: #7e5c43
*   Folklore: #bababa
*   Reputation: #ffffff
*   RED: #a02b48
*   1989: #d6e9ff
*   TV: #907763
*   Midnights: #87a6bb

