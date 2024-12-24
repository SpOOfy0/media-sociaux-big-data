# Part 1 - Data scrapping, visualization and study.

In this part, we wanted to be able to scrap data from a public source (here YouTube) and be able to visualize and study this data.

## Architecture

Here is my solution design and architecture diagram:

![Architecture v.2](<images/Architecture v.2.png>)

### Caption

|Type|Color|Meaning|
|:-|:-|:-|
|Box|Teal|Programming language.|
|Box|Red|Web Server frameworks.|
|Box|Yellow|Packages.|
|Box|Blue|Third Party APIs.|
|Box|Black|No particular meaning.|
|Arrow|Black|HTTP request for static or view display.|
|Arrow|Green|HTTP request on REST APIs.|

## Comment

It is a second design, as the first one only had a TypeScript server, making it hard to deal with Machine Learning oriented functions.

What I wanted to achieve with this architecture, is a true RESTful solution, meaning that no data is stored whatsoever. The positive implication of this REST services is that I can easily parallelize processes. This can be seen for the video processing part, where all Machine Learning and Visualization requests are sent at the same time on the Python server that handles each requests in a separate thread.

The Python server serves images. For data transfer purpose, thoses images are converted to base64 data and then sent to the TypeScript server.

## Conclusion of this study

By running this project on your machine, you can see how each factor has an impact of the visibility of a YouTube video for a given request.

Many outliers are visible on common requests (i.e. `risotto`), but few (or none) can be seen for niche requests (i.e. `linear regression`).