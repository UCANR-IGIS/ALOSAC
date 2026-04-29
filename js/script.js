$(document).ready(function () {

    $('#reportBtn').click(function () {
        aoiCounter = 1
        aoiBool = "&aoi="
        sliderBool = "?sld=" + sliderVal + "." + +sliderVal2 + "." + sliderVal3 + "." + sliderVal4 + "." + sliderVal5 + "." + sliderVal6 + "." + sliderVal7 + "." + sliderVal8 + "." + sliderVal9 + "." + sliderVal10 + "." + sliderVal11 + "." + sliderVal12 + "." + sliderVal13 + "." + sliderVal14 + "." + sliderVal15 + "." + sliderVal + "." + sliderValHB + "." + sliderValCN + "." + sliderValRN + "." + sliderValSV

        acreBool = "&acre=" + $("#minSize").val() + "." + $("#maxSize").val()

        topNBool = "&top=" + $("#topN").val()

        studyBool = "&stdy=" + $('input[name="sa"]:checked').attr('id')

        $('input[name="fm"]').each(function () {
            if (aoiCounter == 1) {
                if ($(this).is(":checked")) {
                    aoiBool += $(this).attr('id');
                    aoiCounter += 1;
                }
            } else {
                if ($(this).is(":checked")) {
                    aoiBool += "." + $(this).attr('id');
                }
            }
        })

        urlParams = sliderBool + acreBool + topNBool + studyBool + aoiBool

        url = "./report.html" + urlParams
        var win = window.open(url, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
    })
});

$("#scenDiv").hide();
var sliderVal = 1,
    sliderVal2 = 1,
    sliderVal3 = 1,
    sliderVal4 = 1,
    sliderVal5 = 1,
    sliderVal6 = 1,
    sliderVal7 = 1,
    sliderVal8 = 1,
    sliderVal9 = 1,
    sliderVal10 = 1,
    sliderVal11 = 1,
    sliderVal12 = 1,
    sliderVal13 = 1,
    sliderVal14 = 1,
    sliderVal15 = 0,
    sliderValHB = 1,
    sliderValCN = 1,
    sliderValRN = 1,
    sliderValSV = 1,
    sliderTotal = 14,
    winnerArcade, strengthArcade, renderer, renderer2, sizeText = "acres < 1, 0, acres > 2000, 0, ",
    parcelArr = [],
    parcelAOI,
    parcelSQL, parcelMax, parcelMin, parcelDE = "", studyDE = "",
    deleteVal, topTen = [],
    queryString, topTenQuery, features, rankLayer, rankCount = 0,
    parcelQuery, parcelAcre, parcelRank, featureArr2, rankTotal, ckb = $("#top1").is(':checked'),
    map, view
let db;
require([
    "esri/Map"
    , "esri/Graphic"
    , "esri/views/MapView"
    , "esri/WebMap"
    , "esri/layers/FeatureLayer"
    , "esri/layers/GraphicsLayer"
    , "esri/layers/VectorTileLayer"
    , "esri/layers/TileLayer"
    , "esri/tasks/QueryTask"
    , "esri/tasks/support/Query"
    , "esri/tasks/IdentifyTask"
    , "esri/tasks/support/IdentifyParameters"
    , "esri/widgets/Legend"
    , "esri/widgets/Search"
    , "esri/widgets/LayerList"
    , "esri/core/Error"
    , "esri/smartMapping/renderers/color"
    , "dojo/domReady!"
], function (Map, Graphic, MapView, WebMap, FeatureLayer, GraphicsLayer, VectorTileLayer, TileLayer, QueryTask, Query, IdentifyTask, IdentifyParameters, Legend, Search, LayerList, Error, colorRendererCreator) {

    var identifyTask = new IdentifyTask(),
        params = new IdentifyParameters()
    let request = window.indexedDB.open('saveState', 1);
    request.onerror = function () {
        console.log('Database failed to open');
    };
    // onsuccess handler signifies that the database opened successfully
    request.onsuccess = function () {
        console.log('Database opened successfully');
        // Store the opened database object in the db variable. This is used a lot below
        db = request.result;
    };
    // Setup the database tables if this has not already been done
    request.onupgradeneeded = function (e) {
        // Grab a reference to the opened database
        let db = e.target.result;
        // Create an objectStore to store our notes in (basically like a single table)
        // including a auto-incrementing key
        let objectStore = db.createObjectStore('default', {
            keyPath: 'id',
            autoIncrement: true
        });
        // Define what data items the objectStore will contain
        //objectStore.createIndex('variable', 'variable', { unique: false });
        //objectStore.createIndex('value', 'value', { unique: false });
        objectStore.createIndex('scenario', 'scenario', {
            unique: false
        });
        objectStore.createIndex('sliderVal', 'sliderVal', {
            unique: false
        });
        objectStore.createIndex('sliderVal2', 'sliderVal2', {
            unique: false
        });
        objectStore.createIndex('sliderVal3', 'sliderVal3', {
            unique: false
        });
        objectStore.createIndex('sliderVal4', 'sliderVal4', {
            unique: false
        });
        objectStore.createIndex('sliderVal5', 'sliderVal5', {
            unique: false
        });
        objectStore.createIndex('sliderVal6', 'sliderVal6', {
            unique: false
        });
        objectStore.createIndex('sliderVal7', 'sliderVal7', {
            unique: false
        });
        objectStore.createIndex('sliderVal8', 'sliderVal8', {
            unique: false
        });
        objectStore.createIndex('sliderVal9', 'sliderVal9', {
            unique: false
        });
        objectStore.createIndex('sliderVal10', 'sliderVal10', {
            unique: false
        });
        objectStore.createIndex('sliderVal11', 'sliderVal11', {
            unique: false
        });
        objectStore.createIndex('sliderVal12', 'sliderVal12', {
            unique: false
        });
        objectStore.createIndex('sliderVal13', 'sliderVal13', {
            unique: false
        });
        objectStore.createIndex('sliderVal14', 'sliderVal14', {
            unique: false
        });
        objectStore.createIndex('sliderVal15', 'sliderVal15', {
            unique: false
        });
        objectStore.createIndex('sliderValHB', 'sliderValHB', {
            unique: false
        });
        objectStore.createIndex('sliderValCN', 'sliderValCN', {
            unique: false
        });
        objectStore.createIndex('sliderValRN', 'sliderValRN', {
            unique: false
        });
        objectStore.createIndex('sliderValSV', 'sliderValSV', {
            unique: false
        });
        objectStore.createIndex('minSize', 'minSize', {
            unique: false
        });
        objectStore.createIndex('maxSize', 'maxSize', {
            unique: false
        });
        console.log('Database setup complete');
    };
    sliderValues();



    $.getJSON("https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/4/query?where=Acres+%3E+0.5&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson", function (data) {
        $.each(data.features, function (i, val) {
            parcelArr.push({
                SA_80_20: val.attributes.SA_80_20,
                APN: val.attributes.APN,
                Acres: val.attributes.Acres,
                WL: val.attributes.Wetland,
                BA: val.attributes.Bird_Areas,
                TS: val.attributes.Tiger_Salamander,
                RF: val.attributes.Red_Legged_Frog,
                WS: val.attributes.Whipsnake,
                DS: val.attributes.Delta_Smelt,
                FS: val.attributes.Longhorn_Fairy_Shrimp,
                CL: val.attributes.Critical_Link,
                IC: val.attributes.Intensified_Connectivity,
                DC: val.attributes.Diffuse_Connectivity,
                CC: val.attributes.Channelized_Connectivity,
                PL: val.attributes.Recreation_Value,
                VS: val.attributes.ViewShed_All_Roads,
                VB: val.attributes.Visibility_Max,
                VL: val.attributes.Visibility_Min,
                PA: val.attributes.Protected_Areas
            })
        })
        parcelSlider();
    })
    renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-fill",
            color: [255, 255, 255, 0],
            outline: { // autocasts as new SimpleLineSymbol()
                width: 0,
                color: "#464646"
            }
        }, // autocasts as new SimpleFillSymbol()
        visualVariables: [
            {
                type: "color",
                valueExpression: "var WL = $feature.Wetland; var BA = $feature.Bird_Areas; var TS = $feature.Tiger_Salamander; var RF = $feature.Red_Legged_Frog; var WS = $feature.Whipsnake; var DS = $feature.Delta_Smelt; var FS = $feature.Longhorn_Fairy_Shrimp; var CL = $feature.Critical_Link; var IC = $feature.Intensified_Connectivity; var DC = $feature.Diffuse_Connectivity; var CC = $feature.Channelized_Connectivity; var PL = $feature.Recreation_Value; var VS = $feature.Viewshed_All_Roads; var VB = $feature.Visibility_Max; var VL = $feature.Visibility_Min; var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When(acres < 1, 0, pa > 0.9, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS, VB, VL]); var total = Sum(factors); var max = Max(factors); return (total / " + sliderTotal + ");",
                valueExpressionTitle: "Overall Score",
                stops: [
                    {
                        value: 0.1,
                        color: "#eae3d0",
                        label: "0.2"
                    }
                    , {
                        value: 0.2,
                        color: "#BDB89E",
                        label: "0.4"
                    }
                    , {
                        value: 0.4,
                        color: "#908E6D",
                        label: "0.6"
                    }
                    , {
                        value: 0.6,
                        color: "#63643C",
                        label: "0.8"
                    }
                    , {
                        value: 0.8,
                        color: "#373A0B",
                        label: "1.0"
                    }
                ]
            }
            , {
                type: "opacity",
                valueExpression: "var WL = $feature.Wetland; var BA = $feature.Bird_Areas; var TS = $feature.Tiger_Salamander; var RF = $feature.Red_Legged_Frog; var WS = $feature.Whipsnake; var DS = $feature.Delta_Smelt; var FS = $feature.Longhorn_Fairy_Shrimp; var CL = $feature.Critical_Link; var IC = $feature.Intensified_Connectivity; var DC = $feature.Diffuse_Connectivity; var CC = $feature.Channelized_Connectivity; var PL = $feature.Recreation_Value; var VS = $feature.Viewshed_All_Roads; var VB = $feature.Visibility_Max; var VL = $feature.Visibility_Min; var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When(acres < 1, 0, pa > 0.9, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS, VB, VL]); var total = Sum(factors); var max = Max(factors); return (total / " + sliderTotal + ");",
                valueExpressionTitle: "Share of registered voters comprising the dominant party",
                legendOptions: {
                    showLegend: false
                },
                stops: [
                    {
                        value: 0,
                        opacity: 0,
                        label: "< 33%"
                    }
                    , {
                        value: 0.0001,
                        opacity: 1,
                        label: "< 33%"
                    }
                ]
            }


        ]
    };
    Parcels = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 4,
        blendMode: "multiply",
        title: "Parcels"
    });

    var template = {
        // autocasts as new PopupTemplate()
        title: "APN: {APN}",
        content: [
            {
                // It is also possible to set the fieldInfos outside of the content
                // directly in the popupTemplate. If no fieldInfos is specifically set
                // in the content, it defaults to whatever may be set within the popupTemplate.
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "Acres",
                        label: "Acres",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Bird_Areas",
                        label: "Bird Areas",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Wetland",
                        label: "Wetland",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Whipsnake",
                        label: "Whipsnake",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Red_Legged_Frog",
                        label: "Red Legged Frog",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Tiger_Salamander",
                        label: "Tiger Salamander",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Delta_Smelt",
                        label: "Delta Smelt",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Longhorn_Fairy_Shrimp",
                        label: "Fairy Shrimp",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Critical_Link",
                        label: "Critical Link",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Intensified_Connectivity",
                        label: "Intensified Connectivity",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Diffuse_Connectivity",
                        label: "Diffuse Connectivity",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Channelized_Connectivity",
                        label: "Channelized Connectivity",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Recreation_Value",
                        label: "Recreation",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Viewshed_All_Roads",
                        label: "Viewshed",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                ]
            }
        ]
    };
    Parcels.popupTemplate = template;
    Boundaries = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 4,
        title: "Parcel Boundaries",
        definitionExpression: "Acres > 1 AND Protected_Areas < 0.9"
    });
    ProtArea = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 16,
        blendMode: "multiply",
        title: "Protected Areas"
    });
    StudyArea = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 0,
        title: "20-80 Study Area",
        listMode: "hide"
    });
    ConsEase = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 10,
        blendMode: "multiply",
        title: "Conservation Easements"
    });
    AlkSoil = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 5,
        title: "Alkaline Soils"
    });
    SerpSoil = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 19,
        title: "Serpentine Soils"
    });
    MajorRoads = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 2,
        legendEnabled: false,
        title: "Major Roads"
    })
    LocalRoads = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 3,
        legendEnabled: false,
        minScale: 80000,
        title: "Local Roads"
    })

    const allData = new WebMap({
        portalItem: { // autocasts as new PortalItem()
            id: "d61b0c9cfc5f480d813602488636abf5"
        }
    });
    LocalRoads.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-line", // autocasts as new SimpleFillSymbol()
            color: "grey",
            width: 1
        }
    }
    Boundaries.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [50, 50, 50, 0],
            outline: {
                width: 0.5,
                color: "#2a2d0d"
            }
        }
    }
    ProtArea.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            //color: "#7A6D4A",
            color: "#60563a",
            outline: {
                width: 0.5,
                color: [255, 255, 255, 0.6]
            }
        }
    }
    ConsEase.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: "#0D5643",
            outline: {
                width: 0,
                color: [0, 0, 0, 0.6]
            }
        }
    }
    AlkSoil.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 0, 200, 0],
            outline: {
                width: 1,
                color: [100, 0, 100, 0.9]
            }
        }
    }
    SerpSoil.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 0, 200, 0],
            outline: {
                width: 1,
                color: [0, 150, 0, 0.9]
            }
        }
    }
    StudyArea.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 0, 0, 0],
            outline: {
                width: 2,
                color: "#B66611"
            }
        }
    }
    Parcels.renderer = renderer;
    map = new Map({
        basemap: {
            baseLayers: [
                new TileLayer({
                    portalItem: {
                        id: "1b243539f4514b6ba35e7d995890db1d" // world hillshade
                    }
                }),
                new VectorTileLayer({
                    portalItem: {
                        id: "c3bbfd64cb6a4718a85c1072063824e1" // khaki vector tiles
                    },
                    blendMode: "multiply"
                })
            ]
        },
        layers: [Parcels, ProtArea, ConsEase, StudyArea, Boundaries]
    });
    view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-121.624697, 37.626261],
        zoom: 11
    });

    view2 = new MapView({
        container: "viewDiv2",
        map: allData,
        center: [-121.624697, 37.626261],
        zoom: 11
    });

    view3 = new MapView({
        container: "viewDiv3",
        map: map,
        popup: {
            dockEnabled: true,
            dockOptions: {
                // Disables the dock button from the popup
                buttonEnabled: false,
                breakpoint: false,
                position: "top-right"
            }
        },
        center: [-121.624697, 37.626261],
        zoom: 11
    });

    view4 = new MapView({
        container: "viewDiv4",
        map: map,
        popup: {
            dockEnabled: true,
            dockOptions: {
                // Disables the dock button from the popup
                buttonEnabled: false,
                breakpoint: false,
                position: "top-left"
            }
        },
        center: [-121.624697, 37.626261],
        zoom: 11
    });

    view3.popup.watch("selectedFeature", function (graphic) {
        if (graphic) {
            view3.goTo(graphic)
        }
    });

    view4.popup.watch("selectedFeature", function (graphic) {
        if (graphic) {
            view4.goTo(graphic)
        }
    });


    var searchWidget = new Search({
        view: view,
        allPlaceholder: "Search Address or APN (xxx-xxx-xxx)",
        sources: [
            {
                layer: Parcels,
                searchFields: ["APN"],
                displayField: "APN",
                exactMatch: false,
                outFields: ["APN"],
                name: "Parcels",
                placeholder: "example: 139-100-014"
            }
        ]
    });

    var searchWidget2 = new Search({
        view: view3,
        allPlaceholder: "Search Address or APN (xxx-xxx-xxx)",
        sources: [
            {
                layer: Parcels,
                searchFields: ["APN"],
                displayField: "APN",
                exactMatch: false,
                outFields: ["APN"],
                name: "Parcels",
                placeholder: "example: 139-100-014"
            }
        ]
    });

    var searchWidget3 = new Search({
        view: view4,
        allPlaceholder: "Search Address or APN (xxx-xxx-xxx)",
        sources: [
            {
                layer: Parcels,
                searchFields: ["APN"],
                displayField: "APN",
                exactMatch: false,
                outFields: ["APN"],
                name: "Parcels",
                placeholder: "example: 139-100-014"
            }
        ]
    });


    view.when(function () {
        var layerList = new LayerList({
            view: view
        });
        var legend = new Legend({
            view: view
        });
        view.ui.add(legend, "top-right");
        view.ui.add(layerList, "top-right");
        view.ui.add(searchWidget, {
            position: "top-left",
            index: 0
        });
    });

    view2.when(function () {
        var layerList = new LayerList({
            view: view2
        });

        view2.ui.add(layerList, "top-right");
    });



    view3.when(function () {
        view3.ui.add(searchWidget2, {
            position: "top-left",
            index: 0
        });
    });

    view4.when(function () {
        view4.ui.add(searchWidget3, {
            position: "top-right",
            index: 0
        });
    });

    function rank(array, att) {
        var parcelCheck = 0;
        var rankCheck = 0;
        $.each(map.layers.items, function (key, val) {
            console.log(val.title)
            if (val.title == "Parcel Ranks") {
                parcelCheck = 1;

            }
            if (val.title.match(/Top/g)) {
                rankCheck = 1;

            }
        })

        if (parcelCheck == 1) {
            map.remove(parcelRank);
        }
        if (rankCheck == 1) {
            map.remove(rankLayer);
        }

        queryString = "";
        var arrCount = 1;
        array.sort(function (a, b) {
            return b[att] - a[att];
        })
        var rank = 1;
        var n = 1;
        for (var i = 0; i < array.length; i++) {
            if (i > 0 && array[i][att] < array[i - 1][att] && n == 1) {
                rank++;
            } else if (i > 0 && array[i][att] == array[i - 1][att]) {
                n++;
            } else if (i > 0 && array[i][att] < array[i - 1][att] && n > 1) {
                rank += n;
                n = 1;
            }
            array[i].rank = rank;
        }

        topTen = array.slice(0, $('#topN').val());

        for (var i = 0; i < topTen.length; i++) {
            if (arrCount == 1) {
                queryString += "APN = '" + topTen[i].APN + "'";
                arrCount += 1;
            } else {
                queryString += " OR APN = '" + topTen[i].APN + "'";
            }

        }

        if (ckb) {
            queryParcelRanks();
        } else {
            queryTopTen();
        }
    }

    function queryParcelRanks() {
        parcelQuery = Parcels.createQuery();
        parcelQuery.where = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9";
        parcelQuery.outFields = ["*"];
        parcelQuery.returnGeometry = true;

        Parcels.queryFeatures(parcelQuery)
            .then(function (response) {
            featureArr2 = []
            features = response.features;
            $.each(features, function (key, val) {
                $.each(parcelSQL, function (i, v) {
                    if (v.APN == val.attributes.APN) {
                        val.attributes.rank = v.rank
                    }
                })
                //alert(val)

                featureArr2.push({
                    geometry: val.geometry,
                    attributes: val.attributes
                })

                rankTotal = featureArr2.length
            })
            var classBreak = rankTotal / 6
            var rankRenderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-fill",
                    color: [255, 255, 255, 0],
                    outline: { // autocasts as new SimpleLineSymbol()
                        width: 0.5,
                        color: "#2a2d0d"
                    }
                }, // autocasts as new SimpleFillSymbol()
                visualVariables: [
                    {
                        type: "color",
                        field: "rank",
                        stops: [
                            {
                                value: rankTotal - (5.5 * classBreak),
                                color: "#373A0B",
                                label: rankTotal - (5.5 * classBreak)
                            }
                            , {
                                value: rankTotal - (4 * classBreak),
                                color: "#63643C",
                                label: rankTotal - (4 * classBreak)
                            }
                            , {
                                value: rankTotal - (3 * classBreak),
                                color: "#908E6D",
                                label: rankTotal - (3 * classBreak)
                            }
                            , {
                                value: rankTotal - (2 * classBreak),
                                color: "#BDB89E",
                                label: rankTotal - (2 * classBreak)
                            }
                            , {
                                value: rankTotal - classBreak,
                                color: "#eae3d0",
                                label: rankTotal - classBreak
                            }
                        ]
                    }
                ]
            };

            parcelRank = new FeatureLayer({
                source: featureArr2, // autocast as a Collection of new Graphic()
                objectIdField: "ObjectID",
                fields: [{
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid"
                }, {
                    name: "rank",
                    alias: "rank",
                    type: "integer"
                }],
                title: "Parcel Ranks",
                blendMode: "multiply"

            })
            /*var colorParams = {
                        layer: parcelRank,
                        view: view,
                        field: "rank",
                        theme: "above-and-below",
                        colorScheme: {
                            id: "above-and-below/gray/div-blue-red",
                            colors: ["#373A0B","#63643C","#908E6D","#BDB89E","#eae3d0"],
                            noDataColor: [0,0,0],
                            colorsForClassBreaks: [
                                {
                                    colors: ["#373A0B","#63643C","#908E6D","#BDB89E","#eae3d0"],
                                    numClasses: 5
                                }
                            ],
                            outline: {
                                color: {r: 153, g: 153, b: 153, a: 0.25},
                                width: "0.5px"
                            },
                            opacity: 0.8
                        }
                    };

                    // when the promise resolves, apply the renderer to the layer
                    colorRendererCreator.createContinuousRenderer(colorParams)
                        .then(function(response){
                        parcelRank.renderer = response.renderer;
                    });*/
            parcelRank.renderer = rankRenderer
            map.add(parcelRank)
            queryTopTen();
        })
    }

    function queryTopTen() {
        topTenQuery = Parcels.createQuery();
        topTenQuery.where = queryString;
        topTenQuery.outFields = ["*"];
        topTenQuery.returnGeometry = true;

        Parcels.queryFeatures(topTenQuery)
            .then(function (response) {
            featureArr = []
            features = response.features;
            $.each(features, function (key, val) {
                $.each(topTen, function (i, v) {
                    if (v.APN == val.attributes.APN) {
                        val.attributes.rank = v.rank
                    }
                })
                //alert(val)

                featureArr.push({
                    geometry: val.geometry,
                    attributes: val.attributes
                })
            })


            const labelClass = {
                // autocasts as new LabelClass()
                symbol: {
                    type: "text", // autocasts as new TextSymbol()
                    color: "black",
                    haloColor: "white",
                    haloSize: "1px",
                    font: { // autocast as new Font()
                        family: "Arial",
                        size: 12,
                        weight: "bold"
                    }
                },
                labelPlacement: "above-center",
                labelExpressionInfo: {
                    expression: "$feature.rank"
                }
            }

            var rankFound = 0;
            var rankRenderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-fill",
                    style: "none",
                    outline: { // autocasts as new SimpleLineSymbol()
                        width: 1.5,
                        color: "#EF8A1E"
                    }
                }
            }


            rankLayer = new FeatureLayer({
                source: featureArr, // autocast as a Collection of new Graphic()
                objectIdField: "ObjectID",
                fields: [{
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid"
                }, {
                    name: "rank",
                    alias: "rank",
                    type: "integer"
                }],
                title: "Top " + $('#topN').val() + " Parcels",
                labelingInfo: [labelClass]

            })

            rankLayer.renderer = rankRenderer
            map.add(rankLayer)
            if (parcelDE != "") {
                if (rankLayer.source.items.length > 0) {
                    rankLayer.queryExtent().then(function (response) {
                        // go to the extent of all the graphics in the layer view
                        view.goTo(response.extent);
                    });
                }
            } else {
                view.center = [-121.624697, 37.626261]
                view.zoom = 11
            }
        });
    }


    function parcelSlider() {
        $("#loadBody").empty();
        $("#loadBody").append("Data ready");
        $("#loadClose").show();
        parcelSQL = alasql('SELECT SA_80_20, APN, Acres, (((WL * ' + sliderVal2 + ') * ' + sliderValHB + ') + ((BA * ' + sliderVal + ') * ' + sliderValHB + ') + ((TS * ' + sliderVal3 + ') * ' + sliderValHB + ') + ((RF * ' + sliderVal4 + ') * ' + sliderValHB + ') +  ((WS * ' + sliderVal5 + ') * ' + sliderValHB + ') + ((DS * ' + sliderVal6 + ') * ' + sliderValHB + ') + ((FS * ' + sliderVal7 + ') * ' + sliderValHB + ') + ((CL * ' + sliderVal8 + ') * ' + sliderValCN + ') + ((IC * ' + sliderVal9 + ') * ' + sliderValCN + ') + ((DC * ' + sliderVal10 + ') * ' + sliderValCN + ') + ((CC * ' + sliderVal11 + ') * ' + sliderValCN + ') + ((PL * ' + sliderVal12 + ') * ' + sliderValRN + ') + ((VS * ' + sliderVal13 + ') * ' + sliderValSV + ') + ((VB * ' + sliderVal14 + ') * ' + sliderValSV + ') + ((VL * ' + sliderVal15 + ') * ' + sliderValSV + '))/ ' + sliderTotal + ' as Score FROM ? WHERE Acres > ' + $("#minSize").val() + ' AND Acres < ' + $("#maxSize").val() + ' AND PA < 0.9', [parcelArr])
        parcelMax = Math.max.apply(null, parcelSQL.map(function (o) {
            return o.Score;
        }))
        parcelMin = Math.min.apply(null, parcelSQL.map(function (o) {
            return o.Score;
        }))
        rank(parcelSQL, "Score")
    }

    function popDropdown() {
        $("#scenarios").empty();
        results = db.transaction('default').objectStore('default').getAll();
        results.onsuccess = function () {
            if (results.result.length > 0) {
                $.each(results.result, function () {
                    var appendText = "<li class='main_flex'><nav>" + this.scenario + "</nav><article><i data-id='" + this.scenario + "' class='fa fa-upload'></i></article><aside><i data-id='" + this.id + "' class='fa fa-trash-alt' data-toggle='modal' data-target='#deleteModal'></i></aside></li>"
                    $("#scenarios").append(appendText);
                });
                $("#scenDiv").show();
            }
        }
    }
    // Define the addData() function
    function addData() {
        // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
        let newItem = {
            scenario: $("#scenarioName").val(),
            sliderVal: sliderVal,
            sliderVal2: sliderVal2,
            sliderVal3: sliderVal3,
            sliderVal4: sliderVal4,
            sliderVal5: sliderVal5,
            sliderVal6: sliderVal6,
            sliderVal7: sliderVal7,
            sliderVal8: sliderVal8,
            sliderVal9: sliderVal9,
            sliderVal10: sliderVal10,
            sliderVal11: sliderVal11,
            sliderVal12: sliderVal12,
            sliderVal13: sliderVal13,
            sliderVal14: sliderVal14,
            sliderVal15: sliderVal15,
            sliderValHB: sliderValHB,
            sliderValCN: sliderValCN,
            sliderValRN: sliderValRN,
            sliderValSV: sliderValSV,
            minSize: $("#minSize").val(),
            maxSize: $("#maxSize").val()
        };
        // open a read/write db transaction, ready for adding the data
        let transaction = db.transaction(['default'], 'readwrite');
        // call an object store that's already been added to the database
        let objectStore = transaction.objectStore('default');
        // Make a request to add our newItem object to the object store
        let request = objectStore.add(newItem);
        // Report on the success of the transaction completing, when everything is done
        transaction.oncomplete = function () {
            console.log('Transaction completed: database modification finished.');
            transaction.onerror = function () {
                console.log('Transaction not opened due to error');
            };
        }
        popDropdown();
    }

    function deleteData() {
        let transaction = db.transaction(['default'], 'readwrite');
        let objectStore = transaction.objectStore('default');
        let objectStoreRequest = objectStore.delete(parseInt(deleteVal));
        transaction.oncomplete = function () {
            console.log('Item Deleted');
        }
        popDropdown();
    }

    function setRenderer() {
        parcelSlider();
        var renderer2 = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill",
                color: [255, 255, 255, 0],
                outline: { // autocasts as new SimpleLineSymbol()
                    width: 0,
                    color: "white"
                }
            }, // autocasts as new SimpleFillSymbol()
            visualVariables: [
                {
                    type: "color",
                    valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13, sliderVal14, sliderVal15),
                    valueExpressionTitle: "Overall Score",
                    stops: [
                        {
                            value: 0.1,
                            color: "#eae3d0",
                            label: "0.2"
                        }
                        , {
                            value: 0.2,
                            color: "#BDB89E",
                            label: "0.4"
                        }
                        , {
                            value: 0.4,
                            color: "#908E6D",
                            label: "0.6"
                        }
                        , {
                            value: 0.6,
                            color: "#63643C",
                            label: "0.8"
                        }
                        , {
                            value: 0.8,
                            color: "#373A0B",
                            label: "1.0"
                        }
                    ]
                }
                , {
                    type: "opacity",
                    valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13, sliderVal14, sliderVal15),
                    valueExpressionTitle: "Share of registered voters comprising the dominant party",
                    legendOptions: {
                        showLegend: false
                    },
                    stops: [
                        {
                            value: 0,
                            opacity: 0,
                            label: "< 33%"
                        }
                        , {
                            value: 0.0001,
                            opacity: 1,
                            label: "< 33%"
                        }
                    ]
                }
            ]
        };
        Parcels.renderer = renderer2;
    }

    function winnerArcade2(sliderValD, sliderValR, sliderValI, sliderValE, sliderValB, sliderValA, sliderValC, sliderValF, sliderValG, sliderValH, sliderValJ, sliderValK, sliderValL, sliderValM, sliderValN) {
        var string = "var WL = ($feature.Wetland * " + sliderValR + ") * " + sliderValHB + ";\n      var BA = ($feature.Bird_Areas * " + sliderValD + ") * " + sliderValHB + ";\n      var TS = ($feature.Tiger_Salamander * " + sliderValI + ") * " + sliderValHB + ";\n   var RF = ($feature.Red_Legged_Frog * " + sliderValE + ") * " + sliderValHB + ";\n   var WS = ($feature.Whipsnake * " + sliderValB + ") * " + sliderValHB + ";\n var DS = ($feature.Delta_Smelt * " + sliderValA + ") * " + sliderValHB + ";\n var FS = ($feature.Longhorn_Fairy_Shrimp * " + sliderValC + ") * " + sliderValHB + ";\n var CL = ($feature.Critical_Link * " + sliderValF + ") * " + sliderValCN + "; var IC = ($feature.Intensified_Connectivity * " + sliderValG + ") * " + sliderValCN + "; var DC = ($feature.Diffuse_Connectivity * " + sliderValH + ") * " + sliderValCN + "; var CC = ($feature.Channelized_Connectivity * " + sliderValJ + ") * " + sliderValCN + "; var PL = ($feature.Recreation_Value * " + sliderValK + ") * " + sliderValRN + "; var VS = ($feature.Viewshed_All_Roads * " + sliderValL + ") * " + sliderValSV + "; var VB = ($feature.Visibility_Max * " + sliderValM + ") * " + sliderValSV + "; var VL = ($feature.Visibility_Min * " + sliderValN + ") * " + sliderValSV + ";  var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When(" + sizeText + "pa > 0.9, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS, VB, VL]); return Decode( Max(factors), WL, 'WL', BA, 'BA', TS, 'TS', RF, 'RF', WS, 'WS', DS, 'DS', FS, 'FS', CL, 'CL', IC, 'IC', DC, 'DC', CC, 'CC', PL, 'PL', VS, 'VS', VB, 'VB', VL, 'VL', 'n/a' );"
        return string;
    }

    function strengthArcade2(sliderValD, sliderValR, sliderValI, sliderValE, sliderValB, sliderValA, sliderValC, sliderValF, sliderValG, sliderValH, sliderValJ, sliderValK, sliderValL, sliderValM, sliderValN) {
        var string = "var WL = ($feature.Wetland * " + sliderValR + ") * " + sliderValHB + ";\n      var BA = ($feature.Bird_Areas * " + sliderValD + ") * " + sliderValHB + ";\n      var TS = ($feature.Tiger_Salamander * " + sliderValI + ") * " + sliderValHB + ";\n   var RF = ($feature.Red_Legged_Frog * " + sliderValE + ") * " + sliderValHB + ";\n   var WS = ($feature.Whipsnake * " + sliderValB + ") * " + sliderValHB + ";\n var DS = ($feature.Delta_Smelt * " + sliderValA + ") * " + sliderValHB + ";\n var FS = ($feature.Longhorn_Fairy_Shrimp * " + sliderValC + ") * " + sliderValHB + ";\n var CL = ($feature.Critical_Link * " + sliderValF + ") * " + sliderValCN + "; var IC = ($feature.Intensified_Connectivity * " + sliderValG + ") * " + sliderValCN + "; var DC = ($feature.Diffuse_Connectivity * " + sliderValH + ") * " + sliderValCN + "; var CC = ($feature.Channelized_Connectivity * " + sliderValJ + ") * " + sliderValCN + "; var PL = ($feature.Recreation_Value * " + sliderValK + ") * " + sliderValRN + "; var VS = ($feature.Viewshed_All_Roads * " + sliderValL + ") * " + sliderValSV + "; var VB = ($feature.Visibility_Max * " + sliderValM + ") * " + sliderValSV + "; var VL = ($feature.Visibility_Min * " + sliderValN + ") * " + sliderValSV + "; var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When(" + sizeText + "pa > 0.9, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS, VB, VL]);\
var total = Sum(factors);\
var max = Max(factors);\
return (((total / " + sliderTotal + ") - (" + parcelMin + "))/(" + parcelMax + " - " + parcelMin + "));"
        return string;
    }

    function createSymbol(color) {
        return {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: color,
            outline: {
                width: 0,
                color: [0, 0, 0, 0.2]
            }
        };
    }

    function exportCSV() {

        if (parcelDE != "" || studyDE != "") {
            var csv = JSON2CSV(JSON.stringify(parcelAOI));
        } else {
            var csv = JSON2CSV(JSON.stringify(parcelSQL));
        }
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        newdate = year + "/" + month + "/" + day;

        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);

        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, "ranked_parcels_" + newdate + ".csv")
        } else {
            var url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "ranked_parcels_" + newdate + ".csv";

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }

    function JSON2CSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

        var str = '';
        var line = '';

        var head = array[0];
        for (var index in array[0]) {
            var value = index + "";
            line += '"' + value.replace(/"/g, '""') + '",';
        }

        line = line.slice(0, -1);
        str += line + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';

            for (var index in array[i]) {
                var value = array[i][index] + "";
                if ([index] == "time") {
                    value = convertTime(parseInt(value));
                }
                line += '"' + value.replace(/"/g, '""') + '",';
            }

            line = line.slice(0, -1);
            str += line + '\r\n';
        }
        return str;

    }

    function convertTime(timestamp) {
        var date = new Date(timestamp);
        var offsetms = date.getTimezoneOffset();
        var datelocal = new Date(date - offsetms),
            datestring =
            (datelocal.getMonth() + 1) + "/" +
            (datelocal.getDate()) + "/" +
            (datelocal.getFullYear()) + " " +
            (datelocal.getHours()) + ":" +
            (datelocal.getMinutes()) + ":" +
            pad((datelocal.getSeconds()));
        return datestring
    }

    function pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }

    function sliderValues() {
        var sliderArr = [sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13, sliderVal14, sliderVal15];
        sliderTotal = 0;

        var habTotal = 0;
        if (sliderValHB != 0) {
            habTotal = (parseInt(sliderVal) + parseInt(sliderVal2) + parseInt(sliderVal3) + parseInt(sliderVal4) + parseInt(sliderVal5) + parseInt(sliderVal6) + parseInt(sliderVal7)) * parseInt(sliderValHB);
        }
        var conTotal = 0;
        if (sliderValCN != 0) {
            conTotal = (parseInt(sliderVal8) + parseInt(sliderVal9) + parseInt(sliderVal10) + parseInt(sliderVal11)) * parseInt(sliderValCN);
        }
        var recTotal = 0;
        if (sliderValRN != 0) {
            recTotal = parseInt(sliderVal12) * parseInt(sliderValRN);
        }
        var viewTotal = 0;
        if (sliderValSV != 0) {
            viewTotal = (parseInt(sliderVal13) + parseInt(sliderVal14) + parseInt(sliderVal15)) * parseInt(sliderValSV);
        }
        sliderTotal = habTotal + conTotal + recTotal + viewTotal;
    }
    $('#loadClose').click(function () {
        popDropdown();
        setRenderer();
    })
    $('#saveState').click(function () {
        addData();
    })
    $('#CSVBtn').click(function () {
        exportCSV();
    })
    $('li').on("click", "i.fa.fa-trash-alt", function (event) {
        deleteVal = $(this).data("id");
        $('#deleteModal').modal('show');
    })
    $('a').on("click", "i.fa.fa-save", function (event) {
        $('#saveModal').modal('show');
    })
    $('a').on("click", "i.fas.fa-file-export", function (event) {
        $('#exportModal').modal('show');
    })

    $('#saveBtn').on("click", function (event) {
        $('#saveModal').modal('show');
    })
    $('#exportBtn').on("click", function (event) {
        $('#exportModal').modal('show');
    })
    $('#deleteState').click(function () {
        deleteData();
    })
    $('li').on("click", "i.fa.fa-upload", function (event) {
        let transaction = db.transaction(['default'], 'readonly');
        let objectStore = transaction.objectStore('default');
        let cursorRequest = objectStore.openCursor();
        cursorRequest.onsuccess = e => {
            const cursor = e.target.result;
            if (cursor) {
                if (cursor.value.scenario === $(this).data("id")) {
                    console.log(cursor.value.scenario);
                    sliderVal = cursor.value.sliderVal;
                    sliderVal2 = cursor.value.sliderVal2;
                    sliderVal3 = cursor.value.sliderVal3;
                    sliderVal4 = cursor.value.sliderVal4;
                    sliderVal5 = cursor.value.sliderVal5;
                    sliderVal6 = cursor.value.sliderVal6;
                    sliderVal7 = cursor.value.sliderVal7;
                    sliderVal8 = cursor.value.sliderVal8;
                    sliderVal9 = cursor.value.sliderVal9;
                    sliderVal10 = cursor.value.sliderVal10;
                    sliderVal11 = cursor.value.sliderVal11;
                    sliderVal12 = cursor.value.sliderVal12;
                    sliderVal13 = cursor.value.sliderVal13;
                    sliderVal14 = cursor.value.sliderVal14;
                    sliderVal15 = cursor.value.sliderVal15;
                    sliderValHB = cursor.value.sliderValHB;
                    sliderValCN = cursor.value.sliderValCN;
                    sliderValRN = cursor.value.sliderValRN;
                    sliderValSV = cursor.value.sliderValSV;
                    sizeText = "acres < " + cursor.value.minSize + ", 0, acres > " + cursor.value.maxSize + ", 0, ";
                    Boundaries.definitionExpression = "Acres > " + cursor.value.minSize + " AND Acres < " + cursor.value.maxSize + " AND Protected_Areas < 0.9"
                    $('#minSize').val(cursor.value.minSize);
                    $('#maxSize').val(cursor.value.maxSize);
                    $('#HB').val(cursor.value.sliderValHB);
                    $('#HBVal').text(cursor.value.sliderValHB);
                    $('#CN').val(cursor.value.sliderValCN);
                    $('#CNVal').text(cursor.value.sliderValCN);
                    $('#RN').val(cursor.value.sliderValRN);
                    $('#RNVal').text(cursor.value.sliderValRN);
                    $('#SV').val(cursor.value.sliderValSV);
                    $('#SVVal').text(cursor.value.sliderValSV);
                    $('#BA').val(cursor.value.sliderVal);
                    $('#BAVal').text(cursor.value.sliderVal);
                    $('#WL').val(cursor.value.sliderVal2);
                    $('#WLVal').text(cursor.value.sliderVal2);
                    $('#TS').val(cursor.value.sliderVal3);
                    $('#TSVal').text(cursor.value.sliderVal3);
                    $('#RF').val(cursor.value.sliderVal4);
                    $('#RFVal').text(cursor.value.sliderVal4);
                    $('#WS').val(cursor.value.sliderVal5);
                    $('#WSVal').text(cursor.value.sliderVal5);
                    $('#DS').val(cursor.value.sliderVal6);
                    $('#DSVal').text(cursor.value.sliderVal6);
                    $('#FS').val(cursor.value.sliderVal7);
                    $('#FSVal').text(cursor.value.sliderVal7);
                    $('#CL').val(cursor.value.sliderVal8);
                    $('#CLVal').text(cursor.value.sliderVal8);
                    $('#IC').val(cursor.value.sliderVal9);
                    $('#ICVal').text(cursor.value.sliderVal9);
                    $('#DC').val(cursor.value.sliderVal10);
                    $('#DCVal').text(cursor.value.sliderVal10);
                    $('#CC').val(cursor.value.sliderVal11);
                    $('#CCVal').text(cursor.value.sliderVal11);
                    $('#PL').val(cursor.value.sliderVal12);
                    $('#PLVal').text(cursor.value.sliderVal12);
                    $('#VS').val(cursor.value.sliderVal13);
                    $('#VSVal').text(cursor.value.sliderVal13);
                    $('#VB').val(cursor.value.sliderVal14);
                    $('#VBVal').text(cursor.value.sliderVal14);
                    $('#VL').val(cursor.value.sliderVal15);
                    $('#VLVal').text(cursor.value.sliderVal15);
                    sliderValues();
                    setRenderer();
                }

                cursor.continue();
            }

        }
        console.log("Success!")

    })
    $("input[name='size']").change(function () {
        Boundaries.definitionExpression = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9";
        sizeText = "acres < " + $("#minSize").val() + ", 0, acres > " + $("#maxSize").val() + ", 0, ";
        setRenderer();
    })
    $("input[name='top']").change(function () {
        if (parcelDE != "") {
            parcelAOI = alasql('SELECT * FROM ? WHERE ' + parcelDE, [parcelSQL])
            rank(parcelAOI, "Score")
        } else {
            rank(parcelSQL, "Score")
        }
    })
    $('input[name="top"]').click(function () {
        if ($(this).is(":checked")) {
            queryParcelRanks();
        } else {
            map.remove(parcelRank);
        }
    })
    $('input[name="fm"]').click(function () {
        $("#sa3").prop("checked", true);
        parcelDE = "";
        layerCounter = 1;
        $('input[name="fm"]').each(function () {
            if (layerCounter == 1) {
                if ($(this).is(":checked")) {
                    parcelDE += $(this).val();
                    layerCounter += 1;
                }
            } else {
                if ($(this).is(":checked")) {
                    parcelDE += " OR " + $(this).val();
                }
            }
        })
        if (parcelDE != "") {
            parcelAOI = alasql('SELECT * FROM ? WHERE ' + parcelDE, [parcelSQL])
            rank(parcelAOI, "Score")
        } else {
            rank(parcelSQL, "Score")
        }
        Parcels.definitionExpression = parcelDE;
        if (parcelDE.length == 0) {
            Boundaries.definitionExpression = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9"
        } else {
            Boundaries.definitionExpression = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9 AND (" + parcelDE + ")";
        }
    });

    $('input[name="sa"]').click(function () {
        $('input[name="fm"]').prop("checked", false);
        $('input[name="sa"]').each(function () {

            if ($(this).is(":checked")) {
                studyDE = $(this).val();
            }


        })
        if (studyDE != "") {
            parcelAOI = alasql('SELECT * FROM ? WHERE ' + studyDE, [parcelSQL])
            rank(parcelAOI, "Score")
        } else {
            rank(parcelSQL, "Score")
        }
        Parcels.definitionExpression = studyDE;
        if (studyDE.length == 0) {
            Boundaries.definitionExpression = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9"
        } else {
            Boundaries.definitionExpression = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9 AND (" + studyDE + ")";
        }
    });

    /* each Slider*/
    var sliderWL = document.getElementById("WL");
    var outputWL = document.getElementById("WLVal");
    outputWL.innerHTML = sliderWL.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderWL.onmouseup = function () {
        outputWL.innerHTML = this.value;
        sliderVal2 = this.value;
        localStorage.setItem('sliderWL', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderBA = document.getElementById("BA");
    var outputBA = document.getElementById("BAVal");
    outputBA.innerHTML = sliderBA.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderBA.onmouseup = function () {
        outputBA.innerHTML = this.value;
        sliderVal = this.value;
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderRF = document.getElementById("RF");
    var outputRF = document.getElementById("RFVal");
    outputRF.innerHTML = sliderRF.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderRF.onmouseup = function () {
        outputRF.innerHTML = this.value;
        sliderVal4 = this.value;
        localStorage.setItem('sliderRF', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderWS = document.getElementById("WS");
    var outputWS = document.getElementById("WSVal");
    outputWS.innerHTML = sliderWS.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderWS.onmouseup = function () {
        outputWS.innerHTML = this.value;
        sliderVal5 = this.value;
        localStorage.setItem('sliderWS', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderTS = document.getElementById("TS");
    var outputTS = document.getElementById("TSVal");
    outputTS.innerHTML = sliderTS.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderTS.onmouseup = function () {
        outputTS.innerHTML = this.value;
        sliderVal3 = this.value;
        localStorage.setItem('sliderTS', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderDS = document.getElementById("DS");
    var outputDS = document.getElementById("DSVal");
    outputDS.innerHTML = sliderDS.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderDS.onmouseup = function () {
        outputDS.innerHTML = this.value;
        sliderVal6 = this.value;
        localStorage.setItem('sliderDS', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderFS = document.getElementById("FS");
    var outputFS = document.getElementById("FSVal");
    outputFS.innerHTML = sliderFS.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderFS.onmouseup = function () {
        outputFS.innerHTML = this.value;
        sliderVal7 = this.value;
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderCL = document.getElementById("CL");
    var outputCL = document.getElementById("CLVal");
    outputCL.innerHTML = sliderCL.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderCL.onmouseup = function () {
        outputCL.innerHTML = this.value;
        sliderVal8 = this.value;
        localStorage.setItem('sliderCL', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderIC = document.getElementById("IC");
    var outputIC = document.getElementById("ICVal");
    outputIC.innerHTML = sliderIC.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderIC.onmouseup = function () {
        outputIC.innerHTML = this.value;
        sliderVal9 = this.value;
        localStorage.setItem('sliderIC', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderDC = document.getElementById("DC");
    var outputDC = document.getElementById("DCVal");
    outputDC.innerHTML = sliderDC.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderDC.onmouseup = function () {
        outputDC.innerHTML = this.value;
        sliderVal10 = this.value;
        localStorage.setItem('sliderDC', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderCC = document.getElementById("CC");
    var outputCC = document.getElementById("CCVal");
    outputCC.innerHTML = sliderCC.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderCC.onmouseup = function () {
        outputCC.innerHTML = this.value;
        sliderVal11 = this.value;
        localStorage.setItem('sliderCC', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderPL = document.getElementById("PL");
    var outputPL = document.getElementById("PLVal");
    outputPL.innerHTML = sliderPL.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderPL.onmouseup = function () {
        outputPL.innerHTML = this.value;
        sliderVal12 = this.value;
        localStorage.setItem('sliderPL', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderVS = document.getElementById("VS");
    var outputVS = document.getElementById("VSVal");
    outputVS.innerHTML = sliderVS.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderVS.onmouseup = function () {
        outputVS.innerHTML = this.value;
        sliderVal13 = this.value;
        localStorage.setItem('sliderVS', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderVB = document.getElementById("VB");
    var outputVB = document.getElementById("VBVal");
    outputVB.innerHTML = sliderVB.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderVB.onmouseup = function () {
        outputVB.innerHTML = this.value;
        sliderVal14 = this.value;
        localStorage.setItem('sliderVB', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderVL = document.getElementById("VL");
    var outputVL = document.getElementById("VLVal");
    outputVL.innerHTML = sliderVL.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderVL.onmouseup = function () {
        outputVL.innerHTML = this.value;
        sliderVal15 = this.value;
        localStorage.setItem('sliderVL', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderHB = document.getElementById("HB");
    var outputHB = document.getElementById("HBVal");
    outputHB.innerHTML = sliderHB.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderHB.onmouseup = function () {
        outputHB.innerHTML = this.value;
        sliderValHB = this.value;
        localStorage.setItem('sliderHB', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderCN = document.getElementById("CN");
    var outputCN = document.getElementById("CNVal");
    outputCN.innerHTML = sliderCN.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderCN.onmouseup = function () {
        outputCN.innerHTML = this.value;
        sliderValCN = this.value;
        localStorage.setItem('sliderCN', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderRN = document.getElementById("RN");
    var outputRN = document.getElementById("RNVal");
    outputRN.innerHTML = sliderRN.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderRN.onmouseup = function () {
        outputRN.innerHTML = this.value;
        sliderValRN = this.value;
        localStorage.setItem('sliderRN', this.value);
        sliderValues();
        setRenderer();
    }
    /* each Slider*/
    var sliderSV = document.getElementById("SV");
    var outputSV = document.getElementById("SVVal");
    outputSV.innerHTML = sliderSV.value; // Display the default slider value
    // Update the current slider value (each time you drag the slider handle)
    sliderSV.onmouseup = function () {
        outputSV.innerHTML = this.value;
        sliderValSV = this.value;
        localStorage.setItem('sliderSV', this.value);
        sliderValues();
        setRenderer();
    }
    $(window).on("load", function () {
        $('#loadModal').modal('show');
        $('#loadClose').hide();
    });
})
