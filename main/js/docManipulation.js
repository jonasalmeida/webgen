/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Div/SVG Manipulation (below) ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to append div elemnts to an HTML document with an existing div element with id='oldDivID'.
// Useful for when you have a variable amount of plots to display on the page:
addDiv = function(newDivID, oldDivID) { 
  // create a new div element 
  let newDiv = document.createElement("div"); 
  newDiv.setAttribute('id', newDivID);
  newDiv.setAttribute("style", "margin-top:25px"); 
  // add the newly created element and its content into the DOM 
  document.getElementById(oldDivID).after(newDiv); 
}

// Function to remove the current div elements if they exist:
removeDiv = function() {
  let i = 1;
  let continueBool = true;
  while (continueBool == true) {
    divToRemove = document.getElementById("div" + i);
    if(divToRemove) {
      $(divToRemove).remove();
      i++;
    } else {
      continueBool = false;
    };
  };
};

// Function to remove the current svg elements if they exist:
removeSVGelements = function() {
  svgElementsArray = ["svgHeatMap", "svgViolinPlot"];
  for(let i = 0; i < svgElementsArray.length; i++) {
    svgToRemove = document.getElementById(svgElementsArray[i]);
    $(svgToRemove).remove();
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function displaySingleGroupSelectors() {

  /////////////////////////////////////////////////////////////////////////

  // Setting up the user input text fields.

  // Get the list of valid genes users can search for:
  validGeneListFetch = getValidGeneList();
  validGeneListFetch.then(function(validGeneList){

    $(document).ready(function() {

      // For Cancer Type Select2 Drop down:
      $('.cancerTypeMultipleSelection').select2({
        placeholder: "Cancer Type(s)"
      });

      // For Gene Select2 Drop down:
      $('.geneMultipleSelection').select2({
        tags: true,
        createTag: function (params) {
          // If the gene entered is not valid, don't create new tag:
          if (~validGeneList.includes(params.term.toUpperCase()) === -1) {
            return null;
          }
          // If the gene entered is valid, create new tag:
          return {
            id: params.term.toUpperCase(),
            text: params.term.toUpperCase()
          }
        },
        placeholder: "Gene Name(s)"
      });

      // For Mutation Select2 Drop down:
      $('.mutationMultipleSelection').select2({
        placeholder: "Mutation(s)"
      });

      // Fill the Select2 Boxes:
      fillCancerTypeSelectBox();
      fillGeneSelectBox();
    });
  });

  /////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////


  if(document.getElementById("bigDiv")) {
    document.getElementById("bigDiv").remove();
  }

  if(document.getElementById("buttonClone2")) {
    document.getElementById("buttonClone2").classList.add('hide');
  }

  if(document.getElementById('mySingleHR')) {
  } else {

    // Add hr

    let mySingleHR = document.createElement('hr');
    mySingleHR.setAttribute('style', 'border-color: #4db6ac;');
    mySingleHR.setAttribute('id', 'mySingleHR');
    document.getElementById('numberOfGroups').after(mySingleHR);

    // Add (1)

    let para = document.createElement("P");
    para.setAttribute('style', 'text-align: center; font-family: Georgia, "Times New Roman", Times, serif');
    para.setAttribute('id', 'para');
    para.innerText = "1) Select cancer type(s)";            
    mySingleHR.after(para);

    let newDiv = document.createElement("div"); 
    newDiv.setAttribute('id', 'cancerQuerySelectBox');
    para.after(newDiv)
    let newSelect = document.createElement("SELECT");
    newSelect.setAttribute('class', 'cancerTypeMultipleSelection')
    newSelect.setAttribute('id', 'cancerTypeMultipleSelection')
    newSelect.setAttribute('multiple', 'multiple')
    newDiv.appendChild(newSelect)

    // Add (2)

    let para2 = document.createElement("P");
    para2.setAttribute('style', 'text-align: center; font-family: Georgia, "Times New Roman", Times, serif');
    para2.setAttribute('id', 'para2');
    para2.innerText = "2) Select gene(s)";            
    newDiv.after(para2);

    let paraTip = document.createElement("P");
    paraTip.setAttribute('style', 'text-align: center; color: gray; font-family: Georgia, "Times New Roman", Times, serif');
    paraTip.setAttribute('id', 'paraTip');
    paraTip.innerText = "Tip: Begin typing name of gene, and then select gene from dropdown menu.";            
    para2.after(paraTip);

    let newDiv2 = document.createElement("div"); 
    newDiv2.setAttribute('id', 'geneQuerySelectBox');
    paraTip.after(newDiv2)
    let newSelect2 = document.createElement("SELECT");
    newSelect2.setAttribute('class', 'geneMultipleSelection')
    newSelect2.setAttribute('id', 'geneMultipleSelection')
    newSelect2.setAttribute('multiple', 'multiple')
    newSelect2.setAttribute('onchange', 'fillMutationSelectBox()');
    newDiv2.appendChild(newSelect2)

    // Add (3)

    let para3 = document.createElement("P");
    para3.setAttribute('style', 'text-align: center; font-family: Georgia, "Times New Roman", Times, serif');
    para3.setAttribute('id', 'para3');
    para3.innerText = "3) Select mutation(s)";            
    newDiv2.after(para3);

    let newDiv3 = document.createElement("div"); 
    newDiv3.setAttribute('id', 'mutationQuerySelectBox');
    para3.after(newDiv3)
    let newSelect3 = document.createElement("SELECT");
    newSelect3.setAttribute('class', 'mutationMultipleSelection')
    newSelect3.setAttribute('id', 'mutationMultipleSelection')
    newSelect3.setAttribute('multiple', 'multiple')
    newDiv3.appendChild(newSelect3)

    let buttonClone = document.getElementById("buttonsAndTabs").cloneNode(true);
    buttonClone.classList.remove('hide');
    buttonClone.setAttribute('id', 'buttonClone')
    document.getElementById('mutationQuerySelectBox').after(buttonClone);

  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function displayMultiGroupSelectors() {  

  if(document.getElementById('mySingleHR')) {
    document.getElementById("mySingleHR").remove();
  }

  if(document.getElementById("singleClone")) {
    document.getElementById("singleClone").classList.add('hide');
  }

  if(document.getElementById('bigDiv')) {
  } else {
    let bigDiv = document.createElement("div"); 
    bigDiv.setAttribute('class', 'row');
    bigDiv.setAttribute('id', 'bigDiv');
    document.getElementById('numberOfGroups').after(bigDiv); 

    let myHR = document.createElement('hr');
    myHR.setAttribute('style', 'border-color: #4db6ac;');
    document.getElementById('bigDiv').appendChild(myHR);

    let leftDiv = document.createElement("div"); 
    leftDiv.setAttribute('class', 'col s6');
    leftDiv.setAttribute('id', 'leftDiv');

    let rightDiv = document.createElement("div"); 
    rightDiv.setAttribute('class', 'col s6');
    rightDiv.setAttribute('id', 'rightDiv');

    bigDiv.appendChild(leftDiv); 
    bigDiv.appendChild(rightDiv);

    let leftClone = document.getElementById('single-group-analysis').cloneNode(true);
    leftClone.classList.remove('hide');
    let rightClone = document.getElementById('single-group-analysis').cloneNode(true);
    rightClone.classList.remove('hide');

    document.getElementById('leftDiv').appendChild(leftClone);
    document.getElementById('rightDiv').appendChild(rightClone);

    let buttonClone2 = document.getElementById("buttonsAndTabs").cloneNode(true);
    buttonClone2.classList.remove('hide');
    buttonClone2.setAttribute('id', 'buttonClone2')
    document.getElementById('bigDiv').after(buttonClone2);

  }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Div/SVG Manipulation (above) ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                                                               //                                                                        //

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Set Values for Example Button (below) ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Setting the cohort and gene list examples if the user clicks the use example button:
function setExampleVars() {
  // Select example values:
  $('.cancerTypeMultipleSelection').val(['BRCA', 'SARC']);
  $('.geneMultipleSelection').val(['BRCA1', 'EGFR', 'KRAS', 'TP53']);

  // Trigger the change:
  $('.cancerTypeMultipleSelection').trigger('change');
  $('.geneMultipleSelection').trigger('change');
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Set Values for Example Button (above) ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                                                               //                                                                        //

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Build Plots on Page (below) /////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// The JS code for building the plots to display:
// Wait for user input to build plots:

let buildPlots = async function() {
  
  let dataToPlotInfo;

  // Reset page formatting:
  document.getElementById('heatmapDiv0').innerHTML = "";
  document.getElementById('svgViolinDiv0').innerHTML = "";
  
  // Remove existing div and svg elements if they're there:
  removeDiv();
  removeSVGelements();

  // Display loader:
  document.getElementById('heatmapDiv0').className = 'loader';                       // Create the loader.
  document.getElementById('svgViolinDiv0').className = 'loader';                     // Create the loader.

  // Get gene query and cohort query values from select2 box:
  let cohortQuery = $('.cancerTypeMultipleSelection').select2('data').map(
                    cohortInfo => cohortInfo.text.match(/\(([^)]+)\)/)[1]);
  let geneQuery = $('.geneMultipleSelection').select2('data').map(
                    geneInfo => geneInfo.text);
  // Get mutation value(s) from select2 box
  let selectedVariantClassifications = $('.mutationMultipleSelection').select2('data').map(
                                        mutationInfo => mutationInfo.text);

  if(selectedVariantClassifications == "") {

    // Fetch RNA sequence data and display requested plots:
    dataToPlotInfo = getExpressionDataJSONarray_cg(cohortQuery, geneQuery);

  } else {

    let iniMutationFetch = await fetchMutationData();
    let allVariantClassificationData = iniMutationFetch.MAF;

    let selectedVariantClassificationData = [];
    for(let i = 0; i < allVariantClassificationData.length; i++) 
      for(let j = 0; j < selectedVariantClassifications.length; j++) 
        if(allVariantClassificationData[i].Variant_Classification == selectedVariantClassifications[j]) 
          selectedVariantClassificationData.push(allVariantClassificationData[i])

    let selectedBarcodes = selectedVariantClassificationData.map(x => x.Tumor_Sample_Barcode);

    let trimmedBarcodes = selectedBarcodes.map(x => x.slice(0, 12))

    // get unique barcodes
    let barcodes = []
    for(let i = 0; i < trimmedBarcodes.length; i++) {
      if(i == 0) {
        barcodes.push(trimmedBarcodes[i])
      } else if(!barcodes.includes(trimmedBarcodes[i])) {
        barcodes.push(trimmedBarcodes[i])
      }
    }

    // Fetch RNA sequence data and display requested plots:
    dataToPlotInfo = getExpressionDataJSONarray_cgb(cohortQuery, geneQuery, barcodes);

  }
  
  // Once data is returned, build the plots:
  dataToPlotInfo.then(function(data) {
    // Check that the fetch worked:
    if (data == 'Error: Invalid Input Fields for Query.') {
      document.getElementById('heatmapDiv0').classList.remove('loader');               // Remove the loader.
      document.getElementById('svgViolinDiv0').classList.remove('loader');             // Remove the loader.
      showError('geneError');
      return;
    }
    
    // If the fetched worked, build the plots:

    // Display Warning for any invalid genes:
    let myGenesReturned = d3.map(data, function(d){return d.gene;}).keys();
    let emptyGeneArray = geneQuery.filter(function(gene) { if (!myGenesReturned.includes(gene)) { return gene} });
    if (emptyGeneArray.length > 0) {
      showWarning(emptyGeneArray)
    };

    // Set up the figure dimensions:
    let margin = {top: 80, right: 30, bottom: 30, left: 60},
        width = 1250 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    document.getElementById('heatmapDiv0').classList.remove('loader');                        // Remove the loader.
    document.getElementById('svgViolinDiv0').classList.remove('loader');               // Remove the loader.

    // Build the heatmap:
    // Append an svg object:
    let svgHeatMap = d3.select("#heatmapRef").append("svg")
        .attr("viewBox", `0 0 1250 500`)                                           // This line makes the svg responsive
        .attr("id", 'svgHeatMap')
        .append("g")
        .attr("transform",
            "translate(" + (margin.left) + "," + margin.top + ")");

    // Create the heatmap:
    createHeatmap('cohort', cohortQuery, data, svgHeatMap);

    // Build the violin plot:
    //Appending multiple g elements to svg object for violin plot
    let myCohorts = d3.map(data, function(d){return d.cohort;}).keys();
    //Define the number of cohorts to create a plot for
    let numCohorts = myCohorts.length;
    //Spacing between plots
    let ySpacing = margin.top;

    // Append an svg object for each cohort to create a violin plot for
    for(var index = 0; index < numCohorts; index++)
    {
      //Define the current cohort to create the violin plot for
      let curCohort = myCohorts[index];

      let svgViolinPlot = d3.select("#violinPlotRef").append("svg")
        .attr("viewBox", `0 0 1250 500`)  // This line makes the svg responsive
        .attr("id", 'svgViolinPlot')
        .append("g")
        .attr("transform",
            "translate(" + (margin.left-20) + "," + 
                        (margin.top + ySpacing*index*0.25) + ")");

      // Create the violin plot:
      createViolinPlot('cohort', cohortQuery, data, svgViolinPlot, curCohort);
    }

  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Build Plots on Page (above) /////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                                                               //                                                                        //

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Gene/Cohort Checkpoints (below) /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to display the error message:
// NOTE: errors are no longer needed since we have introduced select2 boxes. Saving this code incase needed later:
showError = function(errorType) {
  // Create div1 and set it to be alert class:
  addDiv('div1','heatmapDiv0');
  let divElement = document.getElementById('div1');
  divElement.className = 'alert';

  // Creates span clone from span0 to add to div1:
  let span = document.getElementById('span0');
  let spanElement = span.cloneNode(true);
  spanElement.setAttribute('id','span1');
  divElement.appendChild(spanElement);

  // Adds the error message to the div:
  if(errorType == 'geneError') {
    divElement.innerHTML += "Error: ".bold() + "Invalid Gene Fields for Query";
  } else if (errorType == 'cohortError') {
    divElement.innerHTML += "Error: ".bold() + "Invalid Cohort Fields for Query";
  };
};

// Function to display a warning for genes that don't have mRNA-Seq data:
// NOTE: warnings are no longer needed since we have introduced select2 boxes. Saving this code incase needed later:
showWarning = function(emptyGeneArray_arg) {
  // Create div1 and set it to be warning class:
  let divElement = document.getElementById('heatmapDiv0');
  divElement.className = 'warning';

  // Create span clone from span0 to add to div1:
  let span = document.getElementById('span0');
  let spanElement = span.cloneNode(true);
  spanElement.setAttribute('id','span1');
  divElement.appendChild(spanElement);

  // Add the warning message to the div:
  if (emptyGeneArray_arg.length == 1) {
    divElement.innerHTML += "Warning: ".bold() +emptyGeneArray_arg.join(', ')+ " is an Invalid Gene for Query";
  } else {
    divElement.innerHTML += "Warning: ".bold() +emptyGeneArray_arg.join(', ')+ " are Invalid Genes for Query";
  };
}

// // Function to check that the user input cohort list is valid:
// checkCohortList = function(cohortQuery) {
//   // List of valid cohorts:
//   let validCohortList = ['ACC','BLCA','BRCA','CESC','CHOL','COAD','COADREAD','DLBC','ESCA','FPPP','GBM','GBMLGG','HNSC',
//                          'KICH','KIPAN','KIRC','KIRP','LAML','LGG','LIHC','LUAD','LUSC','MESO','OV','PAAD','PCPG','PRAD',
//                          'READ','SARC','SKCM','STAD','STES','TGCT','THCA','THYM','UCEC','UCS','UVM'];

//   // Check the cohort list:
//   numCohorts = cohortQuery.length;
//   for (var i = 0; i < numCohorts; i++) {
//     let statusTemp = validCohortList.includes(cohortQuery[i]);
//     if (statusTemp == false) {
//       return false;
//     };
//   };
//   return true;
// };

// Function to count the number of genes
// countNumberOfGenes = function(cohortQuery) {
//   let total = 0;
//   numCohorts = cohortQuery.length;
//   for (let i = 0; i < numCohorts; i++) {
//       total++;
//   };
//   return total;
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Gene/Cohort Checkpoints (above) /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

