var sliderVal = 1;
var sliderVal2 = 1;
var sliderVal3 = 1;
var sliderVal4 = 1;
var sliderVal5 = 1;
var sliderVal6 = 1;
var sliderVal7 = 1;
var sliderVal8 = 1;
var sliderVal9 = 1;
var sliderVal10 = 1;
var sliderVal11 = 1;
var sliderVal12 = 1;
var sliderVal13 = 1;

var sliderTotal = 13,
    winnerArcade,
    strengthArcade,
    renderer


require([
    "esri/Map",
    "esri/Graphic",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/layers/VectorTileLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/tasks/IdentifyTask",
    "esri/tasks/support/IdentifyParameters",
    "dojo/domReady!"
], function (Map, Graphic, MapView, FeatureLayer, GraphicsLayer, VectorTileLayer, QueryTask, Query, IdentifyTask, IdentifyParameters) {
    var identifyTask = new IdentifyTask(),
        params = new IdentifyParameters()

    sliderValues();
    renderer = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: "var WL = $feature.Wetland; var BA = $feature.Bird_Areas; var TS = $feature.Tiger_Salamander; var RF = $feature.Red_Legged_Frog; var WS = $feature.Whipsnake; var DS = $feature.Delta_Smelt; var FS = $feature.Longhorn_Fairy_Shrimp; var CL = $feature.Critical_Link; var IC = $feature.Intensified_Connectivity; var DC = $feature.Diffuse_Connectivity; var CC = $feature.Channelized_Connectivity; var PL = $feature.Recreation_Value; var VS = $feature.Viewshed_All_Roads; var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When( pa > 0.9, 0, acres < 1, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS]); return Decode( Max(factors), WL, 'WL', BA, 'BA', TS, 'TS', RF, 'RF', WS, 'WS', DS, 'DS', FS, 'FS', CL, 'CL', IC, 'IC', DC, 'DC', CC, 'CC', PL, 'PL', VS, 'VS', 'n/a' );",
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    
    renderer.visualVariables = [
        {
            type: "color",
            valueExpression: "var WL = $feature.Wetland; var BA = $feature.Bird_Areas; var TS = $feature.Tiger_Salamander; var RF = $feature.Red_Legged_Frog; var WS = $feature.Whipsnake; var DS = $feature.Delta_Smelt; var FS = $feature.Longhorn_Fairy_Shrimp; var CL = $feature.Critical_Link; var IC = $feature.Intensified_Connectivity; var DC = $feature.Diffuse_Connectivity; var CC = $feature.Channelized_Connectivity; var PL = $feature.Recreation_Value; var VS = $feature.Viewshed_All_Roads; var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When( pa > 0.9, 0, acres < 1, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS]); var total = Sum(factors); var max = Max(factors); return (total / " + sliderTotal + ") * 100;",
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    color: "#f2f53d",
                    label: "< 33%"
                },
                {
                    value: 25,
                    color: "#3be827",
                    label: "< 33%"
                },
                {
                    value: 40,
                    color: "#0377fc",
                    label: "< 33%"
                },
                {
                    value: 65,
                    color: "#ac0de0",
                    label: "< 33%"
                },
                {
                    value: 80,
                    color: "#b8091e",
                    label: "> 44%"
                }
            ]
        }

    /*renderer.visualVariables = [
        {
            type: "opacity",
            valueExpression: "var WL = $feature.Wetland; var BA = $feature.Bird_Areas; var TS = $feature.Tiger_Salamander; var RF = $feature.Red_Legged_Frog; var WS = $feature.Whipsnake; var DS = $feature.Delta_Smelt; var FS = $feature.Longhorn_Fairy_Shrimp; var CL = $feature.Critical_Link; var IC = $feature.Intensified_Connectivity; var DC = $feature.Diffuse_Connectivity; var CC = $feature.Channelized_Connectivity; var PL = $feature.Recreation_Value; var VS = $feature.Viewshed_All_Roads; var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When( pa > 0.9, 0, acres < 1, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS]); var total = Sum(factors); var max = Max(factors); return (total / " + sliderTotal + ") * 100;",
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 40,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 65,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 80,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }*/
    ];
    Parcels = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/ALOSAC_Data_August_2020/FeatureServer/",
        layerId: 4,
        legendEnabled: false,
        title: "Parcels"
    });

    ProtArea = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/ALOSAC_Data_August_2020/FeatureServer/",
        layerId: 16,
        legendEnabled: false,
        title: "Protected Areas"
    });

    StudyArea = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/ALOSAC_Data_August_2020/FeatureServer/",
        layerId: 0,
        legendEnabled: false,
        title: "Study Area"
    });


    MajorRoads = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/ALOSAC_Data_August_2020/FeatureServer/",
        layerId: 2,
        legendEnabled: false,
        title: "Major Roads"
    })

    LocalRoads = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/ALOSAC_Data_August_2020/FeatureServer/",
        layerId: 3,
        legendEnabled: false,
        minScale: 80000,
        title: "Local Roads"
    })

    LocalRoads.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-line", // autocasts as new SimpleFillSymbol()
            color: "blue",
            width: 1

        }
    }

    ProtArea.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 0, 0, 0],
            outline: {
                width: 1,
                color: [0, 0, 0, 0.2]
            }
        }
    }

    Parcels.renderer = renderer;


    graphicsFM = new GraphicsLayer;

    FM = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/Dry_Creek_Final/FeatureServer",
        layerId: 1,
        legendEnabled: false,
        renderer: renderer,
        title: "Parcels"
    });



    var map = new Map({
        basemap: "topo-vector",
        layers: [Parcels, ProtArea, StudyArea, LocalRoads, MajorRoads]
    });


    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-121.724697, 37.626261],
        zoom: 11
    });





    view.when(function () {

        view.on("click", function (event) {
            executeIdentifyTask(event);
            executeParcelQuery(event);

        });

        identifyTask.url = Watersheds;


        params.tolerance = 3;
        params.layerIds = [5];
        params.layerOption = "all";
        params.width = view.width;
        params.height = view.height;
    });

    function executeIdentifyTask(event) {
        $.ajaxSetup({
            async: false
        });
        wsVal = '';
        // Set the geometry to the location of the view click
        params.geometry = event.mapPoint;
        params.mapExtent = view.extent;

        // This function returns a promise that resolves to an array of features
        // A custom popupTemplate is set for each feature based on the layer it
        // originates from
        identifyTask
            .execute(params)
            .then(function (response) {
            var results = response.results;
            wsVal += "<b>Watershed Name:</b> " + results[0].feature.attributes.Name;
        })
    };

    $("#resetSelect").click(function () {
        apnArr = [];
        apnText = '';
        FM.renderer = renderer;
        graphicsFM.removeAll();
    })

    parcelQueryTask = new QueryTask({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/Dry_Creek_Final/FeatureServer/0"
    });
    parcelQuery = new Query();
    parcelQuery.returnGeometry = true;
    parcelQuery.outFields = ["*"];
})


function setRenderer() {
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "color",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    color: "#f2f53d",
                    label: "< 33%"
                },
                {
                    value: 25,
                    color: "#3be827",
                    label: "< 33%"
                },
                {
                    value: 40,
                    color: "#0377fc",
                    label: "< 33%"
                },
                {
                    value: 65,
                    color: "#ac0de0",
                    label: "< 33%"
                },
                {
                    value: 80,
                    color: "#b8091e",
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;
}

function winnerArcade2(sliderValD, sliderValR, sliderValI, sliderValE, sliderValB, sliderValA, sliderValC, sliderValF, sliderValG, sliderValH, sliderValJ, sliderValK, sliderValL) {
    var string = "var WL = $feature.Wetland * " + sliderValR + ";\n      var BA = $feature.Bird_Areas * " + sliderValD + ";\n      var TS = $feature.Tiger_Salamander * " + sliderValI + ";\n   var RF = $feature.Red_Legged_Frog * " + sliderValE + ";\n   var WS = $feature.Whipsnake * " + sliderValB + ";\n var DS = $feature.Delta_Smelt * " + sliderValA + ";\n var FS = $feature.Longhorn_Fairy_Shrimp * " + sliderValC + ";\n var CL = $feature.Critical_Link * " + sliderValF + "; var IC = $feature.Intensified_Connectivity * " + sliderValG + "; var DC = $feature.Diffuse_Connectivity * " + sliderValH + "; var CC = $feature.Channelized_Connectivity * " + sliderValJ + "; var PL = $feature.Recreation_Value * " + sliderValK + "; var VS = $feature.Viewshed_All_Roads * " + sliderValL + ";   var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When( pa > 0.9, 0, acres < 1, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS]); return Decode( Max(factors), WL, 'WL', BA, 'BA', TS, 'TS', RF, 'RF', WS, 'WS', DS, 'DS', FS, 'FS', CL, 'CL', IC, 'IC', DC, 'DC', CC, 'CC', PL, 'PL', VS, 'VS', 'n/a' );"

    return string;
}

function strengthArcade2(sliderValD, sliderValR, sliderValI, sliderValE, sliderValB, sliderValA, sliderValC, sliderValF, sliderValG, sliderValH, sliderValJ, sliderValK, sliderValL) {
    var string = "var WL = $feature.Wetland * " + sliderValR + ";\n      var BA = $feature.Bird_Areas * " + sliderValD + ";\n      var TS = $feature.Tiger_Salamander * " + sliderValI + ";\n   var RF = $feature.Red_Legged_Frog * " + sliderValE + ";\n   var WS = $feature.Whipsnake * " + sliderValB + ";\n var DS = $feature.Delta_Smelt * " + sliderValA + ";\n var FS = $feature.Longhorn_Fairy_Shrimp * " + sliderValC + ";\n var CL = $feature.Critical_Link * " + sliderValF + "; var IC = $feature.Intensified_Connectivity * " + sliderValG + "; var DC = $feature.Diffuse_Connectivity * " + sliderValH + "; var CC = $feature.Channelized_Connectivity * " + sliderValJ + "; var PL = $feature.Recreation_Value * " + sliderValK + "; var VS = $feature.Viewshed_All_Roads * " + sliderValL + "; var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When( pa > 0.9, 0, acres < 1, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS]);\
var total = Sum(factors);\
var max = Max(factors);\
return (total/" + sliderTotal + ") * 100;"

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

function sliderValues() {
    var sliderArr = [sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13];
    sliderTotal = 0;

    $.each(sliderArr, function (i, val) {

        sliderTotal += parseInt(val);

    })


}

/* each Slider*/
var sliderWL = document.getElementById("WL");
var outputWL = document.getElementById("WLVal");
outputWL.innerHTML = sliderWL.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderWL.oninput = function () {
    outputWL.innerHTML = this.value;
    sliderVal2 = this.value;
    sliderValues();
   /* var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 40,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 65,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 80,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;*/
    setRenderer();


}
/* each Slider*/
var sliderBA = document.getElementById("BA");
var outputBA = document.getElementById("BAVal");
outputBA.innerHTML = sliderBA.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderBA.oninput = function () {
    outputBA.innerHTML = this.value;
    sliderVal = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [

                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 40,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 65,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 80,
                    opacity: 1.0,
                    label: "> 44%"
                }

            ]
        }
    ];
    Parcels.renderer = renderer2;

}
/* each Slider*/
var sliderRF = document.getElementById("RF");
var outputRF = document.getElementById("RFVal");
outputRF.innerHTML = sliderRF.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderRF.oninput = function () {
    outputRF.innerHTML = this.value;
    sliderVal4 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [

                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 40,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 65,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 80,
                    opacity: 1.0,
                    label: "> 44%"
                }

            ]
        }
    ];
    Parcels.renderer = renderer2;

}
/* each Slider*/
var sliderWS = document.getElementById("WS");
var outputWS = document.getElementById("WSVal");
outputWS.innerHTML = sliderWS.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderWS.oninput = function () {
    outputWS.innerHTML = this.value;
    sliderVal5 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [

                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 40,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 65,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 80,
                    opacity: 1.0,
                    label: "> 44%"
                }

            ]
        }
    ];
    Parcels.renderer = renderer2;

}
/* each Slider*/
var sliderTS = document.getElementById("TS");
var outputTS = document.getElementById("TSVal");
outputTS.innerHTML = sliderTS.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderTS.oninput = function () {
    outputTS.innerHTML = this.value;
    sliderVal3 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 50,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 75,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 95,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;

}

/* each Slider*/
var sliderDS = document.getElementById("DS");
var outputDS = document.getElementById("DSVal");
outputDS.innerHTML = sliderDS.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderDS.oninput = function () {
    outputDS.innerHTML = this.value;
    sliderVal6 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 50,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 75,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 95,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;

}

/* each Slider*/
var sliderFS = document.getElementById("FS");
var outputFS = document.getElementById("FSVal");
outputFS.innerHTML = sliderFS.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderFS.oninput = function () {
    outputFS.innerHTML = this.value;
    sliderVal7 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 50,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 75,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 95,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;

}

/* each Slider*/
var sliderCL = document.getElementById("CL");
var outputCL = document.getElementById("CLVal");
outputCL.innerHTML = sliderCL.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderCL.oninput = function () {
    outputCL.innerHTML = this.value;
    sliderVal8 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 50,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 75,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 95,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;

}

/* each Slider*/
var sliderIC = document.getElementById("IC");
var outputIC = document.getElementById("ICVal");
outputIC.innerHTML = sliderIC.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderIC.oninput = function () {
    outputIC.innerHTML = this.value;
    sliderVal9 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 50,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 75,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 95,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;

}

/* each Slider*/
var sliderDC = document.getElementById("DC");
var outputDC = document.getElementById("DCVal");
outputDC.innerHTML = sliderDC.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderDC.oninput = function () {
    outputDC.innerHTML = this.value;
    sliderVal10 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 50,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 75,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 95,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;

}

/* each Slider*/
var sliderCC = document.getElementById("CC");
var outputCC = document.getElementById("CCVal");
outputCC.innerHTML = sliderCC.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderCC.oninput = function () {
    outputCC.innerHTML = this.value;
    sliderVal11 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 50,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 75,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 95,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;

}

/* each Slider*/
var sliderPL = document.getElementById("PL");
var outputPL = document.getElementById("PLVal");
outputPL.innerHTML = sliderPL.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderPL.oninput = function () {
    outputPL.innerHTML = this.value;
    sliderVal12 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 50,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 75,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 95,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;

}

/* each Slider*/
var sliderVS = document.getElementById("VS");
var outputVS = document.getElementById("VSVal");
outputVS.innerHTML = sliderVS.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderVS.oninput = function () {
    outputVS.innerHTML = this.value;
    sliderVal13 = this.value;
    sliderValues();
    var renderer2 = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        valueExpression: winnerArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
        valueExpressionTitle: "Counties by dominant party among registered voters",
        uniqueValueInfos: [
            {
                value: "BA",
                symbol: createSymbol("#a61e00"),
                label: "Distance to roads"
            },
            {
                value: "WL",
                symbol: createSymbol("#a61e00"),
                label: "Distance to streams"
            },
            {
                value: "TS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "FS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "RF",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "WS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "IC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "DC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "CC",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "PL",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            },
            {
                value: "VS",
                symbol: createSymbol("#a61e00"),
                label: "Slope"
            }
        ]
    };
    renderer2.visualVariables = [
        {
            type: "opacity",
            valueExpression: strengthArcade2(sliderVal, sliderVal2, sliderVal3, sliderVal4, sliderVal5, sliderVal6, sliderVal7, sliderVal8, sliderVal9, sliderVal10, sliderVal11, sliderVal12, sliderVal13),
            valueExpressionTitle: "Share of registered voters comprising the dominant party",
            stops: [
                {
                    value: 10,
                    opacity: 0.05,
                    label: "< 33%"
                },
                {
                    value: 25,
                    opacity: 0.25,
                    label: "< 33%"
                },
                {
                    value: 50,
                    opacity: 0.5,
                    label: "< 33%"
                },
                {
                    value: 75,
                    opacity: 0.75,
                    label: "< 33%"
                },
                {
                    value: 95,
                    opacity: 1.0,
                    label: "> 44%"
                }
            ]
        }
    ];
    Parcels.renderer = renderer2;

}