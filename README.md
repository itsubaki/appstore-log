# appstore-log

 - AppStore Review Viewer Server with GAE

## Required

 - go 1.8

# How to Build

## Install

```console
$ go get github.com/itsubaki/appstore-api
$ git clone https://github.com/itsubaki/appstore-log.git
```

## Setting

```javascript
// asset/js/variable.js
var base_url = "https://${PRODJECT_ID}.appspot.com"
```

## Make GAE Application

See [appstore-api](https://github.com/itsubaki/appstore-api)

## Sample

 - color: green(Rating:5), blue(4), black(3), orange(2), red(1)
 - radius: review comment length
 - x axis: time series(new - old)

![](./sample.png)
